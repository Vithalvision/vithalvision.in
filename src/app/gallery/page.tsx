"use client";

import { useState, useRef, useCallback } from "react";
import {
  VideoItem,
  VideoCategory,
  videoCategories,
  videos,
  playlistUrl,
} from "@/data/index";

// ── Helpers ───────────────────────────────────────────────────────────────────
const thumb    = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytUrl    = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const embedSrc = (id: string) =>
  `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1`;

// ── YouTube Icon ──────────────────────────────────────────────────────────────
function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

// ── Video Card ────────────────────────────────────────────────────────────────
function VideoCard({ video }: { video: VideoItem }) {
  const [hovered, setHovered]         = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setIframeReady(true);
      setHovered(true);
    }, 300);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHovered(false);
    setTimeout(() => setIframeReady(false), 600);
  }, []);

  return (
    <article
      className="group relative overflow-hidden bg-black cursor-pointer"
      style={{ aspectRatio: "16/9" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={video.title}
    >
      {/* Gold border on hover */}
      <div className="absolute inset-0 z-10 border border-[#B5922A]/0 group-hover:border-[#B5922A]/70 transition-all duration-300 pointer-events-none" />

      {/* Thumbnail */}
      <img
        src={thumb(video.id)}
        alt={video.title}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
          hovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      />

      {/* Hover preview iframe */}
      {iframeReady && (
        <iframe
          src={embedSrc(video.id)}
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          title={`Preview: ${video.title}`}
          loading="lazy"
        />
      )}

      {/* Bottom overlay: title + YouTube icon */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-3 py-2.5 bg-gradient-to-t from-[#1a1a2e]/95 via-[#1a1a2e]/40 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <p className="text-white text-[11px] font-semibold tracking-wide leading-tight line-clamp-1 max-w-[78%] uppercase">
          {video.title}
        </p>
        <a
          href={ytUrl(video.id)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Watch ${video.title} on YouTube`}
          className="flex-shrink-0 ml-2 text-[#B5922A] hover:text-white transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <YouTubeIcon className="w-6 h-6" />
        </a>
      </div>

      {/* Category badge */}
      <div className="absolute top-2 left-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className={`text-[9px] font-bold tracking-widest uppercase px-2 py-1 ${
          video.category === "Music Videos"
            ? "bg-[#B5922A] text-white"
            : "bg-[#1a1a2e] text-[#B5922A] border border-[#B5922A]/60"
        }`}>
          {video.category}
        </span>
      </div>
    </article>
  );
}

// ── Main Gallery ──────────────────────────────────────────────────────────────
export default function VideoGallery() {
  const [activeCategory, setActiveCategory] = useState<VideoCategory>("All Videos");

  const filtered =
    activeCategory === "All Videos"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <section className="w-full bg-[#faf9f7] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B5922A] mb-3">
            Vithal Visions · Our Work
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-[#1a1a2e] leading-tight">
            Stories We&apos;ve<br />
            <span className="text-[#B5922A] italic">Told</span>
          </h2>
          <div className="mt-4 w-12 h-[2px] bg-[#B5922A] mx-auto" />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {videoCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-bold tracking-widest uppercase transition-all duration-200 border ${
                activeCategory === cat
                  ? "bg-[#B5922A] border-[#B5922A] text-white"
                  : "bg-transparent border-[#d4c9a8] text-[#666] hover:border-[#B5922A] hover:text-[#B5922A]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[3px] sm:gap-1">
          {filtered.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[#aaa] py-20 text-xs tracking-widest uppercase">
            No videos in this category yet.
          </p>
        )}

        {/* View full playlist CTA */}
        <div className="mt-10 text-center">
          <a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#B5922A] border border-[#B5922A] px-6 py-3 hover:bg-[#B5922A] hover:text-white transition-all duration-200"
          >
            <YouTubeIcon className="w-4 h-4" />
            View Full Playlist
          </a>
        </div>

      </div>
    </section>
  );
}
