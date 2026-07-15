import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1400&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-white/90" />
      {/* Gold accent line top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Have a project idea?
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Let&apos;s bring it to life together.
        </p>
        <Link
          href="/contact"
          className="btn-gold px-10 py-4 text-sm rounded-sm uppercase tracking-widest inline-block"
        >
          Get In Touch
        </Link>
      </div>

      {/* Gold accent line bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
    </section>
  );
}
