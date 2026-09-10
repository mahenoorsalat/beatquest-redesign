import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowDown, ArrowRight, Check, ChevronRight, Instagram, Menu, Pause, Play, X, Zap } from "lucide-react";
import bundleAsset from "../assets/beatquest-bundle.png.asset.json";
import betaAsset from "../assets/beatquest-beta.png.asset.json";
import sizzleAsset from "../assets/sizzle.png.asset.json";
import sessionsAsset from "../assets/sessions.png.asset.json";
import echoesAsset from "../assets/echoes.png.asset.json";
import sourceAsset from "../assets/source.png.asset.json";
import six8Asset from "../assets/six8.png.asset.json";
import logoAsset from "../assets/cendo-logo.png.asset.json";

const STORE_URL = "https://www.cendosounds.com/products/beat-quest-hip-hop-sample-pack";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "BeatQuest SoundPax — Cendo Sounds" },
    { name: "description", content: "Build your next beat with BeatQuest: 2 GB of royalty-free drum loops, one-shots, stems, MIDI, and five included sound packs." },
    { property: "og:title", content: "BeatQuest SoundPax — Cendo Sounds" },
    { property: "og:description", content: "A complete hip-hop production toolkit with five bonus sound packs." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const bonuses = [
  { name: "Sizzle", tag: "Hi-hat loops + MIDI", size: "73 MB", image: sizzleAsset.url, href: "https://www.cendosounds.com/products/sizzle-upgrade" },
  { name: "Sessions", tag: "Live drum kit loops", size: "250 MB", image: sessionsAsset.url, href: "https://www.cendosounds.com/products/sessions-upgrade" },
  { name: "Echoes", tag: "World percussion loops", size: "750 MB", image: echoesAsset.url, href: "https://www.cendosounds.com/products/echoes-upgrade" },
  { name: "Source", tag: "Field recordings + soundscapes", size: "85 MB", image: sourceAsset.url, href: "https://www.cendosounds.com/products/source-upgrade" },
  { name: "Six 8", tag: "6/8 timing drum loops", size: "350 MB", image: six8Asset.url, href: "https://www.cendosounds.com/products/six-8-upgrade" },
];

const tracks = [
  { name: "FULL DRUM LOOP", category: "DRUMS", duration: "0:18", bars: [18,42,64,31,72,48,86,37,58,78,41,91,54,29,69,46,83,36,61,74,45,88,52,34,77,43,66,28,81,50,70,39] },
  { name: "BASS LINE + MIDI", category: "BASS", duration: "0:22", bars: [28,57,36,77,44,68,32,84,52,39,73,46,89,34,65,48,79,42,61,31,86,54,71,37,81,43,59,29,75,49,68,35] },
  { name: "HIGH PERC LOOP", category: "PERCUSSION", duration: "0:16", bars: [50,25,76,38,61,29,83,47,69,33,88,41,58,26,72,44,81,35,63,28,86,49,67,31,74,40,91,36,56,24,78,45] },
];

const included = [
  ["50", "Full drum loops", "Production-ready rhythm foundations"],
  ["51", "Stripped drum loops", "Lean grooves with room to build"],
  ["68", "High perc loops", "Movement, swing, and top-end detail"],
  ["387", "One-shots", "Kicks, snares, hats, percussion, toms, and SFX"],
  ["RAW", "Loop stems", "Complete control over every layer"],
  ["2 GB", "Royalty-free sounds", "Built for records, placements, and releases"],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (activeTrack === null) return;
    const timer = window.setInterval(() => setProgress((current) => current >= 100 ? 0 : current + 1.2), 180);
    return () => window.clearInterval(timer);
  }, [activeTrack]);

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
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto grid h-17 max-w-7xl grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          <a href="#top" aria-label="Cendo Sounds home" className="flex min-w-0 items-center">
            <img src={logoAsset.url} alt="Cendo Sounds" className="h-7 w-auto max-w-36 object-contain object-left invert" />
          </a>
          <nav className="hidden items-center gap-7 text-xs font-bold uppercase text-muted-foreground lg:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-foreground" href="#beatquest">BeatQuest</a>
            <a className="transition-colors hover:text-foreground" href="#sound-packs">Sound Packs</a>
            <a className="transition-colors hover:text-foreground" href="#about">About</a>
            <a className="transition-colors hover:text-foreground" href="#faq">FAQ</a>
          </nav>
          <a href={STORE_URL} className="hidden h-10 items-center gap-2 bg-primary px-5 text-xs font-bold uppercase text-primary-foreground transition-transform hover:-translate-y-0.5 sm:inline-flex" target="_blank" rel="noreferrer">Get BeatQuest <ArrowRight size={15}/></a>
          <button className="grid size-10 place-items-center border border-border text-foreground lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-4 py-5 lg:hidden" aria-label="Mobile navigation"><div className="grid gap-1">{[["BeatQuest","#beatquest"],["Sound Packs","#sound-packs"],["About","#about"],["FAQ","#faq"]].map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-between border-b border-border text-sm font-bold uppercase">{label}<ChevronRight size={17}/></a>)}</div></nav>}
      </header>

      <section id="top" className="grid-field relative min-h-[94svh] overflow-hidden border-b border-border pt-17">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />
        <div className="relative mx-auto grid min-h-[calc(94svh-4.25rem)] max-w-7xl items-center px-4 py-12 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-16">
          <div className="relative z-10 order-2 -mt-4 lg:order-1 lg:mt-0">
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-bold uppercase text-primary"><span className="h-px w-8 bg-primary"/>Hip-hop production toolkit</p>
            <h1 className="font-display text-[clamp(4rem,12vw,9.5rem)] leading-[0.77] uppercase tracking-normal">Beat<br/><span className="display-outline">Quest</span></h1>
            <p className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">Your next beat starts here. Drums, bass lines, one-shots, stems, and MIDI—built to move from first idea to finished record.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={STORE_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-3 bg-primary px-6 text-sm font-bold uppercase text-primary-foreground transition-transform hover:-translate-y-0.5">Get the full BeatQuest <ArrowRight size={17}/></a>
              <a href="#beta" className="inline-flex min-h-13 items-center justify-center gap-3 border border-border bg-surface/70 px-6 text-sm font-bold uppercase transition-colors hover:border-foreground">Get the free beta pack <ArrowDown size={17}/></a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase text-muted-foreground"><span>2 GB royalty-free</span><span>5 packs included</span><span>Instant download</span></div>
          </div>
          <div className="relative order-1 flex min-h-80 items-center justify-center lg:order-2 lg:min-h-150">
            <div className="absolute size-[65%] rotate-12 border border-primary/30" />
            <div className="absolute size-[78%] -rotate-6 border border-border" />
            <div className="absolute right-2 top-8 font-mono text-[10px] uppercase text-muted-foreground sm:right-10">Soundpax / 001<br/>Cendo original</div>
            <img src={bundleAsset.url} alt="BeatQuest full sound pack bundle" className="relative z-10 w-full max-w-2xl object-contain drop-shadow-2xl" />
            <div className="absolute bottom-8 right-0 border border-border bg-background/80 px-4 py-3 backdrop-blur sm:right-8"><span className="font-mono text-[10px] uppercase text-muted-foreground">Full bundle</span><strong className="ml-4 text-xl">$79.99</strong></div>
          </div>
        </div>
      </section>

      <section id="beta" className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="relative flex min-h-105 items-center justify-center overflow-hidden border-b border-border p-8 lg:border-b-0 lg:border-r">
            <div className="absolute left-5 top-5 font-mono text-[10px] uppercase text-muted-foreground">Free access / Beta edition</div>
            <div className="absolute size-64 rounded-full bg-primary/10 blur-3xl" />
            <img src={betaAsset.url} alt="BeatQuest Beta SoundPax artwork" className="relative max-h-88 w-full object-contain" loading="lazy" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-16">
            <p className="font-mono text-[11px] font-bold uppercase text-primary">Try before you commit</p>
            <h2 className="mt-4 max-w-lg font-display text-4xl uppercase leading-[0.95] sm:text-6xl">Start your quest. Free.</h2>
            <p className="mt-5 max-w-lg text-muted-foreground">Get 700 MB of loops and samples, including 17 full drum loops, 28 high-percussion loops, stems, and one-shots.</p>
            {submitted ? <div className="mt-8 border border-primary/40 bg-primary/5 p-6" role="status"><div className="flex size-11 items-center justify-center bg-primary text-primary-foreground"><Check size={22}/></div><h3 className="mt-5 text-xl font-bold">You’re on the list.</h3><p className="mt-2 text-sm text-muted-foreground">This prototype demonstrates the confirmation state. Connect the final delivery service to send the download.</p></div> :
            <form className="mt-8 grid gap-3" onSubmit={submitBeta} noValidate>
              <label className="grid gap-2"><span className="font-mono text-[10px] uppercase text-muted-foreground">Email address</span><input name="email" type="email" autoComplete="email" placeholder="producer@email.com" className="h-13 border border-input bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" /></label>
              <label className="grid gap-2"><span className="font-mono text-[10px] uppercase text-muted-foreground">Phone number</span><input name="phone" type="tel" autoComplete="tel" placeholder="+1 555 000 0000" className="h-13 border border-input bg-background px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary" /></label>
              {error && <p className="text-sm text-signal" role="alert">{error}</p>}
              <button type="submit" className="mt-2 inline-flex min-h-13 items-center justify-center gap-3 bg-primary px-6 text-sm font-bold uppercase text-primary-foreground transition-transform hover:-translate-y-0.5">Get the free pack <ArrowRight size={17}/></button>
              <p className="text-[11px] leading-relaxed text-muted-foreground">By submitting, you agree to receive the pack and occasional Cendo updates. Unsubscribe anytime.</p>
            </form>}
          </div>
        </div>
      </section>

      <section className="border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div><p className="font-mono text-[11px] font-bold uppercase text-primary">Beta unlocked?</p><h2 className="mt-4 font-display text-4xl uppercase leading-none sm:text-6xl">Now go<br/>all the way.</h2></div>
            <div className="grid border border-border sm:grid-cols-[1fr_auto_1fr]">
              <div className="p-6"><span className="font-mono text-[10px] uppercase text-muted-foreground">Free beta</span><strong className="mt-4 block text-2xl">700 MB</strong><p className="mt-2 text-sm text-muted-foreground">A serious first taste of the BeatQuest sound.</p></div>
              <div className="grid min-h-14 place-items-center border-y border-border bg-muted px-5 font-display text-xl text-primary sm:border-x sm:border-y-0">VS</div>
              <div className="bg-primary p-6 text-primary-foreground"><span className="font-mono text-[10px] uppercase">Full BeatQuest</span><strong className="mt-4 block text-2xl">2 GB + 5 PACKS</strong><p className="mt-2 text-sm opacity-75">The complete system for deeper, faster production.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section id="beatquest" className="overflow-hidden border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative"><span className="absolute -left-10 -top-16 font-display text-[10rem] text-foreground/[0.025]">01</span><img src={bundleAsset.url} alt="BeatQuest main pack and five upgrade packs" className="relative w-full object-contain" loading="lazy" /></div>
          <div><p className="font-mono text-[11px] font-bold uppercase text-primary">The complete package</p><h2 className="mt-4 font-display text-5xl uppercase leading-[0.9] sm:text-7xl">One pack.<br/>No dead ends.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">A focused library of hip-hop drum loops, bass lines, one-shots, MIDI, and raw stems—plus five expansion packs at no extra cost.</p><div className="mt-8 grid grid-cols-2 border border-border"><div className="border-r border-border p-5"><span className="font-mono text-[10px] uppercase text-muted-foreground">Library</span><strong className="mt-2 block text-2xl">2 GB</strong></div><div className="p-5"><span className="font-mono text-[10px] uppercase text-muted-foreground">Complete bundle</span><strong className="mt-2 block text-2xl">$79.99</strong></div></div><a href={STORE_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-13 w-full items-center justify-between bg-primary px-6 text-sm font-bold uppercase text-primary-foreground transition-transform hover:-translate-y-0.5">Get full BeatQuest <ArrowRight size={17}/></a></div>
        </div>
      </section>

      <section className="border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl"><div className="mb-10 grid gap-5 lg:grid-cols-2 lg:items-end"><div><p className="font-mono text-[11px] font-bold uppercase text-primary">Sound check</p><h2 className="mt-4 font-display text-4xl uppercase sm:text-6xl">Press play.<br/>Find the spark.</h2></div><p className="max-w-lg text-muted-foreground lg:justify-self-end">Preview the interface built for BeatQuest audio. Final sound files can drop straight into this player.</p></div>
          <div className="border border-border bg-surface">
            {tracks.map((track, index) => { const active = activeTrack === index; return <div key={track.name} className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 border-b border-border p-4 last:border-b-0 sm:grid-cols-[auto_180px_minmax(0,1fr)_64px] sm:p-5 ${active ? "bg-surface-raised" : ""}`}>
              <button onClick={() => { setActiveTrack(active ? null : index); if (!active) setProgress(0); }} className={`grid size-11 shrink-0 place-items-center ${active ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary"}`} aria-label={`${active ? "Pause" : "Play"} ${track.name}`}>{active ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}</button>
              <div className="min-w-0"><strong className="block truncate text-sm">{track.name}</strong><span className="font-mono text-[9px] text-muted-foreground">{track.category}</span></div>
              <div className="col-span-3 flex h-12 items-center gap-[3px] sm:col-span-1" aria-hidden="true">{track.bars.map((height, bar) => <span key={bar} className={`w-full transition-colors ${active && bar / track.bars.length * 100 <= progress ? "bg-primary" : "bg-muted-foreground/40"}`} style={{height: `${height}%`}} />)}</div>
              <span className="hidden text-right font-mono text-[10px] text-muted-foreground sm:block">{track.duration}</span>
            </div>})}
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase text-muted-foreground">Interactive preview demo — audio files to be connected</p>
        </div>
      </section>

      <section id="about" className="border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl"><p className="font-mono text-[11px] font-bold uppercase text-primary">Inside BeatQuest</p><div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><h2 className="font-display text-4xl uppercase sm:text-6xl">Every layer.<br/>Ready to move.</h2><p className="max-w-md text-muted-foreground">Spend less time searching and more time shaping records with a complete, royalty-free toolkit.</p></div>
          <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">{included.map(([count,title,copy], index) => <article key={title} className="group min-h-56 border-b border-r border-border p-6 transition-colors hover:bg-surface-raised"><div className="flex items-start justify-between"><strong className="font-display text-4xl text-primary">{count}</strong><span className="font-mono text-[9px] text-muted-foreground">0{index+1}</span></div><h3 className="mt-10 text-lg font-bold uppercase">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p></article>)}</div>
        </div>
      </section>

      <section id="sound-packs" className="border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="font-mono text-[11px] font-bold uppercase text-primary">Included expansion library</p><h2 className="mt-4 font-display text-4xl uppercase sm:text-6xl">5 bonus SoundPax.</h2></div><p className="max-w-md text-muted-foreground">More rhythm, texture, and movement. Included with BeatQuest or available individually for $9.99.</p></div>
          <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-5 lg:grid lg:grid-cols-5 lg:overflow-visible">{bonuses.map((bonus,index) => <a key={bonus.name} href={bonus.href} target="_blank" rel="noreferrer" className="group min-w-[78vw] snap-center border border-border bg-surface transition-transform hover:-translate-y-1 sm:min-w-80 lg:min-w-0"><div className="relative aspect-square overflow-hidden border-b border-border"><img src={bonus.image} alt={`${bonus.name} upgrade pack artwork`} loading="lazy" className="size-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"/><span className="absolute left-3 top-3 bg-primary px-2 py-1 font-mono text-[8px] font-bold uppercase text-primary-foreground">Included</span></div><div className="p-4"><div className="flex items-start justify-between gap-3"><h3 className="text-lg font-bold uppercase">{bonus.name}</h3><span className="font-mono text-[9px] text-muted-foreground">0{index+1}</span></div><p className="mt-2 min-h-10 text-xs leading-relaxed text-muted-foreground">{bonus.tag}</p><div className="mt-5 flex items-center justify-between border-t border-border pt-3 font-mono text-[9px] uppercase"><span>{bonus.size}</span><span>$9.99 <ArrowRight size={12} className="ml-1 inline"/></span></div></div></a>)}</div>
        </div>
      </section>

      <section className="border-b border-border bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl lg:grid-cols-[1.2fr_0.8fr]"><div className="border-b border-primary-foreground/20 p-6 sm:p-12 lg:border-b-0 lg:border-r lg:p-16"><p className="font-mono text-[10px] font-bold uppercase">The complete offer</p><h2 className="mt-5 font-display text-5xl uppercase leading-[0.9] sm:text-7xl">BeatQuest<br/>+ all five.</h2><p className="mt-5 max-w-lg text-primary-foreground/70">The 2 GB core pack and every upgrade—Sizzle, Sessions, Echoes, Source, and Six 8—in one download-ready bundle.</p></div><div className="flex flex-col justify-center p-6 sm:p-12 lg:p-16"><span className="font-mono text-[10px] uppercase">Full bundle</span><strong className="mt-2 font-display text-6xl">$79.99</strong><p className="mt-2 text-sm text-primary-foreground/70">Five $9.99 upgrades included.</p><a href={STORE_URL} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-13 items-center justify-between bg-background px-6 text-sm font-bold uppercase text-foreground transition-transform hover:-translate-y-0.5">Get BeatQuest <ArrowRight size={17}/></a></div></div></section>

      <section className="border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"><div><p className="font-mono text-[11px] font-bold uppercase text-primary">Built by experience</p><h2 className="mt-4 font-display text-4xl uppercase sm:text-6xl">A producer’s toolkit.</h2></div><blockquote className="border-l-2 border-primary pl-6 sm:pl-10"><p className="text-balance text-2xl font-medium leading-snug sm:text-3xl">By Grammy-nominated producer &amp; engineer Riley Urick.</p><footer className="mt-5 font-mono text-[10px] uppercase text-muted-foreground">Credits include Chris Brown · Tyga · Kanye West · Lady Gaga</footer></blockquote></div></section>

      <section id="faq" className="border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr]"><h2 className="font-display text-4xl uppercase sm:text-6xl">Why<br/>BeatQuest?</h2><div className="grid sm:grid-cols-2">{[["01","Production-ready","Sounds that are ready to build around—not endlessly repair."],["02","Complete control","Raw loop stems let you reshape every layer of the groove."],["03","Royalty-free","Create and release with a library designed for real production."],["04","One focused system","Core sounds and five expansions keep the workflow moving."]].map(([n,t,c]) => <div key={n} className="border-b border-border p-6 sm:odd:border-r"><span className="font-mono text-[9px] text-primary">{n}</span><h3 className="mt-5 text-lg font-bold uppercase">{t}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c}</p></div>)}</div></div></div></section>

      <section className="grid-field relative overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-36"><div className="relative mx-auto max-w-5xl"><Zap className="mx-auto text-primary" size={30}/><h2 className="mt-6 text-balance font-display text-[clamp(3rem,8vw,7rem)] uppercase leading-[0.88]">Ready to build your next beat?</h2><p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">Stop digging. Start creating with the complete BeatQuest SoundPax.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href={STORE_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center justify-center gap-3 bg-primary px-7 text-sm font-bold uppercase text-primary-foreground">Get BeatQuest <ArrowRight size={17}/></a><a href="#beta" className="inline-flex min-h-13 items-center justify-center border border-border bg-background px-7 text-sm font-bold uppercase">Try the free beta</a></div></div></section>

      <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-[1fr_auto] sm:items-end"><div><img src={logoAsset.url} alt="Cendo Sounds" className="h-7 w-auto max-w-40 object-contain object-left invert"/><p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">Premium, royalty-free sounds for producers who want to move fast and sound original.</p></div><div className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold uppercase"><a href="#beatquest">BeatQuest</a><a href="#sound-packs">Sound Packs</a><a href="https://www.cendosounds.com/pages/contact" target="_blank" rel="noreferrer">Contact</a><a href="https://www.cendosounds.com/policies/privacy-policy" target="_blank" rel="noreferrer">Privacy</a><a href="https://www.cendosounds.com/policies/terms-of-service" target="_blank" rel="noreferrer">Terms</a><a href="https://www.instagram.com/cendosounds/" target="_blank" rel="noreferrer" aria-label="Cendo Sounds on Instagram"><Instagram size={16}/></a></div></div><div className="mx-auto mt-8 max-w-7xl border-t border-border pt-5 font-mono text-[9px] uppercase text-muted-foreground">© 2026 Cendo Sounds. All rights reserved.</div></footer>
    </main>
  );
}
