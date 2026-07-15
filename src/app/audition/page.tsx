"use client";

import { useState } from "react";
import {
  AuditionFormData,
  auditionFormInitialState,
  auditionFormSteps,
  talentCategories,
  technicianCategories,
  singerTypes,
  writerTypes,
  bodyTypes,
  skinTones,
  availabilityOptions,
  projectTypes,
} from "@/data/index"; // ← adjust path if your data file lives elsewhere

// ── Theme tokens ──────────────────────────────────────────────────────────────
const inp =
  "w-full border border-[#d4c9a8] rounded-none px-4 py-3 text-sm text-[#1a1a2e] bg-white focus:outline-none focus:border-[#B5922A] focus:ring-0 transition placeholder:text-[#aaa8a0] font-sans";
const sel =
  "w-full border border-[#d4c9a8] rounded-none px-4 py-3 text-sm text-[#1a1a2e] bg-white focus:outline-none focus:border-[#B5922A] focus:ring-0 transition font-sans";

// ── Shared UI helpers ─────────────────────────────────────────────────────────
function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#B5922A]">
        {label}
        {required && " *"}
      </label>
      {children}
    </div>
  );
}

function PillRadio({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label
          key={o}
          className={`flex items-center gap-2 cursor-pointer px-4 py-2 border text-xs font-semibold uppercase tracking-wider transition-all ${
            value === o
              ? "bg-[#B5922A] border-[#B5922A] text-white"
              : "border-[#d4c9a8] text-[#666] hover:border-[#B5922A] hover:text-[#B5922A]"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={o}
            checked={value === o}
            onChange={() => onChange(o)}
            className="sr-only"
          />
          {o}
        </label>
      ))}
    </div>
  );
}

function PillCheck({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (o: string) =>
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => toggle(o)}
          className={`px-4 py-2 border text-xs font-semibold uppercase tracking-wider transition-all ${
            value.includes(o)
              ? "bg-[#B5922A] border-[#B5922A] text-white"
              : "border-[#d4c9a8] text-[#666] hover:border-[#B5922A] hover:text-[#B5922A]"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B5922A] mb-2">
        {label}
      </p>
      <h3 className="font-serif text-2xl font-bold text-[#1a1a2e] leading-tight">
        {title}
      </h3>
      <div className="mt-3 w-12 h-[2px] bg-[#B5922A]" />
    </div>
  );
}

// ── Step components ───────────────────────────────────────────────────────────
function Step1({
  d,
  u,
}: {
  d: AuditionFormData;
  u: (k: keyof AuditionFormData, v: any) => void;
}) {
  return (
    <div>
      <SectionHeading label="Step 01" title="Personal Information" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Field label="Full Name" required>
            <input
              className={inp}
              placeholder="Enter your full name"
              value={d.fullName}
              onChange={(e) => u("fullName", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Date of Birth" required>
          <input
            type="date"
            className={inp}
            value={d.dob}
            onChange={(e) => u("dob", e.target.value)}
          />
        </Field>
        <Field label="Gender" required>
          <PillRadio
            name="gender"
            options={["Male", "Female", "Other"]}
            value={d.gender}
            onChange={(v) => u("gender", v)}
          />
        </Field>
        <Field label="Mobile Number" required>
          <input
            className={inp}
            placeholder="+91 XXXXX XXXXX"
            value={d.mobile}
            onChange={(e) => u("mobile", e.target.value)}
          />
        </Field>
        <Field label="WhatsApp Number" required>
          <input
            className={inp}
            placeholder="+91 XXXXX XXXXX"
            value={d.whatsapp}
            onChange={(e) => u("whatsapp", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Email Address" required>
            <input
              type="email"
              className={inp}
              placeholder="you@email.com"
              value={d.email}
              onChange={(e) => u("email", e.target.value)}
            />
          </Field>
        </div>
        <Field label="City" required>
          <input
            className={inp}
            placeholder="City"
            value={d.city}
            onChange={(e) => u("city", e.target.value)}
          />
        </Field>
        <Field label="State" required>
          <input
            className={inp}
            placeholder="State"
            value={d.state}
            onChange={(e) => u("state", e.target.value)}
          />
        </Field>
        <Field label="Country" required>
          <input
            className={inp}
            placeholder="Country"
            value={d.country}
            onChange={(e) => u("country", e.target.value)}
          />
        </Field>
        <Field label="Languages Known" required>
          <input
            className={inp}
            placeholder="Hindi, English, Marathi…"
            value={d.languages}
            onChange={(e) => u("languages", e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
}

function Step2({
  d,
  u,
}: {
  d: AuditionFormData;
  u: (k: keyof AuditionFormData, v: any) => void;
}) {
  return (
    <div>
      <SectionHeading label="Step 02" title="Talent Category" />
      <Field label="Select Your Primary Category" required>
        <div className="flex flex-wrap gap-2 mt-1">
          {talentCategories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => u("primaryCategory", c)}
              className={`px-4 py-2 border text-xs font-semibold uppercase tracking-wider transition-all ${
                d.primaryCategory === c
                  ? "bg-[#B5922A] border-[#B5922A] text-white"
                  : "border-[#d4c9a8] text-[#666] hover:border-[#B5922A] hover:text-[#B5922A]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Field>
      {d.primaryCategory === "Other" && (
        <div className="mt-6">
          <Field label="Specify Your Category" required>
            <input
              className={inp}
              placeholder="e.g. Folk Artist, Stunt Performer…"
              value={d.otherCategory}
              onChange={(e) => u("otherCategory", e.target.value)}
            />
            <p className="mt-2 text-[11px] text-[#B5922A] italic">
              Your suggestion will be reviewed by our admin team and added for
              future applicants.
            </p>
          </Field>
        </div>
      )}
    </div>
  );
}

function Step3({
  d,
  u,
}: {
  d: AuditionFormData;
  u: (k: keyof AuditionFormData, v: any) => void;
}) {
  return (
    <div>
      <SectionHeading label="Step 03" title="Experience Details" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="sm:col-span-2">
          <Field label="Experience Level" required>
            <div className="mt-1">
              <PillRadio
                name="exp"
                options={["Fresher", "Experienced"]}
                value={d.experienceLevel}
                onChange={(v) => u("experienceLevel", v)}
              />
            </div>
          </Field>
        </div>
        {d.experienceLevel === "Experienced" && (
          <Field label="Years of Experience">
            <input
              className={inp}
              placeholder="e.g. 3 years"
              value={d.yearsExp}
              onChange={(e) => u("yearsExp", e.target.value)}
            />
          </Field>
        )}
        <Field label="Current Profession">
          <input
            className={inp}
            placeholder="Actor, Student, Freelancer…"
            value={d.profession}
            onChange={(e) => u("profession", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Previous Projects">
            <textarea
              className={`${inp} resize-none`}
              rows={3}
              placeholder="Films, music videos, ads, web series you've worked on…"
              value={d.previousProjects}
              onChange={(e) => u("previousProjects", e.target.value)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Awards / Achievements">
            <textarea
              className={`${inp} resize-none`}
              rows={2}
              placeholder="Any awards, recognitions, or notable achievements…"
              value={d.awards}
              onChange={(e) => u("awards", e.target.value)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Step4({
  d,
  u,
}: {
  d: AuditionFormData;
  u: (k: keyof AuditionFormData, v: any) => void;
}) {
  const cat = d.primaryCategory;
  const isTech = technicianCategories.includes(cat);

  return (
    <div>
      <SectionHeading
        label="Step 04"
        title={cat ? `${cat} Details` : "Category Details"}
      />

      {!cat && (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-[#d4c9a8]">
          <p className="text-xs tracking-widest uppercase text-[#B5922A] font-semibold">
            Select a category in Step 02 first
          </p>
        </div>
      )}

      {cat === "Actor" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Height (cm)">
            <input
              className={inp}
              placeholder="e.g. 175"
              value={d.height}
              onChange={(e) => u("height", e.target.value)}
            />
          </Field>
          <Field label="Weight (kg)">
            <input
              className={inp}
              placeholder="e.g. 65"
              value={d.weight}
              onChange={(e) => u("weight", e.target.value)}
            />
          </Field>
          <Field label="Body Type">
            <select
              className={sel}
              value={d.bodyType}
              onChange={(e) => u("bodyType", e.target.value)}
            >
              <option value="">Select</option>
              {bodyTypes.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Skin Tone">
            <select
              className={sel}
              value={d.skinTone}
              onChange={(e) => u("skinTone", e.target.value)}
            >
              <option value="">Select</option>
              {skinTones.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
          <Field label="Acting Experience">
            <input
              className={inp}
              placeholder="e.g. 2 years"
              value={d.actingExp}
              onChange={(e) => u("actingExp", e.target.value)}
            />
          </Field>
          <Field label="Theatre Experience">
            <input
              className={inp}
              placeholder="e.g. 5 stage plays"
              value={d.theatreExp}
              onChange={(e) => u("theatreExp", e.target.value)}
            />
          </Field>
          <Field label="Dance Skills">
            <input
              className={inp}
              placeholder="Kathak, Hip-Hop…"
              value={d.danceSkills}
              onChange={(e) => u("danceSkills", e.target.value)}
            />
          </Field>
          <Field label="Action Skills">
            <input
              className={inp}
              placeholder="Martial Arts, Stunts…"
              value={d.actionSkills}
              onChange={(e) => u("actionSkills", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Languages for Acting">
              <input
                className={inp}
                placeholder="Hindi, English, Marathi…"
                value={d.actingLanguages}
                onChange={(e) => u("actingLanguages", e.target.value)}
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Showreel / Portfolio Link">
              <input
                className={inp}
                placeholder="YouTube or Drive link to your showreel"
                value={d.showreelLink}
                onChange={(e) => u("showreelLink", e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}

      {cat === "Singer" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Field label="Singer Type">
              <div className="mt-1">
                <PillRadio
                  name="singerType"
                  options={singerTypes}
                  value={d.singerType}
                  onChange={(v) => u("singerType", v)}
                />
              </div>
            </Field>
          </div>
          <Field label="Vocal Range">
            <input
              className={inp}
              placeholder="Tenor, Soprano, Baritone…"
              value={d.vocalRange}
              onChange={(e) => u("vocalRange", e.target.value)}
            />
          </Field>
          <Field label="Instruments Known">
            <input
              className={inp}
              placeholder="Guitar, Tabla, Piano…"
              value={d.instruments}
              onChange={(e) => u("instruments", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="YouTube / Performance Links">
              <textarea
                className={`${inp} resize-none`}
                rows={3}
                placeholder="Paste one link per line…"
                value={d.youtubeLinks}
                onChange={(e) => u("youtubeLinks", e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}

      {cat === "Writer" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Field label="Writer Type">
              <div className="mt-1">
                <PillCheck
                  options={writerTypes}
                  value={d.writerType ? d.writerType.split(",") : []}
                  onChange={(v) => u("writerType", v.join(","))}
                />
              </div>
            </Field>
          </div>
          <Field label="Genres">
            <input
              className={inp}
              placeholder="Drama, Thriller, Romance…"
              value={d.genres}
              onChange={(e) => u("genres", e.target.value)}
            />
          </Field>
          <Field label="Published Works">
            <input
              className={inp}
              placeholder="Book titles, produced screenplays…"
              value={d.publishedWorks}
              onChange={(e) => u("publishedWorks", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Portfolio Link">
              <input
                className={inp}
                placeholder="Google Drive / website link"
                value={d.portfolioLink}
                onChange={(e) => u("portfolioLink", e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}

      {(cat === "Dancer" || cat === "Choreographer") && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Dance Styles">
            <input
              className={inp}
              placeholder="Bharatanatyam, Hip-Hop…"
              value={d.danceSkills}
              onChange={(e) => u("danceSkills", e.target.value)}
            />
          </Field>
          <Field label="Experience">
            <input
              className={inp}
              placeholder="5 years, 10 stage shows…"
              value={d.actingExp}
              onChange={(e) => u("actingExp", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Performance / Reel Links">
              <textarea
                className={`${inp} resize-none`}
                rows={3}
                placeholder="YouTube / Instagram links…"
                value={d.youtubeLinks}
                onChange={(e) => u("youtubeLinks", e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}

      {isTech && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Department">
            <input
              className={`${inp} bg-[#faf9f7]`}
              value={cat}
              readOnly
            />
          </Field>
          <Field label="Specialization">
            <input
              className={inp}
              placeholder="e.g. Colour Grading, Drone"
              value={d.specialization}
              onChange={(e) => u("specialization", e.target.value)}
            />
          </Field>
          <Field label="Equipment Owned">
            <input
              className={inp}
              placeholder="Sony FX3, DJI Ronin…"
              value={d.equipment}
              onChange={(e) => u("equipment", e.target.value)}
            />
          </Field>
          <Field label="Availability">
            <input
              className={inp}
              placeholder="Weekends, Full time…"
              value={d.availability}
              onChange={(e) => u("availability", e.target.value)}
            />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Portfolio / Work Sample Links">
              <textarea
                className={`${inp} resize-none`}
                rows={3}
                placeholder="Paste links to your work…"
                value={d.portfolioLink}
                onChange={(e) => u("portfolioLink", e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}
    </div>
  );
}

function Step5({
  d,
  u,
}: {
  d: AuditionFormData;
  u: (k: keyof AuditionFormData, v: any) => void;
}) {
  return (
    <div>
      <SectionHeading label="Step 05" title="Social & Media" />
      <p className="text-xs tracking-widest uppercase text-[#B5922A] font-bold mb-4">
        Social Profiles
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {(
          [
            ["Instagram", "instagram", "https://instagram.com/yourhandle"],
            ["Facebook", "facebook", "https://facebook.com/yourprofile"],
            ["YouTube", "youtube", "https://youtube.com/@yourchannel"],
            ["LinkedIn", "linkedin", "https://linkedin.com/in/yourprofile"],
            ["Website", "website", "https://yourwebsite.com"],
            ["IMDb Profile", "imdb", "https://imdb.com/name/..."],
          ] as const
        ).map(([lbl, key, ph]) => (
          <Field key={key} label={lbl}>
            <input
              className={inp}
              placeholder={ph}
              value={d[key as keyof AuditionFormData] as string}
              onChange={(e) => u(key as keyof AuditionFormData, e.target.value)}
            />
          </Field>
        ))}
      </div>
      <div className="w-full h-px bg-[#d4c9a8] mb-8" />
      <p className="text-xs tracking-widest uppercase text-[#B5922A] font-bold mb-4">
        Portfolio & Media Links
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <Field label="Google Drive Folder">
            <input
              className={inp}
              placeholder="Link to folder with photos/videos"
              value={d.googleDrive}
              onChange={(e) => u("googleDrive", e.target.value)}
            />
          </Field>
        </div>
        <Field label="YouTube Link">
          <input
            className={inp}
            placeholder="Your video or playlist"
            value={d.youtubeMedia}
            onChange={(e) => u("youtubeMedia", e.target.value)}
          />
        </Field>
        <Field label="Instagram Reel / Post">
          <input
            className={inp}
            placeholder="https://instagram.com/reel/…"
            value={d.instagramReel}
            onChange={(e) => u("instagramReel", e.target.value)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Vimeo Link">
            <input
              className={inp}
              placeholder="https://vimeo.com/…"
              value={d.vimeo}
              onChange={(e) => u("vimeo", e.target.value)}
            />
          </Field>
        </div>
      </div>
    </div>
  );
}

function Step6({
  d,
  u,
}: {
  d: AuditionFormData;
  u: (k: keyof AuditionFormData, v: any) => void;
}) {
  return (
    <div>
      <SectionHeading label="Step 06" title="Availability" />
      <div className="flex flex-col gap-8">
        <Field label="Available For" required>
          <div className="mt-1">
            <PillCheck
              options={availabilityOptions}
              value={d.availableFor}
              onChange={(v) => u("availableFor", v)}
            />
          </div>
        </Field>
        <Field label="Travel Ready?">
          <div className="mt-1">
            <PillRadio
              name="travel"
              options={["Yes", "No"]}
              value={d.travelReady}
              onChange={(v) => u("travelReady", v)}
            />
          </div>
        </Field>
        <Field label="Relocation Ready?">
          <div className="mt-1">
            <PillRadio
              name="reloc"
              options={["Yes", "No"]}
              value={d.relocationReady}
              onChange={(v) => u("relocationReady", v)}
            />
          </div>
        </Field>
      </div>
    </div>
  );
}

function Step7({
  d,
  u,
}: {
  d: AuditionFormData;
  u: (k: keyof AuditionFormData, v: any) => void;
}) {
  return (
    <div>
      <SectionHeading label="Step 07" title="Project Preferences" />
      <Field label="Interested In — Select All That Apply">
        <div className="mt-2">
          <PillCheck
            options={projectTypes}
            value={d.projectPreferences}
            onChange={(v) => u("projectPreferences", v)}
          />
        </div>
      </Field>
    </div>
  );
}

function Step8({
  d,
  u,
}: {
  d: AuditionFormData;
  u: (k: keyof AuditionFormData, v: any) => void;
}) {
  const checks: [keyof AuditionFormData, string][] = [
    ["v1", "All information provided is accurate and complete."],
    ["v2", "I own or have full rights to all uploaded and linked content."],
    [
      "v3",
      "I authorize Cinevestor and Vithal Visions Pvt. Ltd. to review my profile for casting, crew hiring, collaboration, and project opportunities.",
    ],
    ["v4", "I agree to the Privacy Policy and Terms & Conditions."],
  ];

  return (
    <div>
      <SectionHeading label="Step 08" title="Verification" />
      <div className="flex flex-col gap-5">
        {checks.map(([key, text]) => (
          <label key={key} className="flex items-start gap-4 cursor-pointer group">
            <div
              onClick={() => u(key, !d[key])}
              className={`mt-0.5 w-5 h-5 flex-shrink-0 border-2 flex items-center justify-center transition-all ${
                d[key]
                  ? "bg-[#B5922A] border-[#B5922A]"
                  : "border-[#d4c9a8] group-hover:border-[#B5922A]"
              }`}
            >
              {d[key] && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-[#3a3a3a] leading-relaxed">{text}</span>
          </label>
        ))}
      </div>
      <div className="mt-8 p-5 border border-[#d4c9a8] bg-[#fdf9f0]">
        <p className="text-xs text-[#8a7040] leading-relaxed">
          <span className="font-bold text-[#B5922A] uppercase tracking-wider">
            Cinevestor Talent Database
          </span>
          <br />
          Your profile will be reviewed by our team and you may be contacted for
          upcoming film projects, music videos, web series, and collaborations by
          Vithal Visions Pvt. Ltd.
        </p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE || "https://admin.cinevestor.in"}/api/submit-audition`;

export default function AuditionForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<AuditionFormData>(auditionFormInitialState);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (key: keyof AuditionFormData, val: any) =>
    setData((prev) => ({ ...prev, [key]: val }));

  const allVerified = data.v1 && data.v2 && data.v3 && data.v4;
  const progress = Math.round(((step + 1) / auditionFormSteps.length) * 100);

  // ── Submit handler — POSTs to live backend API ──────────────────────────────
  const handleSubmit = async () => {
    if (!allVerified || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      full_name:           data.fullName,
      dob:                 data.dob || null,
      gender:              data.gender,
      mobile:              data.mobile,
      whatsapp:            data.whatsapp,
      email:               data.email,
      city:                data.city,
      state:               data.state,
      country:             data.country || "India",
      languages:           data.languages,
      primary_category:    data.primaryCategory,
      other_category:      data.otherCategory,
      experience_level:    data.experienceLevel,
      years_exp:           data.yearsExp,
      profession:          data.profession,
      previous_projects:   data.previousProjects,
      awards:              data.awards,
      height:              data.height,
      weight:              data.weight,
      body_type:           data.bodyType,
      skin_tone:           data.skinTone,
      acting_exp:          data.actingExp,
      theatre_exp:         data.theatreExp,
      dance_skills:        data.danceSkills,
      action_skills:       data.actionSkills,
      acting_languages:    data.actingLanguages,
      showreel_link:       data.showreelLink,
      singer_type:         data.singerType,
      vocal_range:         data.vocalRange,
      instruments:         data.instruments,
      youtube_links:       data.youtubeLinks,
      writer_type:         data.writerType,
      genres:              data.genres,
      published_works:     data.publishedWorks,
      portfolio_link:      data.portfolioLink,
      department:          data.department,
      specialization:      data.specialization,
      equipment:           data.equipment,
      availability:        data.availability,
      instagram:           data.instagram,
      facebook:            data.facebook,
      youtube:             data.youtube,
      linkedin:            data.linkedin,
      website:             data.website,
      imdb:                data.imdb,
      google_drive:        data.googleDrive,
      youtube_media:       data.youtubeMedia,
      instagram_reel:      data.instagramReel,
      vimeo:               data.vimeo,
      available_for:       data.availableFor.join(","),
      travel_ready:        data.travelReady,
      relocation_ready:    data.relocationReady,
      project_preferences: data.projectPreferences.join(","),
      v1: data.v1, v2: data.v2, v3: data.v3, v4: data.v4,
    };

    try {
      const res = await fetch(API_URL, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });

      const result = await res.json().catch(() => ({}));

      if (!res.ok || result.success === false) {
        throw new Error(result.error || result.message || `Server error (${res.status})`);
      }

      setSubmitted(true); // show success screen
    } catch (err: any) {
      setSubmitError(
        err?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const panels = [
    <Step1 d={data} u={update} />,
    <Step2 d={data} u={update} />,
    <Step3 d={data} u={update} />,
    <Step4 d={data} u={update} />,
    <Step5 d={data} u={update} />,
    <Step6 d={data} u={update} />,
    <Step7 d={data} u={update} />,
    <Step8 d={data} u={update} />,
  ];

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 border-2 border-[#B5922A] flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-8 h-8 text-[#B5922A]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B5922A] mb-3">
            Application Received
          </p>
          <h2 className="font-serif text-3xl font-bold text-[#1a1a2e] mb-4">
            Thank You, {data.fullName || "Talent"}.
          </h2>
          <p className="text-sm text-[#666] leading-relaxed mb-8">
            Your profile has been added to the Cinevestor Talent Database. Our
            team will review it and reach out for upcoming projects.
          </p>
          <div className="inline-block border border-[#B5922A] px-6 py-2 text-xs font-bold tracking-widest uppercase text-[#B5922A]">
            Vithal Visions Pvt. Ltd.
          </div>
          <div className="mt-8">
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(0);
                setData(auditionFormInitialState);
              }}
              className="text-xs text-[#999] underline hover:text-[#B5922A] transition"
            >
              Submit another application
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f7] py-16 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-14">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B5922A] mb-4">
            Cinevestor × Vithal Visions Private Limited
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a2e] leading-tight">
            Talent Registration
            <br />
            <span className="text-[#B5922A]">& Audition Form</span>
          </h1>
          <p className="mt-4 text-sm text-[#777] max-w-lg mx-auto leading-relaxed">
            Join our creative database for film, music & media projects. One
            form — all opportunities.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3 text-[10px] font-semibold tracking-widest uppercase text-[#B5922A]">
            <span>Film Production</span>
            <span className="text-[#d4c9a8]">·</span>
            <span>Virtual Production</span>
            <span className="text-[#d4c9a8]">·</span>
            <span>Media Technology</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex-1 h-[2px] bg-[#e8e2d4]">
            <div
              className="h-full bg-[#B5922A] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#B5922A] flex-shrink-0">
            {progress}%
          </span>
        </div>

        {/* Step tabs */}
        <div className="flex overflow-x-auto gap-0 mb-10 border-b border-[#e8e2d4]">
          {auditionFormSteps.map((s, i) => (
            <button
              key={i}
              onClick={() => i <= step && setStep(i)}
              className={`flex-shrink-0 px-4 py-3 text-[10px] font-bold tracking-widest uppercase border-b-2 transition-all ${
                i === step
                  ? "border-[#B5922A] text-[#B5922A]"
                  : i < step
                  ? "border-transparent text-[#B5922A]/50 hover:text-[#B5922A]"
                  : "border-transparent text-[#bbb] cursor-not-allowed"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
              <span className="hidden sm:inline ml-1.5">{s}</span>
            </button>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#e8e2d4] p-8 sm:p-10">
          {panels[step]}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#e8e2d4]">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-6 py-3 border border-[#d4c9a8] text-xs font-bold uppercase tracking-widest text-[#666] hover:border-[#B5922A] hover:text-[#B5922A] transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Back
            </button>

            {step < auditionFormSteps.length - 1 ? (
              <button
                onClick={() =>
                  setStep((s) =>
                    Math.min(auditionFormSteps.length - 1, s + 1)
                  )
                }
                className="px-8 py-3 bg-[#B5922A] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#9a7a22] transition active:scale-95"
              >
                Continue →
              </button>
            ) : (
              <div className="flex flex-col items-end gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!allVerified || isSubmitting}
                  className="px-8 py-3 bg-[#1a1a2e] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#2a2a4e] transition active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting && (
                    <svg className="animate-spin w-3 h-3 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                  )}
                  {isSubmitting ? "Submitting…" : "Submit Application"}
                </button>
                {submitError && (
                  <p className="text-[11px] text-red-500 font-medium max-w-xs text-right">
                    ⚠ {submitError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-[10px] text-[#bbb] mt-6 tracking-widest uppercase">
          Step {step + 1} of {auditionFormSteps.length} —{" "}
          {auditionFormSteps[step]}
        </p>
      </div>
    </main>
  );
}
