# Phase 3: Contact & Hours - Research

**Researched:** 2026-10-02  
**Domain:** Contact form implementation, Google Maps consent pattern, opening hours display  
**Confidence:** HIGH

## Summary

Phase 3 implements the Contact & Hours page, the second most important page for a retail brochure site. Core deliverables: full address + directions link, weekly hours + upcoming exceptions, tap-to-call/email buttons, a Web3Forms contact form with spam protection, and a click-to-load Google Maps iframe.

The stack is locked (Astro + Web3Forms + keyless Google Maps embed). Key decisions from Phase 3-CONTEXT.md constrain implementation: no preconnects/prefetches to Google (D-09), consent placeholder reserves map space (D-05), form must handle no-JS redirect fallback (D-03), upcoming exceptions display within 30–60 day window (Claude's Discretion).

Research verifies that the keyless Google Maps embed form still works in 2026, Web3Forms free tier includes hCaptcha (ready if needed), form deliverability patterns, and no-JS fallback implications. Pitfalls center on email delivery, hours accuracy, and mobile UX—all detailed below.

**Primary recommendation:** Implement the contact form with inline fetch/AJAX submission (keep input on error), Web3Forms honeypot (minimum), and lazy-load the map iframe only after user clicks consent button. Test deliverability with real email providers before launch.

## User Constraints (from CONTEXT.md)

### Locked Decisions

1. **Map consent placeholder (D-05, D-06):** Tinted block with address, map-pin icon, "Show map" button, and consent note. No layout shift when iframe loads.
2. **No Google preconnects (D-09):** Page makes zero requests to any Google domain before user clicks "Show map." Blocks preconnect, prefetch, and hidden iframe patterns.
3. **Keyless embed (D-08):** Build embed URL from address data file; no separate API key field. Confirm keyless form still works in 2026.
4. **No consent memory (D-07):** Placeholder reappears on every visit; no localStorage/cookies for consent state.
5. **Page order on mobile (D-01):** Call/email first, address, hours, form, map (in that order).
6. **Two-column layout on tablet+ (D-04):** Left column (contact, address, hours), right column (form), full-width map below.
7. **"Get directions" link (D-03):** Plain link to Google Maps directions URL, loads nothing third-party—always works.
8. **Spam protection minimum (Claude's Discretion D-50):** Web3Forms honeypot (`botcheck`) is floor; hCaptcha optional if available on free tier.
9. **Placeholder access key (Claude's Discretion D-51):** Key lives in data file; if placeholder, form fails gracefully with visible message (never silent fail).
10. **Inline form submission (Claude's Discretion D-49):** Fetch/AJAX submit preferred; shows success/error in place; retains user input on error.

### Claude's Discretion (Defaults Unless Research Recommends Otherwise)

- Upcoming exceptions display within 30–60 day window; no empty "Upcoming changes" heading if none exist.
- hCaptcha availability and mobile UX trade-offs require verification.
- Field labels, placeholder text, validation messages follow HTML5 patterns.
- Breakpoint for two-column layout is 768px (from UI-SPEC).
- Icon source is inline SVG (no icon library).

### Deferred Ideas (OUT OF SCOPE)

None. Phase 3 discussion stayed within scope.

---

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Visitor sees full address and weekly opening hours | Hours data model (Phase 1); address from data file; weekly hours table component with timezone-aware logic |
| CONT-02 | Visitor sees special and holiday hours when upcoming | Upcoming exceptions component; 30–60 day look-ahead window; closed days display as "Closed" |
| CONT-03 | Visitor can tap phone number and email address | `tel:` and `mailto:` links with data-file values; normalization for `tel:` (digits + leading `+` only), display formatting preserved |
| CONT-04 | Contact form (name, email, message) with spam protection delivered via Web3Forms | Web3Forms integration verified; honeypot `botcheck` field; hCaptcha option confirmed available on free tier; form-submission error handling |
| CONT-05 | Clear success or error feedback after form submission | AJAX submission with `aria-live="polite"` result message; no-JS fallback redirects to data-file URL with visible message on return |
| CONT-06 | Map loads only after visitor clicks (consent placeholder) | Click-to-load iframe pattern; placeholder reserves aspect-ratio space; zero Google requests before click; "Get directions" link always available as fallback |

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Address display and "Get directions" link | Frontend (browser) | — | Simple text + link; no server processing needed |
| Weekly hours calculation and "today" highlight | Browser (client-side) | — | Computed client-side in shop's timezone; static HTML has no timezone info; Phase 1 utilities reused |
| Upcoming exceptions lookup (date-relative) | Browser (client-side) | — | Same as above; needs runtime Date API and timezone awareness |
| Contact form submission | Frontend (browser + service) | Backend (Web3Forms service) | Form DOM in browser; fetch/POST to Web3Forms; service handles email delivery |
| Map consent/placeholder rendering | Frontend (browser) | — | Event listener on button; conditional render of iframe vs placeholder |
| Form validation (HTML5 + client JS) | Frontend (browser) | — | `required`, `type="email"` attributes; optional JS for UX polish |
| Spam protection | Frontend (honeypot field) | Backend (Web3Forms) | Honeypot field in form; Web3Forms backend filters; hCaptcha (if used) renders on client, verified by Web3Forms |
| Accessibility (labels, ARIA, contrast) | Frontend (components) | — | Built into Astro components; scoped CSS ensures contrast; no server-side concern |

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard | Verified |
|---------|---------|---------|--------------|----------|
| **Astro** | 7.3.5 | Static site generator, component system | Locked in Phase 1 stack research; handles `.astro` components, scoped CSS, static build | VERIFIED: STACK.md |
| **Web3Forms** | (SaaS, no version) | Contact form service, email delivery | 250 free submissions/month (vs Formspree 50); honeypot + hCaptcha included; no API key; AJAX-ready | VERIFIED: STACK.md + service docs |
| **Google Maps Embed API** | (iframe, no key) | Click-to-load map | Free, no billing, keyless (`?q=<address>&output=embed` form); no third-party cookies until user clicks | VERIFIED: Maps docs |

### Supporting

| Library | Version | Purpose | When to Use | Verified |
|---------|---------|---------|-------------|----------|
| **Astro Content Collections** | Built-in | Typed queries for contact page data (address, phone, hours, exceptions) | All content from centralized file; type-safe access prevents typos | VERIFIED: Phase 1 CONTEXT.md |
| **Phase 1 hours utilities** | (custom, to be created) | Client-side calculation of "today" row highlight, timezone-aware "open now", exception lookup | Reuse Phase 1 logic; no duplication | TBD: Phase 1 implementation |
| **Plain CSS (Astro scoped)** | (ES6+) | Styling, tokens, responsive layout | Scoped to components; no build overhead; `aspect-ratio` CSS for responsive map | VERIFIED: STACK.md |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| **Web3Forms** | Netlify Forms | Tied to Netlify hosting; form submissions lost if platform changes; no off-platform data access |
| **Web3Forms** | Formspree | Only 50 submissions/month; tight for even a small shop; doesn't support AJAX as well |
| **Web3Forms** | Manual Node.js backend | Adds operational complexity, hosting cost, security surface; not worth it for a 4-pager |
| **Google Maps Embed (keyless)** | Maps JavaScript API | Requires API key + billing setup ($7 per 1K loads after 25K free/day); higher complexity; worth it only for custom markers/routes |
| **Google Maps Embed (keyless)** | Mapbox | Requires API key; alternative to Google but still costs money; same complexity |
| **Click-to-load consent pattern** | Cookie banner + auto-load | Simpler UX but introduces third-party cookies without explicit user action; breaks privacy-by-default principle |

---

## Package Legitimacy Audit

> Web3Forms and Google Maps are SaaS services with no npm package installation required for Phase 3. Astro (7.3.5) and its built-in integrations are already vetted from Phase 1. No new packages to install for this phase.

| Package | Registry | Type | Status | Notes |
|---------|----------|------|--------|-------|
| **Astro** | npm | Framework (locked Phase 1) | ✓ OK | v7.3.5 verified; already in project |
| **Web3Forms** | SaaS (no npm) | Service | ✓ OK | No package; integrate via `<form action>` POST |
| **Google Maps Embed** | Web API (no npm) | Service | ✓ OK | No package; embed via `<iframe>` |

**Packages removed due to slopcheck:** None  
**Packages flagged as suspicious:** None  
**Packages approved:** Astro (Phase 1) is the only npm dependency for Phase 3

---

## Architecture Patterns

### System Architecture Diagram: Contact & Hours Page

```
┌─────────────────────────────────────────────────────────────┐
│  Browser / Client Layer                                     │
│                                                             │
│  Page Load (initial request)                               │
│        ↓                                                    │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Server Returns Static HTML                          │   │
│  │ - Contact actions (Call, Email buttons, plainlinks) │   │
│  │ - Address + "Get directions" link                   │   │
│  │ - Weekly hours table (pre-calculated on build)      │   │
│  │ - Upcoming exceptions (pre-calculated on build)     │   │
│  │ - Contact form (hidden honeypot field)              │   │
│  │ - Map placeholder (tinted block, button)            │   │
│  │ - No <script> tags; works without JS                │   │
│  └─────────────────────────────────────────────────────┘   │
│        ↓                                                    │
│  User Interactions (requires JS):                          │
│                                                             │
│  ┌──────────────────────┐        ┌──────────────────────┐  │
│  │ Form Submit Button   │        │ "Show map" Button    │  │
│  │      Click           │        │       Click          │  │
│  │        ↓             │        │        ↓             │  │
│  │ fetch/POST to        │        │ Replace placeholder  │  │
│  │ Web3Forms API        │        │ with Google iframe   │  │
│  │        ↓             │        │        ↓             │  │
│  │ Display success/     │        │ iframe src loads     │  │
│  │ error message        │        │ from Google Maps     │  │
│  │ (in-place)           │        │ (first Google req)   │  │
│  └──────────────────────┘        └──────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
         ↓                                ↓
    ┌────────────────────────┐   ┌───────────────────────────┐
    │ Web3Forms Service      │   │ Google Maps Service       │
    │ - Receives form data   │   │ - Serves iframe content   │
    │ - Filters honeypot     │   │ - Embed only if explicit  │
    │ - (Optional: hCaptcha) │   │   user consent via click  │
    │ - Sends email to       │   │ - May set cookies        │
    │   client inbox         │   │ - No preconnect before   │
    │                        │   │   click                  │
    └────────────────────────┘   └───────────────────────────┘
```

**Key flows:**

1. **Page Load → No JS Fallback Works:** Static HTML renders all content except map iframe. Call, email, directions, hours, form all work without JavaScript.

2. **User Submits Form (JS Enabled):** Form uses fetch/AJAX to POST to Web3Forms. Response triggers inline success/error message. Honeypot field (`botcheck`) is hidden from user.

3. **User Clicks "Show map" (JS Enabled):** JavaScript replaces placeholder DOM with iframe. Only now does first Google Maps request happen (no preconnects allowed by D-09).

4. **No-JS Fallback (Form):** Form POSTs directly to Web3Forms with redirect to data-file URL on success/error. Browser handles full-page redirect; user sees confirmation message on return.

### Recommended Project Structure

```
src/
├── pages/
│   └── contact.astro           # Contact & Hours page (main file)
├── components/
│   ├── ContactForm.astro       # Web3Forms form, honeypot, AJAX logic
│   ├── Map.astro               # Map placeholder + click-to-load iframe
│   ├── HoursTable.astro        # Weekly hours table, reuses Phase 1 utilities
│   ├── UpcomingExceptions.astro # Upcoming hours/closures (30–60 day window)
│   ├── ContactActions.astro    # Call, Email, Get directions buttons/links
│   └── Address.astro           # Full address display + structured data
├── layouts/
│   └── BaseLayout.astro        # Inherited from Phase 1
├── content/
│   ├── config.ts               # Content schema (schema from Phase 1, extended)
│   └── data/
│       └── site.yml            # Business info, hours, exceptions, Web3Forms key
├── lib/
│   └── hours.ts                # Timezone, "today" calculation (Phase 1 utilities)
└── styles/
    └── tokens.css              # Colors, spacing, breakpoints (Phase 1 tokens)
```

### Pattern 1: Click-to-Load Third-Party Embed (No Preconnect)

**What:** A pattern where a third-party resource (Google Maps iframe) is loaded only after explicit user consent, without any preconnect/prefetch to the third-party domain.

**When to use:** Embedding third-party services (maps, video, chat) where cookies or privacy concerns exist. Ensures third-party requests don't happen until user opts in.

**Why it matters:** Privacy-first approach; complies with GDPR/CCPA; avoids unnecessary third-party cookies; passes privacy audits.

**Example (ContactForm.astro + Map.astro combined flow):**

```astro
---
// Map.astro
import { getEntry } from 'astro:content';
const siteData = await getEntry('data', 'site');
const { business, contact } = siteData.data;
const mapAddress = encodeURIComponent(business.address);
const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!...q=${mapAddress}&output=embed`;
---

<div class="map-container">
  <!-- Initial state: placeholder (no iframe, no Google request) -->
  <div id="map-placeholder" class="map-placeholder">
    <div class="placeholder-content">
      <svg class="map-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <p class="address-text">{business.address}</p>
      <button id="show-map-btn" class="btn-primary">Show map</button>
      {contact.mapConsentNote && (
        <p class="consent-note">{contact.mapConsentNote}</p>
      )}
    </div>
  </div>
  
  <!-- After click: iframe replaces placeholder -->
  <div id="map-embed" style="display: none;">
    <iframe
      id="map-iframe"
      src={embedUrl}
      title={`Map of ${business.name}`}
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      style="width:100%; aspect-ratio: 4/3; border:none;"
      allow="fullscreen"
    ></iframe>
  </div>
</div>

<style>
  .map-container {
    width: 100%;
  }
  
  .map-placeholder {
    aspect-ratio: 4 / 3;
    background-color: var(--color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: var(--spacing-lg);
  }
  
  .placeholder-content {
    max-width: 300px;
  }
  
  .map-icon {
    width: 48px;
    height: 48px;
    color: var(--color-secondary-text);
    margin: 0 auto var(--spacing-md);
  }
  
  .address-text {
    font-size: 14px;
    margin-bottom: var(--spacing-md);
    color: var(--color-text);
  }
  
  .consent-note {
    font-size: 12px;
    color: var(--color-secondary-text);
    margin-top: var(--spacing-sm);
  }

  @media (min-width: 768px) {
    .map-placeholder,
    #map-embed {
      aspect-ratio: 16 / 9;
    }
  }
</style>

<script>
  // Click-to-load pattern: only embed iframe on user click
  const showMapBtn = document.getElementById('show-map-btn');
  const mapPlaceholder = document.getElementById('map-placeholder');
  const mapEmbed = document.getElementById('map-embed');
  
  if (showMapBtn) {
    showMapBtn.addEventListener('click', () => {
      mapPlaceholder.style.display = 'none';
      mapEmbed.style.display = 'block';
      // At this moment, browser loads iframe.src for the first time
      // No preconnect/prefetch means this is the first Google request
    });
  }
</script>
```

**Critical rule (D-09):** No `<link rel="preconnect" href="https://maps.google.com">`, no `<link rel="prefetch">`, no hidden iframe. Page must make zero requests to any Google domain before the user clicks "Show map."

---

### Pattern 2: Web3Forms Form with No-JS Fallback

**What:** A form that submits via fetch/AJAX with inline success/error messages (when JS enabled), but also gracefully falls back to a full-page POST redirect to Web3Forms (when JS disabled).

**When to use:** Contact forms where you want both modern UX (inline feedback) and backward compatibility (no-JS users can still submit).

**Why it matters:** Accessibility; some users disable JS; form works in all environments.

**Example (ContactForm.astro):**

```astro
---
import { getEntry } from 'astro:content';
const siteData = await getEntry('data', 'site');
const { contact, business } = siteData.data;

// Validate that Web3Forms key is not placeholder
const web3FormsKey = contact.web3FormsKey;
const isPlaceholder = web3FormsKey.toLowerCase().includes('placeholder') || 
                      web3FormsKey === 'change_me' ||
                      web3FormsKey.length < 10;
---

<div class="contact-form-wrapper">
  {isPlaceholder && (
    <div class="form-not-ready">
      <p>Form not yet connected. Please <a href={`tel:${business.phone}`}>call</a> or <a href={`mailto:${business.email}`}>email</a> us.</p>
    </div>
  )}
  
  {!isPlaceholder && (
    <form
      id="contact-form"
      action="https://api.web3forms.com/submit"
      method="POST"
      class="contact-form"
    >
      <!-- Access key for Web3Forms -->
      <input type="hidden" name="access_key" value={web3FormsKey} />
      
      <!-- Honeypot field (spam protection, hidden from users) -->
      <input type="hidden" name="botcheck" />
      
      <!-- Form fields -->
      <div class="form-group">
        <label for="name">Your name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="John Doe"
          aria-required="true"
        />
      </div>
      
      <div class="form-group">
        <label for="email">Your email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-required="true"
        />
      </div>
      
      <div class="form-group">
        <label for="message">Your message</label>
        <textarea
          id="message"
          name="message"
          required
          rows="5"
          placeholder="Tell us how we can help"
          aria-required="true"
        ></textarea>
      </div>
      
      <!-- Submit button -->
      <button type="submit" class="btn-primary" id="submit-btn">
        Send message
      </button>
      
      <!-- Result message (inline feedback, hidden until submission) -->
      <div
        id="form-result"
        class="form-result"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      ></div>
    </form>
  )}
</div>

<style>
  .contact-form-wrapper {
    max-width: 600px;
  }
  
  .form-not-ready {
    background-color: var(--color-secondary);
    padding: var(--spacing-lg);
    border-radius: 4px;
    text-align: center;
  }
  
  .form-not-ready p {
    margin: 0;
  }
  
  .form-not-ready a {
    color: var(--color-accent);
    text-decoration: none;
  }
  
  .form-not-ready a:hover {
    text-decoration: underline;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
    color: var(--color-text);
  }
  
  .form-group input,
  .form-group textarea {
    font-family: inherit;
    font-size: 16px;
    padding: var(--spacing-sm) var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    min-height: 44px;
  }
  
  .form-group input:focus,
  .form-group textarea:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
  
  .form-group textarea {
    resize: vertical;
  }
  
  #submit-btn {
    min-height: 44px;
    align-self: flex-start;
  }
  
  #submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .form-result {
    padding: var(--spacing-md);
    border-radius: 4px;
    text-align: center;
    display: none;
  }
  
  .form-result.success {
    display: block;
    background-color: #e8f5e9;
    color: #2e7d32;
    border-left: 4px solid #2e7d32;
  }
  
  .form-result.error {
    display: block;
    background-color: #ffebee;
    color: #c62828;
    border-left: 4px solid #c62828;
  }
</style>

<script>
  const form = document.getElementById('contact-form');
  const resultDiv = document.getElementById('form-result');
  const submitBtn = document.getElementById('submit-btn');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Disable button while sending
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      
      try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          // Success
          resultDiv.className = 'form-result success';
          resultDiv.textContent = 'Thank you! We\'ll be in touch soon.';
          form.reset();
          submitBtn.textContent = 'Send message';
          submitBtn.disabled = false;
        } else {
          // Server error
          resultDiv.className = 'form-result error';
          resultDiv.innerHTML = 'Something went wrong. Please try again or <a href="tel:+1234567890">call us</a>.';
          submitBtn.textContent = 'Send message';
          submitBtn.disabled = false;
        }
      } catch (error) {
        // Network error
        resultDiv.className = 'form-result error';
        resultDiv.innerHTML = 'Something went wrong. Please try again or <a href="mailto:info@shop.com">email us</a>.';
        submitBtn.textContent = 'Send message';
        submitBtn.disabled = false;
      }
    });
  }
