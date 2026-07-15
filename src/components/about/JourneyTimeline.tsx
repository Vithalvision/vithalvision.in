import Link from "next/link";
import { timeline } from "@/data";

export default function JourneyTimeline() {
  return (
    <>
      {/* Timeline */}
      <section className="section-padding bg-dark-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow mb-4">Our Journey</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 gold-underline-center">
              Milestones That Shaped Our Path
            </h2>
            <p className="text-gray-600 text-base max-w-xl mx-auto mt-8">
              From its inception, Vithal Visions has been shaped by India&apos;s growing
              entrepreneurship ecosystem and the unwavering support of institutions and mentors.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="hidden md:block relative">
            <div className="absolute top-10 left-0 right-0 h-px bg-gray-200" />
            <div className="absolute top-10 left-0 w-full h-px bg-gradient-to-r from-gold via-gold-light to-gold/30" />
            <div className="grid grid-cols-5 gap-4">
              {timeline.map((item) => (
                <div key={item.year + item.title} className="flex flex-col items-center text-center">
                  <div className="relative z-10 w-5 h-5 rounded-full bg-gold border-4 border-gray-100 mb-6" />
                  <div className="text-gold font-display font-bold text-2xl mb-2">{item.year}</div>
                  <div className="text-gray-900 font-semibold text-sm mb-2">{item.title}</div>
                  <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden relative pl-6">
            <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-8">
              {timeline.map((item) => (
                <div key={item.year + item.title} className="relative">
                  <div className="absolute -left-[19px] top-1 w-4 h-4 rounded-full bg-gold border-4 border-gray-100" />
                  <div className="text-gold font-bold text-lg mb-1">{item.year}</div>
                  <div className="text-gray-900 font-semibold text-sm mb-1">{item.title}</div>
                  <p className="text-gray-600 text-xs leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4">Mentorship</p>
          <h2 className="font-display text-4xl font-bold text-gray-900 gold-underline-center mb-8">
            Powered by Industry Experts
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="text-gray-600 text-base leading-relaxed">
            Across filmmaking, technology, finance, and business strategy — Vithal Visions
            has been mentored by renowned experts ensuring a robust, ethical, and scalable
            business model that stands the test of time.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dark-card border-t border-gold/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="eyebrow mb-4">Work With Us</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 gold-underline-center mb-8">
            Ready to Create Something Extraordinary?
          </h2>
          <div className="w-12 h-px bg-gold mx-auto mb-8" />
          <p className="text-gray-600 text-base leading-relaxed mb-10">
            Partner with Vithal Visions for your next film, OTT project, or virtual
            production. Our team is ready to bring your story to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn-gold px-8 py-3 text-sm tracking-widest uppercase inline-block"
            >
              Get In Touch
            </Link>
            <Link
              href="/projects"
              className="btn-outline-gold px-8 py-3 text-sm tracking-widest uppercase inline-block"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
