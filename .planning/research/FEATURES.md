# Feature Research: Small Retail Shop Brochure Website

**Domain:** Information-only retail shop website (brick-and-mortar to online)  
**Researched:** 2026-10-02  
**Confidence:** HIGH

## Executive Summary

Small retail shop brochure websites have converged on a specific feature set driven by mobile-first behavior and local search expectations. Visitors expect to quickly find location, hours, what the shop sells, and how to contact them — nearly all on their phones. The gap between "good enough" and "competitive" is narrow for this category: table stakes cluster around usability, mobile responsiveness, and local SEO signals. Differentiators are minimal because users don't stay long; they come to confirm hours or see what's available, then leave to visit the physical shop.

The research found two key anti-patterns: features that seem valuable but destroy performance (auto-playing video, heavy animations) and scope creep that doesn't drive the core value (chat, CMS, product pricing, newsletters).

---

## Feature Landscape by Category

### Navigation & Layout

#### Table Stakes (Users Expect These)

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Clear, intuitive main navigation | Users must find pages quickly; >65% on mobile | LOW | 5-7 items max; group under dropdowns if needed |
| Mobile-responsive layout | 65%+ traffic is mobile; mobile-first indexing is default | HIGH | Essential for both UX and SEO rankings |
| Consistent header/footer across all pages | Users expect predictable navigation; footer is secondary nav | MEDIUM | Header stays visible or sticky; footer includes contact info |
| Readable text hierarchy | Users scan, not read; must find key info in <3 seconds | LOW | H1 per page, clear visual weight differences |
| Page titles visible in browser tab | Users switch tabs constantly | LOW | Unique title per page; include shop name + section |
| Logo links to home | Universal convention; instant navigation shortcut | LOW | Applies to all pages |

#### Differentiators (Competitive Advantage)

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Sticky/persistent header navigation | Allows re-navigation without scrolling to top | MEDIUM | Mobile performance consideration; don't block content |
| Breadcrumb navigation | Helps users understand page hierarchy; aids SEO | LOW | Only needed for 3+ page levels; this site may not require |
| Skip-to-main-content link | Accessibility win; jump to content for screen readers | LOW | Hidden until keyboard focus; improves WCAG compliance |

---

### Home Page

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero section with shop intro | Establishes what the shop is before user scrolls | MEDIUM | 1-2 sentence value prop; high-quality hero image or color |
| Today's opening hours prominently displayed | Top reason users visit; on mobile, this is visible above fold | LOW | Update via centralized data source; consider timezone |
| Quick links to other pages | Users expect clear navigation to main sections | LOW | Link to What We Offer, About, Contact; consider link styling |
| Clear call-to-action (CTA) | Users need direction: visit us, call, or explore | LOW | 1-2 CTAs max; use contrasting colors; avoid competing CTAs |
| Shop imagery/photos | Visitors want to see the physical space and products | MEDIUM | 1-2 high-quality images; mobile-optimized (WebP, <200KB) |
| Value proposition statement | Users decide in seconds if this is relevant | LOW | "What we sell, where we are, when we're open" in 1-2 sentences |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Customer testimonials/reviews | Social proof significantly increases foot traffic | MEDIUM | 2-3 short testimonials; link to full reviews if available |
| "Featured products/categories" preview | Teases What We Offer without leaving home; increases engagement | MEDIUM | Show 3-4 top categories with photos; link to full page |
| Announcement banner | Communicate temporary closures, special hours, news | LOW | Critical for holiday hours; can be toggled via data source |

---

