const mvv = [
  {
    title: "Mission",
    icon: "🎯",
    description:
      "To tell meaningful stories, adopt new technologies, and empower creators by building a world-class media and technology ecosystem.",
    points: ["Impactful storytelling", "Technology adoption", "Creator empowerment"],
  },
  {
    title: "Vision",
    icon: "🔭",
    description:
      "To be a leading media-tech company in India and beyond, known for creativity, innovation and positive impact across films and digital media.",
    points: ["National recognition", "International reach", "Innovation-first culture"],
  },
  {
    title: "Core Values",
    icon: "💎",
    description:
      "Innovation, Transparency, Community, Creativity, Integrity, and Passion — these values shape every decision, every story, every frame we produce.",
    points: ["Innovation & Transparency", "Community & Creativity", "Integrity & Passion"],
  },
];

const WHY_WE_EXIST = [
  "Stories are universal — talent can come from anywhere.",
  "Cinema should be accessible — not only for big studios but for passionate creators and supporters.",
  "Contribution should be transparent — with clarity, updates, and potential profit participation.",
  "Filmmaking should be a community experience — not an isolated journey.",
];

export default function MissionVisionValues() {
  return (
    <>
      {/* Mission / Vision / Values Cards */}
      <section className="section-padding bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">What Drives Us</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 gold-underline-center">
              Our Mission, Vision &amp; Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mvv.map((item) => (
              <div
                key={item.title}
                className="bg-dark-card border border-dark-border p-8 card-hover group"
              >
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-4 group-hover:text-gold transition-colors duration-200">
                  {item.title}
                </h3>
                <div className="w-8 h-px bg-gold mb-5" />
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
                <ul className="space-y-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-gray-500 text-xs">
                      <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4">Our Purpose</p>
            <h2 className="font-display text-4xl font-bold text-gray-900 gold-underline-center">
              Why Vithal Visions Exists
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHY_WE_EXIST.map((point, i) => (
              <div
                key={i}
                className="flex gap-4 items-start bg-dark-card border border-dark-border p-5 card-hover"
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-gray-600 text-sm leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Associations */}
      <section className="section-padding bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">Our Associations</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 gold-underline-center">
              Institutional Associations &amp; Support
            </h2>
            <p className="text-gray-600 text-base max-w-2xl mx-auto mt-8">
              Vithal Visions is supported, guided, and strengthened through associations
              with India&apos;s top entrepreneurial and innovation organizations.
            </p>
          </div>

          {/* IICT Featured Card */}
          <div className="bg-white border border-gold/20 p-6 md:p-8 mb-10 card-hover">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              Government-Backed Institution
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Logo */}
              <div className="shrink-0 flex flex-col items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about/iict.png"
                  alt="IICT"
                  className="w-24 h-24 object-contain"
                />
                <span className="text-xs font-semibold text-gray-500 tracking-wide">IICT, Mumbai</span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
                  Indian Institute of Creative Technologies (IICT)
                </h3>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  The Indian Institute of Creative Technologies (IICT) is a premier
                  government-backed institution in Mumbai, India, dedicated to advancing
                  education in Animation, VFX, Gaming, Comics, and Extended Reality
                  (AVGC-XR). It operates as a national &quot;Lighthouse Institute,&quot; functioning
                  on a public-private partnership (PPP) model — a landmark association that
                  positions Vithal Visions at the intersection of cinema, technology, and
                  government-led creative innovation.
                </p>
                <ul className="space-y-2">
                  {[
                    "Premier government-backed institution in Mumbai, India",
                    "Dedicated to Animation, VFX, Gaming, Comics & Extended Reality (AVGC-XR)",
                    "Operates as a national \"Lighthouse Institute\"",
                    "Functions on a Public-Private Partnership (PPP) model",
                  ].map((point) => (
                    <li key={point} className="flex items-center gap-2 text-gray-600 text-sm">
                      <span className="w-1 h-1 bg-gold rounded-full shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Institution Logo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {[
              { src: "/images/about/tie.jpg", alt: "TiE Nagpur", name: "TiE Nagpur", desc: "Entrepreneurs and mentors shaping our growth strategy." },
              { src: "/images/about/wadhwani.webp", alt: "Wadhwani Foundation", name: "Wadhwani Foundation", desc: "Support in business excellence and scaling frameworks." },
              { src: "/images/about/ciif.png", alt: "CIIF", name: "Chitkara Innovation Incubation Foundation", desc: "Guidance on technology and innovation-driven growth." },
              { src: "/images/about/amity.jpg", alt: "Amity Innovation Center", name: "Amity Innovation Center", desc: "Support for tech platform and market positioning." },
              { src: "/images/about/maccia.jpeg", alt: "MACCIA", name: "MACCIA", desc: "Maharashtra Chamber of Commerce — industry networks and policy advocacy." },
            ].map(({ src, alt, name, desc }) => (
              <div key={name} className="bg-white border border-gray-100 p-5 card-hover text-center flex flex-col items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={alt} className="w-16 h-16 object-contain" />
                <h4 className="font-display text-sm font-bold text-gray-900">{name}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
