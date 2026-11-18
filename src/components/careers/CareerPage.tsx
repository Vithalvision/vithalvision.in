"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  Cpu,
  GraduationCap,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";

type Job = {
  id: number;
  job_title: string;
  slug: string;
  department: string;
  job_description: string;
  required_skills: string[];
  experience_min: number;
  experience_max: number;
  employment_type: string;
  work_location: string;
  application_deadline: string | null;
};

const initialForm = {
  applicant_name: "",
  email: "",
  mobile: "",
  current_location: "",
  job_id: "",
  experience: "",
  work_type: [] as string[],
  employment_type: "",
  skills: "",
  linkedin_url: "",
  portfolio_url: "",
  cover_letter: "",
  consent: false,
};

export default function CareerPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [submitError, setSubmitError] = useState("");
  const applicationFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetch("/api/jobs", { cache: "no-store" });
        const data = await response.json();
        const openJobs = Array.isArray(data.jobs) ? data.jobs : [];
        setJobs(openJobs);

        const requestedSlug = new URLSearchParams(window.location.search).get("apply");
        if (requestedSlug) {
          const selected = openJobs.find((job: Job) => job.slug === requestedSlug);
          if (selected) setForm((current) => ({ ...current, job_id: String(selected.id) }));
        }
      } catch {
        setJobs([]);
      } finally {
        setLoadingJobs(false);
      }
    };
    loadJobs();
  }, []);

  const openApplication = (jobId = "") => {
    setApplicationId("");
    setSubmitError("");
    setForm((current) => ({ ...current, job_id: jobId }));
    window.setTimeout(() => {
      applicationFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.applicant_name.trim()) nextErrors.applicant_name = "Full name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!/^[+\d][\d\s().-]{7,19}$/.test(form.mobile)) nextErrors.mobile = "Enter a valid mobile number.";
    if (!form.current_location.trim()) nextErrors.current_location = "Current location is required.";
    if (form.experience === "") nextErrors.experience = "Select years of experience.";
    if (form.work_type.length === 0) nextErrors.work_type = "Select at least one work type.";
    if (!form.employment_type) nextErrors.employment_type = "Select an employment type.";
    if (!form.skills.trim()) nextErrors.skills = "Skills are required.";
    if (form.linkedin_url && !/^https?:\/\/.+/i.test(form.linkedin_url)) {
      nextErrors.linkedin_url = "Enter a valid LinkedIn URL.";
    }
    if (form.portfolio_url && !/^https?:\/\/.+/i.test(form.portfolio_url)) {
      nextErrors.portfolio_url = "Enter a valid portfolio or GitHub URL.";
    }
    if (!resume) {
      nextErrors.resume = "Resume PDF is required.";
    } else {
      if (resume.size > 5 * 1024 * 1024) nextErrors.resume = "Resume must not exceed 5 MB.";
      if (
        !resume.name.toLowerCase().endsWith(".pdf") ||
        (resume.type && resume.type !== "application/pdf" && resume.type !== "application/x-pdf")
      ) {
        nextErrors.resume = "Only PDF resumes are accepted.";
      }
    }
    if (!form.consent) nextErrors.consent = "Consent is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return (
    <main className="bg-white min-h-screen">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1400&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-white/85" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-up">
          <p className="eyebrow mb-4">Careers at Vithal Vision</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Build Your Career. Create What&apos;s Next.
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            At Vithal Vision, we believe great ideas are created by passionate people.
            We bring together creativity, technology and innovation to build impactful
            experiences across filmmaking, media and technology.
          </p>
          <a
            href="#openings"
            className="inline-flex items-center justify-center text-gold hover:text-gold-dark transition-colors text-sm font-medium mb-5"
          >
            Explore Opportunities <ArrowRight size={16} className="ml-2" />
          </a>
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gold">Careers</span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">Life at Vithal Vision</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 gold-underline-center">
              Why Build Your Career With Us?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Sparkles, title: "Creative Opportunities", text: "Work on exciting film production and media projects." },
              { Icon: Cpu, title: "Technology & Innovation", text: "Explore AI, automation and emerging technologies." },
              { Icon: Users, title: "Collaborative Culture", text: "Work with creative and technology-driven professionals." },
              { Icon: GraduationCap, title: "Learning & Growth", text: "Develop your skills through practical experience." },
            ].map(({ Icon, title, text }) => (
              <article key={title} className="card-hover border border-gray-200 bg-white p-7">
                <div className="w-12 h-12 bg-gold/10 border border-gold/30 flex items-center justify-center mb-6">
                  <Icon size={22} className="text-gold-dark" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-600 leading-7">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="section-padding bg-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="eyebrow mb-3">Current Openings</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 gold-underline">
              Explore Career Opportunities
            </h2>
            <p className="text-gray-600 mt-7 leading-7">
              Find a role that matches your skills, interests and ambitions. Explore our
              current openings and take the next step in your professional journey.
            </p>
          </div>

          {loadingJobs ? (
            <div className="py-16 text-center text-gray-500">Loading opportunities...</div>
          ) : jobs.length === 0 ? (
            <div className="border border-gray-200 bg-white p-8 text-center text-gray-600">
              There are no open positions at this time. You can still submit a general application below.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <article key={job.id} className="card-hover bg-white border border-gray-200 p-7 flex flex-col">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">{job.department}</span>
                    <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1">Open</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">{job.job_title}</h3>
                  <p className="text-sm text-gray-600 leading-7 mb-6 line-clamp-3">{job.job_description}</p>
                  <div className="space-y-2 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2"><BriefcaseBusiness size={15} className="text-gold" />{job.employment_type}</div>
                    <div className="flex items-center gap-2"><GraduationCap size={15} className="text-gold" />{job.experience_min === job.experience_max ? `${job.experience_max} years` : `${job.experience_min}-${job.experience_max} years`} experience</div>
                    <div className="flex items-center gap-2"><MapPin size={15} className="text-gold" />{job.work_location}</div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {job.required_skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="text-xs border border-gray-200 px-2.5 py-1 text-gray-600">{skill}</span>
                    ))}
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-3">
                    <Link href={`/careers/${job.slug}`} className="btn-outline-gold text-center py-3 text-xs rounded-sm uppercase tracking-widest">
                      View Details
                    </Link>
                    <button onClick={() => openApplication(String(job.id))} className="btn-gold py-3 text-xs rounded-sm uppercase tracking-widest">
                      Apply Now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section ref={applicationFormRef} id="apply" className="section-padding scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">Careers</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 gold-underline-center">Apply Now</h2>
            <p className="text-gray-600 mt-7 max-w-2xl mx-auto leading-7">
              Interested in joining Vithal Vision? Fill out the application form below and share
              your profile with us. Our team will review your application and get back to you.
            </p>
          </div>

          {applicationId ? (
            <div className="border border-green-200 bg-green-50 p-8 sm:p-10 text-center">
              <CheckCircle2 size={42} className="text-green-600 mx-auto mb-5" />
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">Application Submitted Successfully!</h3>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-7">
                Thank you for applying to Vithal Vision. Your application has been received successfully.
                Our team will review your profile and get back to you if your qualifications match our requirements.
              </p>
              <p className="mt-5 text-sm font-semibold text-gray-900">Application ID: <span className="text-gold-dark">{applicationId}</span></p>
            </div>
          ) : (
            <CareerApplicationForm
              jobs={jobs}
              form={form}
              resume={resume}
              errors={errors}
              submitting={submitting}
              submitError={submitError}
              setResume={setResume}
              updateField={updateField}
              setForm={setForm}
              validate={validate}
              setSubmitting={setSubmitting}
              setApplicationId={setApplicationId}
              setSubmitError={setSubmitError}
              setErrors={setErrors}
            />
          )}
        </div>
      </section>

      <section className="bg-[#111827] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="eyebrow mb-3">General Application</p>
            <h2 className="font-display text-3xl font-bold">Don&apos;t See a Suitable Position?</h2>
            <p className="text-gray-300 mt-4 leading-7">
              We are always interested in connecting with talented and passionate individuals.
              If you don&apos;t find a suitable opening, you can still share your resume with us for future opportunities.
            </p>
          </div>
          <button onClick={() => openApplication("")} className="btn-gold shrink-0 px-7 py-3.5 text-sm rounded-sm uppercase tracking-widest">
            Submit Your Profile
          </button>
        </div>
      </section>
    </main>
  );
}