### What We Offer (Product Showcase)

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Product categories with photos | Users want to see what the shop sells | MEDIUM | Organize hierarchically; high-quality photos essential |
| Brief, descriptive text per category | Clarifies what each category is; helps search engines | LOW | 1-2 sentences; no prices (per scope) |
| Multiple photos per category | Users want to see range; single image feels incomplete | HIGH | 2-4 images per category; lazy-load for performance |
| No pricing displayed | Aligns with business model (physical shop = in-person pricing) | LOW | Clear messaging: "Visit us for current pricing" optional |
| Mobile-friendly image gallery | 65%+ users are on mobile; must work without desktop tools | MEDIUM | Swipe-able or scrollable; no mouse-hover galleries |
| Image alt text | SEO; accessibility; appears if image fails to load | LOW | Descriptive: "Hand-crafted leather wallets in brown, tan, and black" |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Image zoom/expand on tap | Users want to see detail; improves confidence | MEDIUM | Lightbox or modal; must close easily on mobile |
| Category filtering/search | Help users find specific category quickly | MEDIUM | Not essential for <10 categories; useful if >15 |
| "New arrivals" or "featured" badge | Encourages repeat visits; shows the shop is active | LOW | Update via data source; visual badge (e.g., "NEW") |

---

### About Page

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Company/shop story and mission | Users want to understand who they're buying from | LOW | 2-3 paragraphs; personal touch builds trust |
| Clear, scannable text | Users skim; use headings, short paragraphs | LOW | H2 per section; bullet points for key info |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Team photos and bios | Humanizes the business; builds personal connection | MEDIUM | 1-2 team members; high-quality, natural photos |
| Brand values/philosophy | Differentiates from competitors; attracts aligned customers | LOW | 1-2 sentences on why they started, what they believe in |
| Shop history or timeline | Establishes credibility and longevity | LOW | Timeline or text; "Family business since 2010" is powerful |

---

### Contact & Hours Page

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Full address (street, city, zip) | Users need to know where to go; required for local SEO | LOW | Consistent with Google Business Profile (NAP data) |
| Full weekly opening hours | Most common reason users visit; must be accurate | LOW | Display "Closed today" if applicable; timezone matters |
| Phone number as clickable link | Mobile users expect tap-to-call; increases phone volume | LOW | Format: tel:// protocol; display readable format |
| Email as clickable link | Desktop users expect mailto:; easy mobile access | LOW | Format: mailto:// protocol |
| Contact form | Fallback for inquiries; trackable in Analytics | MEDIUM | Name, email, message fields only; <5 total fields |
| Form submission confirmation message | Reassures user their submission was received | LOW | "Thanks for reaching out! We'll respond within 24 hours." |
| Embedded Google Map | Pinpoints location; directions integration | MEDIUM | Shows address, hours, photo; clickable to Google Maps |
| Multiple contact methods clearly listed | Users have different preferences (email vs. phone) | LOW | Headline: "Get in Touch" with 3 clear options |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Social media links | Builds community; shows business is active | LOW | Link to 1-2 platforms only (avoid dead/outdated links) |
| Response time expectations | Sets realistic expectations; reduces support burden | LOW | "We respond to emails within 24 hours" |
| Link to Google Business Profile | Funnels reviews and ratings; improves local SEO | LOW | "Read our reviews" link if strong review presence |
| Office/shop photo | Visual confirmation that business is real/active | LOW | Adds trust; shows physical space |

---

### SEO & Discoverability

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Unique page titles (H1 per page) | Search engines rank on title; users see in browser tab | LOW | Format: "Page Section — Shop Name" |
| Meta descriptions | Snippet that appears in search results; affects CTR | LOW | 150-160 chars; include shop name and key info |
| LocalBusiness structured data (schema.json) | Tells Google: business name, address, phone, hours, categories | MEDIUM | Required for rich snippets; affects local search ranking |
| Google Maps embedded on Contact page | Links to Google Maps listing; improves local discoverability | MEDIUM | Increases foot traffic from map view |
| XML sitemap | Helps Google crawl all pages efficiently | LOW | Auto-generated; submit to Google Search Console |
| Mobile-friendly detection | Mobile-first indexing is Google's primary ranking signal | MEDIUM | Responsive design requirement |
| Image alt text | SEO + accessibility; images indexed by Google Images | LOW | Descriptive alt text per image |
| Fast page load times (<2.5 sec) | Google ranks fast sites higher; users bounce after 3 sec | HIGH | Requires optimization: image compression, CDN, minification |
| HTTPS/SSL certificate | Google ranking factor; required for "Secure" badge | HIGH | Most modern hosts provide free SSL |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Google Analytics setup | Measure traffic, user behavior, traffic sources | LOW | Free; enables data-driven decisions |
| Local business photos in structured data | Rich search results show business photos; increases CTR | MEDIUM | Requires adding image URLs to schema |
| Review schema integration | Display star ratings in search results | MEDIUM | Requires review collection mechanism (Google, Yelp) |

