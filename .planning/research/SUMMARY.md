# Research Summary: Kelvin Retail Brochure Website

**Synthesized:** 2026-10-02
**Sources:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md (this folder), PROJECT.md
**Overall confidence:** HIGH. Version numbers and free-tier limits should be re-checked at implementation time.

## Executive Summary

Kelvin is a small (4-page) information-only website meant to bring visitors to a physical retail shop. Sites like this follow a well-established pattern: static site generation driven by one central data file, minimal interactivity, mobile-first design, and a focus on local SEO.

**Recommended approach:**
- **Stack:** Astro + plain CSS + Web3Forms + Google Maps iframe (click-to-load) + Cloudflare Pages (drag-and-drop or `npx wrangler pages deploy`, no git required)
- **Architecture:** Data-driven. One central data file is the source of truth, with layouts and components on top and no backend
- **Roadmap:** Vertical MVP with coarse granularity. Each phase delivers working, viewable pages

## Key Findings

### Stack (STACK.md)
- **Astro:** Ships zero JS by default, has components and content collections, and makes a centralized data file easy
- **Plain CSS:** Brand tokens as CSS custom properties. Tailwind isn't worth it for 4 pages
- **Web3Forms:** About 250 submissions/month free, hCaptcha spam protection, no backend. Formspree's free tier is about 50/month
- **Google Maps iframe embed:** No API key and no billing risk
- **Cloudflare Pages:** Unlimited bandwidth on the free tier, commercial use allowed, deploys without git
- **LocalBusiness JSON-LD:** Generated from the central data file
- **Astro image handling:** Built-in modern formats, responsive sizes and lazy loading

### Features (FEATURES.md)
- **Table stakes:** Mobile-responsive layout and nav; Home hero with today's hours; product categories with photos; About; Contact (address, hours, tap-to-call/email, form, map); titles and descriptions; LocalBusiness schema; sitemap; alt text; HTTPS; centralized content
- **v1.1 candidates:** Testimonials, featured products, lightbox, analytics, announcement banner, social links
- **Anti-features:** Auto-play video, pop-ups, chat, newsletter, prices, CMS, e-commerce, social feed embeds

### Architecture (ARCHITECTURE.md), mapped to Astro conventions
- `src/data/` holds the central site data: business info, hours (weekly + exceptions + time zone), content, categories, testimonials
- `src/styles/tokens.css` holds brand tokens (colors, fonts)
- `src/layouts/` holds the base layout (head/SEO, header, footer, banner)
- `src/components/` holds reusable components: Hero, CategoryCard, HoursTable, TodayHours, ContactForm, MapEmbed, Testimonials, Banner, LocalBusinessSchema
- `src/pages/` holds index, offer, about and contact
- Build-time data validation (fail fast on missing required fields); all rendering happens at build time and the CDN serves static HTML

### Pitfalls (PITFALLS.md)
**Critical:**
1. Placeholder content shipped to production. Keep placeholders obvious and centralized; an automated gate is deferred to v2
2. Contact form emails lost or sent to spam. Test delivery to real Gmail/Outlook inboxes before handoff
3. Hours wrong on holidays or across time zones. Model weekly hours + exceptions + time zone from the start, and compute "today" in the shop's time zone, not the build server's

**Moderate:** Mobile UX breakage, inconsistent name/address/phone across pages and schema, heavy images, accessibility gaps
**Minor:** Free-tier limits, client can't update content (mitigated by the content-swap guide), confusion after handoff

## Reconciliations

- **SSG:** Astro conventions replace ARCHITECTURE's Jekyll-style `_layouts/_includes` sketch
- **Form service:** Web3Forms is preferred. Formspree's free tier is about 50/month (ARCHITECTURE's 1000/month claim is rejected). Re-check limits during implementation
- **Hosting:** Cloudflare Pages, deployed by drag-and-drop or Wrangler CLI because git isn't installed
- **Client git editing:** Out of scope for v1. Updates go through the developer
- **Roadmap shape:** Vertical MVP (user choice), not horizontal layers
- **Today's hours on a static site:** A build-time value goes stale. "Today's hours" should be computed client-side with a small script, or rendered for every day and selected client-side, using the shop's time zone

## Roadmap Implications

- The first phase should set up the data model (including hours exceptions and time zone) and the token file, because every page depends on them
- Integrations (form, map) need external setup: a Web3Forms access key and the client's map location. Placeholders work until then
- SEO schema and the launch checks are most valuable once content is near-final, so they go in the final phase

## Research Flags

- **Hours logic:** Test DST boundaries, holiday exceptions and split hours
- **Form delivery:** Plan the test protocol early and run it before handoff
- **Mobile testing:** Check on real devices or browser device emulation

## Gaps

1. SPF/DKIM for the client's email domain may affect form delivery
2. "Open now" badge is deferred to v2
3. Placeholder CI gate, full WCAG audit and advanced image pipeline are deferred to v2
4. Google Rich Results Test is a manual check
