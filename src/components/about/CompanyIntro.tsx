export default function CompanyIntro() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Text */}
          <div>
            <p className="eyebrow mb-4">Who We Are</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              Vithal Visions Private Limited
            </h2>
            <p className="text-gold text-sm tracking-wide mb-6">
              Film Production, Virtual Production &amp; Media-Tech Company.
            </p>
            <div className="w-12 h-px bg-gold mb-6" />

            <p className="text-gray-600 leading-relaxed mb-4">
              At Vithal Visions, we are more than just a film company — we are a community
              of storytellers, innovators, and creators dedicated to bringing captivating
              stories to the screen.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              At the heart of our vision is a commitment to democratizing the filmmaking
              process. We believe that great stories can come from anywhere, and by
              combining creativity with cutting-edge technology, we empower storytellers to
              transform their visions into reality.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              From concept to screen, from studio to stream — Vithal Visions is where
              creativity meets technology to produce impactful stories that transcend borders.
            </p>

            {/* Transparency note */}
            <div className="border-l-4 border-gold bg-gold/5 p-4 rounded-r-sm">
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold text-gray-900">A note of transparency: </span>
                Vithal Visions is in its early growth phase. We&apos;re building our
                first cohort of collaborators with full transparency and personal
                support from our founding team.
              </p>
            </div>

            {/* Pillars */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { label: "Our Mission", text: "To tell meaningful stories, adopt new technologies and empower creators." },
                { label: "Our Vision", text: "To be a leading media-tech company known for creativity, innovation and impact." },
                { label: "Our Values", text: "Creativity. Integrity. Collaboration. Continuous Growth." },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="w-8 h-8 border border-gold/30 rounded-sm flex items-center justify-center mx-auto mb-3">
                    <div className="w-2 h-2 bg-gold rounded-full" />
                  </div>
                  <div className="text-gray-900 font-semibold text-sm mb-2">{item.label}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-sm aspect-[4/3] bg-gray-200">
              <img
                src="/images/vithal-vision-studio.png2.png"
                alt="Vithal Visions Studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-transparent" />
          </div>

        </div>
      </div>
    </section>
  );
}
