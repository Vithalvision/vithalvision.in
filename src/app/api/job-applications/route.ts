import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import db from "@/lib/career-db";
import { sendApplicationConfirmation } from "@/lib/career-email";

export const runtime = "nodejs";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[+\d][\d\s().-]{7,19}$/;

function parseUrl(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid multipart form data." },
      { status: 400 },
    );
  }

  const applicantName = String(formData.get("applicant_name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const mobile = String(formData.get("mobile") || "").trim();
  const currentLocation = String(formData.get("current_location") || "").trim();
  const jobIdValue = String(formData.get("job_id") || "").trim();
  const experienceValue = String(formData.get("experience") || "").trim();
  const workTypes = formData.getAll("work_type").map((value) => String(value).trim());
  const employmentType = String(formData.get("employment_type") || "").trim();
  const skills = String(formData.get("skills") || "").trim();
  const linkedinUrl = String(formData.get("linkedin_url") || "").trim();
  const portfolioUrl = String(formData.get("portfolio_url") || "").trim();
  const coverLetter = String(formData.get("cover_letter") || "").trim();
  const consent = String(formData.get("consent") || "") === "true";
  const resume = formData.get("resume");

  const errors: Record<string, string> = {};
  if (!applicantName) errors.applicant_name = "Full name is required.";
  if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (!mobilePattern.test(mobile)) errors.mobile = "Enter a valid mobile number.";
  if (!currentLocation) errors.currentLocation = "Current location is required.";
  if (!/^\d+$/.test(experienceValue) || Number(experienceValue) > 5) {
    errors.experience = "Select years of experience.";
  }
  const validWorkTypes = ["Work From Home", "Office", "Hybrid"];
  if (
    workTypes.length === 0 ||
    workTypes.some((workType) => !validWorkTypes.includes(workType)) ||
    new Set(workTypes).size !== workTypes.length
  ) {
    errors.work_type = "Select at least one valid work type.";
  }
  if (!["Full time", "Part time", "Internship"].includes(employmentType)) {
    errors.employment_type = "Select a valid employment type.";
  }
  if (!skills) errors.skills = "Skills are required.";
  if (!parseUrl(linkedinUrl)) errors.linkedinUrl = "Enter a valid LinkedIn URL.";
  if (!parseUrl(portfolioUrl)) errors.portfolioUrl = "Enter a valid portfolio or GitHub URL.";
  if (!consent) errors.consent = "Consent is required.";

  let job: Record<string, unknown> | undefined;
  if (jobIdValue) {
    if (!/^\d+$/.test(jobIdValue)) {
      errors.jobId = "Invalid job selection.";
    } else {
      job = db
        .prepare("SELECT * FROM jobs WHERE id = ? AND status = 'Open'")
        .get(Number(jobIdValue)) as Record<string, unknown> | undefined;
      if (!job) errors.jobId = "The selected position is closed or unavailable.";
    }
  }

  if (!(resume instanceof File)) {
    errors.resume = "Resume PDF is required.";
  } else {
    const resumeName = resume.name.toLowerCase();
    if (!resumeName.endsWith(".pdf")) errors.resume = "Only PDF resumes are accepted.";
    if (resume.type !== "application/pdf" && resume.type !== "application/x-pdf") {
      errors.resume = "Resume must be a valid PDF file.";
    }
    if (resume.size > 5 * 1024 * 1024) {
      errors.resume = "Resume must not exceed 5 MB.";
    }
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { success: false, message: "Please correct the highlighted fields.", errors },
      { status: 400 },
    );
  }

  const resumeFile = resume as File;
  const resumeDirectory = path.join(process.cwd(), "data", "resumes");
  await fs.mkdir(resumeDirectory, { recursive: true, mode: 0o700 });

  const uniqueFileName = `${crypto.randomUUID()}.pdf`;
  const resumePath = path.join(resumeDirectory, uniqueFileName);

  try {
    await fs.writeFile(resumePath, Buffer.from(await resumeFile.arrayBuffer()), { mode: 0o600 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to securely store the resume. Please try again." },
      { status: 500 },
    );
  }

  const year = new Date().getFullYear();
  let applicationId = "";

  try {
    const transaction = db.transaction(() => {
      const sequenceRow = db
        .prepare("SELECT COUNT(*) AS count FROM job_applications")
        .get() as { count: number };
      let sequence = sequenceRow.count + 1;
      do {
        applicationId = `VV-${year}-${String(sequence).padStart(5, "0")}`;
        const existing = db
          .prepare("SELECT 1 FROM job_applications WHERE application_id = ?")
          .get(applicationId);
        if (!existing) break;
        sequence += 1;
      } while (true);

      db.prepare(`
        INSERT INTO job_applications (
          application_id, job_id, applicant_name, email, mobile, current_location,
          experience, work_type, employment_type, skills, linkedin_url, portfolio_url,
          resume_path, cover_letter
        ) VALUES (
          @application_id, @job_id, @applicant_name, @email, @mobile, @current_location,
          @experience, @work_type, @employment_type, @skills, @linkedin_url, @portfolio_url,
          @resume_path, @cover_letter
        )
      `).run({
        application_id: applicationId,
        job_id: job ? Number(job.id) : null,
        applicant_name: applicantName,
        email,
        mobile,
        current_location: currentLocation,
        experience: Number(experienceValue),
        work_type: JSON.stringify(workTypes),
        employment_type: employmentType,
        skills,
        linkedin_url: linkedinUrl || null,
        portfolio_url: portfolioUrl || null,
        resume_path: resumePath,
        cover_letter: coverLetter || null,
      });
    });

    transaction();
  } catch {
    await fs.unlink(resumePath).catch(() => undefined);
    return NextResponse.json(
      { success: false, message: "Unable to save the application. Please try again." },
      { status: 500 },
    );
  }

  const jobTitle = job ? String(job.job_title) : "General Application";
  try {
    await sendApplicationConfirmation(applicantName, email, jobTitle);
  } catch (error) {
    console.error("Application confirmation email failed:", error);
  }

  return NextResponse.json({
    success: true,
    message: "Application submitted successfully.",
    application_id: applicationId,
  });
}
