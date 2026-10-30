# Phase 2: Offer & About Pages - Context

**Gathered:** 2026-10-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace the Phase 1 stub pages with the real pages below:
- **What We Offer:** product categories shown as cards, each with a photo, name and short description. No prices.
- **About:** the shop's story and general company information.
- **Image pipeline:** every image goes through Astro's built-in image handling, with modern formats, responsive sizes, and lazy loading below the fold.

Covers OFFER-01, ABOUT-01 and QUAL-02. All content comes from the central data file from Phase 1. Adding or removing a category in the data file must update the grid without editing any component. Contact & Hours content, the form and the map belong to Phase 3. SEO meta and the full accessibility pass belong to Phase 4.

</domain>

<decisions>
## Implementation Decisions

### Placeholder Images
- **D-01:** Placeholders are **real generated image files**: tinted blocks with a short label baked in, in keeping with the neutral look from Phase 1. They live under `src/assets/` and render through Astro `<Image>`/`<Picture>`, so QUAL-02 can be tested now instead of waiting for client photos.
- **D-02:** **Photo swap = drop a file and edit one line.** All content images (placeholder and real) live in one folder, e.g. `src/assets/photos/`. The data file references each image by filename. To swap one, the client or developer adds the file and changes the reference. The image reference must resolve at build time. Use a content-collection `image()` schema or an equivalent import mechanism, so a missing file fails the build.
- **D-03:** **Alt text is a required field** on every image entry in the data file. The build fails if it is missing or empty.

### What We Offer Page Framing
- **D-04:** The page starts with a heading and a 1-2 sentence intro, both from the data file, followed directly by the grid. Keep the grid near the top on phones. No banner image.
- **D-05:** Below the grid goes a **"Come see us" block**: a short line plus a link to Contact & Hours. It pushes visitors toward the physical shop.
- **D-06:** **Categories only.** No featured items or featured flag. Stay exactly within OFFER-01.

### Category Card Design
- **D-07:** Use a responsive grid with **1 column on phones, 2 on tablets and 3 on desktop**.
- **D-08:** Card photos are **4:3 landscape**. Enforce the ratio with cropping (e.g. `object-fit: cover` or a fixed aspect-ratio box) so photos of mixed sizes don't break the grid.
- **D-09:** Cards are **static and not clickable**. There are no category detail pages, so a tap would lead nowhere.
- **D-10:** Descriptions are **1-2 sentences, about 140 characters**. Document the limit in the data file next to the categories, and enforce it softly if possible, e.g. a schema max length or a warning.

### About Page Content
- **D-11:** Sections, in this order:
  1. **Shop photo + Our story.** One shop photo (storefront or interior) with the story.
  2. **Quick facts.** A short scannable list, e.g. founded year, location, what we're known for.
  3. **Owner / team.** 1-3 people. Each has a name, role, short bio and an **optional** portrait. If a person has no photo, their entry still looks good as text. The client may not want to share staff photos.
  4. **Visit us block.** Reuses the same "come see us" component and link as D-05.
- **D-12:** The **story is stored as a list of plain-text paragraphs** in the central data file. Do not use a separate Markdown file, so the one-file content swap stays intact.
- **D-13:** The "Come see us" / "Visit us" block is **one shared component** used on both pages. Its text comes from the data file.

### Carried Forward (from Phase 1 / project level)
- Neutral, ready-to-brand look: greys and white plus one accent color, and the system font stack. All colors and fonts come from `src/styles/tokens.css`.
- All content lives in the central data file. Components never hardcode business content.
- No carousels and no auto-rotation. Lightbox and photo enlarging are v2 (EXTRA-V2-02).
- Use the BaseLayout, header, footer and notice banner from Phase 1 unchanged.

### Claude's Discretion
- Exact placeholder generation method (committed static files vs a one-off generation script), tint colors and label text, within D-01.
- Card internals: spacing, radius, shadow or border, and heading level, all within the Phase 1 tokens.
- Quick facts layout (definition list vs simple list) and data shape.
- About photo placement (above the story vs beside it on wider screens).
- Exact responsive breakpoints and image `widths`/`sizes` values. The above-the-fold image (the About shop photo, and possibly the first card) should be eager-loaded. Everything else is lazy.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scope & requirements
- `.planning/ROADMAP.md` §Phase 2: goal and the 4 success criteria
- `.planning/REQUIREMENTS.md`: OFFER-01, ABOUT-01, QUAL-02 (plus the v2 list: EXTRA-V2-02 lightbox and QUAL-V2-03 advanced image pipeline are out of scope)
- `.planning/PROJECT.md`: core value and constraints (mobile-first, one-file content swap)

### Prior phase decisions
- `.planning/phases/01-foundation-home/01-CONTEXT.md`: look & feel (D-01..D-03), data file (D-05), tokens (D-04), and the placeholder-image approach that D-01 here extends

### Research
- `.planning/research/SUMMARY.md`: stack and pitfalls
- `.planning/research/ARCHITECTURE.md`: data-driven component structure
- `.planning/research/PITFALLS.md`: placeholder-shipping risk, image/mobile UX pitfalls
- `.planning/research/STACK.md`: Astro version, Astro Image, content collections
- `.planning/research/FEATURES.md`: table stakes vs anti-features

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No code exists yet. Phase 1 (Foundation & Home) has context but has not been planned or built. This phase depends on what Phase 1 delivers: BaseLayout, header and footer, the central data file and its schema, `tokens.css`, and stub pages for `/offer` and `/about` (or whatever routes Phase 1 picks).

### Established Patterns
- These come from Phase 1 and must be followed once they exist: the data-file format and schema validation, token naming, and the component folder layout.
- This phase sets the **image pattern** (folder, data reference, required alt, Astro `<Image>`). Phase 3 (map placeholder) and Phase 4 (og:image, JSON-LD image) will reuse it.

### Integration Points
- Extends the central data file schema with: `offer` (heading, intro, categories[] {name, description, image, alt}), `about` (story paragraphs[], photo + alt, facts[], team[] {name, role, bio, photo?, alt?}), and the "come see us" block text.
- Replaces the Phase 1 stub pages for What We Offer and About.

</code_context>

<specifics>
## Specific Ideas

- Every page should end by pointing visitors to the physical shop. The "come see us" block is the consistent way to do that.
- If the data file has no photo for a team member, the page must still look intentional, not broken.
- Placeholders must stay obviously placeholder (labelled tint blocks), so nothing ships looking like a real product photo by mistake.

</specifics>

<deferred>
## Deferred Ideas

None. The discussion stayed within phase scope.

</deferred>

---

*Phase: 02-offer-about-pages*
*Context gathered: 2026-10-02*
