# Roadmap: Kelvin

## Overview

Four vertical increments, each ending in something viewable. Phase 1 stands up the Astro site on the central data file and design tokens, with a working Home page. Phase 2 adds the What We Offer and About pages. Phase 3 adds Contact & Hours, including the form and map. Phase 4 hardens SEO and accessibility and ships the site to Cloudflare Pages with handoff guides.

Granularity: coarse. Mode: mvp (vertical slices). All content is placeholder until client assets arrive.

## Phases

- [ ] **Phase 1: Foundation & Home** - Shared layout, central data file, design tokens and a complete, mobile-first Home page
- [ ] **Phase 2: Offer & About Pages** - What We Offer category cards and the About page, with optimized images
- [ ] **Phase 3: Contact & Hours** - Full hours, working contact form and click-to-load map
- [ ] **Phase 4: SEO, Quality & Launch** - SEO metadata, accessibility pass, live deploy, handoff guides and inbox test

## Phase Details

### Phase 1: Foundation & Home

**Goal**: A visitor on a phone can open a real Home page showing the shop's name, today's opening hours and links onward, all driven from one data file and one token file
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: NAV-01, NAV-02, NAV-03, HOME-01, HOME-02, HOME-03, HOME-04, NOTE-01, DATA-01, DATA-02
**Success Criteria** (what must be TRUE):

  1. Visitor sees the Home page with hero (shop name, logo, one-line description), highlight links to What We Offer and Contact & Hours, and 2-3 testimonials
  2. Visitor sees today's opening hours that are correct for the shop's time zone and reflect any special or holiday hours defined in the data
  3. Visitor can use a shared header menu and footer (name, address, phone, email) on every page, on screens from 320px up to desktop
  4. When the data file defines an upcoming closure or hours change, a sitewide banner appears; when it does not, no banner shows
  5. Editing the data file or the token file changes text, hours, colors, fonts and logo across the site without touching components

**Plans**: TBD
**UI hint**: yes

### Phase 2: Offer & About Pages

**Goal**: A visitor can see what the shop sells and read its story
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: OFFER-01, ABOUT-01, QUAL-02
**Success Criteria** (what must be TRUE):

  1. Visitor sees What We Offer product categories as cards, each with photo, name and short description, and no prices
  2. Visitor can read the About page with the shop's story and general company information
  3. Images load in modern formats at responsive sizes, with lazy loading below the fold
  4. Adding or removing a category in the data file updates the card grid with no component edits

**Plans**: TBD
**UI hint**: yes

### Phase 3: Contact & Hours

**Goal**: A visitor can find where the shop is, when it is open, and reach it by phone, email or form
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06
**Success Criteria** (what must be TRUE):

  1. Visitor sees the full address, weekly opening hours, and any upcoming special or holiday hours
  2. Visitor can tap the phone number to call and the email address to compose an email
  3. Visitor can submit the contact form (name, email, message) with spam protection and sees a clear success or error message
  4. Visitor sees a map placeholder and the Google Map loads only after they click to show it

**Plans**: 4 plans
**UI hint**: yes

Plans:
**Wave 1**

- [ ] 03-01-PLAN.md — Contact page shell: tap-to-call/email, address + directions, shared contact helpers (CONT-01, CONT-03)

**Wave 2** *(blocked on Wave 1 completion)*

- [ ] 03-02-PLAN.md — Weekly hours table and upcoming special hours, client-side in shop time zone (CONT-01, CONT-02)

**Wave 3** *(blocked on Wave 2 completion)*

- [ ] 03-03-PLAN.md — Web3Forms contact form with honeypot, inline feedback, placeholder-key guard (CONT-04, CONT-05)

**Wave 4** *(blocked on Wave 3 completion)*

- [ ] 03-04-PLAN.md — Click-to-load Google Map consent placeholder (CONT-06)

### Phase 4: SEO, Quality & Launch

**Goal**: The finished site is live on a free URL, discoverable, accessible, and the client can maintain it
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-02, SEO-03, QUAL-01, LAUNCH-01, LAUNCH-02, LAUNCH-03, LAUNCH-04
**Success Criteria** (what must be TRUE):

  1. Every page has its own title and meta description, and LocalBusiness structured data built from the data file validates
  2. The site serves sitemap.xml and robots.txt
  3. Pages pass the accessibility baseline: semantic HTML, alt text, labelled form fields, readable contrast, keyboard-usable menu
  4. The site is reachable on a Cloudflare Pages *.pages.dev URL, deployed without git
  5. A test contact-form message lands in the client's inbox (not spam), and written guides cover connecting a custom domain and swapping content

**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Home | 0/0 | Not started | - |
| 2. Offer & About Pages | 0/0 | Not started | - |
| 3. Contact & Hours | 0/4 | Planned | - |
| 4. SEO, Quality & Launch | 0/0 | Not started | - |
