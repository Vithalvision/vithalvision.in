import { Film, Building, Handshake, TrendingUp } from "lucide-react";

const inquiries = [
  {
    Icon: Film,
    title: "Production Inquiry",
    description: "For films, web series and video production.",
  },
  {
    Icon: Building,
    title: "Studio Inquiry",
    description: "For Virtual Production Studio bookings.",
  },
  {
    Icon: Handshake,
    title: "Partnership Inquiry",
    description: "For collaborations and business partnerships.",
  },
  {
    Icon: TrendingUp,
    title: "Investor Inquiry",
    description: "For investment and Cinevestor related queries.",
  },
];

export default function InquiryTypes() {
  return (
    <section className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="eyebrow mb-4">Inquiry Types</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 gold-underline-center">
            How Can We Help You?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {inquiries.map((item) => (
            <div
              key={item.title}
              className="group bg-dark-card border border-dark-border p-7 text-center card-hover cursor-pointer"
            >
              <div className="w-14 h-14 border border-dark-border rounded-full flex items-center justify-center mx-auto mb-5 group-hover:border-gold/50 transition-colors duration-300">
                <item.Icon size={24} className="text-gold" />
              </div>
              <h3 className="text-gray-900 font-semibold text-base mb-3 group-hover:text-gold transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-gray-600 text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
