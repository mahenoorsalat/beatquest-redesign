import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Download,
  ExternalLink,
  Instagram,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
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
  head: () => ({
    meta: [
      { title: "BeatQuest SoundPax — Cendo Sounds" },
      {
        name: "description",
        content:
          "BeatQuest SoundPax: 2 GB hip-hop sample pack toolkit with 5 bonus SoundPax included. 100% royalty-free.",
      },
      { property: "og:title", content: "BeatQuest SoundPax — Cendo Sounds" },
      {
        property: "og:description",
        content: "A complete hip-hop production toolkit with five bonus sound packs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
} as any));

interface ProductItem {
  id: string;
  name: string;
  specs: string;
  category: "all" | "bundle" | "drums" | "perc" | "free";
  originalPrice?: string;
  price: string;
  badge?: string;
  image: string;
  href: string;
  isExternal?: boolean;
}

const allProducts: ProductItem[] = [
  {
    id: "beatquest-main",
    name: "BeatQuest SoundPax (Full Suite)",
    specs: "2 GB • 557 Sounds • All 5 Bonus Packs Included",
    category: "bundle",
    originalPrice: "$129.94",
    price: "$79.99",
    badge: "FLAGSHIP • SAVE $50",
    image: bundleAsset.url,
    href: STORE_URL,
    isExternal: true,
  },
  {
    id: "sizzle",
    name: "Sizzle — Hi-Hat Loops + MIDI",
    specs: "73 MB • Fast rolls & MIDI files",
    category: "drums",
    originalPrice: "$19.99",
    price: "$9.99",
    badge: "FREE IN BUNDLE",
    image: sizzleAsset.url,
    href: "https://www.cendosounds.com/products/sizzle-upgrade",
    isExternal: true,
  },
  {
    id: "sessions",
    name: "Sessions — Live Drum Kits",
    specs: "250 MB • Acoustic room pocket",
    category: "drums",
    originalPrice: "$19.99",
    price: "$9.99",
    badge: "FREE IN BUNDLE",
    image: sessionsAsset.url,
    href: "https://www.cendosounds.com/products/sessions-upgrade",
    isExternal: true,
  },
  {
    id: "echoes",
    name: "Echoes — World Percussion",
    specs: "750 MB • Congas, shakers & rare hits",
    category: "perc",
    originalPrice: "$19.99",
    price: "$9.99",
    badge: "FREE IN BUNDLE",
    image: echoesAsset.url,
    href: "https://www.cendosounds.com/products/echoes-upgrade",
    isExternal: true,
  },
  {
    id: "source",
    name: "Source — Foley & Textures",
    specs: "85 MB • Vinyl dirt & soundscapes",
    category: "perc",
    originalPrice: "$19.99",
    price: "$9.99",
    badge: "FREE IN BUNDLE",
    image: sourceAsset.url,
    href: "https://www.cendosounds.com/products/source-upgrade",
    isExternal: true,
  },
  {
    id: "six8",
    name: "Six 8 — 6/8 Timing Grooves",
    specs: "350 MB • Soulful triplet swing",
    category: "drums",
    originalPrice: "$19.99",
    price: "$9.99",
    badge: "FREE IN BUNDLE",
    image: six8Asset.url,
    href: "https://www.cendosounds.com/products/six-8-upgrade",
    isExternal: true,
  },
  {
    id: "beatquest-beta",
    name: "BeatQuest Beta (Free Sampler)",
    specs: "700 MB • 17 Loops, 28 Percs & Stems",
    category: "free",
    originalPrice: "$19.99",
    price: "FREE ($0.00)",
    badge: "100% FREE",
    image: betaAsset.url,
    href: "#free-beta",
    isExternal: false,
  },
];

const tracks = [
  {
    name: "BAM BAM",
    category: "DRUMS",
    bpm: "86 BPM",
    duration: "0:18",
    audio: "/audio/Cendo - Bam Bam - 86 Bpm.wav",
    bars: [18, 42, 64, 31, 72, 48, 86, 37, 58, 78, 41, 91, 54, 29, 69, 46, 83, 36, 61, 74, 45, 88, 52, 34, 77, 43, 66, 28, 81, 50, 70, 39],
  },
  {
    name: "CASH OUT",
    category: "GROOVE",
    bpm: "90 BPM",
    duration: "0:22",
    audio: "/audio/Cendo - Cash Out - 90 Bpm.wav",
    bars: [28, 57, 36, 77, 44, 68, 32, 84, 52, 39, 73, 46, 89, 34, 65, 48, 79, 42, 61, 31, 86, 54, 71, 37, 81, 43, 59, 29, 75, 49, 68, 35],
  },
  {
    name: "REDWOOD",
    category: "PERCUSSION",
    bpm: "104 BPM",
    duration: "0:16",
    audio: "/audio/Cendo - Redwood - 104 Bpm.wav",
    bars: [50, 25, 76, 38, 61, 29, 83, 47, 69, 33, 88, 41, 58, 26, 72, 44, 81, 35, 63, 28, 86, 49, 67, 31, 74, 40, 91, 36, 56, 24, 78, 45],
  },
  {
    name: "ARK",
    category: "DRUMS",
    bpm: "87 BPM",
    duration: "0:24",
    audio: "/audio/Cendo - Ark - 87 Bpm.wav",
    bars: [40, 60, 30, 80, 50, 70, 35, 90, 45, 65, 25, 85, 55, 20, 75, 48, 88, 32, 62, 44, 78, 36, 68, 24, 82, 52, 38, 72, 42, 58, 86, 28],
  },
  {
    name: "CLEAN",
    category: "VIBES",
    bpm: "99 BPM",
    duration: "0:20",
    audio: "/audio/Cendo - Clean - 99 Bpm.wav",
    bars: [35, 65, 45, 75, 25, 85, 55, 40, 70, 30, 90, 50, 60, 20, 80, 48, 72, 28, 88, 42, 66, 32, 82, 52, 38, 76, 46, 68, 24, 86, 56, 44],
  },
  {
    name: "CLASSLESS",
    category: "HARD",
    bpm: "112 BPM",
    duration: "0:18",
    audio: "/audio/Cendo - Classless - 112 Bpm.wav",
    bars: [60, 30, 90, 20, 80, 40, 70, 50, 85, 25, 75, 45, 65, 35, 95, 15, 88, 32, 78, 48, 68, 58, 92, 22, 82, 42, 72, 52, 62, 28, 86, 38],
  },
];

const DAWS = ["Ableton Live", "FL Studio", "Logic Pro", "Pro Tools", "Studio One", "Cubase", "GarageBand", "MPC"];

function NeonTopEdge() {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]"
      style={{
        background:
          "linear-gradient(90deg, transparent, oklch(0.780 0.209 148.4) 30%, oklch(0.777 0.226 327.5) 70%, transparent)",
        animation: "top-glow 2s ease-in-out infinite",
      }}
    />
  );
}

