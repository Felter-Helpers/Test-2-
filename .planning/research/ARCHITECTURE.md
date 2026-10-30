# Architecture Research

**Domain:** Small static retail-shop informational website
**Researched:** 2026-10-02
**Confidence:** HIGH

## Standard Architecture

### System Overview

Small static brochure sites follow a **data-driven, component-based architecture** where a single central data file drives all site content, layout components are reused across pages, and the build process cleanly separates data ingestion from template rendering.

```
┌─────────────────────────────────────────────────────────────────┐
│                      Presentation Layer (HTML)                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Home    │  │ Services │  │  About   │  │ Contact  │        │
│  │  Page    │  │  Page    │  │  Page    │  │  Page    │        │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘        │
│       │            │            │            │              │
├───────┴────────────┴────────────┴────────────┴──────────────────┤
│             Component & Template Layer (Reusable)                │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Header/   │  │ Hero/    │  │  Card/   │  │  Form/   │      │
│  │ Navigation │  │ Banner   │  │ Grid     │  │  Map     │      │
│  └────┬───────┘  └──────────┘  └──────────┘  └──────────┘      │
│       │                                                          │
├───────┴──────────────────────────────────────────────────────────┤
│                  Data & Config Layer (YAML/JSON)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  site-data.yml                                          │   │
│  │  - Business Info (name, address, phone, email)         │   │
│  │  - Hours (daily schedule)                              │   │
│  │  - Brand Tokens (colors, logo paths, fonts)           │   │
│  │  - Content (hero text, about text, categories, images)│   │
│  │  - Form Config (endpoint, fields, validation)         │   │
│  │  - SEO (site title, description, author)              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
├─────────────────────────────────────────────────────────────────┤
│                  External Services (No Backend)                  │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Formspree   │  │  Google Maps │  │ Static Host  │          │
│  │ (Form SaaS)  │  │   Embed      │  │(Netlify etc) │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Site Data File** | Single source of truth for all content, config, branding, hours, contact info, product categories, images, SEO metadata | YAML/JSON file (site-data.yml, config.json) loaded during build |
| **Layout/Shell Component** | Wraps pages with shared header, navigation, footer; loads brand tokens for consistent styling across all pages | Reusable template (e.g., `_layouts/base.html`, `app.astro`) |
| **Page Templates** | Four specific page types (Home, Services, About, Contact) that consume data and present it via layout | Template files per page type (Jekyll/11ty/Hugo/Astro patterns) |
| **Content Components** | Reusable UI blocks (Hero banner, Product card, Contact form, Embedded map, Hours table) rendered from data | Template partials or framework components |
| **Brand Token System** | Colors, logo paths, fonts loaded from data, injected into CSS/templates for easy brand swaps | CSS variables or template variable injection from site-data |
| **Contact Form** | HTML form targeting external Formspree endpoint; accepts user input, submits to SaaS | Static HTML form, no backend logic needed |
| **SEO/Metadata Layer** | Per-page titles, descriptions, and LocalBusiness JSON-LD schema generated from site-data during build | Template-injected metadata and script tags |
| **Static Assets** | Images, CSS, JavaScript, icons hosted alongside HTML | Standard `/assets/`, `/images/`, `/css/` directories |

## Recommended Project Structure

This structure mirrors industry-standard SSG patterns (Jekyll, 11ty, Hugo foundations) adapted for brochure sites:

```
project-root/
├── _data/                     # Data layer — everything configurable
│   └── site-data.yml          # Central config: business info, hours, branding, content, images
│
├── _includes/                 # Reusable components & partials
│   ├── header.html            # Navigation, logo, shared header
│   ├── footer.html            # Footer with contact info, hours
│   ├── nav.html               # Main navigation menu
│   ├── hero.html              # Hero banner component
│   ├── product-card.html      # Product/service card (repeatable)
│   ├── contact-form.html      # Contact form (Formspree target)
│   ├── map-embed.html         # Google Maps iframe
│   ├── hours-table.html       # Opening hours display
│   └── meta-tags.html         # SEO meta, JSON-LD injection
│
├── _layouts/                  # Page template shells
│   ├── base.html              # Base layout (header, footer, nav injected)
│   ├── home.html              # Home page layout
│   ├── services.html          # What We Offer page layout
│   ├── about.html             # About page layout
│   └── contact.html           # Contact & Hours page layout
│
├── pages/                     # Page files (4 static pages)
│   ├── index.md               # Home page (uses home.html layout)
│   ├── services.md            # What We Offer page
│   ├── about.md               # About page
│   └── contact.md             # Contact & Hours page
│
├── assets/                    # Static assets
│   ├── css/
│   │   ├── main.css           # Main stylesheet (uses brand tokens)
│   │   └── responsive.css     # Mobile-first media queries
│   ├── js/
│   │   └── form-handler.js    # Optional: form validation, UX
│   └── images/
│       ├── logo.svg           # Brand logo (path in site-data)
│       ├── hero-*.jpg         # Page hero images (paths in site-data)
│       └── product-*.jpg      # Product category images
│
├── _config.yml                # Build tool config (if using Jekyll/11ty/Hugo)
├── package.json               # NPM scripts for build (if using Node-based SSG)
└── dist/                      # Build output (generated, not committed)
    └── [compiled HTML, CSS, assets]
