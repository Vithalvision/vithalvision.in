import { Film, Monitor, Scissors, Music, Users, Globe } from "lucide-react";
import { services } from "@/data";

const iconMap: Record<string, React.ReactNode> = {
  Film: <Film size={28} className="text-gold" />,
  Monitor: <Monitor size={28} className="text-gold" />,
  Scissors: <Scissors size={28} className="text-gold" />,
  Music: <Music size={28} className="text-gold" />,
  Users: <Users size={28} className="text-gold" />,
  Globe: <Globe size={28} className="text-gold" />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Our Services</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 leading-tight gold-underline-center">
            What We Do
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-dark-card border border-dark-border p-7 card-hover cursor-default"
            >
              <div className="mb-5 w-14 h-14 border border-dark-border rounded-sm flex items-center justify-center group-hover:border-gold/40 transition-colors duration-300">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-gray-900 font-semibold text-lg mb-3 group-hover:text-gold transition-colors duration-200">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
