# Phase 3: Contact & Hours - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md. This log preserves the alternatives considered.

**Date:** 2026-10-02
**Phase:** 03-contact-hours
**Areas discussed:** Page order on phones, Map consent placeholder

---

## Page Order on Phones

| Option | Description | Selected |
|--------|-------------|----------|
| Contact actions first | Call/email + address at top, then hours, form, map | ✓ |
| Hours first | Hours and upcoming closures at top, matching Home | |
| You decide | Claude picks | |

| Option | Description | Selected |
|--------|-------------|----------|
| Yes, a plain link | Google Maps directions URL in a new tab, no third-party load on the page | ✓ |
| No, the map is enough | Directions only via the embedded map | |

| Option | Description | Selected |
|--------|-------------|----------|
| Large tap buttons | Full-width on phones, side by side on desktop | ✓ |
| Plain text links | Underlined links, matching the footer | |

| Option | Description | Selected |
|--------|-------------|----------|
| Two columns | Left: actions, address, hours. Right: form. Map full width below | ✓ |
| Single column everywhere | Stacked, centered, max width | |
| You decide | Claude picks | |

**User's choice:** All recommended options.

---

## Map Consent Placeholder

| Option | Description | Selected |
|--------|-------------|----------|
| Tinted block + address | Neutral block, pin icon, address, "Show map" button | ✓ |
| Static map image | Screenshot in the photos folder with a button over it | |

| Option | Description | Selected |
|--------|-------------|----------|
| Short note | One line about connecting to Google / cookies, from the data file | ✓ |
| Button only | No explanation | |
| Note + privacy link | Note plus link to Google's privacy policy | |

| Option | Description | Selected |
|--------|-------------|----------|
| No, ask every visit | Nothing stored | ✓ |
| Remember on this device | localStorage, auto-load next time | |

| Option | Description | Selected |
|--------|-------------|----------|
| Built from the address | `?q=<address>&output=embed`, nothing extra to maintain | ✓ |
| Separate embed URL field | Paste exact embed URL into data file | |
| You decide | Claude picks | |

**User's choice:** All recommended options.

---

## Claude's Discretion

- The special and holiday hours display was offered but not selected for discussion. Defaults are recorded in CONTEXT.md.
- The contact form behavior (inline vs redirect, spam protection, placeholder access key) was offered but not selected. Defaults are recorded in CONTEXT.md, and some points are flagged for the researcher to verify.
- Copy, spacing, breakpoints, map dimensions and icon source.

## Deferred Ideas

None.
