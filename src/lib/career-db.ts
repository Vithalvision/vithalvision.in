import Database from "better-sqlite3";
import path from "node:path";
import fs from "node:fs";

const dataDirectory = path.join(process.cwd(), "data");
const databasePath = path.join(dataDirectory, "career.db");

fs.mkdirSync(dataDirectory, { recursive: true });

const db = new Database(databasePath);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job_title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    department TEXT NOT NULL,
    job_description TEXT NOT NULL,
    responsibilities TEXT NOT NULL DEFAULT '[]',
    required_skills TEXT NOT NULL DEFAULT '[]',
    qualification TEXT NOT NULL DEFAULT '[]',
    experience_min INTEGER NOT NULL DEFAULT 0,
    experience_max INTEGER NOT NULL DEFAULT 0,
    employment_type TEXT NOT NULL,
    work_location TEXT NOT NULL,
    openings INTEGER NOT NULL DEFAULT 1,
    application_deadline TEXT,
    status TEXT NOT NULL DEFAULT 'Open',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    application_id TEXT NOT NULL UNIQUE,
    job_id INTEGER,
    applicant_name TEXT NOT NULL,
    email TEXT NOT NULL,
    mobile TEXT NOT NULL,
    current_location TEXT NOT NULL,
    experience INTEGER NOT NULL,
    work_type TEXT NOT NULL DEFAULT '[]',
    employment_type TEXT NOT NULL DEFAULT '',
    skills TEXT NOT NULL,
    linkedin_url TEXT,
    portfolio_url TEXT,
    resume_path TEXT NOT NULL,
    cover_letter TEXT,
    application_status TEXT NOT NULL DEFAULT 'New',
    applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id)
  );

  CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
  CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);
  CREATE INDEX IF NOT EXISTS idx_job_applications_email ON job_applications(email);
`);

const applicationColumns = db
  .prepare("PRAGMA table_info(job_applications)")
  .all() as { name: string }[];

if (!applicationColumns.some((column) => column.name === "work_type")) {
  db.exec("ALTER TABLE job_applications ADD COLUMN work_type TEXT NOT NULL DEFAULT '[]'");
}
if (!applicationColumns.some((column) => column.name === "employment_type")) {
  db.exec("ALTER TABLE job_applications ADD COLUMN employment_type TEXT NOT NULL DEFAULT ''");
}

const seedCount = db.prepare("SELECT COUNT(*) AS count FROM jobs").get() as { count: number };

if (seedCount.count === 0) {
  const insertJob = db.prepare(`
    INSERT INTO jobs (
      job_title, slug, department, job_description, responsibilities, required_skills,
      qualification, experience_min, experience_max, employment_type, work_location,
      openings, application_deadline, status
    ) VALUES (
      @job_title, @slug, @department, @job_description, @responsibilities, @required_skills,
      @qualification, @experience_min, @experience_max, @employment_type, @work_location,
      @openings, @application_deadline, 'Open'
    )
  `);

  const seedJobs = [
    {
      job_title: "AI Developer Intern",
      slug: "ai-developer-intern",
      department: "Technology",
      job_description: "Build intelligent tools and automation experiences that support Vithal Vision's film, media and technology workflows.",
      responsibilities: JSON.stringify(["Develop and test AI-assisted applications", "Work with APIs, datasets and automation workflows", "Collaborate with creative and technical teams"]),
      required_skills: JSON.stringify(["Python", "Generative AI", "API Development", "Problem Solving"]),
      qualification: JSON.stringify(["Currently pursuing or recently completed a degree in Computer Science, AI or a related field"]),
      experience_min: 0,
      experience_max: 2,
      employment_type: "Internship",
      work_location: "Gondia, Maharashtra / Hybrid",
      openings: 2,
      application_deadline: "2026-12-31",
    },
    {
      job_title: "Full Stack Developer",
      slug: "ai-filmmaker-intern",
      department: "Technology",
      job_description: "Build and maintain web applications and backend services that support Vithal Vision's creative and media workflows.",
      responsibilities: JSON.stringify(["Develop responsive interfaces using React and Next.js", "Build APIs and server-side features with Node.js", "Integrate databases, test features and collaborate with the product team"]),
      required_skills: JSON.stringify(["JavaScript or TypeScript", "React or Next.js", "Node.js", "REST APIs", "SQL", "Problem Solving"]),
      qualification: JSON.stringify(["Pursuing or recently completed a degree in Computer Science, Software Engineering or a related field", "Personal, academic or professional web development projects are a plus"]),
      experience_min: 0,
      experience_max: 2,
      employment_type: "Internship",
      work_location: "Gondia, Maharashtra / Hybrid",
      openings: 2,
      application_deadline: "2026-12-31",
    },
    {
      job_title: "Sales & Business Development Intern",
      slug: "social-media-marketing-intern",
      department: "Sales & Business Development",
      job_description: "Help identify new business opportunities and build client relationships for Vithal Vision's film, media and technology services.",
      responsibilities: JSON.stringify(["Research potential clients, partners and market opportunities", "Support sales presentations, proposals and pitches", "Follow up with prospective clients and maintain lead records"]),
      required_skills: JSON.stringify(["Communication", "Lead Generation", "Sales and Negotiation", "Presentation Skills", "CRM or Spreadsheet Skills"]),
      qualification: JSON.stringify(["Pursuing or recently completed a degree in Business, Marketing, Sales or a related field", "Interest in client relations and business development"]),
      experience_min: 0,
      experience_max: 2,
      employment_type: "Internship",
      work_location: "Gondia, Maharashtra / Hybrid",
      openings: 2,
      application_deadline: "2026-12-31",
    },
  ];

  const seed = db.transaction((jobs: typeof seedJobs) => {
    jobs.forEach((job) => insertJob.run(job));
  });
  seed(seedJobs);
}

const updateFullStackJob = db.prepare(`
  UPDATE jobs
  SET job_title = @job_title,
      department = @department,
      job_description = @job_description,
      responsibilities = @responsibilities,
      required_skills = @required_skills,
      qualification = @qualification,
      updated_at = CURRENT_TIMESTAMP
  WHERE slug = @slug
    AND job_title = 'AI Filmmaker Intern'