```

### Structure Rationale

- **`_data/site-data.yml`:** Central data file is the heart of the system. All content, brand tokens, contact info lives here. Update one file → entire site updates. This enables trivial content swapping when real assets arrive.

- **`_includes/`:** Components are extracted into reusable partials for:
  - Consistency (header/footer appear identical on all pages)
  - Maintainability (update header once, affects all pages)
  - Clarity (each component has a single responsibility)
  - Testability (components can be verified independently)

- **`_layouts/`:** Page-specific shells inherit from base layout, reducing duplication. Each page template knows how to render its section of site-data.

- **`pages/`:** One markdown or template file per page. Minimal content; data comes from site-data.yml.

- **`assets/`:** CSS uses CSS variables for brand tokens (loaded from site-data). Images are organized by purpose (logos, heroes, products). JavaScript is minimal (form validation, optional enhancements).

## Architectural Patterns

### Pattern 1: Data-Driven Templating

**What:** A single site-data file contains all configurable content (text, images, hours, categories, brand colors). Templates iterate over and reference this data during build.

**When to use:** Every brochure site. This pattern makes content updates trivial and avoids scattering data across multiple files.

**Trade-offs:**
- Pro: One source of truth; trivial to swap in real content; no CMS needed
- Pro: Build time includes data validation, so broken data is caught immediately
- Con: File grows if site grows beyond ~5 pages (consider splitting then)
- Con: Requires understanding YAML/JSON structure (mitigated by good documentation)

**Example:**

```yaml
# _data/site-data.yml
site:
  title: "Kelvin"
  description: "A local retail shop with curated products"
  author: "Kelvin Shop"
  url: "https://kelvinshop.local"

brand:
  primary_color: "#1E40AF"
  secondary_color: "#F59E0B"
  accent_color: "#10B981"
  logo_path: "/assets/images/logo.svg"
  font_family: "Inter, sans-serif"

business:
  name: "Kelvin"
  address: "123 Main Street, Springfield, IL 62701"
  phone: "+1 (217) 555-0123"
  email: "hello@kelvin.local"
  coordinates:
    lat: 39.7817
    lng: -89.6501

hours:
  monday: "9:00 AM - 6:00 PM"
  tuesday: "9:00 AM - 6:00 PM"
  wednesday: "9:00 AM - 6:00 PM"
  thursday: "9:00 AM - 6:00 PM"
  friday: "9:00 AM - 8:00 PM"
  saturday: "10:00 AM - 5:00 PM"
  sunday: "Closed"

pages:
  home:
    hero_title: "Welcome to Kelvin"
    hero_subtitle: "Discover locally-curated essentials"
    hero_image: "/assets/images/hero-home.jpg"
    highlight_categories:
      - name: "Coffee & Tea"
        image: "/assets/images/coffee.jpg"
      - name: "Artisan Goods"
        image: "/assets/images/goods.jpg"

  services:
    title: "What We Offer"
    categories:
      - name: "Coffee & Tea"
        description: "Premium single-origin coffee and loose-leaf tea"
        image: "/assets/images/coffee.jpg"
      - name: "Books"
        description: "Curated indie and local author selections"
        image: "/assets/images/books.jpg"

  about:
    title: "About Kelvin"
    description: "Kelvin is a locally-owned shop dedicated to thoughtfully-sourced products and community..."
    image: "/assets/images/about.jpg"

  contact:
    title: "Visit Us"
    description: "We're located in downtown Springfield..."

