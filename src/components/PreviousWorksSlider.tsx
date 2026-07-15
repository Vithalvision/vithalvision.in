"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// ─── Video data ───────────────────────────────────────────────────────────────
const videos = [
  { id: "gBWTEanvTiE", title: "La Voz",          category: "Music Video"  },
  { id: "rbUXvUg8G9U", title: "Jaan-e-Tammanah", category: "Music Video"  },
  { id: "OEeIg8ABcMs", title: "Girl Just",        category: "Music Video"  },
  { id: "A7bvdhjeO1A", title: "Premgatha",        category: "Short Film"   },
  { id: "ZEWq_fro05U", title: "Sham Ae Gham",     category: "Music Video"  },
  { id: "GVgh7flZRpg", title: "Reason I Live",    category: "Short Film"   },
];

// ─── YouTube SVG logo ─────────────────────────────────────────────────────────
// (YoutubeLogo removed – used YTBadge below instead)

// Simpler inline YouTube red logo
function YTBadge() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="14" rx="3" fill="#FF0000"/>
        <path d="M8 4L14 7L8 10V4Z" fill="white"/>
      </svg>
      <span style={{ color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: "0.03em" }}>
        YouTube
      </span>
    </div>
  );
}

// ─── Category badge colors ────────────────────────────────────────────────────
const categoryStyle: Record<string, { bg: string; color: string }> = {
  "Music Video": { bg: "#C4A14A", color: "#fff" },
  "Short Film":  { bg: "#1A1A2E", color: "#C4A14A" },
  "Documentary": { bg: "#2D6A4F", color: "#fff" },
  "Ad Film":     { bg: "#6B3FA0", color: "#fff" },
};

// ─── Single video card ────────────────────────────────────────────────────────
function VideoCard({ id, title, category }: { id: string; title: string; category: string }) {
  const [hovered, setHovered] = useState(false);

  const thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  const youtubeUrl = `https://www.youtube.com/watch?v=${id}`;
  const embedSrc   = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&loop=1&playlist=${id}`;
  const badge      = categoryStyle[category] ?? { bg: "#555", color: "#fff" };

  return (
    <a
      href={youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none", display: "block" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "16/9",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: hovered
            ? "0 12px 36px rgba(0,0,0,0.28)"
            : "0 4px 16px rgba(0,0,0,0.14)",
          cursor: "pointer",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Thumbnail */}
        <img
          src={thumbnail}
          alt={title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            opacity: hovered ? 0 : 1,
            transition: "transform 0.5s ease, opacity 0.3s ease",
          }}
        />

        {/* Dark gradient on thumbnail */}
        {!hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />
        )}

        {/* ── YouTube logo — top-left, always visible ── */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 10,
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          <YTBadge />
        </div>

        {/* ── Category badge — top-right ── */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
            background: badge.bg,
            color: badge.color,
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "3px 9px",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.2s ease",
          }}
        >
          {category}
        </div>

        {/* ── Play button ── */}
        {!hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
            className="play-overlay"
          >
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(4px)",
                border: "1.5px solid rgba(255,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="22" height="22" fill="white" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        )}

        {/* YouTube iframe on hover (muted preview) */}
        {hovered && (
          <iframe
            src={embedSrc}
            title={title}
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              border: "none",
              pointerEvents: "none",
            }}
          />
        )}

        {/* ── Title + "Watch on YouTube" bar ── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "12px 14px 10px",
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.3s ease",
          }}
        >
          <p
            style={{
              color: "#fff",
              fontSize: "13px",
              fontWeight: 600,
              margin: 0,
              marginBottom: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            Watch on YouTube ↗
          </p>
        </div>
      </div>

      {/* CSS for play overlay hover — inline workaround */}
      <style>{`
        a:hover .play-overlay { opacity: 1 !important; }
      `}</style>
    </a>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function PreviousWorksSlider() {
  return (
    <section style={{ marginTop: "96px", marginBottom: "16px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C4A14A",
            marginBottom: "12px",
          }}
        >
          Our Craft
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 700,
            color: "#1A1A2E",
            marginBottom: "14px",
          }}
        >
          Previous Works
        </h2>
        <p style={{ color: "#6B6B6B", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65, fontSize: "0.95rem" }}>
          A glimpse into the stories we have told — hover to preview, click to watch on YouTube.
        </p>
      </div>

      {/* Swiper */}
      <div style={{ position: "relative", padding: "0 8px" }}>
        <Swiper
          modules={[Navigation, A11y]}
          navigation={{ nextEl: ".pw-next", prevEl: ".pw-prev" }}
          spaceBetween={20}
          slidesPerView={1.15}
          breakpoints={{
            480:  { slidesPerView: 1.4,  spaceBetween: 20 },
            640:  { slidesPerView: 2.1,  spaceBetween: 22 },
            1024: { slidesPerView: 3.2,  spaceBetween: 24 },
            1280: { slidesPerView: 4.1,  spaceBetween: 24 },
          }}
          grabCursor
          a11y={{ prevSlideMessage: "Previous video", nextSlideMessage: "Next video" }}
          className="!overflow-visible"
        >
          {videos.map((v) => (
            <SwiperSlide key={v.id}>
              <VideoCard id={v.id} title={v.title} category={v.category} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev arrow */}
        <button
          className="pw-prev"
          aria-label="Previous"
          style={{
            position: "absolute",
            left: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" fill="none" stroke="#1A1A2E" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        {/* Next arrow */}
        <button
          className="pw-next"
          aria-label="Next"
          style={{
            position: "absolute",
            right: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" fill="none" stroke="#1A1A2E" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
  );
}