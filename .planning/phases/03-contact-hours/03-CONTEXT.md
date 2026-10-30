# Phase 3: Contact & Hours - Context

**Gathered:** 2026-10-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace the Phase 1 stub with the real Contact & Hours page:
- **Address** in full, with a "Get directions" link.
- **Phone and email** as tap-to-call and tap-to-email actions.
- **Weekly opening hours**, plus any upcoming special or holiday hours (closures, changed hours).
- **Contact form** (name, email, message) delivered via Web3Forms, with spam protection and clear success or error feedback.
- **Google Map** behind a consent placeholder. The iframe loads only after the visitor clicks.

Covers CONT-01..CONT-06. All content comes from the central data file from Phase 1, and the hours come from its weekly + exceptions + time-zone model. Page titles and meta descriptions, JSON-LD and the full accessibility pass belong to Phase 4. Real client values (Web3Forms access key, real address) arrive at launch. Placeholders must work until then.

</domain>

<decisions>
## Implementation Decisions

### Page Order & Layout
- **D-01:** On phones, the order under the page heading is **contact actions first**:
  1. Call and email buttons, then the address with a "Get directions" link
  2. Weekly hours and upcoming special or holiday hours
  3. Contact form
  4. Map (consent placeholder)
- **D-02:** Phone and email are **large tap buttons**: full-width and stacked on phones, side by side on wider screens. Their labels come from the data file, e.g. "Call 555-…" and "Email us". They use `tel:` and `mailto:` links built from the data-file phone and email. The `tel:` value is normalized (digits and a leading `+` only), while the displayed number keeps its formatting.
- **D-03:** **"Get directions" is a plain link** to a Google Maps directions/search URL built from the data-file address. It opens in a new tab. It loads nothing third-party on the page itself, so it works without map consent.
- **D-04:** On tablet and desktop, use **two columns**: left holds the contact actions, address and hours; right holds the form. The map spans the full width below both columns. Phones stay single-column in the D-01 order.

### Map Consent Placeholder
- **D-05:** Before consent, the map area shows a **tinted block the same size as the map**, with a map-pin icon, the shop address and a "Show map" button. No image file. It follows the Phase 1/2 neutral-tint placeholder style and uses colors from the tokens. Reserving the map's dimensions avoids layout shift when the iframe loads.
- **D-06:** Next to the button is a **short consent note**, e.g. "Loading the map connects to Google, which may set cookies." The wording lives in the data file.
- **D-07:** **No consent memory.** Nothing is stored in localStorage or cookies, and the placeholder shows on every visit. Clicking "Show map" swaps in the iframe for that page view only.
- **D-08:** The **embed URL is built from the data-file address** (Google Maps `?q=<url-encoded address>&output=embed` style, no API key). There is no separate embed-URL field. The researcher should confirm that this keyless embed form still works in 2026, and pick the closest keyless alternative if it doesn't.
- **D-09:** The page must make **no request to any Google domain before the click**. That rules out preconnects, prefetches and a hidden iframe. Without JS, the "Get directions" link (D-03) is the fallback.

### Carried Forward (from Phases 1-2 / project level)
- All content comes from the central data file, and components never hardcode business content. Colors and fonts come from `src/styles/tokens.css`. The look stays neutral with one accent color.
- The hours model (weekly + exceptions + time zone) comes from Phase 1. Anything date-relative, such as "upcoming" exceptions or today's row, is computed **client-side in the shop's time zone** with a no-JS fallback, because a static build would go stale (Phase 1 D-06). Reuse the Phase 1 hours logic and utilities. Do not duplicate them.
- Use the BaseLayout, header, footer and notice banner from Phase 1 unchanged.
- No pop-ups or auto-play. There is no "Open now" badge (v2, HOURS-V2-01).