form:
  endpoint: "https://formspree.io/f/YOUR_FORM_ID"
  submit_text: "Send Message"

seo:
  locale: "en_US"
  business_type: "LocalBusiness"
```

Then in templates:

```html
<!-- _includes/header.html -->
<header style="background-color: var(--primary-color);">
  <img src="{{ site.brand.logo_path }}" alt="{{ site.business.name }}">
  <nav>
    <a href="/">Home</a>
    <a href="/services">What We Offer</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
  <a href="tel:{{ site.business.phone }}" class="cta-button">
    Call us: {{ site.business.phone }}
  </a>
</header>

<!-- pages/services.md layout: services -->
<section class="categories">
  {% for category in site.pages.services.categories %}
    <div class="product-card">
      <img src="{{ category.image }}" alt="{{ category.name }}">
      <h3>{{ category.name }}</h3>
      <p>{{ category.description }}</p>
    </div>
  {% endfor %}
</section>
```

### Pattern 2: Shared Layout Hierarchy (Template Inheritance)

**What:** All pages inherit from a base layout that provides header, navigation, footer, and meta tags. Page-specific layouts override sections as needed.

**When to use:** Any site with 2+ pages sharing visual structure. Reduces duplication and ensures consistency.

**Trade-offs:**
- Pro: Header/footer updates affect all pages instantly
- Pro: Brand tokens applied consistently
- Con: Requires understanding template inheritance (mostly a one-time learning curve)

**Example (Jekyll/11ty/Astro pattern):**

```html
<!-- _layouts/base.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ page_title }} | {{ site.business.name }}</title>
  <meta name="description" content="{{ page_description }}">
  <style>
    :root {
      --primary-color: {{ site.brand.primary_color }};
      --secondary-color: {{ site.brand.secondary_color }};
      --accent-color: {{ site.brand.accent_color }};
    }
  </style>
  {% include 'meta-tags.html' %}
</head>
<body>
  {% include 'header.html' %}
  <main>
    {{ content }}
  </main>
  {% include 'footer.html' %}
</body>
</html>

<!-- _layouts/services.html -->
---
layout: base
---
<section class="page-hero">
  <h1>{{ site.pages.services.title }}</h1>
</section>
<section class="services-grid">
  {{ content }}
</section>
```

### Pattern 3: Component-Based Forms (Formspree Integration)

**What:** Contact form is a static HTML component that POSTs to Formspree (external SaaS). No backend code needed; form submission handled entirely by third-party service.

**When to use:** Any static site needing email submissions. Formspree is free for ~1000 submissions/month.

**Trade-offs:**
- Pro: Zero backend to maintain; handled by SaaS provider
- Pro: Spam protection, email delivery, optional dashboard included
- Con: Depends on external service availability
- Con: No custom backend logic possible (but not needed for simple brochure)

**Example:**

```html
<!-- _includes/contact-form.html -->
<form method="POST" action="{{ site.form.endpoint }}">
  <fieldset>
    <legend>Send us a message</legend>
    
    <div class="form-group">
      <label for="name">Your Name</label>
      <input id="name" type="text" name="name" required>
    </div>
    
    <div class="form-group">
      <label for="email">Your Email</label>
      <input id="email" type="email" name="email" required>
    </div>
    
    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" required></textarea>
    </div>
    
    <button type="submit">{{ site.form.submit_text }}</button>
  </fieldset>
</form>
```

The form requires no build-time logic; Formspree's frontend code handles submission.

### Pattern 4: JSON-LD Schema Generation During Build

**What:** LocalBusiness structured data is generated at build time from site-data, injected into page `<head>` as a `<script>` tag. Improves SEO for local search.

**When to use:** Any local business site. Google prioritizes sites with valid schema markup.

**Trade-offs:**
- Pro: Generates automatically from site-data; no manual JSON-LD edits needed
- Pro: Reduces SEO overhead; improves local search visibility
- Con: Requires understanding JSON-LD structure (tooling abstracts this)

**Example:**

```html
<!-- _includes/meta-tags.html -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="{{ site.brand.primary_color }}">

