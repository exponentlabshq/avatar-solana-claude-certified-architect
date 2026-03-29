import { StudyGuidePayPanel } from "./StudyGuidePayPanel.js";

/**
 * One-page marketing shell: hero + YouTube + character→CCA mappings + MPP pay CTA.
 */
export default function AvatarCCAHome() {
  return (
    <div style={layout.root}>
      <header style={layout.topnav}>
        <span style={layout.brand}>Avatar × CCA</span>
        <nav style={layout.nav}>
          <a href="#mappings" style={layout.navLink}>
            Character → CCA
          </a>
          <a href="#pay" style={layout.navLink}>
            Get the guide
          </a>
        </nav>
      </header>

      <section style={layout.hero} id="hero">
        <video
          style={layout.heroVideo}
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          src="/website-video-avatar.mp4"
        />
        <div style={layout.heroVideoOverlay} aria-hidden />
        <div style={layout.heroInner}>
          <span style={layout.eyebrow}>Claude Certified Architect Edition</span>
          <h1 style={layout.heroTitle}>
            <span style={layout.heroTitleWhite}>Avatar:</span>{" "}
            <span style={layout.heroTitleOrange}>The Last Airbender</span>
          </h1>
          <div style={layout.heroCtas}>
            <a href="#pay" style={layout.btnPrimary}>
              Unlock master reference (0.1 SOL testnet)
            </a>
          </div>
        </div>
      </section>

      <section style={layout.videoSection} id="video" aria-label="YouTube video">
        <div style={layout.youtubeOuter}>
          <div style={layout.youtubeWrap}>
            <iframe
              style={layout.youtubeIframe}
              src="https://www.youtube.com/embed/ir7Pj1yEjqk?si=vR_sj6xGCjA6WrHk"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section style={layout.section} id="mappings" aria-labelledby="mappings-h">
        <div style={layout.sectionHead}>
          <span style={layout.label}>Reference</span>
          <h2 id="mappings-h" style={layout.h2}>
            The Character to CCA Mappings
          </h2>
          <p style={layout.sectionLead}>
            Structural isomorphisms from the master guide — character, CCA concept, and four-cause role.
          </p>
        </div>
        <div style={layout.mappingsGrid}>
          {CHARACTER_CCA.map((row) => (
            <article key={row.character} style={layout.card}>
              <div style={layout.cardImageAspect}>
                <div style={layout.cardImageInner}>
                  <img
                    src={row.imageSrc}
                    alt={row.character}
                    style={layout.cardImage}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div style={layout.cardContent}>
                <h3 style={layout.cardTitle}>{row.character}</h3>
                <p style={layout.cardMeta}>{row.role}</p>
                <code style={layout.cardCode}>{row.concept}</code>
                <p style={layout.cardBody}>{row.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={layout.sectionPay} id="pay">
        <StudyGuidePayPanel variant="embedded" />
      </section>
    </div>
  );
}

/** Condensed from `avatar-the-last-airbender-master.md` — Characters to CCA Concepts Mapping. */
const CHARACTER_CCA: {
  character: string;
  /** Served from `public/avatar-characters/` (`*-square.png` titled art). */
  imageSrc: string;
  concept: string;
  role: string;
  blurb: string;
}[] = [
  {
    character: "Aang",
    imageSrc: "/avatar-characters/aang-square.png",
    concept: "agentic_loop_coordinator",
    role: "All four causes in one entity",
    blurb:
      "The only entity invoking all element-types at once — maps to the coordinator that can invoke all tool-types. Avatar State = max capability with terminal risk when telos is absent.",
  },
  {
    character: "Iroh",
    imageSrc: "/avatar-characters/uncleiroh-square.png",
    concept: "system_prompt_constituting_ground",
    role: "Formal cause embodiment",
    blurb:
      "Second-order pedagogy: constitutes conditions from which right action emerges without specifying first-order steps — like CLAUDE.md constituting what Claude is.",
  },
  {
    character: "Zuko",
    imageSrc: "/avatar-characters/zuko-square.png",
    concept: "agent_correcting_from_arthas_antipattern",
    role: "Formal cause corrupted → actualized",
    blurb:
      "Arc from rage-driven firebending to life-energy firebending — correction of formal cause, not technique alone.",
  },
  {
    character: "Toph",
    imageSrc: "/avatar-characters/toph-square.png",
    concept: "structured_output_tool_schemas",
    role: "Formal cause imposition on material",
    blurb:
      "Senses hidden eidos in metal and imposes structure — like JSON schema on undifferentiated tokens.",
  },
  {
    character: "Katara",
    imageSrc: "/avatar-characters/katara-square.png",
    concept: "context_window_management",
    role: "Material cause management",
    blurb:
      "Waterbending adaptability: formlessness taking the container’s shape — coherence across context shifts.",
  },
  {
    character: "Sokka",
    imageSrc: "/avatar-characters/sokka-square.png",
    concept: "human_in_the_loop_operator",
    role: "Efficient cause human layer",
    blurb:
      "Non-bender succeeds through planning and orchestration — human-in-the-loop meta-architecture over raw power.",
  },
  {
    character: "Azula",
    imageSrc: "/avatar-characters/azula-square.png",
    concept: "arthas_antipattern",
    role: "Formal cause corrupted, no redemption arc",
    blurb:
      "Blue fire: technically superior output from a corrupted formal cause — collapse under existential pressure.",
  },
  {
    character: "Ozai",
    imageSrc: "/avatar-characters/ozai-square.png",
    concept: "unguarded_system_frostmourne",
    role: "Final cause inverted — destruction not restoration",
    blurb:
      "Sozin’s Comet: maximum capability with inverted telos — unguarded max context with no exit criteria.",
  },
];

const layout: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#0d1b2a",
    color: "#e8edf2",
    fontFamily: 'Georgia, "Times New Roman", serif',
    lineHeight: 1.65,
  },
  topnav: {
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap" as const,
    gap: "0.75rem",
    padding: "0.75rem 1.25rem",
    background: "rgba(13, 27, 42, 0.92)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(212, 168, 67, 0.25)",
  },
  brand: {
    fontWeight: 700,
    color: "#f0cc72",
    fontSize: "1rem",
  },
  nav: {
    display: "flex",
    gap: "1.25rem",
    flexWrap: "wrap" as const,
    fontSize: "0.82rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
  },
  navLink: {
    color: "#8fa4b8",
    textDecoration: "none",
  },
  hero: {
    position: "relative" as const,
    overflow: "hidden",
    textAlign: "center",
    minHeight: "min(78vh, 720px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem 1.25rem 2.75rem",
  },
  heroVideo: {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    objectPosition: "center",
    zIndex: 0,
  },
  heroVideoOverlay: {
    position: "absolute" as const,
    inset: 0,
    zIndex: 1,
    background:
      "linear-gradient(180deg, rgba(13,27,42,.55) 0%, rgba(13,27,42,.72) 45%, rgba(13,27,42,.88) 100%), radial-gradient(ellipse 70% 50% at 50% 20%, rgba(0,0,0,.25) 0%, transparent 55%)",
  },
  heroInner: {
    position: "relative" as const,
    zIndex: 2,
    maxWidth: 720,
    margin: "0 auto",
  },
  eyebrow: {
    display: "inline-block",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#d4a843",
    border: "1px solid rgba(212,168,67,.4)",
    borderRadius: 999,
    padding: "0.3em 1.1em",
    marginBottom: "1.25rem",
  },
  heroTitle: {
    fontSize: "clamp(1.75rem, 6vw, 3rem)",
    lineHeight: 1.18,
    color: "#fff",
    maxWidth: 820,
    margin: "0 auto 1.25rem",
    fontFamily: 'Palatino, "Book Antiqua", Georgia, serif',
  },
  heroTitleWhite: {
    color: "#fff",
  },
  heroTitleOrange: {
    color: "#f5a623",
  },
  heroCtas: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "0.75rem",
    justifyContent: "center",
  },
  btnPrimary: {
    display: "inline-block",
    padding: "0.75em 1.5em",
    borderRadius: 8,
    fontWeight: 700,
    fontSize: "0.95rem",
    background: "linear-gradient(135deg, #e85d24 0%, #f5a623 100%)",
    color: "#fff",
    boxShadow: "0 4px 18px rgba(232,93,36,.45)",
    textDecoration: "none",
  },
  videoSection: {
    padding: "2.25rem 1.25rem",
    borderTop: "1px solid rgba(255,255,255,.07)",
    maxWidth: 1080,
    margin: "0 auto",
  },
  section: {
    padding: "2.5rem 1.25rem",
    borderTop: "1px solid rgba(255,255,255,.07)",
    maxWidth: 1080,
    margin: "0 auto",
  },
  /** Extra bottom padding so floating widgets (e.g. ElevenLabs) don’t cover the pay CTA. */
  sectionPay: {
    paddingTop: "2.5rem",
    paddingLeft: "1.25rem",
    paddingRight: "1.25rem",
    paddingBottom:
      "calc(clamp(7rem, 22vh, 14rem) + env(safe-area-inset-bottom, 0px))",
    borderTop: "1px solid rgba(255,255,255,.07)",
    maxWidth: 1080,
    margin: "0 auto",
  },
  sectionHead: {
    textAlign: "center",
    marginBottom: "1.75rem",
  },
  label: {
    display: "inline-block",
    fontSize: "0.72rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "#5a7085",
    marginBottom: "0.5rem",
  },
  h2: {
    fontSize: "clamp(1.35rem, 4vw, 2rem)",
    color: "#f0cc72",
    margin: "0 0 0.5rem",
  },
  sectionLead: {
    color: "#8fa4b8",
    fontSize: "0.97rem",
    maxWidth: 520,
    margin: "0 auto",
  },
  mappingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "1rem",
  },
  card: {
    background: "#162437",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column" as const,
    padding: 0,
  },
  /**
   * Padding-bottom square — works everywhere `aspect-ratio` doesn’t, so the frame is always square.
   * Inner layer is the actual image viewport.
   */
  cardImageAspect: {
    position: "relative" as const,
    width: "100%",
    height: 0,
    paddingBottom: "100%",
    overflow: "hidden",
    background: "#0a1520",
    flexShrink: 0,
  },
  cardImageInner: {
    position: "absolute" as const,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  /**
   * `contain` shows the full PNG (no crop). If the art had been cropped with `cover` + a bad box, this fixes it.
   * `object-position: top` keeps heads when letterboxing (e.g. non-square sources).
   */
  cardImage: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain" as const,
    objectPosition: "center top",
  },
  cardContent: {
    padding: "1.1rem 1.1rem 1.25rem",
    flex: 1,
  },
  cardTitle: {
    fontSize: "1.05rem",
    color: "#7ec8e3",
    margin: "0 0 0.35rem",
  },
  cardMeta: {
    fontSize: "0.72rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "#5a7085",
    margin: "0 0 0.65rem",
  },
  cardCode: {
    display: "block",
    fontSize: "0.75rem",
    fontFamily: "JetBrains Mono, ui-monospace, monospace",
    color: "#f0cc72",
    background: "rgba(0,0,0,.25)",
    border: "1px solid rgba(212,168,67,.2)",
    borderRadius: 6,
    padding: "0.35em 0.5em",
    margin: "0 0 0.5rem",
    wordBreak: "break-word" as const,
  },
  cardBody: {
    fontSize: "0.9rem",
    color: "#b0c0d0",
    margin: 0,
    lineHeight: 1.55,
  },
  youtubeOuter: {
    width: "100%",
    maxWidth: 720,
    marginLeft: "auto",
    marginRight: "auto",
  },
  youtubeWrap: {
    position: "relative" as const,
    width: "100%",
    aspectRatio: "16 / 9",
    borderRadius: 12,
    overflow: "hidden",
    border: "1px solid rgba(212,168,67,.2)",
    background: "#000",
  },
  youtubeIframe: {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    border: "none",
  },
};