### Claude's Discretion
These areas were offered but not chosen for discussion. Use these defaults unless research finds a reason not to:
- **Special and holiday hours display:** show upcoming exceptions in a short list ("Upcoming changes") next to the weekly table, within a sensible look-ahead window (e.g. the next ~30-60 days). Closed days read clearly as "Closed", and split hours are supported. Highlighting today's row in the weekly table is optional. When there are no upcoming exceptions, the section renders nothing. Do not render an empty heading.
- **Contact form submission UX:** prefer an inline (fetch/AJAX) submit that shows the success or error message in place and keeps the visitor's input on error. Without JS, the form must still post to Web3Forms with a redirect back to the site. Disable the submit button while sending, and announce the result to screen readers (e.g. with `role="status"` or `aria-live`).
- **Spam protection:** at minimum the Web3Forms honeypot (`botcheck`). Add hCaptcha only if the researcher confirms it is available on the Web3Forms free tier and doesn't hurt the mobile UX. CONT-04 requires spam protection, so the honeypot is the floor.
- **Placeholder access key:** the Web3Forms access key lives in the data file or config as a clearly marked placeholder. Until a real key is set, the form should fail gracefully with a visible message, e.g. "Form not yet connected, please call or email". It must never fail silently. The researcher should check whether the key belongs in the data file or an env var, given Phase 1's one-file content swap.
- Field labels, placeholder text, validation messages (HTML5 `required` / `type="email"`), button copy, spacing, the breakpoint for the two-column layout, map height and aspect ratio, and the icon source (inline SVG preferred, no icon library).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scope & requirements
- `.planning/ROADMAP.md` §Phase 3: goal and the 4 success criteria
- `.planning/REQUIREMENTS.md`: CONT-01..CONT-06 (plus the v2 list: HOURS-V2-01 "Open now" badge is out of scope)
- `.planning/PROJECT.md`: core value and constraints (mobile-first, one-file content swap, no backend)

### Prior phase decisions
- `.planning/phases/01-foundation-home/01-CONTEXT.md`: hours model and client-side "today" (D-06), data file (D-05), tokens (D-04), neutral look (D-01/D-02)
- `.planning/phases/02-offer-about-pages/02-CONTEXT.md`: image pattern (photos folder, required alt), the tint-block placeholder style, and the shared "come see us" component

### Research
- `.planning/research/SUMMARY.md`: stack (Web3Forms, click-to-load Maps iframe), hours/time-zone pitfalls, "re-check Web3Forms limits during implementation"
- `.planning/research/STACK.md`: Web3Forms and Google Maps Embed rationale, suggested `ContactForm.astro` / `Map.astro` components
- `.planning/research/PITFALLS.md`: hours/holiday/time-zone pitfalls, mobile UX pitfalls
- `.planning/research/FEATURES.md`: Contact page table stakes. **Caution:** its claim that the embedded map "requires Google Maps API key" is superseded by STACK.md and D-08 (keyless embed).
- `.planning/research/ARCHITECTURE.md`: component structure. **Caution:** its Formspree references are superseded by Web3Forms.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No code exists yet. Phases 1 and 2 have context but have not been planned or built. This phase depends on what Phase 1 delivers: BaseLayout, header and footer, the central data file and its schema (business info, address, phone, email, hours with exceptions and time zone), `tokens.css`, the client-side hours logic and the `/contact` stub page (or whatever route Phase 1 picks).

### Established Patterns
- These come from Phase 1 and must be followed once they exist: the data-file format and schema validation, token naming, component folder layout, and the hours utilities.
- This phase sets the **"third-party behind consent" pattern** (click-to-load, no requests before consent). Reuse it if any later embed is added.

### Integration Points
- Extends the central data file schema with: `contact` page text (heading, button labels, directions label), `map` (consent note, button label), `form` (Web3Forms access key placeholder, labels, success/error messages, redirect target for no-JS), and an optional upcoming-exceptions heading.
- Replaces the Phase 1 stub page for Contact & Hours.
- The footer's address, phone and email (NAV-03) and this page's tap actions should use the same data fields and the same `tel:`/`mailto:` formatting helper.

</code_context>

<specifics>
## Specific Ideas

- The core-value test for this page: a visitor on a phone can call, email or get directions without scrolling past the first screen.
- Directions must work even if the visitor never consents to the embedded map.
- Placeholder values (address, key) must stay obviously placeholder, so a broken form or a wrong map never ships unnoticed.

</specifics>

<deferred>
## Deferred Ideas

None. The discussion stayed within phase scope.

</deferred>

---

*Phase: 03-contact-hours*
*Context gathered: 2026-10-02*
