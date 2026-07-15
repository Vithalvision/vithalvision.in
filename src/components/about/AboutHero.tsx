import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1400&q=80)",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-white/85" />

      {/* Bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow mb-4">About Us</p>

        <h1 className="font-display text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
          About Vithal Visions
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
          Where cinematic dreams come to life through innovative storytelling
          and cutting-edge production technology.
        </p>

        <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
          <Link href="/" className="hover:text-gold transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gold">About Us</span>
        </div>
      </div>

    </section>
  );
}