<!-- LocalBusiness JSON-LD Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "{{ site.business.name }}",
  "description": "{{ site.description }}",
  "url": "{{ site.url }}",
  "logo": "{{ site.url }}{{ site.brand.logo_path }}",
  "image": "{{ site.url }}/assets/images/hero-home.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{ site.business.address }}",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "{{ site.business.coordinates.lat }}",
    "longitude": "{{ site.business.coordinates.lng }}"
  },
  "telephone": "{{ site.business.phone }}",
  "email": "{{ site.business.email }}",
  "sameAs": [
    "https://www.facebook.com/...",
    "https://www.instagram.com/..."
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday",
      "opens": "09:00",
      "closes": "18:00"
    },
    ...
  ]
}
</script>

<!-- Sitemap (also auto-generated during build) -->
<link rel="sitemap" type="application/xml" href="/sitemap.xml">
```

## Data Flow

### Request Flow (Browser Perspective)

```
User visits site.com/services
    ↓
Static server returns pre-built HTML (cached, instant)
    ↓
Browser renders page (includes CSS, images, embedded maps, forms)
    ↓
User interacts (form submission, map interaction, click-to-call links)
    ↓
Form POST to Formspree / Maps JS handles interaction / Phone/email link opens device actions
```

### Build-Time Data Flow (Developer/CI Perspective)

```
Developer updates site-data.yml
    ↓ (on save or git push)
Build process starts
    ├─ [1] Load & Validate Data Layer
    │   ├─ Parse site-data.yml → JSON object in memory
    │   ├─ Validate all required fields present (business info, hours, categories)
    │   ├─ Validate image paths exist
    │   ├─ Validate URLs well-formed
    │   └─ Fail fast if data invalid (prevents bad deploys)
    │
    ├─ [2] Prepare Rendering Context
    │   ├─ Inject brand tokens into CSS variable map
    │   ├─ Generate JSON-LD schema from business data
    │   ├─ Generate sitemap from page list
    │   └─ Prepare navigation menu from site structure
    │
    ├─ [3] Render Templates
    │   ├─ For each page file (home.md, services.md, about.md, contact.md):
    │   │   ├─ Read page content/front-matter
    │   │   ├─ Lookup layout template (e.g., services.html)
    │   │   ├─ Render layout with data context (site-data available to templates)
    │   │   ├─ Include partials (header, footer, nav, components)
    │   │   └─ Write output HTML to dist/
    │   │
    │   ├─ [3a] Home page: Render hero with today's hours from site-data
    │   ├─ [3b] Services page: Loop over categories from site-data, render cards
    │   ├─ [3c] About page: Insert about text and image from site-data
    │   └─ [3d] Contact page: Render form pointing to Formspree, hours, map embed
    │
    ├─ [4] Copy Static Assets
    │   ├─ Copy /assets/css/ → dist/css/ (can inject CSS variables)
    │   ├─ Copy /assets/images/ → dist/images/
    │   ├─ Copy /assets/js/ → dist/js/
    │   └─ Minify/optimize if configured
    │
    └─ [5] Deploy to Static Host
        ├─ Push /dist/ to Netlify/Vercel/Cloudflare Pages
        ├─ CDN caches HTML globally
        └─ Site live instantly (no runtime, no cache invalidation delays)
```

### Key Data Flows

1. **Content Update Flow:** Edit site-data.yml → Rebuild → All pages reflect changes (no per-page edits needed)

2. **Brand Token Flow:** site-data.yml `brand.primary_color` → CSS `--primary-color` variable → All pages use consistent color

3. **Page Rendering Flow:** Page file + Layout template + site-data context → Final HTML with content, branding, SEO

4. **Form Submission Flow:** User fills form on /contact → POST to Formspree endpoint → Email sent to client inbox (no backend)

5. **SEO Flow:** site-data.yml business info → JSON-LD schema template → `<script>` tag in page head → Search engines crawl structured data

## Build Order (Dependencies)

The build process must follow this strict order to ensure all data is available when needed:

```
1. Load & Validate Data
   └─ Load site-data.yml
   └─ Validate all required fields
   └─ Check file paths exist
   └─ Fail if any issues (prevents broken deploys)