---

### Accessibility & Performance

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| WCAG 2.1 Level AA compliance | Legal requirement (ADA Title III); affects 15-20% of users | HIGH | Color contrast 4.5:1; keyboard navigation; screen reader support |
| Mobile responsiveness | 65%+ traffic is mobile; mobile-first indexing is default | MEDIUM | 320px+ mobile support; touch targets 48px+ |
| Fast page load times | Users abandon sites >3 sec; impacts SEO ranking | HIGH | Target: <2.5 sec; requires image compression, minification |
| Resizable text without loss of functionality | WCAG requirement; serves users with vision impairment | LOW | Use relative units (em, rem); test at 200% zoom |
| Form labels and accessibility | Screen reader users need explicit labels | LOW | <label for="fieldId"> pattern; ARIA labels if needed |
| Keyboard navigation support | Screen reader and motor impairment users | MEDIUM | Tab order logical; focus states visible; no keyboard traps |
| Image alt text | Accessibility + SEO; appears if image fails to load | LOW | Descriptive, not "image.jpg"; skip decorative images |
| Color not sole indicator of information | Color-blind users; WCAG requirement | LOW | Use labels, patterns, or icons in addition to color |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| WebP/AVIF image format with fallback | 25-35% smaller file sizes; faster load times | MEDIUM | Requires build process; fallback to JPEG for older browsers |
| Lazy loading for images | Defers off-screen images; improves performance | MEDIUM | Native lazy="lazy" attribute or JS library |
| Skip links | Keyboard users jump to main content instantly | LOW | Hidden by default; visible on keyboard focus |
| Dark mode toggle | Accessibility + UX differentiation | MEDIUM | Respects prefers-color-scheme; optional complexity |

---

### Content Management

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Centralized content source (single file/config) | Real content must be easy to swap in; developer should not hand-edit HTML | HIGH | YAML, JSON, or .env file; template pulls from it |
| Easy content update mechanism | Client changes hours/address rarely; developer should make updates trivially | MEDIUM | Edit one config file; rebuild/redeploy automatically or manually |
| Placeholder-to-real content swap | Template design anticipates real content arrival | MEDIUM | Structure designed for real shop name, address, photos, text |
| Design tokens for branding | Logo/colors to arrive later; swap without editing HTML | MEDIUM | CSS custom properties (--primary-color, etc.); separate token file |
| No CMS required | Updates rare; developer handles changes; avoids maintenance burden | LOW | Static site; no database; no admin panel |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Environment-based config (dev, staging, prod) | Separate content for testing vs. live | MEDIUM | .env files or separate config per environment |
| Version control for content | Track what changed and when | LOW | Config files in Git; review changes before merge |

---

### Deployment & Hosting

#### Table Stakes

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Static site hosting (Netlify/Vercel/Cloudflare) | Cheap, fast, reliable; zero backend maintenance | MEDIUM | Free tier sufficient; no server to manage |
| CDN delivery | Global distribution; ensures fast load times worldwide | LOW | Built into modern hosts (Netlify, Vercel, Cloudflare) |
| HTTPS/SSL by default | Google ranking factor; security; required for "Secure" badge | LOW | Free with Netlify, Vercel, Cloudflare Pages |
| Fast redeploy on content changes | Client requests update; should deploy in minutes | MEDIUM | Git-based CI/CD; triggers rebuild on push |