`);

const updateSalesJob = db.prepare(`
  UPDATE jobs
  SET job_title = @job_title,
      department = @department,
      job_description = @job_description,
      responsibilities = @responsibilities,
      required_skills = @required_skills,
      qualification = @qualification,
      updated_at = CURRENT_TIMESTAMP
  WHERE slug = @slug
    AND job_title = 'Social Media Marketing Intern'
`);

db.transaction(() => {
  updateFullStackJob.run({
    job_title: "Full Stack Developer",
    slug: "ai-filmmaker-intern",
    department: "Technology",
    job_description: "Build and maintain web applications and backend services that support Vithal Vision's creative and media workflows.",
    responsibilities: JSON.stringify(["Develop responsive interfaces using React and Next.js", "Build APIs and server-side features with Node.js", "Integrate databases, test features and collaborate with the product team"]),
    required_skills: JSON.stringify(["JavaScript or TypeScript", "React or Next.js", "Node.js", "REST APIs", "SQL", "Problem Solving"]),
    qualification: JSON.stringify(["Pursuing or recently completed a degree in Computer Science, Software Engineering or a related field", "Personal, academic or professional web development projects are a plus"]),
  });
  updateSalesJob.run({
    job_title: "Sales & Business Development Intern",
    slug: "social-media-marketing-intern",
    department: "Sales & Business Development",
    job_description: "Help identify new business opportunities and build client relationships for Vithal Vision's film, media and technology services.",
    responsibilities: JSON.stringify(["Research potential clients, partners and market opportunities", "Support sales presentations, proposals and pitches", "Follow up with prospective clients and maintain lead records"]),
    required_skills: JSON.stringify(["Communication", "Lead Generation", "Sales and Negotiation", "Presentation Skills", "CRM or Spreadsheet Skills"]),
    qualification: JSON.stringify(["Pursuing or recently completed a degree in Business, Marketing, Sales or a related field", "Interest in client relations and business development"]),
  });
})();

export default db;
