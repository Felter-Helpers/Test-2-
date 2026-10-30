# Requirements: Kelvin

**Defined:** 2026-10-02
**Core Value:** A visitor, usually on a phone, can quickly find when the shop is open, where it is, how to reach it, and what it sells.

## v1 Requirements

### Site & Navigation

- [ ] **NAV-01**: The visitor can reach Home, What We Offer, About, and Contact & Hours from a shared header menu on every page
- [ ] **NAV-02**: Layout and menu work on phone screens (320px and wider), as well as tablet and desktop
- [ ] **NAV-03**: The shared footer shows the shop name, address, phone and email on every page

### Home

- [ ] **HOME-01**: The visitor sees a hero with the shop name, logo and a one-line description of the shop
- [ ] **HOME-02**: The visitor sees today's opening hours, taking the shop's time zone and any special or holiday hours into account
- [ ] **HOME-03**: The visitor sees highlight links to What We Offer and Contact & Hours
- [ ] **HOME-04**: The visitor sees 2–3 customer testimonials

### What We Offer

- [ ] **OFFER-01**: The visitor sees the product categories as cards, each with a photo, name and short description (no prices)

### About

- [ ] **ABOUT-01**: The visitor can read the shop's story and general company information

### Contact & Hours

- [ ] **CONT-01**: The visitor sees the full address and the weekly opening hours
- [ ] **CONT-02**: The visitor sees special and holiday hours, such as closures, when any are coming up
- [ ] **CONT-03**: The visitor can tap the phone number to call and the email address to write an email
- [ ] **CONT-04**: The visitor can send a message through a contact form (name, email, message) that is delivered to the client's inbox via Web3Forms, with spam protection
- [ ] **CONT-05**: The visitor gets clear success or error feedback after submitting the form
- [ ] **CONT-06**: The visitor sees the shop on a Google Map. The map loads only after the visitor clicks to show it (consent placeholder), so no third-party cookies are set before then

### Notices

- [ ] **NOTE-01**: The visitor sees a sitewide banner announcing an upcoming closure or change in hours, whenever the data defines one

### Content & Branding

- [ ] **DATA-01**: All business info, hours (weekly, exceptions and time zone), text, categories, testimonials and image references live in one central data file
- [ ] **DATA-02**: Brand colors, fonts and logo are set through one small token file, so the client's branding is easy to swap in

### Quality Baseline

- [ ] **QUAL-01**: Pages meet a basic accessibility baseline: semantic HTML, alt text on every image, labelled form fields, readable color contrast, and a keyboard-usable menu
- [ ] **QUAL-02**: Images are served optimized through Astro's built-in image handling (modern formats, responsive sizes, lazy loading below the fold)

### SEO

- [ ] **SEO-01**: Every page has its own title and meta description
- [ ] **SEO-02**: Pages include LocalBusiness/Store structured data generated from the central data file
- [ ] **SEO-03**: The site publishes a sitemap.xml and robots.txt

### Launch & Handoff

- [ ] **LAUNCH-01**: The site is deployed to Cloudflare Pages on a free *.pages.dev URL, without needing git
- [ ] **LAUNCH-02**: A short written guide explains how to connect the client's own domain
- [ ] **LAUNCH-03**: A content-swap guide explains exactly which file to edit for hours, text, photos and branding
- [ ] **LAUNCH-04**: A test message from the contact form arrives in the client's inbox (Gmail or Outlook), not in spam

## v2 Requirements

Deferred to a future release. Tracked but not in the current roadmap.

### Hours

- **HOURS-V2-01**: The visitor sees a live "Open now / Closed" badge that respects the time zone and exceptions

### Extras

- **EXTRA-V2-01**: The footer links to the shop's social media profiles
- **EXTRA-V2-02**: The visitor can tap a category photo to view it larger (lightbox)
- **EXTRA-V2-03**: The client sees privacy-friendly visitor analytics (e.g. Cloudflare Web Analytics)

### Quality

- **QUAL-V2-01**: The production build fails if any placeholder content remains
- **QUAL-V2-02**: The site passes a full WCAG 2.1 AA audit (automated plus manual keyboard and screen-reader testing)
- **QUAL-V2-03**: Image optimization goes beyond Astro defaults (art direction, tuned AVIF/WebP pipeline, image weight budgets)

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / checkout | Information-only site; customers buy in the physical shop |
| Prices / product catalog | The offer page shows categories and highlights only |
| CMS / admin editing | Updates are rare and handled by the developer |
| Self-service editing via git | Git isn't available, and the client doesn't edit content directly |
| Live chat / chatbot | Needs a backend and staff; doesn't serve the core value |
| Newsletter signup | Ongoing maintenance burden; not requested |
| Pop-ups / interstitials / auto-play video | Hurt mobile UX and SEO |
| Custom backend | Contact form uses a hosted service (Web3Forms) |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 1 | Pending |
| NAV-03 | Phase 1 | Pending |
| HOME-01 | Phase 1 | Pending |
| HOME-02 | Phase 1 | Pending |
| HOME-03 | Phase 1 | Pending |
| HOME-04 | Phase 1 | Pending |
| NOTE-01 | Phase 1 | Pending |
| DATA-01 | Phase 1 | Pending |
| DATA-02 | Phase 1 | Pending |
| OFFER-01 | Phase 2 | Pending |
| ABOUT-01 | Phase 2 | Pending |
| QUAL-02 | Phase 2 | Pending |
| CONT-01 | Phase 3 | Pending |
| CONT-02 | Phase 3 | Pending |
| CONT-03 | Phase 3 | Pending |
| CONT-04 | Phase 3 | Pending |
| CONT-05 | Phase 3 | Pending |
| CONT-06 | Phase 3 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| QUAL-01 | Phase 4 | Pending |
| LAUNCH-01 | Phase 4 | Pending |
| LAUNCH-02 | Phase 4 | Pending |
| LAUNCH-03 | Phase 4 | Pending |
| LAUNCH-04 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0

---
*Requirements defined: 2026-10-02*
*Last updated: 2026-10-02 after roadmap creation*
