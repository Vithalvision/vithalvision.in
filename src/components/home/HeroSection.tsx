import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1535016120720-40c646be5580?w=1600&q=80')`,
        }}
      />
      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />

      {/* Gold film grain subtle overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="eyebrow mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Vithal Visions Private Limited
          </p>

          {/* Headline */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <span className="text-gray-900">Creating Stories, CI-TEST</span>
            <br />
            <span className="text-gray-900">Building Technology,</span>
            <br />
            <span className="text-gold-gradient">Empowering Creators.</span>
          </h1>

          {/* Subheading */}
          <p
            className="text-gray-600 text-lg lg:text-xl leading-relaxed max-w-xl mb-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            A film production and media-tech company driven by creativity, innovation and a passion for storytelling.
          </p>

          {/* Dividers */}
          <div
            className="flex items-center gap-2 mb-8 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <span className="text-gold/60 text-xs tracking-widest uppercase">Film Production</span>
            <span className="text-gold/40">·</span>
            <span className="text-gold/60 text-xs tracking-widest uppercase">Virtual Production</span>
            <span className="text-gold/40">·</span>
            <span className="text-gold/60 text-xs tracking-widest uppercase">Media Technology</span>
          </div>

          {/* Buttons */}
          <div
            className="flex flex-wrap gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <Link
              href="/#projects"
              className="btn-gold px-7 py-3 text-sm rounded-sm uppercase tracking-widest inline-flex items-center gap-2"
            >
              Explore Projects
            </Link>
            <Link
              href="/contact"
              className="btn-outline-gold px-7 py-3 text-sm rounded-sm uppercase tracking-widest inline-flex items-center gap-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