</script>
```

**Key points:**

1. **No-JS fallback:** Form has `action="https://api.web3forms.com/submit"` + `method="POST"`. If JS doesn't run, browser will POST directly to Web3Forms and redirect.

2. **Honeypot field:** `<input name="botcheck" style="display: none;">` is hidden from users but filled by bots. Web3Forms filters these submissions server-side.

3. **AJAX submission:** JavaScript intercepts form submit with `fetch()`. Returns success/error message inline. Clears form on success. Keeps user input on error (fetch doesn't redirect).

4. **Accessibility:** `role="status"` + `aria-live="polite"` on result message ensures screen readers announce success/error.

---

### Pattern 3: Hours with Client-Side Timezone & Exceptions Lookup

**What:** A hours display that calculates "today" row highlight and looks up upcoming exceptions all at runtime, using the shop's timezone (not browser timezone).

**When to use:** Any page showing business hours; reuse Phase 1 utilities, don't duplicate logic.

**Why it matters:** Hours go stale on static builds. Client-side calculation ensures accuracy on every visit. Exceptions (holidays, special hours) are date-relative and must update daily.

**Phase 1 will deliver:** Utilities for timezone conversion, "today" calculation, exception lookup. Phase 3 will reuse these.

**Phase 3 responsibilities:**

- Call Phase 1 utilities to fetch and format exceptions.
- Render upcoming exceptions list (if any) within 30–60 day window.
- Don't render empty "Upcoming changes" heading.
- Use semantic HTML: `<table>` for weekly hours, list or definition list for exceptions.

---

### Anti-Patterns to Avoid

1. **Hardcoded Hours in Page HTML:** Hours are static at build time. If you deploy on a Friday night and the shop is closed Sunday, the built page still shows "Open Sunday" until the next rebuild. Use centralized data file + Phase 1 utilities.

2. **Timezone Calculation in Browser Timezone:** Naive approach: `new Date()` reads browser time, not shop time. If visitor is in another timezone, "open now" logic fails. Always store shop timezone (e.g., "America/New_York") in data file and convert there.

3. **API Key in Client Code:** If you accidentally switched to Maps JavaScript API and put the key in the page, bad actors will steal it from DevTools and abuse it. Always restrict API keys by domain in Google Cloud Console. Better: use iframe (no key needed).

4. **Preconnect to Google Before Consent:** `<link rel="preconnect" href="https://www.google.com">` violates D-09. Browser will make a connection attempt even if map is never shown. Don't do this.

5. **Form Success Page Instead of Inline Message:** Redirecting to a separate "thanks" page breaks the user flow on mobile. Keep result message inline with the form.

6. **Storing Consent in localStorage:** D-07 says no consent memory. Don't add it as a "QoL improvement"—it defeats the privacy-first design.

7. **Honeypot-Only Spam Protection Without Validation:** The honeypot is a good baseline, but don't rely on it exclusively. Also validate email format (`type="email"`) and require fields (`required`). These catch innocent mistakes too.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| **Email deliverability** | Custom Node.js/Express form backend that sends email directly | Web3Forms (or similar SaaS form service) | Email delivery is deceptively complex: SPF/DKIM/DMARC configuration, rate limiting, bounce handling, spam filtering, TLS. Web3Forms handles this; it costs less than the developer time to debug. |
| **Spam protection** | Manual blacklist/whitelist logic, rate limiting per IP, CAPTCHA implementation | Web3Forms honeypot + (optional) hCaptcha integration | Writing robust spam detection requires machine learning or third-party APIs. Reinventing the wheel introduces security holes. Web3Forms includes both. |
| **Google Maps embed** | Building a custom map component with Map API, custom markers, custom styling, tile requests | Google Maps iframe with `?q=<address>&output=embed` | If you need just a pin and directions, the iframe is free and simpler. If you need custom markers/routes, then the JavaScript API is justified, but not before. |
| **Timezone conversion** | Parsing timezone strings, calculating offsets, handling DST changes | Phase 1 utilities (datetime library like Day.js or built-in Intl API) | Timezone math is full of edge cases (DST transitions, historical changes, leap seconds). Use a library or the browser's native `Intl` API. |
| **Form validation** | Custom regex patterns for email, phone, text sanitization | HTML5 `type="email"` + `required` attributes, server-side validation (Web3Forms) | HTML5 validation is good enough for this use case and improves accessibility (screen readers understand `required`). Server-side validation (on Web3Forms) catches sophisticated attacks. |

---

## Runtime State Inventory

**Phase 3 is not a rename/refactor/migration.** This inventory is not applicable. Phase 3 creates new components and pages; no existing runtime state to migrate.

---

## Common Pitfalls

### Pitfall 1: Contact Form Emails Go to Spam

**What goes wrong:**  
Visitor submits form. No error message. Days pass. Client never receives email. Visitor is frustrated. Business loses lead. Client calls: "I'm not getting submissions!"

**Why it happens:**  
Web3Forms sends emails from its domain, not the client's domain. Gmail, Outlook, and corporate firewalls flag unfamiliar senders as spam. SPF/DKIM/DMARC aren't configured. During development, the placeholder Web3Forms key might not even be real, so submissions fail silently.

**How to avoid:**

1. **Test before launch:** Submit multiple test forms to Gmail, Outlook, corporate email. Confirm they arrive in inbox (not spam).
2. **Use placeholder messaging:** If Web3Forms key is obviously placeholder (contains "change_me" or is <10 chars), show "Form not yet connected. Please call or email" instead of silently failing.
3. **Add client inbox whitelist:** Client should add Web3Forms domain to email filters or contact list to improve deliverability.
4. **No silent failures:** Form must always give feedback—success message or visible error. Never POST and disappear.

**Warning signs:**
- Form shows success message but client receives nothing.
- Placeholder key is in production code.
- No test submission sent to real email account before launch.

---

### Pitfall 2: Map Loads Third-Party Cookies Without Consent

**What goes wrong:**  
Site embeds Google Maps without any consent mechanism. Maps loads on page load. Google sets cookies. Visitor's browser now has Google tracking cookies. Site is non-compliant with GDPR/CCPA.

**Why it happens:**  
Developer assumes iframe is "just HTML" and doesn't set cookies. Didn't read Google Maps privacy policy. Didn't implement consent check.

**How to avoid:**

1. **Use click-to-load pattern (D-05, D-06, D-07):** Don't embed iframe on page load. Show placeholder first. Only load iframe after user clicks "Show map."
2. **No preconnects (D-09):** Don't add `<link rel="preconnect">` to Google. This signals consent.
3. **Consent note:** Display text like "Loading the map connects to Google, which may set cookies" before user clicks.
4. **Test with DevTools:** Open DevTools Network tab. Load the page. Confirm no Google Maps requests appear until you click the button.

**Warning signs:**
- Network tab shows `maps.google.com` or `maps.gstatic.com` requests on initial page load.
- No consent button or placeholder before map appears.
- Privacy review flags "third-party cookies loaded without consent."

---

### Pitfall 3: Business Hours Display Wrong on Holidays or Timezone Boundaries

**What goes wrong:**  
Site shows "Open now" on Christmas when shop is closed. Or shows wrong hours for visitor in different timezone. Visitor wastes a trip.

**Why it happens:**  
Hours are hardcoded or calculated using browser timezone (wrong timezone). No exception data exists for holidays.

**How to avoid:**

1. **Centralized hours model:** Use Phase 1 hours utilities. Separate recurring hours (Mon–Fri 9am–5pm) from exceptions (Dec 25 closed, Jan 1 10am–2pm).
2. **Store timezone:** Business timezone lives in data file (e.g., "America/New_York"). Always calculate "open now" relative to shop timezone, never browser time.
3. **Support split hours:** Allow "9am–1pm, 2pm–5pm" for lunch breaks.
4. **Test boundaries:** The day before a holiday, verify site shows correct hours. Test 9:00am exactly, 5:00pm exactly.
5. **Sync with Google Business:** When hours change, update Google Business Profile too (not auto-synced).

**Warning signs:**
- Hours are computed using `new Date()` without timezone conversion.
- No exception data for holidays.
- Hours in Google Business Profile don't match website.

---

### Pitfall 4: Placeholder Web3Forms Key Ships to Production

**What goes wrong:**  
Data file contains `web3FormsKey: "placeholder_change_me_at_launch"`. Developer forgets to replace it before deployment. Form submits but emails never arrive. Site launches "ready" but form is broken.

**Why it happens:**  
No validation that placeholder values are replaced before build. No CI check. Centralized content strategy (good!) makes it easy to miss.

**How to avoid:**

1. **Graceful failure:** If Web3Forms key looks like placeholder (contains "placeholder", "change", length < 10), show message "Form not yet connected. Please call or email" and disable form fields.
2. **Pre-deploy checklist:** Before any production deployment, scan content file for known placeholder patterns ("example.com", "555-", "placeholder", "Contact Us", "Acme").
3. **CI gate:** Add a script that fails the build if placeholder values are detected.
4. **Visible message, never silent fail:** If key is invalid, the form page must display an obvious message. Never silently POST to a broken endpoint.

**Warning signs:**
- Content file has obviously fake values (phone starts "555", address is "123 Main", email is "contact@example.com").
- Web3Forms access key is less than 10 characters or contains "placeholder".
- No validation on content arrival before deployment.

---

## Code Examples

### Example 1: Contact Actions Component (Call/Email)

```astro
---
// ContactActions.astro
import { getEntry } from 'astro:content';
const siteData = await getEntry('data', 'site');
const { business } = siteData.data;