#### Differentiators

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Automatic deployment from Git | No manual upload; push to main, site updates | MEDIUM | Built into Netlify, Vercel; requires Git workflow |
| Domain registration support | Single vendor for hosting + domain | LOW | Both Netlify and Vercel offer domain registration |
| Analytics dashboard | Track visitor traffic, page views, referral sources | LOW | Google Analytics free tier; Vercel/Netlify have built-in analytics |
| Backup/rollback capability | Revert to previous version if needed | MEDIUM | Git history + deployment history in Netlify/Vercel |

---

## Anti-Features (What NOT to Build)

| Feature | Why Often Requested | Why Problematic | Alternative |
|---------|-------------------|------------------|-------------|
| Auto-playing video/animations | "Looks dynamic; keeps attention" | Destroys performance; 1+ sec load delay; accessibility nightmare; users hate it | Static hero image + optional play button for explainer |
| Pop-ups & interstitials | "Captures emails; drives signups" | Users close immediately; mobile users hate; impacts SEO; accessibility barrier | Subtle CTA in footer; link to newsletter in header |
| Live chat or chatbot | "Instant support; competitive" | Requires backend; no one to respond; looks broken; scope creep | Email form + clear response time; phone number for immediate needs |
| Newsletter signup | "Build audience; marketing channel" | Out of scope; adds complexity; maintenance burden; no strategic value for info-only site | Social media links instead; email link for direct contact |
| Product pricing | "Shows value to visitor" | Prices change; customers expect to negotiate; encourages online comparison; out of scope | "Visit us for current pricing" messaging |
| CMS (WordPress, etc.) | "Easy content updates" | Over-engineered; requires hosting, maintenance, security updates; learning curve | Simple config file + developer updates; rare content changes |
| E-commerce / Shopping cart | "Visitors want to buy online" | Completely changes business model; payment processing; inventory management; scope creep | "Visit us to purchase" clear messaging |
| Complex animations | "Modern, engaging design" | Performance killer; accessibility issues; distracts from content | Subtle CSS transitions; loading states only |
| Auto-playing music/audio | "Creates atmosphere" | Accessibility violation; annoying; users mute browser; performance hit | Optional play button if audio is truly needed |
| Social media feeds | "Shows business is active" | Feeds break when social networks change APIs; maintenance burden; slow load times | Manual post links or "Follow us" buttons instead |

---

## Feature Dependencies

```
Contact Form
    ├──requires──> Email validation
    ├──requires──> Form submission service (Formspree, etc.)
    └──enhances──> Confirmation message

Mobile Responsiveness
    └──enhances──> Local SEO (mobile-first indexing)

LocalBusiness Schema
    ├──requires──> Structured data implementation
    ├──requires──> Address, phone, hours (accurate)
    └──enhances──> Google local search visibility

Image Alt Text
    ├──enhances──> SEO (Google Images)
    └──enhances──> Accessibility (screen readers)

Embedded Google Map
    ├──requires──> Google Maps API key
    └──enhances──> Local SEO + directions

Fast Load Times
    ├──requires──> Image optimization (WebP, <200KB)
    ├──requires──> CSS/JS minification
    └──enhances──> SEO ranking

WCAG 2.1 Level AA
    ├──requires──> Keyboard navigation
    ├──requires──> Color contrast 4.5:1
    ├──requires──> Image alt text
    └──requires──> Form labels & ARIA

Design Tokens
    └──enhances──> Content swap (centralized branding)

Centralized Content Source
    ├──enhances──> Deployment ease
    └──enhances──> Client content updates

Auto-deployment from Git
    └──requires──> Centralized content source

Weekly Hours Display
    ├──requires──> Centralized data source
    └──enhances──> LocalBusiness schema
```

