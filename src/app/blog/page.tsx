import Link from "next/link";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://admin.cinevestor.in";
const API_URL  = `${API_BASE}/api/get-blogs`;

// ── Types ─────────────────────────────────────────────────────────────────────
type ApiBlog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  meta_description: string;
  status: string;
  featuredImage: string | null;
  author: string;
  dateCreated: string;
  cateries: string[];
  tags: string[];
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(content: string, max = 140): string {
  const plain = stripHtml(content);
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
}

function imageUrl(path: string | null): string {
  if (!path) return "/images/vithal-vision-studio.png2.png";
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ── Page (Server Component — fetches at request time) ─────────────────────────
export default async function BlogsPage() {
  let blogs: ApiBlog[] = [];
  let error = "";

  try {
    const res = await fetch(API_URL, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const data = await res.json();
    blogs = Array.isArray(data) ? data.filter((b: ApiBlog) => b.status === "published") : [];
  } catch (err: any) {
    error = err?.message ?? "Failed to load blogs";
  }

  const featured = blogs[0] ?? null;
  const rest     = blogs.slice(1);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF8F5",
        fontFamily: "'Inter', sans-serif",
        color: "#1A1A2E",
      }}
    >
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .blog-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .featured-card:hover .blog-hero-img { transform: scale(1.03); }
        .blog-card:hover .blog-card-img     { transform: scale(1.04); }
        .blog-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .read-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #C4A14A;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
          transition: border-color 0.2s;
        }
        .read-link:hover { border-color: #C4A14A; }
        .read-link-dark  { color: #C4A14A; }
        .blog-card { transition: box-shadow 0.3s ease; }
        .blog-card:hover { box-shadow: 0 8px 32px rgba(26,26,46,0.13) !important; }

        @media (max-width: 768px) {
          .featured-grid   { flex-direction: column !important; }
          .featured-img-wrap { height: 260px !important; width: 100% !important; }
          .cards-grid      { grid-template-columns: 1fr !important; }
          .page-header     { padding: 60px 24px 40px !important; }
          .section-wrap    { padding: 0 24px 80px !important; }
        }
      `}</style>

      {/* ── Page Header ── */}
      <header
        className="page-header"
        style={{ padding: "80px 80px 52px", borderBottom: "1px solid #E8E2D9" }}
      >
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4A14A", marginBottom: "16px" }}>
          Vithal Visions Private Limited
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 700, lineHeight: 1.1, color: "#1A1A2E", maxWidth: "520px" }}>
            Stories &amp; Insights
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "#6B6B6B", maxWidth: "320px", lineHeight: 1.65, paddingBottom: "6px" }}>
            Perspectives on film production, media technology, and the craft of visual storytelling.
          </p>
        </div>
        <div style={{ marginTop: "36px", height: "2px", width: "60px", background: "linear-gradient(90deg, #C4A14A, #E8D08A)" }} />
      </header>

      <div className="section-wrap" style={{ padding: "0 80px 100px" }}>

        {/* ── Error state ── */}
        {error && (
          <div style={{ paddingTop: "56px", textAlign: "center" }}>
            <p style={{ color: "#C4A14A", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ⚠ Could not load articles — {error}
            </p>
          </div>
        )}

        {/* ── Empty state ── */}
        {!error && blogs.length === 0 && (
          <div style={{ paddingTop: "80px", textAlign: "center" }}>
            <p style={{ color: "#aaa", fontSize: "0.82rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              No published articles yet.
            </p>
          </div>
        )}

        {/* ── Featured Post ── */}
        {featured && (
          <section style={{ paddingTop: "56px", marginBottom: "72px" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4A14A", marginBottom: "20px" }}>
              Featured
            </p>

            <Link href={`/blog/${featured.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div
                className="featured-card"
                style={{ display: "flex", gap: "0", background: "#fff", overflow: "hidden", boxShadow: "0 2px 24px rgba(26,26,46,0.07)", cursor: "pointer" }}
              >
                {/* Image */}
                <div
                  className="featured-img-wrap"
                  style={{ flexShrink: 0, width: "52%", height: "420px", overflow: "hidden", position: "relative" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="blog-hero-img"
                    src={imageUrl(featured.featuredImage)}
                    alt={featured.title}
                  />
                </div>

                {/* Content */}
                <div style={{ flex: 1, padding: "48px 52px", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "3px solid #C4A14A" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C4A14A", marginBottom: "12px" }}>
                    {featured.cateries?.join(" · ") || "Film Production · Media Tech"}
                  </p>
                  {featured.author && (
                    <p style={{ fontSize: "0.72rem", color: "#aaa", letterSpacing: "0.08em", marginBottom: "20px" }}>
                      By {featured.author} &nbsp;·&nbsp; {formatDate(featured.dateCreated)}
                    </p>
                  )}
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 700, lineHeight: 1.2, color: "#1A1A2E", marginBottom: "20px" }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize: "0.93rem", color: "#6B6B6B", lineHeight: 1.7, marginBottom: "36px" }}>
                    {featured.meta_description || excerpt(featured.content)}
                  </p>
                  <span className="read-link read-link-dark">
                    Read Article
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="#C4A14A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── Divider ── */}
        {rest.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "48px" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A1A2E", flexShrink: 0 }}>
              All Articles
            </p>
            <div style={{ flex: 1, height: "1px", background: "#E8E2D9" }} />
          </div>
        )}

        {/* ── Cards Grid ── */}
        {rest.length > 0 && (
          <div
            className="cards-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}
          >
            {rest.map((blog, i) => (
              <Link key={blog.id} href={`/blog/${blog.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <article
                  className="blog-card"
                  style={{ background: "#fff", overflow: "hidden", boxShadow: "0 1px 12px rgba(26,26,46,0.06)", display: "flex", flexDirection: "column", height: "100%", cursor: "pointer" }}
                >
                  {/* Image */}
                  <div style={{ height: "200px", overflow: "hidden", position: "relative" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="blog-card-img"
                      src={imageUrl(blog.featuredImage)}
                      alt={blog.title}
                    />
                    <span style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(196,161,74,0.92)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", padding: "4px 10px" }}>
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", flex: 1, borderTop: "2px solid #F0EAE0" }}>
                    {blog.author && (
                      <p style={{ fontSize: "0.68rem", color: "#aaa", letterSpacing: "0.08em", marginBottom: "10px" }}>
                        {blog.author} · {formatDate(blog.dateCreated)}
                      </p>
                    )}
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", fontWeight: 600, lineHeight: 1.3, color: "#1A1A2E", marginBottom: "12px" }}>
                      {blog.title}
                    </h3>
                    <p style={{ fontSize: "0.86rem", color: "#6B6B6B", lineHeight: 1.65, flex: 1, marginBottom: "24px" }}>
                      {blog.meta_description || excerpt(blog.content)}
                    </p>
                    <span className="read-link">
                      Read More
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6h10M7 2l4 4-4 4" stroke="#C4A14A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}