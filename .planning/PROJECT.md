# Kelvin

## What This Is

An information-only website for Kelvin, a client's physical retail shop. It has four pages: a Home landing page, a What We Offer page, an About page, and a Contact & Hours page. The goal is to send visitors to the physical shop. The site is built by a developer on the client's behalf.

## Core Value

A visitor, usually on a phone, can quickly find when the shop is open, where it is, how to reach it, and what it sells.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Home page with a short intro to the shop, highlights, today's opening hours, and clear links to the other pages
- [ ] What We Offer page showing product categories/highlights with photos and short descriptions (no prices)
- [ ] About page with general information about the company
- [ ] Contact & Hours page with address, full weekly opening hours, phone and email
- [ ] Phone number and email are click-to-call / click-to-email links
- [ ] Contact form whose submissions are delivered to the client's email inbox
- [ ] Embedded Google Map showing the shop's location
- [ ] Site works well on mobile phones (mobile-first, responsive)
- [ ] Basic SEO: per-page titles/descriptions, local business structured data, sitemap
- [ ] All placeholder content (name, address, hours, phone, email, text, categories, images) lives in one central place so real content can be dropped in easily
- [ ] Branding (logo, colors) is applied via a small set of design tokens that are easy to swap when client assets arrive
- [ ] Site is deployed to a simple, free static host

### Out of Scope

- Online sales / e-commerce / checkout — the site is information only; customers buy in the physical shop
- Product catalog with prices — the offer page shows categories and highlights only
- CMS or admin editing interface — content changes are rare and go through the developer
- Custom backend/server — contact form uses a hosted form service instead

## Context

- The developer is building this for a client. The business is a physical retail shop called "Kelvin".
- The client has an existing logo and brand colors, but the assets haven't been provided yet. Until they arrive, build with placeholder tokens.
- No real content exists yet (address, hours, phone, email, about text, product categories, photos). Use placeholders throughout.
- Content changes (hours, text) are expected to be rare. The developer will make them on request.
- The developer asked Claude to recommend hosting. A free static host (e.g. Netlify, Vercel, Cloudflare Pages) fits.
- Git is not installed on the dev machine, so planning docs are not version-controlled for now.

## Constraints

- **Content**: Placeholder-only at start. The structure must make swapping in real content trivial, ideally by editing one file.
- **Budget/Hosting**: Free or very cheap static hosting. No server to maintain.
- **Devices**: Mobile-first. Most visitors are expected to be on phones.
- **Backend**: None. The contact form relies on a third-party form-to-email service.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Static site, no backend | Info-only site with rare updates; cheapest and simplest to host | — Pending |
| Contact form via hosted form service (e.g. Formspree) → client email | Delivers messages without running a server | — Pending |
| Centralized placeholder content (single data/config source) | Real content arrives later; the swap must be easy | — Pending |
| No e-commerce, no prices | The client wants visitors to come to the shop; info only | — Pending |
| No CMS | Updates are rare and handled by the developer | — Pending |
| Separate page per topic (Home, Offer, About, Contact & Hours) | Explicit user request | — Pending |
| Free static hosting (Netlify/Vercel/Cloudflare Pages) | User asked for a recommendation; simple and free | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-10-02 after initialization*
