import Link from "next/link";

const API_BASE = "https://admin.cinevestor.in";
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
function imageUrl(path: string | null): string {
  if (!path) return "/images/vithal-vision-studio.png2.png";
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// ── Page (Server Component) ───────────────────────────────────────────────────
export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let allBlogs: ApiBlog[] = [];

  try {
    const res = await fetch(API_URL, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      allBlogs = Array.isArray(data) ? data : [];
    }
  } catch {
    // handled below
  }

  const blog   = allBlogs.find((b) => b.id === Number(id)) ?? null;
  const others = allBlogs.filter((b) => b.id !== Number(id) && b.status === "published").slice(0, 3);

  if (!blog) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "#FAF8F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4A14A", marginBottom: "16px" }}>
            Vithal Visions
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", color: "#1A1A2E", marginBottom: "24px" }}>
            Article Not Found
          </h1>
          <Link
            href="/blog"
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#C4A14A", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", borderBottom: "1px solid #C4A14A", paddingBottom: "2px" }}
          >
            ← Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#FAF8F5",
        fontFamily: "'Inter', sans-serif",
        color: "#1A1A2E",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #C4A14A;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: gap 0.2s ease;
        }
        .back-link:hover { gap: 14px; }

        .related-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .related-card:hover .related-card-img { transform: scale(1.04); }
        .related-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #C4A14A;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          padding-bottom: 2px;
          transition: border-color 0.2s;
        }
        .related-link:hover { border-color: #C4A14A; }
        .related-card { transition: box-shadow 0.3s ease; }
        .related-card:hover { box-shadow: 0 8px 32px rgba(26,26,46,0.13) !important; }

        /* Rich text content styles */
        .blog-content h1, .blog-content h2, .blog-content h3 {
          font-family: 'Playfair Display', serif;
          color: #1A1A2E;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }
        .blog-content h1 { font-size: clamp(1.6rem, 3vw, 2.2rem); }
        .blog-content h2 { font-size: clamp(1.3rem, 2.5vw, 1.7rem); }
        .blog-content h3 { font-size: 1.15rem; }
        .blog-content p  { font-size: 1rem; line-height: 1.85; color: #4A4A5A; margin-bottom: 1.25rem; }
        .blog-content ol, .blog-content ul { margin-left: 1.5rem; margin-bottom: 1.25rem; color: #4A4A5A; }
        .blog-content li { margin-bottom: 0.4rem; line-height: 1.7; font-size: 0.97rem; }
        .blog-content blockquote { border-left: 3px solid #C4A14A; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: #6B6B6B; }
        .blog-content a { color: #C4A14A; text-decoration: underline; }
        .blog-content strong { font-weight: 700; color: #1A1A2E; }

        @media (max-width: 768px) {
          .hero-img        { height: 260px !important; }
          .article-body    { padding: 40px 24px 60px !important; }
          .breadcrumb-bar  { padding: 20px 24px !important; }
          .related-grid    { grid-template-columns: 1fr !important; }
          .related-section { padding: 48px 24px !important; }
        }
      `}</style>

      {/* ── Breadcrumb Bar ── */}
      <div
        className="breadcrumb-bar"
        style={{ padding: "24px 80px", borderBottom: "1px solid #E8E2D9", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}
      >
        <Link href="/blog" className="back-link">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 7H2M6 3L2 7l4 4" stroke="#C4A14A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          All Articles
        </Link>
        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4A14A" }}>
          Vithal Visions Private Limited
        </p>
      </div>

      {/* ── Hero Image ── */}
      <div
        className="hero-img"
        style={{ width: "100%", height: "500px", overflow: "hidden", position: "relative" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl(blog.featuredImage)}
          alt={blog.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(26,26,46,0.6) 100%)" }} />
      </div>

      {/* ── Article Body ── */}
      <div
        className="article-body"
        style={{ maxWidth: "780px", margin: "0 auto", padding: "64px 24px 80px" }}
      >
        {/* Category / tags */}
        <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C4A14A", marginBottom: "12px" }}>
          {blog.cateries?.join(" · ") || "Film Production · Media Technology"}
        </p>

        {/* Author + date */}
        {blog.author && (
          <p style={{ fontSize: "0.78rem", color: "#aaa", letterSpacing: "0.06em", marginBottom: "20px" }}>
            By {blog.author} &nbsp;·&nbsp; {formatDate(blog.dateCreated)}
          </p>
        )}

        {/* Title */}
        <h1
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, lineHeight: 1.15, color: "#1A1A2E", marginBottom: "32px" }}
        >
          {blog.title}
        </h1>

        {/* Gold rule */}
        <div style={{ height: "2px", width: "60px", background: "linear-gradient(90deg, #C4A14A, #E8D08A)", marginBottom: "40px" }} />

        {/* Rich HTML content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Bottom divider + back link */}
        <div style={{ marginTop: "64px", height: "1px", background: "#E8E2D9" }} />
        <div style={{ marginTop: "36px" }}>
          <Link href="/blog" className="back-link">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M6 3L2 7l4 4" stroke="#C4A14A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to All Articles
          </Link>
        </div>
      </div>

      {/* ── Related Articles ── */}
      {others.length > 0 && (
        <section
          className="related-section"
          style={{ padding: "64px 80px", borderTop: "1px solid #E8E2D9", backgroundColor: "#fff" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "40px" }}>
            <p style={{ fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "#1A1A2E", flexShrink: 0 }}>
              More Articles
            </p>
            <div style={{ flex: 1, height: "1px", background: "#E8E2D9" }} />
          </div>

          <div
            className="related-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px" }}
          >
            {others.map((other) => (
              <Link key={other.id} href={`/blog/${other.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <article
                  className="related-card"
                  style={{ background: "#FAF8F5", overflow: "hidden", boxShadow: "0 1px 12px rgba(26,26,46,0.06)", display: "flex", flexDirection: "column", height: "100%" }}
                >
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="related-card-img" src={imageUrl(other.featuredImage)} alt={other.title} />
                  </div>
                  <div style={{ padding: "24px 24px 28px", borderTop: "2px solid #F0EAE0", display: "flex", flexDirection: "column", flex: 1, gap: "16px" }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.35, color: "#1A1A2E", flex: 1 }}>
                      {other.title}
                    </h3>
                    <span className="related-link">
                      Read Article
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 6h10M7 2l4 4-4 4" stroke="#C4A14A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}