### Dependency Notes

- **Contact Form requires Email Validation & Form Service:** Cannot submit without error checking; messages must reach client inbox (via Formspree).
- **Mobile Responsiveness enhances Local SEO:** Google ranks mobile-first; responsive design is mandatory.
- **LocalBusiness Schema requires Accurate NAP Data:** Schema only helps if address/phone/hours match Google Business Profile exactly.
- **Image Alt Text enhances both SEO and Accessibility:** Single feature that serves two constituencies.
- **Embedded Google Map requires Google Maps API:** Must use official API key; provides location verification + directions.
- **Fast Load Times require Image Optimization:** Largest performance bottleneck for retail sites is unoptimized images.
- **WCAG 2.1 Level AA is not optional:** Legal requirement under ADA Title III (US); applies even to info-only sites.
- **Design Tokens require Centralized Content Source:** Both enable easy updates and client handoff.
- **Weekly Hours Display requires Centralized Data Source:** Hours are frequent updates; must be maintainable without touching HTML.

---

## MVP Definition

### Launch With (v1.0)

Minimum viable product. Drop everything else.

- [x] **Navigation & Layout:** Clear nav, mobile-responsive, consistent header/footer
  - Users must find pages instantly; 65%+ are on mobile.
- [x] **Home Page:** Hero, today's hours, value prop, shop photos, CTAs
  - Single most important page; sets expectations in seconds.
- [x] **What We Offer:** Categories with photos, brief descriptions (no prices)
  - Core value: "what does the shop sell?"
- [x] **About Page:** Shop story, mission, 1-2 paragraphs
  - Builds trust; required by user expectation.
- [x] **Contact & Hours Page:** Address, full hours, clickable phone/email, contact form, embedded map
  - Second most important page; enables foot traffic.
- [x] **LocalBusiness Schema:** Structured data for name, address, phone, hours
  - Local SEO; affects search ranking and rich snippets.
- [x] **Mobile Responsiveness:** Responsive design; works on 320px+ screens
  - Non-negotiable; 65%+ traffic is mobile.
- [x] **Page Titles & Meta Descriptions:** Unique per page
  - Affects search ranking and CTR.
- [x] **Image Optimization:** WebP format, <200KB, alt text
  - Balances quality with load time.
- [x] **HTTPS/SSL:** Secure connection
  - Free with Netlify/Vercel; required for trust badge.
- [x] **Centralized Content Source:** Single config file for all placeholder data
  - Enables easy real-content swap.
- [x] **Static Site Hosting:** Deploy to Netlify or Vercel (free tier)
  - Zero backend; fast; cheap; reliable.

### Add After Validation (v1.1)

Add when you have real user feedback or clear performance metrics.

- [ ] **Testimonials/Reviews:** 2-3 customer quotes on homepage
  - Trigger: User feedback says social proof increases foot traffic.
- [ ] **Featured Products Preview:** 3-4 top categories visible on homepage
  - Trigger: Analytics show users click "What We Offer" frequently.
- [ ] **Image Zoom on Click:** Lightbox for detailed product viewing
  - Trigger: Users indicate they want to see more product detail.
- [ ] **Google Analytics:** Track visitor traffic, referral sources
  - Trigger: Client wants to understand traffic patterns.
- [ ] **Social Media Links:** Links to 1-2 platforms
  - Trigger: Business is active on social; want to drive followers.
- [ ] **Announcement Banner:** Toggle for holiday hours, special news
  - Trigger: Holiday season or special events require messaging.

### Future Consideration (v2+)

Defer until product-market fit confirmed; likely not needed for this category.

- [ ] **Team Bios with Photos:** Humanize the business
  - Trigger: Competitive differentiation needed; user research indicates value.
- [ ] **Dark Mode Toggle:** A/A testing or accessibility audit requests
  - Trigger: User feedback or accessibility audit findings.
