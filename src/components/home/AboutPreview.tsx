import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div>
            <p className="eyebrow mb-4">About Vithal Vision</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 gold-underline">
              We Create. We Innovate. We Inspire.
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Vithal Visions Private Limited is a media and technology company driven by creativity. Innovation and a passion for storytelling. From films to virtual production, we build experiences that connect, entertain and empower.
            </p>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Based in Gondia, Maharashtra, we blend the art of filmmaking with cutting-edge technology to create content that resonates with audiences across platforms.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-7 py-3 text-sm rounded-sm uppercase tracking-widest hover:bg-gray-700 transition-colors duration-200"
            >
              Know More About Us
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
              <img
                src="/images/vithal-visionabout.png.jpeg"
                alt="Vithal Vision Studio"
                className="w-full h-full object-cover"
              />
              {/* Gold border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-transparent" />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-5 shadow-2xl border border-gray-100 hidden sm:block">
              <div className="text-gold font-display text-3xl font-bold">5+</div>
              <div className="text-gray-600 text-xs tracking-widest uppercase mt-1">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
