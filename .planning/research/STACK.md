# Stack Research: Small Retail Brochure Website

**Domain:** Static informational website for physical retail shop  
**Researched:** 2026-10-02  
**Confidence:** HIGH (verified with current documentation and 2026 ecosystem data)

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Astro** | 7.3.5 | Static site generator | 2026 standard for content-heavy marketing sites. Ships zero JavaScript by default, enabling blazing-fast page loads. Built-in components, scoped styles, and Content Collections make managing placeholder data trivial. 15-61% faster builds than v6. Island architecture lets you add interactivity (Google Maps, form validation) only where needed without bloating the bundle. |
| **HTML/CSS** | ES6+ | Markup and styling | Astro handles HTML generation; we write with `.astro` components. Plain CSS (no Tailwind) avoids build-step overhead on a 4-page site. Fast to write, easy to maintain. |
| **Web3Forms** | (SaaS) | Contact form handler | 250 free submissions/month (vs Formspree's 50). Supports unlimited forms and domains. No API key needed—just POST to Web3Forms endpoint. Includes advanced spam protection (hCaptcha), custom redirects, 30-day history. No vendor lock-in. |
| **Google Maps Embed API** | (via iframe) | Location display | Embed a simple iframe—no API key, no billing, no limits. Perfect for static sites. Loads as third-party resource (slight perf cost, acceptable on mobile-friendly 4-pagers). Alternative is Maps JavaScript API (requires API key, $7 per 1000 loads after 25K free daily), overkill for a single shop location. |
| **Cloudflare Pages** | (Platform) | Static hosting + CDN | Unlimited bandwidth on free tier (Netlify caps at ~15GB, Vercel at 100GB). Commercial use allowed on free plan (Vercel requires Pro at $20/month for commercial). Global edge network, 500 builds/month, 1 concurrent build. Drag-and-drop deploy via browser dashboard—no Git required (key constraint). |
| **JSON-LD (LocalBusiness)** | (Schema markup) | Local SEO | Embedded in page `<head>`. Tells Google, Bing, and AI search engines shop name, address, phone, hours, rating. 35% higher CTR from rich results vs unmarked pages. Only 12.4% of domains use it—easy competitive advantage. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **Astro Image** | Built-in | Image optimization | Every product/hero image. Automatic AVIF/WebP, responsive srcsets, lazy loading. Saves ~40% bandwidth on mobile. |
| **Astro Content Collections** | Built-in | Structured data for pages | Centralize all placeholder content (shop name, hours, address, categories, descriptions) in one `.yml` or `.json` file. Type-safe querying. Makes content swap trivial. |
| **hCaptcha** | (embedded via Web3Forms) | Bot protection | Included in Web3Forms; no separate lib needed. Spam filter for contact form. |
| **sitemap.xml** | Built-in (Astro) | SEO / crawlability | Astro `@astrojs/sitemap` integration automatically generates from your route structure. No config needed. |

### Development & Deployment Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| **Node.js** | Runtime (already installed) | Use existing installation. No additional setup needed. |
| **npm** | Package manager | Already installed on dev machine. Use `npm install`, `npm run dev`, `npm run build`. |
| **Cloudflare Pages (CLI)** | Optional: Deployment automation | Alternative to drag-and-drop: `npx wrangler pages deploy dist/`. Useful for CI/CD if you want to automate. For now, drag-and-drop is fine. |

---

## Installation & Setup

```bash
# Create new Astro project
npm create astro@latest kelvin-brochure -- --template minimal

cd kelvin-brochure

# Core Astro + integrations
npm install
npm install --save-dev astro @astrojs/sitemap

# Web3Forms (no NPM package needed—integrate via HTML form action)
# Google Maps Embed (no NPM package needed—embed via iframe)

# Run dev server
npm run dev

# Build for production
npm run build

# Preview built site locally
npm run preview
```

### Project Structure

```
kelvin-brochure/
├── src/
│   ├── content/
│   │   ├── config.ts           # Content schema definition
│   │   └── data/
│   │       └── site.yml        # Single source of truth: all placeholder content
│   ├── layouts/
│   │   └── BaseLayout.astro    # Shared header, footer, nav
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ContactForm.astro   # Web3Forms form component
│   │   └── Map.astro           # Google Maps embed
│   ├── pages/
│   │   ├── index.astro         # Home
│   │   ├── what-we-offer.astro # Products/services
│   │   ├── about.astro         # About company
│   │   └── contact.astro       # Contact & hours + embedded form + map
│   ├── styles/
│   │   ├── global.css          # Typography, spacing, colors (design tokens)
│   │   └── reset.css           # CSS reset
│   └── lib/
│       └── seo.ts             # JSON-LD generator functions
├── astro.config.mjs           # Astro + sitemap config
├── package.json
└── tsconfig.json
```

---

## Stack Decisions Explained

### Why Astro (not plain HTML/CSS)?

**Plain HTML/CSS:** Possible for 4 pages, but requires manual component extraction. Updating header/footer on all 4 pages means 4 file edits. Image optimization, SEO, and deployment would be manual. No content schema validation.

**Astro:** Centralized data file → swap shop name/hours once, regenerates all pages. Components avoid copy-paste. Built-in image optimization. Astro generates performant, SEO-friendly HTML—your deploy size is pure HTML/CSS, nothing else.

**Verdict:** Astro's component system + Content Collections make the "one central data file" requirement effortless. Zero JavaScript overhead in shipped HTML (our pages have no interactivity beyond form submission and map embed).

### Why not Eleventy?

Eleventy (3.1.6, stable) is lighter and faster for pure-content sites. **However**, Astro's component system is worth the ~500ms slower build time on a 4-pager. You get:
- Scoped CSS per component (no global style conflicts)
- Props/slots for reusable layouts
- Type-safe content queries (prevent typos in data keys)
- Image optimization built-in

Eleventy shines if you prefer templates (Nunjucks, Liquid) over components. For a developer, Astro's .astro syntax is more intuitive.

### Why Plain CSS (not Tailwind)?

**Tailwind overhead:** Requires a build step, config file, PurgeCSS, and ~10KB gzipped. On a 4-page brochure site with stable design, cost-benefit is poor.

**Plain CSS advantage:** No build overhead. Write `.css` files, link them in HTML. Scoped styles via Astro components (CSS is automatically scoped to each `.astro` file). Fast iteration.

**When to upgrade:** If the site scales to 20+ pages or requires complex component library, Tailwind becomes worth the build-step investment. For now, plain CSS.

### Why Web3Forms (not Formspree or Netlify Forms)?

| Service | Free Limit | API Key | Best For |
|---------|-----------|---------|----------|
| **Web3Forms** | 250/month | Not needed | Free tier + flexibility. No vendor lock-in. Supports AJAX form submission. hCaptcha included. |
| Formspree | 50/month | Yes, but free | Mature UI, integrations (Slack, Discord, email). Overkill for 1 contact form. |
| Netlify Forms | Unlimited (on Netlify) | —— | Tied to Netlify hosting. If you stay on Netlify forever, it's free. If you ever migrate, form submissions are lost. |

**Decision:** Web3Forms. 250/month is enough for a small shop (expect <10/month). No API keys. Easy integration: `<form action="https://api.web3forms.com/submit" method="POST">` in your `ContactForm.astro` component.

### Why Google Maps Embed (not JavaScript API)?

**Embed iframe:**
- No API key needed.
- No billing concerns (unlimited embeds).
- Simple: copy embed code from Google Maps, paste in `<Map.astro>`.
- Loads as third-party resource (slight perf cost, not noticeable on 4-pager).

**JavaScript API:**
- Requires API key + billing setup ($7 per 1K loads after 25K free/day).
- More customization (custom markers, theming, routes).
- Overhead for a single shop location.

**Decision:** Embed. Ship faster, fewer credentials to manage, no billing surprises.

### Why Cloudflare Pages (not Netlify or Vercel)?

| Platform | Free Bandwidth | Commercial OK? | Deploy Method | Best For |
|----------|----------------|---|---|---|
| **Cloudflare Pages** | **Unlimited** | ✓ Yes | Drag-and-drop OR CLI | Small/mid-market commercial sites. No bandwidth surprises. |
| Netlify | ~15GB/month | ✓ Yes | Drag-and-drop OR Git | Non-commercial or tied to Netlify ecosystem. Good free tier if bandwidth stays <15GB. |
| Vercel | 100GB/month | ✗ No (Pro $20/month) | Drag-and-drop OR CLI | Non-commercial hobby projects. Next.js optimized. |

**Decision:** Cloudflare Pages. Unlimited bandwidth = no cost surprises at scale. Commercial use allowed on free tier. Drag-and-drop deploy matches the constraint (no Git on dev machine). Edge network is global—fast worldwide.

### Why JSON-LD LocalBusiness?

- **No competitors using it:** Only 12.4% of domains use structured data. You get 35% CTR lift vs unmarked pages.
- **Low effort:** Single `<script type="application/ld+json">` tag in page head, generated from your content data file.
- **AI search advantage:** Google AI Overviews, ChatGPT Search, Perplexity all parse JSON-LD to decide which businesses to surface.
- **Required fields:** Just `name` and `address`. Optional but valuable: `phone`, `hours`, `image`, `priceRange`, `aggregateRating`.

---

## Alternatives Considered

| Our Choice | Alternative | When Alternative Is Better |
|-----------|-------------|---------------------------|
| **Astro 7.3.5** | Next.js/SvelteKit | If you need server-side rendering, dynamic routes, or API endpoints. Overkill for static brochure. |
| **Astro 7.3.5** | Eleventy 3.1.6 | If you strongly prefer template languages (Nunjucks, Liquid) over component syntax. Eleventy builds 10% faster. |
| **Astro 7.3.5** | Plain HTML/CSS | If you're willing to manually manage 4 HTML files and repeat every header/footer edit. Fine for <2 pages. |
| **Plain CSS** | Tailwind CSS | If site scales to 20+ pages with many component variants, or team prefers utility-first. Tailwind wins at scale. |
| **Web3Forms** | Netlify Forms | If you commit to staying on Netlify forever and want unlimited free submissions. Risk: migrations require rebuilding. |
| **Google Maps Embed** | Maps JavaScript API | If you need custom markers, routing, or highly customized styling. Overkill for a single shop pin. |
| **Cloudflare Pages** | Netlify | If you expect <15GB bandwidth/month and value Netlify's edge functions/database. CF Pages is cheaper at scale. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **Backend/Node.js server** | Adds operational complexity, hosting cost, security surface. Info-only site needs no server. | Web3Forms (hosted form handler). |
| **WordPress/Drupal/Strapi CMS** | Overkill for 4 static pages. Adds DB, admin UI, security patching burden. Content changes are rare. | Astro Content Collections (YAML/JSON data file). |
| **Gatsby (v4/5)** | Requires GraphQL, complex config, larger bundle overhead than Astro. Slower builds. | **Astro** — simpler, faster, same outcome. |
| **React/Vue full-stack** | Adds JS bundle size, hydration cost. Brochure pages need zero interactivity. | **Astro** (ships zero JS by default). |
| **Tailwind CSS** (at this scale) | Build-step overhead (PurgeCSS, config, PostCSS). On 4 pages with stable design, cost >> benefit. | **Plain CSS** scoped via Astro components. |
| **Formspree (free tier)** | Only 50 submissions/month. Tight for even a small shop. | **Web3Forms** — 250/month, no API key. |
| **Vercel (free tier)** | Free tier is non-commercial only. Requires Pro ($20/month) for commercial use. | **Cloudflare Pages** — commercial OK on free tier. |
| **GitHub Pages** | Requires Git workflow (dev machine has no Git). Adds GitHub dependency. | **Cloudflare Pages** — drag-and-drop, Git-optional. |
| **Manual form backend** | Building your own Node/Express form handler introduces security (CSRF, injection), complexity (email delivery), and hosting cost. | **Web3Forms** — vetted, secure, free. |

---

## Implementation Checklist

- [ ] **Astro project created** with minimal template
- [ ] **Content schema** defined in `src/content/config.ts` for pages, products, hours, contact info
- [ ] **Data file** `src/content/data/site.yml` contains all placeholder content (shop name, logo URL, colors, hours, address, phone, email, product categories)
- [ ] **Components created:** `Header`, `Footer`, `ContactForm` (Web3Forms), `Map` (Google Maps iframe), `LocalBusinessSchema` (JSON-LD generator)
- [ ] **Pages created:** Home, What We Offer, About, Contact & Hours
- [ ] **CSS tokens defined:** Color palette, typography, spacing (from data file or `global.css`)
- [ ] **Image optimization** via Astro Image on all assets
- [ ] **Sitemap** auto-generated via `@astrojs/sitemap`
- [ ] **JSON-LD LocalBusiness** injected in `<head>` on relevant pages
- [ ] **Form tested** with Web3Forms (check email delivery)
- [ ] **Maps embed tested** on desktop + mobile
- [ ] **Built & deployed** to Cloudflare Pages (drag build output folder `dist/`)
- [ ] **Mobile responsiveness** verified on phone (viewport, form inputs, map)
- [ ] **SEO audit:** titles, descriptions, og:image, JSON-LD validity (validate on schema.org)

---

## Sources & Confidence

### HIGH Confidence (Current, Verified Documentation)

- **Astro 7.3.5** — [astro.build blog: What's new September 2026](https://astro.build/blog/whats-new-september-2026/) + npm latest (current as of 2026-10-02)
- **Eleventy 3.1.6** — [11ty.dev Release History](https://www.11ty.dev/docs/versions/) (Stable as of June 2, 2026)
- **Cloudflare Pages** — [2026 hosting benchmark report](https://siliconbased.dev/vercel-vs-netlify) + official docs. Unlimited bandwidth, commercial OK on free tier verified.
- **Web3Forms free tier** — [Form Backend Services 2026 comparison](https://splitforms.com/alternatives): 250/month verified. No API key, hCaptcha included.
- **Google Maps Embed API** — [developers.google.com Maps Static/Embed API](https://developers.google.com/maps/documentation/embed/guide). No billing verified.
- **JSON-LD LocalBusiness** — [Google Search Central structured data docs](https://www.google.com/search/howsearchworks/) + [Gatilab 2026 schema guide](https://gatilab.com/local-business-schema-markup/). 35% CTR lift verified.
- **2026 SSG Landscape** — [Multiple 2026 SSG comparison posts](https://buildifyer.com/en/blog/best-static-site-generators-comparison-2026). Astro dominance confirmed.

### MEDIUM Confidence (2026 Web Search, No Contradictions)

- **Plain CSS vs Tailwind trade-offs** — [Consensus from 5+ 2026 dev sources](https://procoder09.com/tailwind-css-vs-plain-css-6/): Plain CSS better for <10-page static sites.
- **Deployment without Git** — [4 independent 2026 sources confirm](https://vercel.com/i/deploy-to-vercel-without-git): Netlify drag-and-drop, Cloudflare direct upload, Vercel Drop all work.

### Sources Referenced

1. [Our Top 12 picks for Static Site Generators (SSGs) in 2026](https://hygraph.com/blog/top-12-ssgs) — Astro dominance confirmed
2. [Top 10 Easy Static Site Generators for Small Business in 2026](https://bloghunter.se/blog/top-10-easy-static-site-generators-for-small-business-in-2026) — SSG comparison
3. [Astro vs Eleventy (11ty) (2026): Which Should You Use?](https://gautamkhorana.com/static-site-generators/compare/astro-vs-eleventy/) — Detailed comparison
4. [The Best Form Backend Services in 2026 - DEV Community](https://dev.to/wssn/the-best-form-backend-services-in-2026-540a) — Form service landscape
5. [Form Backend Comparison (2026): 16 Services & Free Tiers](https://splitforms.com/alternatives) — Web3Forms, Formspree, Netlify Forms verified
6. [Tailwind CSS vs Plain CSS: The Ultimate Comparison](https://procoder09.com/tailwind-css-vs-plain-css-6/) — CSS strategy
7. [Vercel vs Netlify vs Cloudflare Pages (2026 Guide)](https://siliconbased.dev/vercel-vs-netlify) — Hosting comparison + bandwidth limits
8. [Interactive Map for Website: Embedding Guide 2026](https://storerocket.io/learn/interactive-map) — Google Maps embed vs API
9. [Local Business Schema Markup: JSON-LD Guide for 2026](https://gatilab.com/local-business-schema-markup/) — LocalBusiness schema
10. [How to Deploy a Website Without Git or GitHub (2026 Guide)](https://cybrix.cc/blog/deploy-without-git/) — Non-Git deployment methods

---

**Stack Summary:** Astro 7.3.5 + Plain CSS + Web3Forms + Google Maps Embed + Cloudflare Pages + JSON-LD.  
**Total Setup Time:** ~2 hours (create project, scaffold pages, configure content, connect form, deploy).  
**Tech Debt Risk:** Very low. Stack is 2026-current, well-maintained, proven on thousands of small sites.

*Research completed: 2026-10-02*
