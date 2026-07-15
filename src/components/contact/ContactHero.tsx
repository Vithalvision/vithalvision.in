import Link from "next/link";

export default function ContactHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-white/85" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow mb-4">Contact Us</p>
        <h1 className="font-display text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Let&apos;s Connect
        </h1>
        <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gold">Contact Us</span>
        </div>
      </div>
    </section>
  );
}
