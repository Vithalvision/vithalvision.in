"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";

type Job = {
  id: number;
  job_title: string;
  slug: string;
  department: string;
  job_description: string;
  responsibilities: string[];
  required_skills: string[];
  qualification: string[];
  experience_min: number;
  experience_max: number;
  employment_type: string;
  work_location: string;
  openings: number;
  application_deadline: string | null;
};

export default function JobDetailsPage() {
  const params = useParams<{ slug: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${params.slug}`, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok || !data.job) {
          setNotFound(true);
        } else {
          setJob(data.job);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [params.slug]);

  if (loading) {
    return <main className="min-h-[60vh] flex items-center justify-center text-gray-500">Loading job details...</main>;
  }

  if (notFound || !job) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4 text-center">
        <div>
          <p className="eyebrow mb-3">Career Opportunity</p>
          <h1 className="font-display text-3xl font-bold text-gray-900">Job Opening Not Available</h1>
          <Link href="/careers" className="btn-outline-gold inline-flex mt-7 px-6 py-3 text-xs uppercase tracking-widest">
            Back to Careers
          </Link>
        </div>
      </main>
    );
  }

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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4">{job.department}</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {job.job_title}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 mb-6 text-sm text-gray-600">
            <span className="inline-flex items-center gap-2"><BriefcaseBusiness size={16} className="text-gold" />{job.employment_type}</span>
            <span className="inline-flex items-center gap-2"><MapPin size={16} className="text-gold" />{job.work_location}</span>
            <span className="inline-flex items-center gap-2"><GraduationCap size={16} className="text-gold" />{job.experience_min}-{job.experience_max} years</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/careers" className="hover:text-gold transition-colors">Careers</Link>
            <span>/</span>
            <span className="text-gold">{job.job_title}</span>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          <div>
            <section className="mb-10">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
              <p className="text-gray-600 leading-8">{job.job_description}</p>
            </section>
            <section className="mb-10">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 leading-7">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="mb-10">
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {job.required_skills.map((skill) => (
                  <span key={skill} className="border border-gold/30 bg-gold/5 px-3 py-2 text-sm text-gray-700">{skill}</span>
                ))}
              </div>
            </section>
            <section>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">Qualifications</h2>
              <ul className="space-y-3">
                {job.qualification.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600 leading-7">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit border border-gray-200 p-6">
            <h2 className="text-sm uppercase tracking-widest font-semibold text-gray-900 mb-6">Position Details</h2>
            <dl className="space-y-5 text-sm">
              <div className="flex gap-3"><BriefcaseBusiness size={17} className="text-gold shrink-0" /><div><dt className="text-gray-400">Department</dt><dd className="text-gray-800 mt-1">{job.department}</dd></div></div>
              <div className="flex gap-3"><Users size={17} className="text-gold shrink-0" /><div><dt className="text-gray-400">Openings</dt><dd className="text-gray-800 mt-1">{job.openings}</dd></div></div>
              <div className="flex gap-3"><GraduationCap size={17} className="text-gold shrink-0" /><div><dt className="text-gray-400">Experience</dt><dd className="text-gray-800 mt-1">{job.experience_min}-{job.experience_max} years</dd></div></div>
              <div className="flex gap-3"><MapPin size={17} className="text-gold shrink-0" /><div><dt className="text-gray-400">Work Location</dt><dd className="text-gray-800 mt-1">{job.work_location}</dd></div></div>
              {job.application_deadline && (
                <div className="flex gap-3"><CalendarDays size={17} className="text-gold shrink-0" /><div><dt className="text-gray-400">Application Deadline</dt><dd className="text-gray-800 mt-1">{job.application_deadline}</dd></div></div>
              )}
            </dl>
            <Link href={`/careers?apply=${encodeURIComponent(job.slug)}#apply`} className="btn-gold flex justify-center mt-7 py-3.5 text-xs rounded-sm uppercase tracking-widest">
              Apply Now
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
