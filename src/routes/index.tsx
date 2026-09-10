import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight, Instagram, Menu, Pause, Play, Volume2, VolumeX, X, Zap } from "lucide-react";
import bundleAsset from "../assets/beatquest-bundle.png.asset.json";
import betaAsset from "../assets/beatquest-beta.png.asset.json";
import sizzleAsset from "../assets/sizzle.png.asset.json";
import sessionsAsset from "../assets/sessions.png.asset.json";
import echoesAsset from "../assets/echoes.png.asset.json";
import sourceAsset from "../assets/source.png.asset.json";
import six8Asset from "../assets/six8.png.asset.json";
import logoAsset from "../assets/cendo-logo.png.asset.json";

const STORE_URL = "https://www.cendosounds.com/products/beat-quest-hip-hop-sample-pack";

export const Route = createFileRoute("/")(({
  head: () => ({ meta: [
    { title: "BeatQuest SoundPax — Cendo Sounds" },
    { name: "description", content: "Build your next beat with BeatQuest: 2 GB of royalty-free drum loops, one-shots, stems, MIDI, and five included sound packs." },
    { property: "og:title", content: "BeatQuest SoundPax — Cendo Sounds" },
    { property: "og:description", content: "A complete hip-hop production toolkit with five bonus sound packs." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
} as any));

const bonuses = [
  { name: "Sizzle",    tag: "Hi-hat loops + MIDI",           size: "73 MB",  image: sizzleAsset.url,   href: "https://www.cendosounds.com/products/sizzle-upgrade"   },
  { name: "Sessions",  tag: "Live drum kit loops",            size: "250 MB", image: sessionsAsset.url, href: "https://www.cendosounds.com/products/sessions-upgrade"  },
  { name: "Echoes",    tag: "World percussion loops",         size: "750 MB", image: echoesAsset.url,   href: "https://www.cendosounds.com/products/echoes-upgrade"    },
  { name: "Source",    tag: "Field recordings + soundscapes", size: "85 MB",  image: sourceAsset.url,   href: "https://www.cendosounds.com/products/source-upgrade"    },
  { name: "Six 8",     tag: "6/8 timing drum loops",          size: "350 MB", image: six8Asset.url,     href: "https://www.cendosounds.com/products/six-8-upgrade"     },
];

const tracks = [
  { name: "BAM BAM", category: "DRUMS",      bpm: "86 BPM",  duration: "0:18", audio: "/audio/Cendo - Bam Bam - 86 Bpm.wav",    bars: [18,42,64,31,72,48,86,37,58,78,41,91,54,29,69,46,83,36,61,74,45,88,52,34,77,43,66,28,81,50,70,39] },
  { name: "CASH OUT", category: "GROOVE",    bpm: "90 BPM",  duration: "0:22", audio: "/audio/Cendo - Cash Out - 90 Bpm.wav",   bars: [28,57,36,77,44,68,32,84,52,39,73,46,89,34,65,48,79,42,61,31,86,54,71,37,81,43,59,29,75,49,68,35] },
  { name: "REDWOOD",  category: "PERCUSSION", bpm: "104 BPM", duration: "0:16", audio: "/audio/Cendo - Redwood - 104 Bpm.wav",  bars: [50,25,76,38,61,29,83,47,69,33,88,41,58,26,72,44,81,35,63,28,86,49,67,31,74,40,91,36,56,24,78,45] },
  { name: "ARK",      category: "DRUMS",      bpm: "87 BPM",  duration: "0:24", audio: "/audio/Cendo - Ark - 87 Bpm.wav",       bars: [40,60,30,80,50,70,35,90,45,65,25,85,55,20,75,48,88,32,62,44,78,36,68,24,82,52,38,72,42,58,86,28] },
  { name: "CLEAN",    category: "VIBES",      bpm: "99 BPM",  duration: "0:20", audio: "/audio/Cendo - Clean - 99 Bpm.wav",     bars: [35,65,45,75,25,85,55,40,70,30,90,50,60,20,80,48,72,28,88,42,66,32,82,52,38,76,46,68,24,86,56,44] },
  { name: "CLASSLESS", category: "HARD",     bpm: "112 BPM", duration: "0:18", audio: "/audio/Cendo - Classless - 112 Bpm.wav",bars: [60,30,90,20,80,40,70,50,85,25,75,45,65,35,95,15,88,32,78,48,68,58,92,22,82,42,72,52,62,28,86,38] },
];

const included = [
  ["50",  "Full drum loops",   "Production-ready rhythm foundations"],
  ["51",  "Stripped loops",    "Lean grooves with room to build"],
  ["68",  "High perc loops",   "Movement, swing, and top-end detail"],
  ["387", "One-shots",         "Kicks, snares, hats, percussion, toms, and SFX"],
  ["RAW", "Loop stems",        "Complete control over every layer"],
  ["2 GB","Royalty-free",      "Built for records, placements, and releases"],
];

const marqueeItems = [
  "JOIN THE BEAT QUEST REVOLUTION",
  "★ 2 GB OF HEAT",
  "★ HIP-HOP PRODUCTION TOOLKIT",
  "★ ROYALTY-FREE",
  "★ 5 BONUS SOUND PACKS",
  "★ GET BEATS. MAKE HISTORY.",
  "★ CENDO SOUNDS",
];

function Marquee() {
  const text = marqueeItems.join("   ✦   ");
  return (
    <div className="overflow-hidden border-y border-border bg-primary/5 py-3" aria-hidden="true">
      <div className="marquee-track">
        {[text, text].map((t, i) => (
          <span key={i} className="whitespace-nowrap pr-16 font-mono text-[11px] font-bold uppercase tracking-widest text-primary">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function NeonTopEdge() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
      style={{
        background: "linear-gradient(90deg, transparent, oklch(0.780 0.209 148.4) 30%, oklch(0.777 0.226 327.5) 70%, transparent)",
        animation: "top-glow 2s ease-in-out infinite",
      }}
    />
  );
}

function Sticker({
  src, alt, className = "", rotate = -4, delay = 0,
}: { src: string; alt: string; className?: string; rotate?: number; delay?: number }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`pointer-events-none select-none ${className}`}
      style={{
        "--sticker-rotate": `${rotate}deg`,
        animation: `sticker-float 3.5s ease-in-out ${delay}s infinite`,
        transform: `rotate(${rotate}deg)`,
        filter: "drop-shadow(0 4px 16px oklch(0 0 0 / 0.6))",
      } as React.CSSProperties}
      draggable={false}
    />
  );
}

function AudioPlayer() {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [progress, setProgress] = useState<number[]>(tracks.map(() => 0));
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // pre-create audio elements
    audioRefs.current = tracks.map((t) => {
      const a = new Audio(t.audio);
      a.loop = true;
      return a;
    });
    return () => {
      audioRefs.current.forEach((a) => { a?.pause(); });
    };
  }, []);

  useEffect(() => {
    audioRefs.current.forEach((a, i) => {
      if (!a) return;
      a.muted = muted;
      if (i === activeTrack) {
        a.play().catch(() => {});
      } else {
        a.pause();
        a.currentTime = 0;
      }
    });
  }, [activeTrack, muted]);

  useEffect(() => {
    if (activeTrack === null) return;
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const next = [...prev];
        next[activeTrack] = next[activeTrack] >= 100 ? 0 : next[activeTrack] + 1.1;
        return next;
      });
    }, 180);
    return () => window.clearInterval(timer);
  }, [activeTrack]);

  function toggleTrack(i: number) {
    if (activeTrack === i) {
      setActiveTrack(null);
    } else {
      if (activeTrack !== null) {
        setProgress((prev) => { const n = [...prev]; n[activeTrack] = 0; return n; });
      }
      setActiveTrack(i);
    }
  }

  return (
    <div className="border border-border bg-surface" style={{ boxShadow: "0 0 30px oklch(0.780 0.209 148.4 / 0.08)" }}>
      {/* header row */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-2">
          <img src="/stickers/drumloopsaudioplayersticker.png" alt="Drum Loops" className="h-8 w-auto" style={{ filter: "drop-shadow(0 2px 6px oklch(0.780 0.209 148.4 / 0.4))" }} />
          <span className="font-mono text-[10px] uppercase text-muted-foreground">BeatQuest Player — Live Preview</span>
        </div>
        <button
          onClick={() => setMuted((m) => !m)}
          className="grid size-9 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>

      {tracks.map((track, index) => {
        const active = activeTrack === index;
        const prog = progress[index];
        return (
          <div
            key={track.name}
            className={`grid items-center gap-4 border-b border-border p-4 last:border-b-0 sm:p-5 transition-colors duration-300 ${active ? "bg-surface-raised" : "hover:bg-surface-raised/50"}`}
            style={active ? { boxShadow: "inset 0 0 20px oklch(0.780 0.209 148.4 / 0.06)" } : {}}
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 sm:grid-cols-[auto_140px_minmax(0,1fr)_60px_64px]">
              <button
                onClick={() => toggleTrack(index)}
                className={`grid size-11 shrink-0 place-items-center transition-all duration-200 ${active ? "neon-glow bg-primary text-primary-foreground" : "border border-border hover:border-primary hover:text-primary hover:shadow-[0_0_10px_oklch(0.780_0.209_148.4/0.3)]"}`}
                aria-label={`${active ? "Pause" : "Play"} ${track.name}`}
              >
                {active ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>

              <div className="min-w-0">
                <strong className={`block truncate text-sm tracking-wide ${active ? "neon-text" : ""}`}>{track.name}</strong>
                <span className="font-mono text-[9px] text-muted-foreground">{track.category} · {track.bpm}</span>
              </div>

              {/* waveform bars */}
              <div className="col-span-3 flex h-10 items-center gap-[2px] sm:col-span-1" aria-hidden="true">
                {track.bars.map((height, bar) => {
                  const filled = active && (bar / track.bars.length) * 100 <= prog;
                  return (
                    <span
                      key={bar}
                      className="w-full rounded-[1px] transition-all duration-100"
                      style={{
                        height: `${height}%`,
                        backgroundColor: filled
                          ? `oklch(0.780 0.209 148.4)`
                          : `oklch(0.35 0.01 285)`,
                        boxShadow: filled ? "0 0 4px oklch(0.780 0.209 148.4 / 0.6)" : "none",
                        animation: active ? `waveform ${0.4 + (bar % 5) * 0.12}s ease-in-out ${(bar % 7) * 0.06}s infinite` : "none",
                      }}
                    />
                  );
                })}
              </div>

              <span className="hidden text-right font-mono text-[10px] text-muted-foreground sm:block">{track.duration}</span>
            </div>
          </div>
        );
      })}

      {/* footer sticker row */}
      <div className="flex items-center gap-3 border-t border-border px-5 py-3">
        <img src="/stickers/soundpackwarning_audioplayer_sticker.png" alt="" className="h-7 w-auto opacity-80" />
        <img src="/stickers/beatquest_hello_audioplayer_sticker.png"  alt="" className="h-7 w-auto opacity-80" />
        <p className="ml-auto font-mono text-[9px] uppercase text-muted-foreground">Real audio — click play to listen</p>
      </div>
    </div>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function submitBeta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, "").length < 7) {
      setError("Enter a valid email and phone number to continue.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Neon top strip */}
      <NeonTopEdge />

      {/* ── HEADER ── */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid h-17 max-w-7xl grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <a href="#top" aria-label="Cendo Sounds home" className="flex min-w-0 items-center">
            <img src={logoAsset.url} alt="Cendo Sounds" className="h-7 w-auto max-w-36 object-contain object-left" style={{ filter: "invert(1)" }} />
          </a>
          <nav className="hidden items-center gap-7 text-xs font-bold uppercase text-muted-foreground lg:flex" aria-label="Main navigation">
            {[["BeatQuest","#beatquest"],["Sound Packs","#sound-packs"],["About","#about"],["FAQ","#faq"]].map(([label, href]) => (
              <a key={label} className="transition-colors hover:text-primary" href={href}>{label}</a>
            ))}
          </nav>
          <a
            href={STORE_URL}
            className="hidden h-10 items-center gap-2 bg-primary px-5 text-xs font-bold uppercase text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_16px_oklch(0.780_0.209_148.4/0.5)] sm:inline-flex neon-glow"
            target="_blank" rel="noreferrer"
          >
            Get BeatQuest <ArrowRight size={15} />
          </a>
          <button
            className="grid size-10 place-items-center border border-border text-foreground lg:hidden hover:border-primary transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-4 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="grid gap-1">
              {[["BeatQuest","#beatquest"],["Sound Packs","#sound-packs"],["About","#about"],["FAQ","#faq"]].map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-between border-b border-border text-sm font-bold uppercase hover:text-primary transition-colors">
                  {label}<ChevronRight size={17} />
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="top" className="grid-field relative min-h-[94svh] overflow-hidden border-b border-border pt-17">
        {/* ambient glow blobs */}
        <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-accent/8 blur-[100px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto grid min-h-[calc(94svh-4.25rem)] max-w-7xl items-center px-4 py-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-16">
          {/* copy */}
          <div className="relative z-10 order-2 -mt-4 lg:order-1 lg:mt-0">
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-bold uppercase text-primary">
              <span className="h-px w-8 bg-primary" />Hip-hop production toolkit
            </p>
            <h1 className="font-display text-[clamp(4rem,12vw,9.5rem)] leading-[0.77] uppercase tracking-normal">
              Beat<br /><span className="display-outline">Quest</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              2 GB of drums, one-shots, stems, MIDI — and five bonus sound packs included at no extra cost.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={STORE_URL}
                target="_blank" rel="noreferrer"
                className="inline-flex h-13 items-center gap-3 bg-primary px-7 text-sm font-bold uppercase text-primary-foreground neon-glow transition-all hover:-translate-y-0.5"
              >
                Get BeatQuest — $79.99 <ArrowRight size={17} />
              </a>
              <a href="#beta" className="inline-flex h-13 items-center gap-3 border border-border px-7 text-sm font-bold uppercase transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5">
                Free Beta <ArrowDown size={17} />
              </a>
            </div>
            <div className="mt-8 flex gap-8">
              {[["2 GB","Royalty-Free"], ["557","Loops & Stems"], ["$79.99","One-Time"]].map(([val, label]) => (
                <div key={label}>
                  <strong className="block font-mono text-2xl text-primary">{val}</strong>
                  <span className="font-mono text-[9px] uppercase text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* hero image + stickers */}
          <div className="relative order-1 flex justify-center lg:order-2">
            <div className="relative">
              <img
                src={bundleAsset.url}
                alt="BeatQuest full sound pack bundle"
                className="relative z-10 w-full max-w-2xl object-contain drop-shadow-2xl"
                style={{ mixBlendMode: "lighten", filter: "drop-shadow(0 0 40px oklch(0.780 0.209 148.4 / 0.25))" }}
              />
              {/* stickers around hero image */}
              <Sticker src="/stickers/sickbeatsonly_sticker.png"         alt="Sick Beats"          className="absolute -top-8 -right-4 z-20 h-24 w-auto lg:h-28"  rotate={12}  delay={0}   />
              <Sticker src="/stickers/cendosticker.png"                  alt="Cendo"               className="absolute bottom-8 -left-8 z-20 h-20 w-auto lg:h-24"   rotate={-8}  delay={0.8} />
              <Sticker src="/stickers/greenblack_smileysticker.png"      alt="Cendo Smiley"        className="absolute -bottom-4 right-4 z-20 h-18 w-auto lg:h-22"  rotate={6}   delay={1.4} />
            </div>
          </div>
        </div>
        {/* scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown size={20} className="text-muted-foreground" />
        </div>
      </section>

      {/* ── MARQUEE TICKER ── */}
      <Marquee />

      {/* ── BETA SECTION ── */}
      <section id="beta" className="border-b border-border">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          {/* artwork */}
          <div className="relative flex min-h-105 items-center justify-center overflow-hidden border-b border-border p-8 lg:border-b-0 lg:border-r">
            <div className="absolute left-5 top-5 font-mono text-[10px] uppercase text-muted-foreground">Free access / Beta edition</div>
            <div className="absolute size-64 rounded-full bg-primary/10 blur-3xl" />
            <img
              src={betaAsset.url}
              alt="BeatQuest Beta SoundPax artwork"
              className="relative max-h-88 w-full object-contain"
              loading="lazy"
              style={{ mixBlendMode: "lighten", filter: "drop-shadow(0 0 30px oklch(0.780 0.209 148.4 / 0.2))" }}
            />
            {/* sticker on beta artwork */}
            <Sticker src="/stickers/pinkbluesmiley.png" alt="Smiley" className="absolute bottom-4 right-4 h-20 w-auto" rotate={-6} delay={1} />
          </div>
          {/* form */}
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-16">
            <p className="font-mono text-[11px] font-bold uppercase text-primary">Try before you commit</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl uppercase leading-[0.95] sm:text-6xl">Start your quest. Free.</h2>
            <p className="mt-5 max-w-lg text-muted-foreground">Get 700 MB of loops and samples, including 17 full drum loops, 28 high-percussion loops, stems, and one-shots.</p>
            {submitted
              ? (
                <div className="mt-8 border border-primary/40 bg-primary/5 p-6" role="status" style={{ boxShadow: "0 0 20px oklch(0.780 0.209 148.4 / 0.15)" }}>
                  <div className="flex size-11 items-center justify-center bg-primary text-primary-foreground">
                    <Check size={22} />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">You're on the list.</h3>
                  <p className="mt-2 text-sm text-muted-foreground">This prototype demonstrates the confirmation state. Connect the final delivery service to send the download.</p>
                </div>
              )
              : (
                <form className="mt-8 grid gap-3" onSubmit={submitBeta} noValidate>
                  <label className="grid gap-2">
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">Email address</span>
                    <input name="email" type="email" autoComplete="email" placeholder="producer@email.com" className="h-13 border border-input bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_8px_oklch(0.780_0.209_148.4/0.3)]" />
                  </label>
                  <label className="grid gap-2">
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">Phone number</span>
                    <input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" className="h-13 border border-input bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_8px_oklch(0.780_0.209_148.4/0.3)]" />
                  </label>
                  {error && <p className="text-sm text-signal" role="alert">{error}</p>}
                  <button type="submit" className="mt-2 inline-flex min-h-13 items-center justify-center gap-3 bg-primary px-6 text-sm font-bold uppercase text-primary-foreground neon-glow transition-all hover:-translate-y-0.5">
                    Get the free pack <ArrowRight size={17} />
                  </button>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">By submitting, you agree to receive the pack and occasional Cendo updates. Unsubscribe anytime.</p>
                </form>
              )
            }
          </div>
        </div>
      </section>

      {/* ── BETA vs FULL COMPARE ── */}
      <section className="border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase text-primary">Beta unlocked?</p>
              <h2 className="mt-4 font-display text-4xl uppercase leading-none sm:text-6xl">Now go<br />all the way.</h2>
            </div>
            <div className="grid border border-border sm:grid-cols-[1fr_auto_1fr]" style={{ boxShadow: "0 0 30px oklch(0.780 0.209 148.4 / 0.05)" }}>
              <div className="p-6">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">Free beta</span>
                <strong className="mt-4 block text-2xl">700 MB</strong>
                <p className="mt-2 text-sm text-muted-foreground">A serious first taste of the BeatQuest sound.</p>
              </div>
              <div className="grid min-h-14 place-items-center border-y border-border bg-muted px-5 font-display text-xl text-primary sm:border-x sm:border-y-0">VS</div>
              <div className="bg-primary p-6 text-primary-foreground" style={{ boxShadow: "inset 0 0 30px oklch(0 0 0 / 0.15)" }}>
                <span className="font-mono text-[10px] uppercase">Full BeatQuest</span>
                <strong className="mt-4 block text-2xl">2 GB + 5 PACKS</strong>
                <p className="mt-2 text-sm opacity-75">The complete system for deeper, faster production.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FULL PACK PRODUCT ── */}
      <section id="beatquest" className="overflow-hidden border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <span className="absolute -left-10 -top-16 font-display text-[10rem] text-foreground/[0.025]">01</span>
            <img
              src={bundleAsset.url}
              alt="BeatQuest main pack and five upgrade packs"
              className="relative w-full object-contain"
              loading="lazy"
              style={{ mixBlendMode: "lighten", filter: "drop-shadow(0 0 50px oklch(0.780 0.209 148.4 / 0.2))" }}
            />
            {/* decorative sticker */}
            <Sticker src="/stickers/alien headphones.png" alt="Alien" className="absolute -top-10 right-0 h-28 w-auto" rotate={8} delay={0.5} />
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase text-primary">The complete package</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] sm:text-7xl">One pack.<br />No dead ends.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">A focused library of hip-hop drum loops, bass lines, one-shots, MIDI, and raw stems—plus five expansion packs at no extra cost.</p>
            <div className="mt-8 grid grid-cols-2 border border-border" style={{ boxShadow: "0 0 20px oklch(0.780 0.209 148.4 / 0.08)" }}>
              <div className="border-r border-border p-5">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">Library</span>
                <strong className="mt-2 block font-display text-2xl text-primary">2 GB</strong>
              </div>
              <div className="p-5">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">Complete bundle</span>
                <strong className="mt-2 block font-display text-2xl text-primary">$79.99</strong>
              </div>
            </div>
            <a
              href={STORE_URL}
              target="_blank" rel="noreferrer"
              className="mt-5 inline-flex min-h-13 w-full items-center justify-between bg-primary px-6 text-sm font-bold uppercase text-primary-foreground neon-glow transition-all hover:-translate-y-0.5"
            >
              Get full BeatQuest <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* ── AUDIO PLAYER ── */}
      <section className="border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid gap-5 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase text-primary">Sound check</p>
              <h2 className="mt-4 font-display text-4xl uppercase sm:text-6xl">Press play.<br />Find the spark.</h2>
            </div>
            <p className="max-w-lg text-muted-foreground lg:justify-self-end">Six real BeatQuest drum loops — hit play and hear what you're getting before you buy.</p>
          </div>
          <AudioPlayer />
        </div>
      </section>

      {/* ── CONTENTS ── */}
      <section id="about" className="border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[11px] font-bold uppercase text-primary">Inside BeatQuest</p>
          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <h2 className="font-display text-4xl uppercase sm:text-6xl">Every layer.<br />Ready to move.</h2>
            <p className="max-w-md text-muted-foreground">Spend less time searching and more time shaping records with a complete, royalty-free toolkit.</p>
          </div>
          <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {included.map(([count, title, copy], index) => (
              <article key={title} className="group min-h-56 border-b border-r border-border p-6 transition-all duration-300 hover:bg-surface-raised hover:shadow-[inset_0_0_20px_oklch(0.780_0.209_148.4/0.05)]">
                <div className="flex items-start justify-between">
                  <strong className="font-display text-4xl neon-text">{count}</strong>
                  <span className="font-mono text-[9px] text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-10 text-lg font-bold uppercase">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOUND PACKS ── */}
      <section id="sound-packs" className="border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase text-primary">Included expansion library</p>
              <h2 className="mt-4 font-display text-4xl uppercase sm:text-6xl">5 bonus SoundPax.</h2>
            </div>
            <p className="max-w-md text-muted-foreground">More rhythm, texture, and movement. Included with BeatQuest or available individually for $9.99.</p>
          </div>
          <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-5 lg:grid lg:grid-cols-5 lg:overflow-visible">
            {bonuses.map((bonus, index) => (
              <a
                key={bonus.name}
                href={bonus.href}
                target="_blank" rel="noreferrer"
                className="group min-w-[78vw] snap-center border border-border bg-surface transition-all duration-300 hover:-translate-y-2 hover:border-primary sm:min-w-80 lg:min-w-0"
                style={{ "--tw-shadow": "0 0 20px oklch(0.780 0.209 148.4 / 0)" } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 0 20px oklch(0.780 0.209 148.4 / 0.2)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
              >
                <div className="relative aspect-square overflow-hidden border-b border-border">
                  <img
                    src={bonus.image}
                    alt={`${bonus.name} upgrade pack artwork`}
                    loading="lazy"
                    className="size-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    style={{ mixBlendMode: "lighten" }}
                  />
                  <span className="absolute left-3 top-3 bg-primary px-2 py-1 font-mono text-[8px] font-bold uppercase text-primary-foreground">Included</span>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold uppercase group-hover:text-primary transition-colors">{bonus.name}</h3>
                    <span className="font-mono text-[9px] text-muted-foreground">0{index + 1}</span>
                  </div>
                  <p className="mt-2 min-h-10 text-xs leading-relaxed text-muted-foreground">{bonus.tag}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-3 font-mono text-[9px] uppercase">
                    <span>{bonus.size}</span>
                    <span>$9.99 <ArrowRight size={12} className="ml-1 inline" /></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-[11px] font-bold uppercase text-primary">Got questions?</p>
          <h2 className="mt-4 font-display text-4xl uppercase sm:text-6xl">FAQ</h2>
          <div className="mt-12 grid gap-1">
            {[
              ["Is BeatQuest royalty-free?", "Yes. Every loop, one-shot, and stem in BeatQuest is 100% royalty-free. Use them in commercial projects, releases, placements, and sync without licensing issues."],
              ["What formats are included?", "Loops and stems are provided as WAV files (24-bit, 44.1 kHz). MIDI files are included for bass lines and melodic elements."],
              ["How do I get the five bonus SoundPax?", "The five upgrades (Sizzle, Sessions, Echoes, Source, Six 8) are included at no extra cost when you purchase BeatQuest. You'll receive download links for all five after checkout."],
              ["Can I try before I buy?", "Yes — grab the free BeatQuest Beta above. It includes 700 MB of loops and samples so you can hear the quality before committing."],
              ["What DAWs does BeatQuest work with?", "Any DAW that accepts WAV and MIDI — Ableton, FL Studio, Logic Pro, Pro Tools, Studio One, GarageBand, and more."],
            ].map(([q, a]) => (
              <details key={q as string} className="group border border-border">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-bold uppercase hover:text-primary transition-colors list-none">
                  {q}
                  <span className="shrink-0 text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="border-b border-border px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-4xl text-center">
          {/* big sticker strip */}
          <div className="mb-8 flex justify-center gap-6">
            <Sticker src="/stickers/pinkbluesmiley.png"        alt="" className="h-16 w-auto" rotate={-6}  delay={0}   />
            <Sticker src="/stickers/greenblack_smileysticker.png" alt="" className="h-16 w-auto" rotate={5}   delay={0.6} />
            <Sticker src="/stickers/cendosticker.png"          alt="" className="h-14 w-auto" rotate={-10} delay={1.2} />
          </div>
          <p className="font-mono text-[11px] font-bold uppercase text-primary">The full system</p>
          <h2 className="mt-4 font-display text-5xl uppercase leading-none sm:text-8xl">
            BeatQuest + <span className="pink-text">5 Packs.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-lg text-muted-foreground">Everything you need to move fast, sound original, and keep your tracks royalty-free.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={STORE_URL}
              target="_blank" rel="noreferrer"
              className="inline-flex h-14 items-center gap-3 bg-primary px-8 text-base font-bold uppercase text-primary-foreground neon-glow transition-all hover:-translate-y-0.5"
            >
              Get BeatQuest — $79.99 <ArrowRight size={18} />
            </a>
            <a
              href="#beta"
              className="inline-flex h-14 items-center gap-3 border border-border px-8 text-base font-bold uppercase transition-all hover:border-primary hover:text-primary hover:-translate-y-0.5"
            >
              Try Free Beta <Zap size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <img src={logoAsset.url} alt="Cendo Sounds" className="h-7 w-auto max-w-40 object-contain object-left" style={{ filter: "invert(1)" }} />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">Premium, royalty-free sounds for producers who want to move fast and sound original.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold uppercase">
            <a href="#beatquest" className="hover:text-primary transition-colors">BeatQuest</a>
            <a href="#sound-packs" className="hover:text-primary transition-colors">Sound Packs</a>
            <a href="https://www.cendosounds.com/pages/contact" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Contact</a>
            <a href="https://www.cendosounds.com/policies/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Privacy</a>
            <a href="https://www.cendosounds.com/policies/terms-of-service" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Terms</a>
            <a href="https://www.instagram.com/cendosounds/" target="_blank" rel="noreferrer" aria-label="Cendo Sounds on Instagram" className="hover:text-primary transition-colors">
              <Instagram size={16} />
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-border pt-5 font-mono text-[9px] uppercase text-muted-foreground">
          © 2026 Cendo Sounds. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
