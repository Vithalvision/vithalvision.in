import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="eyebrow mb-3">Latest Projects</p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 leading-tight gold-underline">
              Discover Our Work
            </h2>
          </div>

          <Link
            href="/projects"
            className="hidden sm:flex items-center gap-1.5 text-gold text-sm hover:gap-3 transition-all duration-200 tracking-wide"
          >
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-gold text-xs tracking-widest uppercase mb-1">
                  {project.category}
                </div>

                <h3 className="text-white font-semibold text-base leading-tight">
                  {project.title}
                </h3>

                <div className="text-white/40 text-xs mt-1">
                  {project.genre}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}