- [ ] **Lazy Loading for Images:** Performance optimization
  - Trigger: Site slows with >20 product images; visitor analytics show performance impact.
- [ ] **Environment-Based Config:** Separate dev/staging/prod content
  - Trigger: Multi-location expansion or complex testing needs.
- [ ] **Auto-Deployment from Git:** Developer preference, not user-facing
  - Trigger: Manual deployments become burdensome.
- [ ] **Response Time Expectations:** "We respond within 24 hours"
  - Trigger: Client feedback indicates response time is a barrier.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority | Notes |
|---------|------------|---------------------|----------|-------|
| Mobile Responsiveness | HIGH | HIGH | P1 | Non-negotiable; 65%+ traffic is mobile |
| Local Business Schema | HIGH | MEDIUM | P1 | Affects local search ranking |
| Contact Form | HIGH | MEDIUM | P1 | Core value: "how do I reach them?" |
| Embedded Google Map | HIGH | MEDIUM | P1 | Drives foot traffic; location verification |
| Weekly Hours Display | HIGH | LOW | P1 | #1 reason users visit |
| Page Titles & Meta | HIGH | LOW | P1 | SEO; affects ranking and CTR |
| Image Optimization | HIGH | MEDIUM | P1 | Huge performance impact; UX critical |
| WCAG 2.1 Level AA | HIGH | MEDIUM | P1 | Legal requirement (ADA Title III) |
| Clear Navigation | HIGH | LOW | P1 | User expectation; table stakes |
| Product Categories with Photos | HIGH | MEDIUM | P1 | Core value: "what do they sell?" |
| Clickable Phone/Email | MEDIUM | LOW | P1 | Accessibility + mobile experience |
| HTTPS/SSL | MEDIUM | LOW | P1 | Trust badge; required for modern web |
| Hero Section (Home) | MEDIUM | LOW | P1 | Sets context; first impression |
| Today's Hours (Home) | MEDIUM | LOW | P1 | Mobile users want to know quickly |
| Centralized Content Source | MEDIUM | MEDIUM | P1 | Enables easy real-content swap |
| Static Site Hosting | HIGH | MEDIUM | P1 | Fast, cheap, reliable; zero backend |
| Testimonials/Reviews | MEDIUM | MEDIUM | P2 | Social proof valuable but not essential |
| Featured Products (Home) | MEDIUM | MEDIUM | P2 | Nice preview; not critical |
| Google Analytics | LOW | LOW | P2 | Useful for client but not user-facing |
| Social Media Links | LOW | LOW | P2 | Nice to have if business is active |
| Image Zoom (Lightbox) | LOW | MEDIUM | P2 | Differentiator; not expected |
| Dark Mode | LOW | MEDIUM | P3 | Nice but not necessary for retail |
| Team Bios | LOW | MEDIUM | P3 | Humanization; only for differentiation |
| Newsletter Signup | LOW | MEDIUM | P3 | Out of scope; maintenance burden |
| Chat/Chatbot | LOW | HIGH | P3 | Over-engineered; scope creep |
| CMS Admin Panel | LOW | HIGH | P3 | Over-engineered; rare updates don't need it |
| E-commerce/Shopping | LOW | HIGH | P3 | Completely different business model |

**Priority Key:**
- **P1:** Must have for launch; non-negotiable
- **P2:** Should add after v1.0 validation; adds value
- **P3:** Future consideration; likely not needed or out of scope

---

## Insights & Patterns

### Mobile-First Drives Everything

65% of traffic is mobile. This isn't an "also mobile" requirement—it's the primary design constraint. Every feature must work on a 320px screen with touch interaction. Desktop is secondary. This affects:
- Image sizing (lazy load, WebP, <200KB)
- Form field sizing (48px+ touch targets)
- Navigation (no hover states; use tap-friendly buttons)
- Video/animation (loading performance on mobile networks)

