import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Cinevestor | Vithal Visions Pvt Ltd",
  description:
    "Read the Terms & Conditions for using Cinevestor.in, operated by Vithal Visions Private Limited.",
};

const refundRows = [
  {
    scenario: "No project progress within 140 days",
    policy: "Full refund to contributors",
  },
  {
    scenario: "Project cancellation by filmmaker",
    policy: "Pro-rata refund after applicable deductions",
  },
  {
    scenario: "Contributor withdrawal after investment",
    policy: "No refund (funds remain locked as per agreement)",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#faf9f7] py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B5922A] mb-3">
            Cinevestor.in · Vithal Visions Pvt Ltd
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a2e] leading-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="w-12 h-[2px] bg-[#B5922A] mb-4" />
          <p className="text-sm text-[#888]">Last updated: 2026</p>
        </div>

        <div className="flex flex-col gap-10 text-[#3a3a3a]">

          {/* 1. Definitions */}
          <Section number="01" title="Definitions">
            <dl className="flex flex-col gap-4">
              {[
                ["Platform", "Refers to Cinevestor.in website and all associated services operated by Vithal Visions Pvt Ltd."],
                ["Contributor", "Any individual or organization providing financial contributions to film projects on the platform."],
                ["Filmmaker", "Project owners registered on the platform who create and manage film projects."],
                ["Talent", "Actors, technicians, and other creative professionals hired through the platform."],
              ].map(([term, def]) => (
                <div key={term} className="border-l-2 border-[#d4c9a8] pl-4">
                  <dt className="text-xs font-bold uppercase tracking-widest text-[#B5922A] mb-1">{term}</dt>
                  <dd className="text-sm leading-relaxed">{def}</dd>
                </div>
              ))}
            </dl>
          </Section>

          {/* 2. Eligibility */}
          <Section number="02" title="Eligibility & Registration">
            <SubSection title="2.1 User Requirements">
              <p className="text-sm leading-relaxed mb-3">To use the platform, users must:</p>
              <ul className="flex flex-col gap-2">
                {[
                  "Be at least 18 years of age",
                  "Provide accurate and verifiable KYC details (mandatory for contributions above ₹20,000)",
                  "Maintain confidentiality of account credentials and activity",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B5922A] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </SubSection>
            <SubSection title="2.2 Prohibited Users">
              <p className="text-sm leading-relaxed mb-3">The following users are not permitted to register or use the platform:</p>
              <ul className="flex flex-col gap-2">
                {[
                  "Individuals or entities previously banned for fraudulent activity",
                  "Entities listed under RBI/SEBI watchlists or any regulatory restrictions",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B5922A] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </SubSection>
          </Section>

          {/* 3. Contribution Terms */}
          <Section number="03" title="Contribution Terms">
            <SubSection title="3.1 Contributors">
              <ul className="flex flex-col gap-2">
                {[
                  "All contributions made on the platform are non-refundable, except where explicitly stated in Section 5.",
                  "Profit-sharing returns (up to 25%) are not guaranteed and depend on project performance.",
                  "Expected profit distribution timeline is 12–18 months, subject to project completion and revenue cycles.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B5922A] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </SubSection>
            <SubSection title="3.2 Filmmakers">
              <ul className="flex flex-col gap-2">
                {[
                  "Must clearly disclose all project risks and production details.",
                  "Required to submit quarterly progress reports to maintain transparency.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B5922A] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </SubSection>
          </Section>

          {/* 4. IP */}
          <Section number="04" title="Intellectual Property Rights">
            <ul className="flex flex-col gap-2">
              {[
                "All platform design, content, and branding are owned by Vithal Visions Pvt Ltd.",
                "Intellectual property rights of individual film projects remain with their respective filmmakers.",
                "By using the platform, users grant Cinevestor a royalty-free, worldwide license to use project-related content for marketing, promotion, and platform visibility.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B5922A] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* 5. Refund */}
          <Section number="05" title="Refund & Cancellation Policy">
            <div className="border border-[#e8e2d4] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1a1a2e] text-white">
                    <th className="text-left px-4 py-3 text-[10px] font-bold tracking-widest uppercase">Scenario</th>
                    <th className="text-left px-4 py-3 text-[10px] font-bold tracking-widest uppercase">Policy</th>
                  </tr>
                </thead>
                <tbody>
                  {refundRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#faf9f7]"}>
                      <td className="px-4 py-3 leading-relaxed border-t border-[#e8e2d4]">{row.scenario}</td>
                      <td className="px-4 py-3 leading-relaxed border-t border-[#e8e2d4] text-[#B5922A] font-medium">{row.policy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* 6. Dispute */}
          <Section number="06" title="Dispute Resolution">
            <ul className="flex flex-col gap-2">
              {[
                ["Mediation", "Mandatory 30-day negotiation period between parties."],
                ["Arbitration", "Final resolution will take place in Gondia, Maharashtra, India."],
                ["Governing Law", "All disputes are subject to the Indian Contract Act, 1872."],
              ].map(([label, text]) => (
                <li key={label} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-0.5 text-[10px] font-bold uppercase tracking-widest text-[#B5922A] flex-shrink-0 w-24">{label}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </Section>

          {/* 7. Liability */}
          <Section number="07" title="Limitation of Liability">
            <p className="text-sm leading-relaxed mb-3">
              Cinevestor.in and Vithal Visions Pvt Ltd shall not be held liable for:
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Financial loss due to project failure or underperformance",
                "Technical interruptions exceeding 72 hours",
                "Actions or misconduct of third-party services such as payment gateways or filmmakers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B5922A] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* 8. Termination */}
          <Section number="08" title="Termination Policy">
            <SubSection title="8.1 Account Suspension">
              <p className="text-sm leading-relaxed mb-3">Accounts may be suspended or terminated in case of:</p>
              <ul className="flex flex-col gap-2">
                {[
                  "Fraudulent or illegal activities",
                  "Violation of platform policies",
                  "Compliance with legal or regulatory orders",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B5922A] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </SubSection>
            <SubSection title="8.2 User Rights">
              <p className="text-sm leading-relaxed">
                Users may request account deletion through their dashboard or official support channels.
              </p>
            </SubSection>
          </Section>

          {/* 9. Amendments */}
          <Section number="09" title="Amendments to Terms">
            <ul className="flex flex-col gap-2">
              {[
                "Major changes will be communicated at least 30 days in advance.",
                "Continued use of the platform after updates implies acceptance of revised terms.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#B5922A] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

        </div>

        {/* Footer note */}
        <div className="mt-16 p-6 border border-[#d4c9a8] bg-white">
          <p className="text-xs text-[#888] leading-relaxed">
            For any questions regarding these Terms &amp; Conditions, please contact us at{" "}
            <a href="mailto:info@vithalvision.in" className="text-[#B5922A] hover:underline">
              info@vithalvision.in
            </a>
            . These terms are governed by Indian law and subject to jurisdiction in Gondia, Maharashtra.
          </p>
        </div>

      </div>
    </main>
  );
}

// ── Layout helpers ────────────────────────────────────────────────────────────
function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-baseline gap-3 mb-5">
        <span className="text-[10px] font-bold tracking-widest text-[#B5922A]">{number}</span>
        <h2 className="font-serif text-xl font-bold text-[#1a1a2e]">{title}</h2>
      </div>
      <div className="border-l-2 border-[#e8e2d4] pl-6 flex flex-col gap-5">
        {children}
      </div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-[#1a1a2e] mb-3">{title}</p>
      {children}
    </div>
  );
}