function OptimizedImage({
  src,
  alt,
  className = "",
  style,
  priority = false,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  width?: number;
  height?: number;
}) {
  const webpSrc = src.replace(/\.png$/, ".webp");
  return (
    <picture className="contents">
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // @ts-expect-error fetchpriority attribute
        fetchpriority={priority ? "high" : "auto"}
        className={className}
        style={style}
      />
    </picture>
  );
}

function AudioPlayer() {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [progress, setProgress] = useState<number[]>(tracks.map(() => 0));
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    audioRefs.current = tracks.map((t) => {
      const a = new Audio(t.audio);
      a.loop = true;
      return a;
    });
    return () => {
      audioRefs.current.forEach((a) => {
        a?.pause();
      });
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
        setProgress((prev) => {
          const n = [...prev];
          n[activeTrack] = 0;
          return n;
        });
      }
      setActiveTrack(i);
    }
  }

  return (
    <div
      className="border border-border bg-card rounded-lg overflow-hidden"
      style={{ boxShadow: "0 0 30px oklch(0.780 0.209 148.4 / 0.08)" }}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6 bg-surface">
        <div className="flex items-center gap-3">
          <img
            src="/stickers/drumloopsaudioplayersticker.png"
            alt="Drum Loops"
            className="h-7 w-auto sm:h-8"
            style={{ filter: "drop-shadow(0 2px 6px oklch(0.780 0.209 148.4 / 0.4))" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            Producer Sound Check — Audition 6 Unreleased Loops
          </span>
        </div>
        <button
          onClick={() => setMuted((m) => !m)}
          className="grid size-8 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      <div className="grid divide-y divide-border">
        {tracks.map((track, index) => {
          const active = activeTrack === index;
          const prog = progress[index];
          return (
            <div
              key={track.name}
              className={`flex items-center justify-between gap-3 p-3 transition-colors duration-200 sm:px-5 sm:py-3.5 ${
                active ? "bg-surface-raised" : "hover:bg-surface-raised/50"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <button
                  onClick={() => toggleTrack(index)}
                  className={`grid size-9 shrink-0 place-items-center transition-all duration-200 sm:size-10 ${
                    active
                      ? "neon-glow bg-primary text-primary-foreground"
                      : "border border-border hover:border-primary hover:text-primary"
                  }`}
                  aria-label={`${active ? "Pause" : "Play"} ${track.name}`}
                >
                  {active ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
                </button>

                <div className="min-w-28 sm:min-w-36">
                  <strong
                    className={`block truncate text-xs font-bold uppercase tracking-wide sm:text-sm ${
                      active ? "neon-text" : ""
                    }`}
                  >
                    {track.name}
                  </strong>
                  <span className="font-mono text-[9px] uppercase text-muted-foreground">
                    {track.category} · {track.bpm}
                  </span>
                </div>
              </div>

              <div className="hidden h-7 flex-1 max-w-md items-center gap-[2px] sm:flex" aria-hidden="true">
                {track.bars.map((height, bar) => {
                  const filled = active && (bar / track.bars.length) * 100 <= prog;
                  return (
                    <span
                      key={bar}
                      className="w-full rounded-[1px] transition-all duration-100"
                      style={{
                        height: `${height}%`,
                        backgroundColor: filled ? `oklch(0.780 0.209 148.4)` : `oklch(0.35 0.01 285)`,
                        boxShadow: filled ? "0 0 4px oklch(0.780 0.209 148.4 / 0.6)" : "none",
                        animation: active
                          ? `waveform ${0.4 + (bar % 5) * 0.12}s ease-in-out ${(bar % 7) * 0.06}s infinite`
                          : "none",
                      }}
                    />
                  );
                })}
              </div>

              <span className="font-mono text-[10px] text-muted-foreground">{track.duration}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-2.5 font-mono text-[9px] uppercase text-muted-foreground sm:px-6 bg-surface">
        <div className="flex items-center gap-2">
          <img src="/stickers/soundpackwarning_audioplayer_sticker.png" alt="" className="h-5 w-auto opacity-70" />
          <span>Click play to preview sounds live</span>
        </div>
        <span className="hidden sm:inline">24-Bit / 44.1 kHz WAV Files</span>
      </div>
    </div>
  );
}

function FreeBetaModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, "").length < 7) {
      setError("Enter a valid email and phone number to receive your pack.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-primary/40 bg-card p-5 sm:p-8 shadow-2xl rounded-xl"
        style={{ boxShadow: "0 0 50px oklch(0.780 0.209 148.4 / 0.25)" }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid size-8 place-items-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary rounded"
          aria-label="Close dialog"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center bg-primary/15 text-primary rounded">
            <Zap size={18} />
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
              Free Access • No Purchase Necessary
            </span>
            <h3 className="font-display text-2xl uppercase leading-tight sm:text-3xl">
              Get BeatQuest Beta
            </h3>
          </div>
        </div>

        {submitted ? (
          <div className="mt-6 border border-primary/40 bg-primary/5 p-6 text-center rounded-lg">
            <div className="mx-auto flex size-12 items-center justify-center bg-primary text-primary-foreground rounded-full">
              <Check size={24} />
            </div>
            <h4 className="mt-4 text-xl font-bold uppercase">You're On The List!</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Your 700 MB BeatQuest Beta download link is being dispatched to your email address.
            </p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex h-11 items-center justify-center bg-primary px-6 text-xs font-bold uppercase text-primary-foreground transition-all hover:brightness-110 rounded"
            >
              Back To Store
            </button>
          </div>
        ) : (
          <div>
            <div className="mt-5 flex items-center gap-4 rounded-lg border border-border bg-surface p-3">
              <OptimizedImage
                src={betaAsset.url}
                alt="BeatQuest Beta SoundPax"
                width={80}
                height={80}
                className="size-16 object-contain"
                style={{ mixBlendMode: "lighten" }}
              />
              <div className="text-xs">
                <strong className="block text-foreground font-bold">Includes 700 MB of Real Sounds:</strong>
                <p className="text-muted-foreground mt-0.5">
                  17 Full Drum Loops • 28 High Perc Loops • Drum Stems • Ready to drag into your DAW.
                </p>
              </div>
            </div>

            <form className="mt-5 grid gap-3.5" onSubmit={handleSubmit} noValidate>
              <label className="grid gap-1.5">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  Email Address (Where we send the pack)
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="producer@email.com"
                  className="h-11 border border-input bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_8px_oklch(0.780_0.209_148.4/0.3)] rounded"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="font-mono text-[10px] uppercase text-muted-foreground">
                  Phone Number (For download verification)
                </span>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+1 555 000 0000"
                  className="h-11 border border-input bg-background px-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:shadow-[0_0_8px_oklch(0.780_0.209_148.4/0.3)] rounded"
                />
              </label>

              {error && <p className="text-xs text-signal font-medium">{error}</p>}

              <button
                type="submit"
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 bg-primary px-6 text-xs font-bold uppercase text-primary-foreground neon-glow transition-all hover:-translate-y-0.5 rounded font-mono tracking-wider"
              >
                Send Me The Free Beta Pack <ArrowRight size={15} />
              </button>

              <p className="text-center font-mono text-[9px] text-muted-foreground">
                Instant delivery. Unsubscribe at any time.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function Index() {
  const [filter, setFilter] = useState<"all" | "bundle" | "drums" | "perc" | "free">("all");
  const [betaOpen, setBetaOpen] = useState(false);

  const displayedProducts = allProducts.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NeonTopEdge />

      {/* ── HEADER (PRODUCERGRIND CLEAN STYLE) ── */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" aria-label="Cendo Sounds" className="flex items-center">
            <OptimizedImage
              src={logoAsset.url}
              alt="Cendo Sounds"
              priority={true}
              width={130}
              height={26}
              className="h-6 w-auto object-contain object-left sm:h-7"
              style={{ filter: "invert(1)" }}
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-7 text-xs font-semibold text-muted-foreground md:flex">
            <a href="#catalog" className="transition-colors hover:text-foreground">
              Drum Kits
            </a>
            <a href="#catalog" className="transition-colors hover:text-foreground">
              Sample Packs
            </a>
            <a href="#catalog" className="transition-colors hover:text-foreground">
              One Shot Kits
            </a>
            <a href="#catalog" className="transition-colors hover:text-foreground">
              MIDI Packs
            </a>
            <a href="#catalog" className="transition-colors hover:text-foreground">
              Bundle Deals
            </a>
            <a href="#audio-sampler" className="transition-colors hover:text-primary">
              Sound Check
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setBetaOpen(true)}
              className="h-8 sm:h-9 items-center gap-1.5 border border-border px-2.5 sm:px-3 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors hover:border-primary hover:text-primary inline-flex rounded"
            >
              <Zap size={12} className="text-primary shrink-0" /> <span className="hidden xs:inline">Free</span> Beta
            </button>

            <a
              href={STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 sm:h-9 items-center gap-1.5 sm:gap-2 bg-primary px-3 sm:px-4 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground neon-glow transition-transform hover:-translate-y-0.5 active:scale-95 rounded whitespace-nowrap"
            >
              <span className="hidden sm:inline">Get BeatQuest</span> ($79.99)
            </a>
          </div>
        </div>
      </header>

      {/* ── PRODUCERGRIND-STYLE HERO PROMO BILLBOARD BANNER ── */}
      <section className="px-3 pt-4 pb-4 sm:px-6 lg:px-8 sm:pt-6">
        <div className="mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-primary/40 p-5 sm:p-10 lg:p-14 text-center"
            style={{
              backgroundImage: "radial-gradient(circle at 50% 30%, rgba(6, 18, 12, 0.72) 0%, rgba(4, 10, 7, 0.92) 100%), url('/images/poster-header-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 0 50px oklch(0.780 0.209 148.4 / 0.25)",
            }}
          >
            {/* User-uploaded green watercolor artistic splash effect */}
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-85"
              style={{
                backgroundImage: "url('/images/poster-header-bg.png')",
                mixBlendMode: "screen",
                filter: "invert(1) hue-rotate(180deg) saturate(2.2) contrast(1.1)",
              }}
            />
            {/* Subtle overlay texture */}
            <div
              className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-25"
              style={{
                backgroundImage: "url('/images/poster-header-bg.png')",
                mixBlendMode: "overlay",
              }}
            />
            {/* Dark central vignette to ensure 100% crisp text readability over green splash */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.6)_65%,transparent_100%)]" />

            <div className="relative z-10 max-w-3xl mx-auto">
              {/* Category tag */}
              <p className="font-sans text-xs sm:text-sm font-extrabold tracking-[0.25em] text-primary uppercase">
                FLAGSHIP SUITE SALE
              </p>

              {/* ProducerGrind-Style Crisp Bold Headline */}
              <h1 className="mt-2 font-sans text-5xl uppercase sm:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-md">
                38% OFF
              </h1>

              {/* Sub-headline / Promo description */}
              <p className="mt-3 text-sm sm:text-base font-extrabold text-white tracking-wide font-sans uppercase">
                GET <span className="text-primary font-black">BEATQUEST</span> + ALL 5 EXPANSION SOUNDPAX FREE
              </p>

              <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-sans max-w-lg mx-auto font-medium">
                2 GB Flagship Hip-Hop Toolkit • 557 Loops, Stems & One-Shots • 100% Royalty-Free
              </p>

              {/* ProducerGrind-Style Clean Countdown Timer */}
              <div className="mt-6 flex items-center justify-center gap-7 sm:gap-12 font-sans">
                {[
                  { num: "02", label: "days" },
                  { num: "14", label: "hours" },
                  { num: "38", label: "minutes" },
                  { num: "20", label: "seconds" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <span className="block text-3xl sm:text-4xl font-black text-white leading-none">
                      {item.num}
                    </span>
                    <span className="block text-[11px] text-zinc-400 uppercase tracking-wider font-semibold mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-7 font-sans text-xs font-extrabold uppercase tracking-wider text-primary-foreground shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  CLAIM BUNDLE — $79.99 <ArrowRight size={15} />
                </a>

                <button
                  onClick={() => setBetaOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-md border border-white/20 bg-black/60 backdrop-blur-md px-5 font-sans text-xs font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary transition-colors"
                >
                  <Download size={14} className="text-primary" /> Free 700 MB Beta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCERGRIND CATEGORY TABS ROW ── */}
      <section id="catalog" className="pt-4 pb-6">
        <div className="mx-auto flex max-w-4xl items-center justify-center gap-4 sm:gap-8 px-4 overflow-x-auto hide-scrollbar text-xs font-semibold">
          {[
            { id: "all", label: "All Kits" },
            { id: "bundle", label: "Bundles" },
            { id: "drums", label: "Drums" },
            { id: "perc", label: "Percussion" },
            { id: "free", label: "Free Beta" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`whitespace-nowrap transition-colors pb-1 border-b-2 ${
                filter === tab.id
                  ? "text-primary border-primary font-bold"
                  : "text-muted-foreground border-transparent hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── PRODUCT CARDS GRID (PRODUCERGRIND CLEAN 4-COLUMN CARDS) ── */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayedProducts.map((product) => {
              const isMainBundle = product.id === "beatquest-main";
              const isFree = product.category === "free";

              return (
                <div
                  key={product.id}
                  className={`group flex flex-col justify-between rounded-xl border p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 ${
                    isMainBundle
                      ? "border-primary/50 bg-card shadow-[0_0_30px_oklch(0.780_0.209_148.4/0.12)] sm:col-span-2 lg:col-span-2"
                      : "border-border/80 bg-card/70 hover:border-primary/50 hover:bg-card hover:shadow-[0_8px_25px_rgba(0,0,0,0.5)]"
                  }`}
                >
                  <div>
                    {/* 3D Pack Mockup Image Box */}
                    <div className="relative aspect-square flex items-center justify-center p-3 rounded-lg bg-background/50 border border-border/40 overflow-hidden">
                      <OptimizedImage
                        src={product.image}
                        alt={product.name}
                        width={360}
                        height={360}
                        className={`size-full object-contain transition-transform duration-500 group-hover:scale-105 ${
                          isMainBundle ? "scale-110" : ""
                        }`}
                        style={{ mixBlendMode: "lighten" }}
                      />

                      {product.badge && (
                        <span
                          className={`absolute top-2.5 left-2.5 font-sans text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm ${
                            isMainBundle
                              ? "bg-primary text-black"
                              : isFree
                              ? "bg-signal text-black"
                              : "bg-surface border border-primary/40 text-primary"
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mt-3.5 text-sm sm:text-base font-bold font-sans text-white group-hover:text-primary transition-colors text-center line-clamp-2 h-10 flex items-center justify-center leading-snug">
                      {product.name}
                    </h3>

                    {/* Specs info */}
                    <p className="font-sans text-[11px] text-zinc-400 text-center truncate mt-0.5">
                      {product.specs}
                    </p>
                  </div>

                  {/* Pricing and Button */}
                  <div className="mt-4 border-t border-border/60 pt-3">
                    <div className="flex items-baseline justify-center gap-2 font-sans">
                      {product.originalPrice && (
                        <span className="text-zinc-500 line-through text-xs font-semibold">
                          {product.originalPrice}
                        </span>
                      )}
                      <span className="font-black text-white text-base sm:text-lg">
                        {product.price}
                      </span>
                      {isMainBundle && (
                        <span className="bg-signal/20 text-signal font-extrabold text-[9px] px-1.5 py-0.5 rounded uppercase">
                          SAVE $50
                        </span>
                      )}
                    </div>

                    {/* Buy Button */}
                    <div className="mt-3">
                      {isFree ? (
                        <button
                          onClick={() => setBetaOpen(true)}
                          className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/15 font-sans text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-black transition-all active:scale-98"
                        >
                          Download Free <Download size={13} />
                        </button>
                      ) : isMainBundle ? (
                        <a
                          href={product.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary font-sans text-xs font-extrabold uppercase tracking-wider text-black shadow-md hover:brightness-110 transition-all active:scale-98"
                        >
                          Get Full Bundle ($79.99) <ArrowRight size={14} />
                        </a>
                      ) : (
                        <a
                          href={product.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-border/90 bg-surface font-sans text-xs font-bold uppercase tracking-wider text-zinc-200 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all active:scale-98"
                        >
                          Buy Pack ($9.99) <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bundle Math Highlight */}
          <div className="mt-12 rounded-xl border border-primary/30 bg-surface p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <strong className="block text-sm uppercase font-bold text-foreground">
                All 5 SoundPax Included Free in BeatQuest
              </strong>
              <p className="text-xs text-muted-foreground mt-0.5">
                Save $50 when you purchase the Complete Suite for <strong>$79.99</strong> instead of buying individually.
              </p>
            </div>

            <a
              href={STORE_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded bg-primary px-6 font-mono text-xs font-bold uppercase text-primary-foreground neon-glow transition-transform hover:-translate-y-0.5"
            >
              Get Full Bundle ($79.99) <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── AUDIO SAMPLER SECTION ("SOUND CHECK") ── */}
      <section id="audio-sampler" className="border-t border-border px-4 py-12 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 text-center">
            <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-primary">
              LIVE PREVIEW
            </span>
            <h2 className="font-display text-2xl uppercase sm:text-3xl mt-1">Sound Check Sampler</h2>
            <p className="text-xs text-muted-foreground mt-1">
              Click play on any track to preview real drum loops inside your monitors.
            </p>
          </div>

          <AudioPlayer />
        </div>
      </section>

      {/* ── SPECS & DAW SUPPORT ── */}
      <section className="border-t border-border bg-surface px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 text-center">
            {[
              { val: "50", label: "Full Drum Loops" },
              { val: "51", label: "Stripped Loops" },
              { val: "68", label: "High Perc Loops" },
              { val: "387", label: "Drum One-Shots" },
              { val: "RAW", label: "Multitrack Stems" },
              { val: "2 GB", label: "100% Royalty-Free" },
            ].map((s) => (
              <div key={s.label} className="border border-border bg-card p-3 rounded">
                <strong className="block font-display text-2xl text-primary">{s.val}</strong>
                <span className="font-mono text-[9px] uppercase text-muted-foreground mt-0.5 block">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-border/80 bg-card p-3 rounded flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              <span className="font-mono text-[11px] uppercase font-bold">Compatible With All DAWs:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground">
              {DAWS.map((daw) => (
                <span key={daw} className="border border-border bg-background px-2 py-0.5 rounded">
                  {daw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="border-t border-border px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-6">
            <span className="font-mono text-[10px] uppercase font-bold text-primary">FAQ</span>
            <h2 className="font-display text-2xl uppercase sm:text-3xl mt-1">Frequently Asked</h2>
          </div>

          <div className="grid gap-2">
            {[
              [
                "Is BeatQuest 100% royalty-free?",
                "Yes. Every loop, drum one-shot, and stem inside BeatQuest and the 5 bonus packs is 100% royalty-free. Use them in commercial releases, streaming tracks, sync licensing, and beat sales without clearance headaches.",
              ],
              [
                "How do I receive the five bonus SoundPax?",
                "When you purchase BeatQuest ($79.99), your instant download link includes the complete 2 GB main pack AND all five expansion packs (Sizzle, Sessions, Echoes, Source, Six 8) at no extra charge.",
              ],
              [
                "Can I buy just one mini pack?",
                "Yes! Each of the 5 mini packs can be purchased standalone for $9.99 if you only need that specific expansion.",
              ],
              [
                "Can I try BeatQuest for free first?",
                "Yes — grab the free 700 MB BeatQuest Beta pack above to test out 17 full drum loops, 28 percs, stems, and one-shots immediately.",
              ],
            ].map(([q, a]) => (
              <details key={q as string} className="group border border-border bg-card rounded">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-3.5 font-bold uppercase hover:text-primary transition-colors list-none text-xs sm:text-sm">
                  {q}
                  <span className="shrink-0 text-primary font-mono transition-transform group-open:rotate-45 text-base">
                    +
                  </span>
                </summary>
                <p className="border-t border-border px-3.5 pb-3.5 pt-2.5 text-xs leading-relaxed text-muted-foreground">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border px-4 py-8 sm:px-6 lg:px-8 bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <OptimizedImage
              src={logoAsset.url}
              alt="Cendo Sounds"
              width={110}
              height={22}
              className="h-5 w-auto object-contain"
              style={{ filter: "invert(1)" }}
            />
            <span className="font-mono text-[9px] uppercase text-muted-foreground">
              © 2026 Cendo Sounds. All rights reserved.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase text-muted-foreground">
            <a href={STORE_URL} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              BeatQuest Bundle
            </a>
            <a href="https://www.cendosounds.com/policies/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="https://www.cendosounds.com/policies/terms-of-service" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
              Terms
            </a>
            <a
              href="https://www.instagram.com/cendosounds/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-primary transition-colors"
            >
              <Instagram size={14} />
            </a>
          </div>
        </div>
      </footer>

      {/* ── FREE BETA MODAL ── */}
      <FreeBetaModal open={betaOpen} onClose={() => setBetaOpen(false)} />
    </main>
  );
}