### Table Stakes Are Low

Users expect basic functionality: responsive layout, clear hours, clickable contact info, photos of products, way to reach the business. The gap between "broken" and "competitive" is narrow for retail brochures. Most small business websites achieve this baseline. Differentiation isn't in feature breadth—it's in:
- Speed (load time)
- Content quality (good product photos, clear copy)
- Trust signals (testimonials, professional design)
- Local SEO (schema, NAP accuracy)

### Anti-Features Drive Scope Creep

Every anti-feature on the list is "requested by clients" because it sounds good in isolation. But each adds complexity that doesn't move the needle on core value:
- Auto-playing video looks dynamic but adds 1+ second to load time
- Chat looks responsive but requires backend + staffing
- CMS looks convenient but requires maintenance + learning curve
- E-commerce looks like revenue but changes the entire business

The discipline here is saying "no" to features that sound good but don't serve the core job: helping a visitor quickly find hours, location, what's sold, and how to reach the shop.

### Accessibility = Legal + UX

WCAG 2.1 Level AA isn't optional for US-based businesses (ADA Title III applies even to info-only sites). But it's also good UX: color contrast improves readability for everyone, keyboard navigation helps power users, alt text helps users with bad image loads. Building it in from v1.0 is cheaper than retrofitting.

### Local SEO Requires Accuracy

LocalBusiness schema only helps if address, phone, and hours are 100% accurate and match Google Business Profile exactly. A single typo breaks schema validation and reduces local search visibility. This is why a centralized data source is table stakes—update once, reflect everywhere.

### Content Shape Predicts Success

Info-only sites live or die on content quality. High-quality product photos, clear descriptions, professional copy, accurate hours—these drive foot traffic more than any feature. A site with bad photos and generic copy will fail regardless of responsive design or schema markup. Invest time in content quality; technology is secondary.

---

## Sources

- [E-commerce Best Practices - Webfor](https://webfor.com/blog/essential-website-features-for-e-commerce-success/)
- [Small Business Website Features Checklist - Studio Mesa](https://studiomesa.co/articles/small-business-website-features-checklist/)
- [Must-Have Features for Small Business Websites - Thrivethrough](https://thrivethemes.com/must-have-website-features/)
- [Mobile-First Website Benefits 2025 - ICoderz Solutions](https://www.icoderzsolutions.com/blog/mobile-first-website-importance-for-businesses/)
- [Local SEO Guide 2026 - Boulder SEO Marketing](https://boulderseomarketing.com/local-seo-a-comprehensive-guide/)
- [Local Business Schema Guide - Search Engine Journal](https://www.searchenginejournal.com/how-to-use-schema-for-local-seo-a-complete-guide/294973/)
- [Contact Us Page Guidelines - Nielsen Norman Group](https://www.nngroup.com/articles/contact-us-pages/)
- [WCAG Compliance Guide 2026 - AccessiBe](https://accessibe.com/blog/knowledgebase/web-accessibility-priority-for-retailers-in-2025)
- [Image Optimization for E-commerce 2026 - Mida](https://www.mida.so/blog/ecommerce-image-optimization)
- [Static Site Deployment: Netlify vs Vercel 2026 - Northflank](https://northflank.com/blog/vercel-vs-netlify-choosing-the-deployment-platform-in-2026)
- [Homepage Best Practices - LocalIQ](https://localiq.com/blog/homepage-examples/)
- [Common Website Mistakes 2024-2025 - Clutch](https://clutch.co/resources/common-mistakes-small-businesses-make-with-their-website)
- [Website Footer Design Best Practices - LogRocket](https://blog.logrocket.com/ux-design/website-footer-design-practices/)

---

*Feature research for: Small retail shop informational brochure website*  
*Researched: 2026-10-02*  
*Next: Use this landscape to define phase 1 roadmap; validate against PROJECT.md requirements*