type CareerApplicationFormProps = {
  jobs: Job[];
  form: typeof initialForm;
  resume: File | null;
  errors: Record<string, string>;
  submitting: boolean;
  submitError: string;
  setResume: (file: File | null) => void;
  updateField: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<typeof initialForm>>;
  validate: () => boolean;
  setSubmitting: (value: boolean) => void;
  setApplicationId: (value: string) => void;
  setSubmitError: (value: string) => void;
  setErrors: (value: Record<string, string>) => void;
};

function CareerApplicationForm({
  jobs,
  form,
  resume,
  errors,
  submitting,
  submitError,
  setResume,
  updateField,
  setForm,
  validate,
  setSubmitting,
  setApplicationId,
  setSubmitError,
  setErrors,
}: CareerApplicationFormProps) {
  const submitApplication = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (Array.isArray(value)) value.forEach((item) => formData.append(key, item));
        else if (typeof value === "boolean") formData.append(key, String(value));
        else if (value) formData.append(key, String(value));
      });
      if (resume) formData.append("resume", resume);

      const response = await fetch("/api/job-applications", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setErrors(data.errors || {});
        setSubmitError(data.message || "Unable to submit your application.");
        return;
      }
      setApplicationId(data.application_id);
      setForm(initialForm);
      setResume(null);
    } catch {
      setSubmitError("Unable to submit your application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass = (name: string) =>
    `w-full px-4 py-3 border text-sm bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gold ${
      errors[name] ? "border-red-400" : "border-gray-200"
    }`;

  return (
    <form onSubmit={submitApplication} className="border border-gray-200 bg-white p-5 sm:p-8">
      {submitError && (
        <div className="mb-6 border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">{submitError}</div>
      )}
      <fieldset>
        <legend className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-5">Personal Information</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            ["applicant_name", "Full Name", "text", "Your full name"],
            ["email", "Email Address", "email", "you@example.com"],
            ["mobile", "Mobile Number", "tel", "+91 00000 00000"],
            ["current_location", "Current Location", "text", "City, State"],
          ].map(([name, label, type, placeholder]) => (
            <div key={name}>
              <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">{label} *</label>
              <input name={name} type={type} value={String(form[name as keyof typeof form])} onChange={updateField} placeholder={placeholder} className={fieldClass(name)} />
              {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]}</p>}
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8 pt-8 border-t border-gray-100">
        <legend className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-5">Professional Information</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Applied For *</label>
            <select name="job_id" value={form.job_id} onChange={updateField} className={fieldClass("job_id")}>
              <option value="">General Application</option>
              {jobs.map((job) => <option key={job.id} value={job.id}>{job.job_title}</option>)}
            </select>
            {errors.jobId && <p className="text-red-600 text-xs mt-1">{errors.jobId}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Years of Experience *</label>
            <select name="experience" value={form.experience} onChange={updateField} className={fieldClass("experience")}>
              <option value="">Select experience</option>
              {Array.from({ length: 6 }, (_, index) => (
                <option key={index} value={index}>
                  {index === 0 ? "0 Years (Fresher)" : index === 5 ? "5+ Years" : `${index} ${index === 1 ? "Year" : "Years"}`}
                </option>
              ))}
            </select>
            {errors.experience && <p className="text-red-600 text-xs mt-1">{errors.experience}</p>}
          </div>
          <fieldset className="min-w-0">
            <legend className="block text-gray-700 text-xs tracking-widest uppercase mb-3">Work Type *</legend>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["Work From Home", "Office", "Hybrid"].map((workType) => (
                <label key={workType} className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={form.work_type.includes(workType)}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        work_type: event.target.checked
                          ? [...current.work_type, workType]
                          : current.work_type.filter((type) => type !== workType),
                      }))
                    }
                    className="accent-[#C9A84C]"
                  />
                  {workType}
                </label>
              ))}
            </div>
            {errors.work_type && <p className="text-red-600 text-xs mt-2">{errors.work_type}</p>}
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="block text-gray-700 text-xs tracking-widest uppercase mb-3">Employment Type *</legend>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {["Full time", "Part time", "Internship"].map((employmentType) => (
                <label key={employmentType} className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="employment_type"
                    value={employmentType}
                    checked={form.employment_type === employmentType}
                    onChange={updateField}
                    className="accent-[#C9A84C]"
                  />
                  {employmentType}
                </label>
              ))}
            </div>
            {errors.employment_type && <p className="text-red-600 text-xs mt-2">{errors.employment_type}</p>}
          </fieldset>
          <div className="sm:col-span-2">
            <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Skills *</label>
            <textarea name="skills" value={form.skills} onChange={updateField} rows={4} placeholder="List your relevant skills" className={`${fieldClass("skills")} resize-none`} />
            {errors.skills && <p className="text-red-600 text-xs mt-1">{errors.skills}</p>}
          </div>
          {[
            ["linkedin_url", "LinkedIn Profile", "https://linkedin.com/in/your-profile"],
            ["portfolio_url", "Portfolio / GitHub URL", "https://..."],
          ].map(([name, label, placeholder]) => (
            <div key={name}>
              <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">{label}</label>
              <input name={name} type="url" value={String(form[name as keyof typeof initialForm])} onChange={updateField} placeholder={placeholder} className={fieldClass(name)} />
              {errors[name] && <p className="text-red-600 text-xs mt-1">{errors[name]}</p>}
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8 pt-8 border-t border-gray-100">
        <legend className="text-xs uppercase tracking-widest text-gold-dark font-semibold mb-5">Documents</legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Upload Resume / CV (PDF, max 5 MB) *</label>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(event) => setResume(event.target.files?.[0] || null)}
              className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-4 file:border-0 file:bg-gray-100 file:text-gray-700"
            />
            {resume && <p className="text-xs text-gray-500 mt-2">{resume.name}</p>}
            {errors.resume && <p className="text-red-600 text-xs mt-1">{errors.resume}</p>}
          </div>
          <div>
            <label className="block text-gray-700 text-xs tracking-widest uppercase mb-2">Cover Letter</label>
            <textarea name="cover_letter" value={form.cover_letter} onChange={updateField} rows={5} placeholder="Tell us about yourself" className={`${fieldClass("cover_letter")} resize-none`} />
          </div>
        </div>
      </fieldset>

      <label className="flex items-start gap-3 mt-7 cursor-pointer">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
          className="mt-1 accent-[#C9A84C]"
        />
        <span className="text-sm text-gray-600">I confirm that the information provided is accurate and consent to Vithal Vision processing my application.</span>
      </label>
      {errors.consent && <p className="text-red-600 text-xs mt-2">{errors.consent}</p>}

      <button type="submit" disabled={submitting} className="btn-gold w-full sm:w-auto mt-7 px-8 py-3.5 text-sm rounded-sm uppercase tracking-widest disabled:opacity-60">
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
