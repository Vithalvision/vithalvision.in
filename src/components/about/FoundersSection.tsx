import { Facebook, Instagram, Linkedin } from "lucide-react";
import { founders } from "@/data";

export default function FoundersSection() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Our Founders</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 gold-underline-center">
            The Minds Behind Vithal Visions
          </h2>
          <p className="text-gray-600 text-base max-w-2xl mx-auto mt-8">
            Cinevestor is the story of a dream that started in Tirora, a small town in
            Maharashtra — and grew into a movement to democratize filmmaking in India.
            Founded by <strong>Kamal Meshram</strong> and{" "}
            <strong>Puja Kamal Meshram</strong>, Vithal Visions is dedicated to bringing
            stories to life through creativity, technology, and community.
          </p>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {founders.map((founder) => (
            <div
              key={founder.id}
              className="group bg-gray-50 border border-gray-100 p-6 card-hover flex flex-col gap-5"
            >
              {/* Photo */}
              <div className="flex gap-5 items-start">
                <div className="shrink-0">
                  <div className="w-28 h-36 overflow-hidden bg-gray-200 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                  </div>
                </div>

                {/* Name & Roles */}
                <div className="flex flex-col justify-between h-36">
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                      {founder.name}
                    </h3>
                    <ul className="space-y-1.5 mb-4">
                      {founder.roles.map((role) => (
                        <li key={role} className="flex items-center gap-2 text-gray-600 text-sm">
                          <span className="w-1 h-1 bg-gold rounded-full" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Social */}
                  <div className="flex items-center gap-3">
                    <a href={founder.social.facebook} className="text-gray-400 hover:text-gold transition-colors">
                      <Facebook size={14} />
                    </a>
                    <a href={founder.social.instagram} className="text-gray-400 hover:text-gold transition-colors">
                      <Instagram size={14} />
                    </a>
                    <a
                      href={founder.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gold transition-colors"
                    >
                      <Linkedin size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="w-full h-px bg-gray-200" />
              <p className="text-gray-600 text-sm leading-relaxed">
                {"bio" in founder ? (founder as typeof founder & { bio: string }).bio : ""}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