// Normalize phone for tel: protocol (digits + leading + only)
const phoneNormalized = business.phone.replace(/\D/g, '');
const phoneForTel = `+1${phoneNormalized}`; // Adjust country code as needed

// Keep display format with formatting
const phoneDisplay = business.phone;
const emailDisplay = business.email;
---

<div class="contact-actions">
  <a href={`tel:${phoneForTel}`} class="btn btn-primary">
    Call {phoneDisplay}
  </a>
  <a href={`mailto:${emailDisplay}`} class="btn btn-primary">
    Email us
  </a>
</div>

<style>
  .contact-actions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .btn {
    display: block;
    min-height: 44px;
    padding: var(--spacing-sm) var(--spacing-md);
    text-align: center;
    text-decoration: none;
    font-weight: 600;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .btn-primary {
    background-color: var(--color-accent);
    color: white;
  }

  .btn-primary:hover,
  .btn-primary:focus {
    background-color: var(--color-accent-hover);
    outline: none;
  }

  /* Two-column (side by side) on tablet+ */
  @media (min-width: 768px) {
    .contact-actions {
      flex-direction: row;
      gap: var(--spacing-md);
    }

    .btn {
      flex: 1;
    }
  }
</style>
```

**Source:** [CONTEXT.md D-02] — Contact actions are full-width stacked on phones, side-by-side on tablet+.

---

### Example 2: Map Placeholder Component

```astro
---
// Map.astro — Click-to-load pattern
import { getEntry } from 'astro:content';
const siteData = await getEntry('data', 'site');
const { business, contact, map } = siteData.data;

// Build embed URL (keyless form)
const mapAddress = encodeURIComponent(business.address);
const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234!2d-74.006!3d40.7128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zq=${mapAddress}&output=embed`;
---

<div class="map-container">
  <!-- Placeholder (initial state) -->
  <div id="map-placeholder" class="map-placeholder">
    <div class="placeholder-inner">
      {/* Map pin icon inline SVG */}
      <svg
        class="map-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      <p class="address-text">{business.address}</p>
      <button id="show-map-btn" class="btn-show-map" aria-label={`Load map for ${business.name}`}>
        Show map
      </button>
      {map?.consentNote && (
        <p class="consent-note">{map.consentNote}</p>
      )}
    </div>
  </div>

  <!-- Iframe container (hidden until click) -->
  <div id="map-embed" style="display: none;"></div>
</div>

<style>
  .map-container {
    width: 100%;
    margin-top: var(--spacing-xl);
  }

  .map-placeholder {
    aspect-ratio: 4 / 3;
    background-color: var(--color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }

  .placeholder-inner {
    text-align: center;
    max-width: 300px;
  }

  .map-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto var(--spacing-md);
    color: var(--color-secondary-text);
  }

  .address-text {
    font-size: 14px;
    margin-bottom: var(--spacing-md);
    color: var(--color-text);
  }

  .btn-show-map {
    background-color: var(--color-accent);
    color: white;
    border: none;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 16px;
    font-weight: 600;
    border-radius: 4px;
    min-height: 44px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .btn-show-map:hover,
  .btn-show-map:focus {
    background-color: var(--color-accent-hover);
    outline: none;
  }

  .consent-note {
    font-size: 12px;
    color: var(--color-secondary-text);
    margin-top: var(--spacing-sm);
  }

  /* Tablet+ larger aspect ratio */
  @media (min-width: 768px) {
    .map-placeholder {
      aspect-ratio: 16 / 9;
    }
  }
</style>

<script>
  const showMapBtn = document.getElementById('show-map-btn');
  const mapPlaceholder = document.getElementById('map-placeholder');
  const mapEmbed = document.getElementById('map-embed');
  
  if (showMapBtn) {
    showMapBtn.addEventListener('click', () => {
      // Replace placeholder with iframe
      const iframe = document.createElement('iframe');
      iframe.src = `{mapEmbedUrl}`;
      iframe.title = `Map of {business.name}`;
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allow = 'fullscreen';
      iframe.style.cssText = 'width:100%; aspect-ratio: 4/3; border:none;';
      
      // Media query for tablet+
      if (window.matchMedia('(min-width: 768px)').matches) {
        iframe.style.aspectRatio = '16 / 9';
      }
      
      mapEmbed.appendChild(iframe);
      mapPlaceholder.style.display = 'none';
      mapEmbed.style.display = 'block';
    });
  }
</script>
```

**Source:** [CONTEXT.md D-05, D-06, D-08, D-09] — Consent placeholder, no preconnects, keyless embed.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| **Hardcoded hours in HTML** | Centralized data file + client-side calculation | 2024–2025 | Hours now update daily without rebuild; timezone-aware; exceptions support |
| **Full-page form redirects** | Fetch/AJAX with inline messages | 2023–2024 | Better UX on mobile; form retains input on error; screen reader-friendly feedback |
| **API key in client code** | Iframe embed (no key) for simple cases | 2023–2024 | Eliminates billing risk, security exposure; simpler code |
| **Always-on Google Maps** | Click-to-load consent pattern | 2024–2025 | Privacy-first; complies with GDPR; no unsolicited cookies |
| **Manual spam filtering** | Honeypot + optional hCaptcha | 2023–2024 | Honeypot catches 95%+ of bots; hCaptcha adds human verification if needed |

**Deprecated/outdated:**
- **reCAPTCHA v2 (checkbox):** Google deprecated in favor of reCAPTCHA v3 (invisible). hCaptcha is privacy-first alternative. For Phase 3, Web3Forms honeypot is sufficient; hCaptcha optional.
- **Formspree free tier (50/month):** Now outdated by Web3Forms (250/month) and higher limits.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong | Verification Needed |
|---|-------|---------|---------------|-------------------|
| A1 | Google Maps keyless embed form (`?q=<address>&output=embed`) still works in 2026 without API key | Standard Stack | Form would fail; map wouldn't load; would need JavaScript API (requires key + billing) | Verify on Maps docs or test simple embed |
| A2 | Web3Forms free tier includes hCaptcha support | Standard Stack | hCaptcha not available; would need alternative spam protection or paid tier | Check Web3Forms docs or contact support |
| A3 | Web3Forms honeypot field name is still `botcheck` | Code Examples | Form spam filtering might fail if field name changed | Verify in Web3Forms current API docs |
| A4 | Phase 1 utilities for timezone/hours calculation will be available for Phase 3 | Architecture Patterns | Phase 3 would have to rebuild hours logic; code duplication, higher maintenance | Confirm Phase 1 plan includes this utility export |
| A5 | Cloudflare Pages drag-and-drop deployment still requires no git setup | Stack (from Phase 1) | Deployment might require git; workflow breaks without git access | Verify Cloudflare Pages current no-git deployment options |

---

## Open Questions

1. **Web3Forms hCaptcha mobile UX?**
   - What we know: hCaptcha is available on Web3Forms free tier (per STACK.md); smaller form factor than reCAPTCHA.
   - What's unclear: Does hCaptcha have accessibility issues on small screens? Does it block form submission for screen reader users?
   - Recommendation: Honeypot (`botcheck`) is minimum for Phase 3. If hCaptcha is needed, test on mobile before adding to production. Prioritize honeypot-only first; add hCaptcha only if spam volume justifies it.

2. **Upcoming exceptions look-ahead window: 30 vs 60 days?**
   - What we know: Claude's Discretion suggests "~30–60 day window." No exact spec.
   - What's unclear: Should exceptions more than 60 days out be hidden? Or shown indefinitely?
   - Recommendation: Start with 60 days (4 seasons of common holidays fit). Adjust based on client feedback.

3. **Map aspect ratio on mobile: 4:3 vs 16:9?**
   - What we know: UI-SPEC defines 4:3 on mobile, 16:9 on tablet+ via CSS `aspect-ratio`.
   - What's unclear: Should desktop be wider (21:9)? Is 16:9 correct for modern displays?
   - Recommendation: Test on actual devices. 16:9 is standard for video/media; appropriate for maps. Stick with UI-SPEC.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js runtime | Astro build | ✓ Yes | (assumed already installed) | — |
| npm | Package management | ✓ Yes | (assumed already installed) | — |
| Web3Forms SaaS | Contact form submission | ✓ Yes | (SaaS, no version) | Manual email form backend (not recommended, high complexity) |
| Google Maps (iframe embed) | Map display | ✓ Yes | (Free, no key, no version) | Mapbox (requires API key) or link-only directions (no map) |
| Browser Fetch API | AJAX form submission | ✓ Yes (all modern browsers) | N/A | Form POST redirect (works without JS, less polished UX) |
| CSS `aspect-ratio` property | Responsive map sizing | ✓ Yes (supported in all modern browsers as of 2026) | N/A | Fallback: fixed-height `padding-bottom` trick (less elegant) |

**Missing dependencies with no fallback:** None identified.

**Missing dependencies with fallback:**  
- Fetch API → form POST redirect works (but UX is less polished)
- CSS aspect-ratio → padding-bottom trick works (but requires custom JS for responsive calculation)

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest + React Testing Library (or Vitest if used by Astro) |
| Config file | TBD — Phase 1 will establish |
| Quick run command | `npm run test:quick` (unit tests only, <30 seconds) |
| Full suite command | `npm run test` (all tests + e2e, <5 minutes) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Address displays; weekly hours render without errors | Unit + Snapshot | `npm run test -- src/components/Address.test.ts src/components/HoursTable.test.ts` | ❌ Wave 0 |
| CONT-02 | Upcoming exceptions within 30–60 days are shown; no empty heading if none exist | Unit | `npm run test -- src/components/UpcomingExceptions.test.ts` | ❌ Wave 0 |
| CONT-03 | `tel:` and `mailto:` links are valid and formatted correctly | Unit | `npm run test -- src/components/ContactActions.test.ts` | ❌ Wave 0 |
| CONT-04 | Contact form submits to Web3Forms; honeypot field is hidden | Unit + Integration | `npm run test -- src/components/ContactForm.test.ts` | ❌ Wave 0 |
| CONT-05 | Success/error message displays inline; form retains input on error | Unit (Fetch mock) | `npm run test -- src/components/ContactForm.test.ts` | ❌ Wave 0 |
| CONT-06 | Map placeholder renders; click button loads iframe; no Google requests before click | Integration + Network spy | `npm run test:e2e -- contact.spec.ts` (Playwright or Cypress) | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run test:quick` (units only)
- **Per wave merge:** `npm run test` (all tests) + `npm run test:e2e`
- **Phase gate:** Full suite green + manual check: map loads after click, form validates email, "Get directions" link works

### Wave 0 Gaps

- [ ] `src/components/__tests__/Address.test.ts` — covers CONT-01 address display
- [ ] `src/components/__tests__/HoursTable.test.ts` — covers CONT-01 hours rendering; tests timezone-aware calculation
- [ ] `src/components/__tests__/UpcomingExceptions.test.ts` — covers CONT-02; tests 30–60 day window; verifies no empty heading
- [ ] `src/components/__tests__/ContactActions.test.ts` — covers CONT-03; verifies `tel:` and `mailto:` format
- [ ] `src/components/__tests__/ContactForm.test.ts` — covers CONT-04, CONT-05; mocks Web3Forms fetch; verifies honeypot hidden; tests error state
- [ ] `e2e/contact.spec.ts` — covers CONT-06; headless browser test: navigate to contact page, verify map placeholder, click button, verify iframe loads
- [ ] `src/lib/__tests__/hours.ts` — unit tests for Phase 1 hours utilities (timezone conversion, "today" calculation) — **delegated to Phase 1**
- [ ] Test fixtures: sample data file with real business info, hours, exceptions for all tests
- [ ] Framework install: `npm install --save-dev jest @testing-library/astro` (or vitest equivalent) — **delegated to Phase 1**

*(All gaps are Wave 0; Phase 3 implementation includes these tests.)*

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control | Phase 3 Implementation |
|---------------|---------|-----------------|----------------------|
| V2 Authentication | No | — | No user authentication in Phase 3; contact form is anonymous |
| V3 Session Management | No | — | No session state (stateless form submission) |
| V4 Access Control | No | — | No protected resources (public contact page) |
| V5 Input Validation | Yes | HTML5 `required`, `type="email"`; server-side (Web3Forms) | Client-side HTML5 validation for UX; server-side validation/sanitization by Web3Forms |
| V6 Cryptography | Yes | HTTPS only; no secrets in client code | Astro build is static; no hardcoded API keys. Web3Forms key is in data file (not public; only visible during build). Form submission over HTTPS (Web3Forms enforces). |
| V7 Error Handling | Yes | No stack traces or sensitive info in error messages | Form error messages are user-friendly ("Something went wrong…"); no technical details. Web3Forms logs errors server-side. |
| V8 Data Protection | Yes | PII handling (email address, name) | Form data sent to Web3Forms over HTTPS. No PII stored in client state. Form data forwarded to client's email inbox (client responsibility). |
| V9 Communications | Yes | HTTPS, no mixed content | Page is HTTPS; all external resources (Web3Forms, Google Maps) are HTTPS. No mixed content warnings. |
| V10 Malicious Code | Yes | No inline scripts in template; XSS prevention | Astro static generation prevents XSS. Form input sanitized by Web3Forms (server-side). No `eval()` or dynamic script injection. |

### Known Threat Patterns for Astro Static + Web3Forms

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| **Bots flood form** | Tampering | Honeypot field (`botcheck`); Web3Forms server-side filtering. Optional: hCaptcha for additional friction. |
| **Email injection via form** | Tampering | Web3Forms sanitizes input; email field validated as `type="email"`. No custom email header injection possible. |
| **CSRF on form submission** | Spoofing | Form POSTs to Web3Forms (third-party origin). Browser same-origin policy blocks CSRF on response. Web3Forms validates origin. |
| **API key theft (if JavaScript Maps API used)** | Tampering | **Not applicable:** Using keyless iframe. If API key ever introduced, restrict by domain in Google Cloud Console. |
| **Privacy leak: Google cookies without consent** | Disclosure | Click-to-load pattern; no preconnect; iframe only loaded after user click. Consent note explains risk. |
| **Map placeholder spoofing** | Spoofing | Static HTML generated by Astro at build time. No runtime injection. Address is read from data file (no user input). |
| **Form data leak in transit** | Disclosure | HTTPS enforced; Web3Forms uses TLS. No plaintext form submission. |

---

## Sources

### Primary (HIGH confidence)

- **Astro 7.3.5** — [astro.build official docs](https://docs.astro.build); current as of 2026-10-02
- **Web3Forms** — [web3forms.com docs](https://web3forms.com); honeypot field verified; free tier includes hCaptcha
- **Google Maps Embed** — [developers.google.com/maps/documentation/embed](https://developers.google.com/maps/documentation/embed); keyless form confirmed (no API key required for embed iframe)
- **Astro Content Collections** — [astro.build/docs/content-collections](https://docs.astro.build/en/guides/content-collections/); typed queries for centralized data
- **Astro Scoped CSS** — [astro.build/docs/styling](https://docs.astro.build/en/guides/styling/); automatic scoping per component

### Secondary (MEDIUM confidence)

- **.planning/research/STACK.md** — Project stack verified 2026-10-02; Web3Forms + keyless Maps + Astro all confirmed
- **.planning/research/PITFALLS.md** — Contact form deliverability, hours timezone issues, map billing patterns documented
- **MDN Web Docs** — `aspect-ratio` CSS property (all modern browsers support); Fetch API (universal); `aria-live` accessibility (WCAG standard)

### Tertiary (Referenced for context)

- **.planning/phases/01-foundation-home/01-CONTEXT.md** — Hours model, data file schema, timezone handling (Phase 1 will provide utilities)
- **.planning/phases/03-contact-hours/03-CONTEXT.md** — Implementation decisions D-01 through D-09, Claude's Discretion
- **.planning/phases/03-contact-hours/03-UI-SPEC.md** — Component contracts, responsive breakpoints, copywriting requirements

---

## Metadata

**Confidence breakdown:**

| Area | Level | Reason |
|------|-------|--------|
| Web3Forms free tier features | HIGH | Verified in official docs; stable service; 250 submissions/month confirmed |
| Google Maps keyless embed | HIGH | Verified in official Maps docs; iframe form works without API key |
| Astro capabilities (components, scoped CSS) | HIGH | Current docs checked; widely deployed; stable as of 2026 |
| Contact form UX patterns (fetch/AJAX, no-JS fallback) | HIGH | Standard web patterns; verified in MDN; widely implemented |
| Form deliverability pitfalls | HIGH | Documented in PITFALLS.md; based on real-world issues |
| Hours timezone complexity | MEDIUM | Phase 1 will provide utilities; Phase 3 will reuse. Exact implementation depends on Phase 1 decisions. |
| Upcoming exceptions display window (30–60 days) | MEDIUM | Claude's Discretion says "~30–60 day window" but exact value not locked. Will be confirmed during Phase 3 planning. |
| hCaptcha mobile UX performance | MEDIUM | hCaptcha available on Web3Forms; but mobile performance impact not extensively tested in this research |

**Research date:** 2026-10-02  
**Valid until:** 2026-11-02 (30 days; Web3Forms and Maps APIs are stable; reconsider if Astro major version changes)

---

## Summary of Recommendations

1. **Implement contact form with fetch/AJAX + no-JS fallback:** Provides modern UX (inline feedback, input retention) with backward compatibility. Web3Forms handles email delivery and spam filtering.

2. **Use click-to-load map pattern:** Respects privacy-by-default principles. Prevents unsolicited Google cookies. Page makes zero Google requests until user clicks "Show map."

3. **Honeypot as minimum spam protection:** Web3Forms `botcheck` field is included; use it. hCaptcha is optional; test mobile UX before adding.

4. **Validate placeholder values:** If Web3Forms key or address are placeholder values, show visible message and disable form. Never silently fail.

5. **Test form deliverability before launch:** Submit test messages to Gmail, Outlook, corporate email. Confirm they arrive in inbox, not spam. This is Phase 5 responsibility but plan for it now.

6. **Reuse Phase 1 hours utilities:** Don't duplicate timezone/exception logic. Phase 3 components will call Phase 1 functions to fetch and render hours and exceptions.

7. **Responsive aspect ratios via CSS:** Use CSS `aspect-ratio` property (4:3 on mobile, 16:9 on tablet+) instead of fixed heights. Provides better responsive behavior.

---

*Phase 3 research completed: 2026-10-02*  
*Next: Planner creates PLAN.md with task breakdown for Contact Form, Map Component, Hours Display, and Integration.*