2. Generate Build Context
   ├─ Prepare CSS variable map from brand tokens
   ├─ Generate JSON-LD schema
   ├─ Generate sitemap structure
   └─ Prepare navigation index

3. Render All Pages (PARALLELIZABLE)
   ├─ For each page:
   │  ├─ Load page markdown/template
   │  ├─ Inject full site-data context
   │  ├─ Resolve layout template
   │  ├─ Render all includes/partials
   │  ├─ Inject meta tags (from site-data + JSON-LD)
   │  └─ Write HTML to dist/
   └─ All pages now have consistent data/branding

4. Copy & Process Assets
   ├─ Copy images
   ├─ Copy/process CSS (inject variables)
   ├─ Copy JavaScript
   └─ Copy other static files

5. Generate Metadata Files
   ├─ Generate sitemap.xml (from pages + site-data)
   ├─ Generate robots.txt
   └─ Generate .htaccess or netlify.toml redirects

6. Deploy
   └─ Upload dist/ to static host
```

### Why This Order Matters

- **Data first:** Templates can't render without data. Loading and validating data upfront prevents half-built sites from deploying.
- **Context preparation:** CSS variables and JSON-LD are computed once, then injected into every page (don't recompute per page).
- **Parallel rendering:** Once data is loaded, all pages can render independently (modern SSGs parallelize this step).
- **Assets last:** By the time assets are copied, all HTML is built. If an image is missing, we already know during step 1 (validation).
- **Metadata last:** Sitemap generation needs to know all final page paths; must happen after pages are rendered.

### Build-Time vs. Runtime

**Build-time (happens once, during deployment):**
- Load data
- Validate data
- Generate HTML for all pages
- Inject branding, SEO, metadata
- Minify assets
- Deploy to CDN

**Runtime (happens per request, in browser):**
- Serve pre-built HTML (instant, cached)
- Render HTML in browser
- Load CSS, images, fonts
- Execute minimal JavaScript (form validation, analytics)
- Handle user interactions (form submit to Formspree, click-to-call, map interactions)

**Result:** No server processing; instant global delivery; minimal JavaScript in browser.

## Anti-Patterns

### Anti-Pattern 1: Scattered Content Across Multiple Files

**What people do:** Store business hours in one file, categories in another, about text in a third markdown file, brand colors in CSS, logo path in HTML.

**Why it's wrong:** Updates require editing 5+ files. Risk of inconsistency (hours in one place say "9-5", another says "9-6"). Trivial to make mistakes when real content arrives.

**Do this instead:** Keep all configurable data in a single site-data.yml file. Templates reference this file. When content arrives, edit one file and rebuild.

### Anti-Pattern 2: Hardcoding Links in Navigation

**What people do:** Write navigation as static HTML in each page or layout.

```html
<nav>
  <a href="/">Home</a>
  <a href="/services">Services</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>
```

**Why it's wrong:** Adding a page requires editing the nav component. Easy to have inconsistent navigation across pages. Hard to manage active state.

**Do this instead:** Define navigation structure in site-data, loop in nav component.

```yaml
# site-data.yml
nav:
  - label: "Home"
    url: "/"
  - label: "What We Offer"
    url: "/services"
  - label: "About"
    url: "/about"
  - label: "Contact"
    url: "/contact"
```

```html
<!-- _includes/nav.html -->
<nav>
  {% for item in site.nav %}
    <a href="{{ item.url }}" 
       class="{% if current_page == item.url %}active{% endif %}">
      {{ item.label }}
    </a>
  {% endfor %}
