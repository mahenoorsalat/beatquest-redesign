# Cendo Sounds — BeatQuest Homepage Redesign

## Goal
Build a single, conversion-focused homepage for BeatQuest that preserves Cendo’s product identity while replacing the current storefront feel with a premium music-production experience.

## What will be built

### 1. Focused navigation and opening section
- Minimal Cendo Sounds navigation with BeatQuest, Sound Packs, About, FAQ, and a prominent purchase action.
- Mobile menu with large touch targets and a persistent, compact purchase action.
- First screen centered on the BeatQuest name, bundle artwork, concise positioning, $79.99 price, full-pack CTA, and free-beta CTA.

### 2. Free beta capture flow
- A distinct “Try BeatQuest for free” section using the existing beta artwork.
- Email and phone fields with validation, consent/supporting text, and clear error states.
- A realistic in-page success/download-confirmation state after submission; no customer data will be stored because no backend was requested.

### 3. Upgrade story and full product offer
- A concise Beta-versus-Full comparison that makes the upgrade path obvious.
- A premium product presentation for the full BeatQuest pack using verified details: $79.99, 50 full drum loops, 51 stripped loops, 68 high-percussion loops, 387 one-shots, raw stems, and 2 GB of royalty-free content.
- Purchase actions will point to the existing Shopify BeatQuest product page rather than simulate checkout.

### 4. Custom audio preview experience
- A purpose-built player with play/pause, waveform bars, track label, category, duration, progress, and active/hover states.
- Responsive, one-hand-friendly mobile controls.
- Since no verified audio files are currently exposed, the prototype will demonstrate player interaction and waveform progress without inventing media URLs; the structure will be ready for real files later.

### 5. Contents and five included upgrades
- Visual content breakdown for verified categories: drum loops, stripped loops, high-percussion loops, one-shots, stems, and royalty-free samples.
- Five upgrade cards using existing artwork, names, verified descriptions, file sizes where listed, and $9.99 individual pricing:
  - Sizzle
  - Sessions
  - Echoes
  - Source
  - Six 8
- Each card will link to its existing Shopify product page.

### 6. Value, credibility, and closing conversion
- A restrained offer summary showing BeatQuest plus all five included upgrades.
- Authentic creator credit only: Grammy-nominated producer and engineer Riley Urick, with the existing artist credits shown on Cendo’s site.
- No fabricated reviews, user counts, or customer claims.
- Short “Why BeatQuest” points, a decisive final CTA, and a minimal footer with verified links and Instagram.

## Visual direction
- Near-black editorial canvas with high-contrast white typography, controlled gray surfaces, and energetic accent colors sampled from the existing BeatQuest artwork.
- Oversized condensed display type paired with a clean technical body face.
- Sharp, compact product panels, waveform texture, subtle grid/noise details, and restrained motion.
- Original composition informed primarily by BeatStars, with product clarity and audio interaction cues from Splice, Minimal Audio, and the other references—without copying any site.
- Intentional mobile recomposition rather than simple scaling: stacked product story, full-width CTAs, compact player rows, and swipe-friendly bonus artwork.

## Asset and implementation details
- Download the existing Cendo product artwork from Shopify, store it through the project’s asset pipeline, and avoid external image hotlinks.
- Build the page at `/` with semantic sections, one H1, accessible labels, keyboard-operable controls, visible focus states, reduced-motion support, and route-specific social metadata.
- Keep the work frontend-only and focused on this homepage; no extra ecommerce pages, accounts, database, or checkout system will be added.
- Verify the final page at desktop and mobile widths, including navigation, form states, audio interactions, outbound product links, text fit, and preview errors.
