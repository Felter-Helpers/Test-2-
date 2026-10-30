# Phase 2: Offer & About Pages - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md. This log preserves the alternatives considered.

**Date:** 2026-10-02
**Phase:** 02-offer-about-pages
**Areas discussed:** Placeholder images, Offer page framing, Category card design, About page content

---

## Placeholder Images

| Option | Description | Selected |
|--------|-------------|----------|
| Generated placeholder files | Real tinted image files with labels baked in, run through Astro Image; QUAL-02 verifiable now | ✓ |
| CSS blocks only | No image files until client photos arrive | |
| You decide | Claude picks | |

| Option | Description | Selected |
|--------|-------------|----------|
| Drop file + edit data | Photos in one folder; data file references each by filename | ✓ |
| Overwrite same filenames | Replace placeholders with identically named files | |
| You decide | Claude picks | |

| Option | Description | Selected |
|--------|-------------|----------|
| Required field in data file | Each image has alt; build fails if missing | ✓ |
| Derive from category name | Alt = category name automatically | |

**User's choice:** All recommended options.

---

## Offer Page Framing

| Option | Description | Selected |
|--------|-------------|----------|
| Heading + 1-2 sentence intro | Brief intro from data file, grid near top | ✓ |
| Heading only | Straight to cards | |
| Intro + banner image | Header photo, pushes cards down | |

| Option | Description | Selected |
|--------|-------------|----------|
| 'Come see us' block | Short line + link to Contact & Hours | ✓ |
| Nothing (footer covers it) | | |
| You decide | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Categories only | Matches OFFER-01 exactly | ✓ |
| Optional featured flag | Featured categories shown larger/first | |

---

## Category Card Design

| Option | Description | Selected |
|--------|-------------|----------|
| 1 phone / 2 tablet / 3 desktop | Full-width cards on phones | ✓ |
| 2 on phone / 3-4 desktop | Denser | |
| You decide | | |

| Option | Description | Selected |
|--------|-------------|----------|
| 4:3 landscape | Typical product/shop photo shape | ✓ |
| Square 1:1 | Uniform, taller on phone | |
| You decide | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Static, not clickable | No detail pages; avoids dead-end taps | ✓ |
| Whole card links to Contact & Hours | | |

| Option | Description | Selected |
|--------|-------------|----------|
| 1-2 sentences (~140 chars) | Even card height; limit documented | ✓ |
| Short paragraph | | |

---

## About Page Content

| Option | Description | Selected |
|--------|-------------|----------|
| Our story | Core of ABOUT-01 | ✓ |
| Quick facts | Short scannable list | ✓ |
| Owner / team | Photo + short intro of people | ✓ |
| Visit us block | Same 'come see us' link | ✓ |

| Option | Description | Selected |
|--------|-------------|----------|
| One shop photo | Single storefront/interior image | ✓ |
| No photos | | |
| Several (gallery-ish) | | |

| Option | Description | Selected |
|--------|-------------|----------|
| List of paragraphs in data file | Keeps one-file swap | ✓ |
| Separate Markdown file | Richer formatting, breaks one-file rule | |

Follow-up (team section plus "one shop photo" needed reconciling):

| Option | Description | Selected |
|--------|-------------|----------|
| 1-3 people, photo optional | Name, role, bio, optional portrait | ✓ |
| Owner only, text only | | |
| Owner only, with portrait | | |

| Option | Description | Selected |
|--------|-------------|----------|
| Photo + story, facts, team, visit | Story first, end with visit push | ✓ |
| Facts first, then story, team, visit | | |
| You decide | | |

**Notes:** Partway through, the user asked to see the current website. None exists yet, because Phase 1 is not built. The user then resumed the discussion from the checkpoint.

---

## Claude's Discretion

- Placeholder generation method, tints and labels
- Card internals (spacing, radius, border/shadow)
- Quick facts layout and data shape
- About photo placement
- Breakpoints and image widths/sizes, and eager vs lazy loading for above-the-fold images

## Deferred Ideas

None.
