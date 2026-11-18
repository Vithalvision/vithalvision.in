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
      job_title: "AI Filmmaker Intern",
      slug: "ai-filmmaker-intern",
      department: "Production",
      job_description: "Explore AI-assisted filmmaking, visual storytelling and emerging production workflows in real creative projects.",
      responsibilities: JSON.stringify(["Create AI-assisted visual concepts", "Support pre-production and production workflows", "Experiment with emerging creative tools"]),
      required_skills: JSON.stringify(["Filmmaking", "Storytelling", "AI Creative Tools", "Video Editing"]),
      qualification: JSON.stringify(["Pursuing or completed a degree or course in Film, Media, Design or a related field"]),
      experience_min: 0,
      experience_max: 2,
      employment_type: "Internship",
      work_location: "Gondia, Maharashtra / Hybrid",
      openings: 2,
      application_deadline: "2026-12-31",
    },
    {
      job_title: "Social Media Marketing Intern",
      slug: "social-media-marketing-intern",
      department: "Marketing",
      job_description: "Help grow Vithal Vision's digital presence through engaging campaigns, creative storytelling and audience-focused content.",
      responsibilities: JSON.stringify(["Plan and publish social media content", "Support campaign research and reporting", "Create engaging captions and community responses"]),
      required_skills: JSON.stringify(["Social Media", "Content Creation", "Communication", "Analytics"]),
      qualification: JSON.stringify(["Pursuing or completed a degree or course in Marketing, Media, Communication or a related field"]),
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

export default db;