</nav>
```

### Anti-Pattern 3: Custom Backend for Contact Forms

**What people do:** Build a custom Node/Python/PHP backend to handle form submissions, store in database, send emails.

**Why it's wrong:** Requires server to maintain. Database adds complexity. Email delivery is a solved problem (Formspree, Netlify Functions, etc.). Over-engineered for a brochure site.

**Do this instead:** Use Formspree or equivalent SaaS. Form is static HTML; submissions go to external service. Zero backend to maintain.

### Anti-Pattern 4: Deeply Nested Component Hierarchies

**What people do:** Create component chains like `Page > Section > Container > Row > Column > Card > Text` with layers of props drilling.

**Why it's wrong:** Overkill for a brochure site. Adds cognitive overhead. Props drilling becomes complex. Components become fragile to changes.

**Do this instead:** Use flat, simple components: `Hero`, `Card`, `Form`, `Map`, `ContactInfo`. Each includes its own styling. Minimal nesting.

## Scaling Considerations

For a small brochure site with 4 pages, scaling is **not a concern during phases 1-2**. However, this architecture pattern scales gracefully if needed later:

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 4 pages (MVP) | Single `site-data.yml` file; all content in one place; build time <1s |
| 10-20 pages (small site expansion) | Split site-data.yml by section (site-config.yml, business-info.yml, content.yml); increase code organization |
| 50+ pages (blog/portfolio added) | Separate blog posts into `/blog/` with individual markdown files; use hybrid approach (data for config, markdown for dynamic content); consider headless CMS if frequent updates |
| 1000+ pages | Migrate to dynamic rendering or full CMS; this architecture maxes out around 50-100 pages before rebuild time becomes noticeable |

**For this project (4 pages):** No scaling concerns. The recommended architecture is purposefully simple. If the client later wants a blog or product catalog, that's a phase-2 or phase-3 decision (not needed for MVP).

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Formspree** | Static HTML form with `action="https://formspree.io/f/[ID]"`. No build-time integration; frontend only. | Free tier: 1000 submissions/month. Must be configured with Formspree first (get form ID). |
| **Google Maps** | Embed iframe with coordinates from site-data.yml. URL: `https://www.google.com/maps/embed?pb=...` or simpler iframe from Google Maps embed feature. | Maps API key optional if using basic embed. Coordinates stored in site-data.yml. |
| **Static Host** | Deploy `/dist/` folder to Netlify/Vercel/Cloudflare Pages via git push or CI/CD. | Automatic deployments on git push to main branch. No configuration needed beyond initial setup. |
| **Analytics (Optional)** | Inject Google Analytics or Plausible script tag via meta-tags component. Script loaded from CDN. | Doesn't affect build; pure frontend integration. |
| **Social Media (Optional)** | Store social URLs in site-data.yml; link from footer. No API integration needed. | Just links in footer to social profiles. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **site-data ↔ Templates** | Data binding (template variables access site-data.yml during build) | One-way: data flows into templates at build time. Templates read-only access to data. |
| **Layouts ↔ Includes** | Include mechanism (layouts import partials by name) | Partials are stateless; each include is independent and self-contained. |
| **Pages ↔ Layouts** | Front-matter metadata (pages declare which layout to use) | Each page references its layout; layout handles overall structure. |
| **CSS ↔ Brand Tokens** | CSS variables injected at build time | `--primary-color`, `--secondary-color` are set from site-data.yml and cascade through all stylesheets. |
| **Form Component ↔ Formspree** | HTTP POST to external endpoint | No build-time connection; purely a runtime HTTP request from browser. |

## Sources

- [Static Site Generators for Small Business: Fast, Cheap, Secure](https://www.thindglobalservices.com/blog/static-site-generators-smb.html)
- [How Static Site Generators Work with Contentful](https://www.webstacks.com/blog/contentful-static-site-generators)
- [A dependency-free build.js: assembling a static site from JSON data](https://dev.to/takahiro_hashito_a1f3f0dc/a-dependency-free-buildjs-assembling-a-static-site-from-json-data-o6n)
- [Jekyll Documentation: Directory Structure](https://jekyllrb.com/docs/structure/)
- [Using Formspree to add Contact Forms to Static Sites](https://tosbourn.com/using-formspree-for-contact-form/)
- [Add an HTML form with Formspree · Cloudflare Pages docs](https://developers.cloudflare.com/pages/tutorials/add-an-html-form-with-formspree/)
- [GitHub: JakeP3rry/localbusiness-schema-generator](https://github.com/JakeP3rry/localbusiness-schema-generator)
- [What is a brochure website? (+ Brochure site examples) - Radical Web Design](https://radicalwebdesign.co.uk/blog/what-is-a-brochure-website/)
- [Static Sites for Business: Complete Performance Guide (2025)](https://www.hungryram.com/blog/static-sites-business-websites)

---

*Architecture research for: Small static retail-shop informational website*
*Researched: 2026-10-02*
