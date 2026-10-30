# Phase 1: Foundation & Home - Context

**Gathered:** 2026-10-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Stand up the Astro site with:
- the shared base layout: header menu, footer, and a sitewide notice banner
- one central data file holding all business info, hours (weekly, exceptions, time zone), text, testimonials and image references
- one small token file for colors, fonts and logo
- a complete, mobile-first Home page: hero (name, logo, one line), today's opening hours, highlight links to What We Offer and Contact & Hours, and 2-3 testimonials

Covers NAV-01..03, HOME-01..04, NOTE-01, DATA-01, DATA-02. The Offer, About and Contact page *content* belongs to Phases 2-3. In this phase, nav links to those pages may point at minimal stub pages so the menu works.

</domain>

<decisions>
## Implementation Decisions

### Placeholder Look & Feel
- **D-01:** The placeholder design is **neutral and ready to brand**: mostly greys and white with a single accent color. It should look finished but generic, so the client's real colors can drop in through the token file without clashing with a layout built around a different mood. No "warm boutique" or bold-modern styling.
- **D-02:** Fonts use the **system font stack**, with no web-font downloads. The font family is a token (e.g. `--font-body`, `--font-heading`) so a brand font can be swapped in later from the token file alone.
- **D-03:** The Home hero is **compact and info-first**: logo, shop name and a one-line description. Today's opening hours must be visible on a ~375px-wide phone without scrolling. No large full-bleed photo hero.

### Carried Forward (project-level, not re-discussed)
- **D-04:** Use Astro with plain CSS (no Tailwind). Brand tokens are CSS custom properties in one file (`src/styles/tokens.css` per research).
- **D-05:** All content lives in one central data file (YAML or JSON under `src/data/` or a content collection). Components never hardcode business content.
- **D-06:** "Today's hours" is computed **client-side in the shop's time zone**, using weekly hours plus date exceptions from the data file. A value rendered at build time would go stale on a static host. Provide sensible no-JS fallback content, such as the weekly hours or a link to Contact & Hours.
- **D-07:** All content is placeholder until the client's assets arrive. No "Open now" badge (v2).

### Claude's Discretion
- **Logo and image placeholders:** the user said "you decide". Pick something that fits D-01. Suggested: a simple SVG text wordmark for the logo, and plain tinted blocks with short labels for images, so nothing looks like a real product photo and nothing gets shipped by mistake.
- **Today's hours display details:** placement within the compact hero, and wording for closed-today, special-hours days and split hours.
- **Header and mobile menu:** hamburger vs visible links, sticky or not, and whether to include a tap-to-call action. The menu must be keyboard-usable and work from 320px wide.
- **Notice banner:** how its date window is expressed in the data (e.g. a start/end date, or derived from upcoming exceptions), placement, and whether it can be dismissed. It must render nothing when the data defines no notice.
- **Testimonials layout:** cards or a simple quote list. **No carousel or auto-rotation** (in line with the project's anti-auto-play stance).
- **Data file format and schema shape:** YAML vs JSON, and content collection vs a plain imported data module. Validate required fields at build time.
- Spacing scale, corner radius and other secondary tokens.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scope & requirements
- `.planning/ROADMAP.md` §Phase 1 — Goal and the 5 success criteria
- `.planning/REQUIREMENTS.md` — NAV-01..03, HOME-01..04, NOTE-01, DATA-01, DATA-02 (and v2/out-of-scope lists)
- `.planning/PROJECT.md` — Core value, constraints (mobile-first, one-file content swap, no backend)

### Research
- `.planning/research/SUMMARY.md` — Stack, reconciliations (incl. client-side "today's hours"), pitfalls
- `.planning/research/ARCHITECTURE.md` — Data-driven layout and component structure (adapt the Jekyll-style paths to Astro conventions as SUMMARY.md notes)
- `.planning/research/PITFALLS.md` — Hours/time-zone/holiday pitfalls, placeholder-shipping risk, mobile UX
- `.planning/research/STACK.md` — Astro version and integrations
- `.planning/research/FEATURES.md` — Table stakes vs anti-features (no pop-ups, no auto-play)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None. This is a greenfield project; only `.planning/` and `CLAUDE.md` exist.

### Established Patterns
- None yet. This phase sets them: the data-file shape, the token naming, and the BaseLayout/component structure that Phases 2-4 will follow.

### Integration Points
- The base layout created here is reused by every later page (Offer, About, Contact) and will receive SEO meta and JSON-LD in Phase 4.
- The data file's hours model (weekly + exceptions + time zone) is reused by the Contact & Hours page in Phase 3 and by the LocalBusiness schema in Phase 4.

</code_context>

<specifics>
## Specific Ideas

- The placeholder should read as "a finished neutral template awaiting branding", not as an obviously broken mockup, and not as a specific brand mood.
- The core-value test for the Home page: someone opening it on a phone sees whether the shop is open today without scrolling.

</specifics>

<deferred>
## Deferred Ideas

None. The discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation-home*
*Context gathered: 2026-10-02*
