import Link from "next/link";
import { projects } from "@/data";
import { FaSpotify, FaYoutube, FaAmazon } from "react-icons/fa";
import PreviousWorksSlider from "@/components/PreviousWorksSlider"; // 👈 adjust path as needed

export default function ProjectsPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* Hero Banner */}
      <section
        className="relative w-full h-[340px] flex items-center justify-center"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&w=1400&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/60" />
        <div className="relative z-10 text-center">
          <p className="eyebrow mb-3 text-gold tracking-widest uppercase text-sm font-semibold">
            Our Portfolio
          </p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-gray-900">
            Upcoming Projects
          </h1>
          <p className="mt-4 text-gray-500 text-sm">
            <Link href="/" className="hover:text-gold transition">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gold">Projects</span>
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-16">

        {/* Subtitle */}
        <div className="text-center mb-16">
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our creative work in filmmaking, music videos,
            storytelling, and visual productions crafted by Vithal Vision.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <Link key={project.id} href={project.link || "#"}>
              <div className="group bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-gold text-black px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h2>
                  <p className="text-gray-500 text-sm uppercase tracking-wider">{project.genre}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── NEW: Previous Works Video Slider ─────────────────────────────── */}
        <PreviousWorksSlider />
        {/* ─────────────────────────────────────────────────────────────────── */}

        {/* Platforms Section */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3">Our Journey</p>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 gold-underline">
              Listen & Watch Our Work
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Explore our projects on different streaming platforms.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 text-4xl">
            <a href="https://www.youtube.com/results?search_query=vithal+vision" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition text-red-600">
              <FaYoutube />
            </a>
            <a href="https://open.spotify.com/artist/6RZAU9SA9r2QDJ0Ey2d1Tf?si=-OCYU31wQT-Z8d53HqjePg" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition text-green-500">
              <FaSpotify />
            </a>
            <a href="https://music.amazon.in/search/kamal+meshram?filter=IsLibrary%7Cfalse&sc=none" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition text-black">
              <FaAmazon />
            </a>
            <a href="https://www.saavn.com/s/artist/kamal-meshram-albums/lrd1e8yl7ns_" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
              <img src="https://seeklogo.com/images/J/jio-saavn-logo-7E0C3F2A8C-seeklogo.com.png" alt="JioSaavn" className="w-12 h-12" />
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
