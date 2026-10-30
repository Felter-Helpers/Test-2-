# Phase 3: Contact & Hours - Pattern Map

**Mapped:** 2026-10-02  
**Files analyzed:** 9 files (7 new components, 1 page, 1 data schema extension)  
**Analogs found:** 0 / 9 (codebase is empty; Phase 1 and 2 not yet built)  
**Pattern source:** RESEARCH.md code examples + upstream decisions from CONTEXT.md + UI-SPEC.md

---

## File Classification

| New/Modified File | Role | Data Flow | Status | Pattern Source |
|-------------------|------|-----------|--------|-----------------|
| `src/pages/contact.astro` | page | request-response | NEW | RESEARCH.md § Architecture Patterns, inline component composition |
| `src/components/ContactForm.astro` | component | request-response | NEW | RESEARCH.md § Pattern 2: Web3Forms Form with No-JS Fallback (lines 321–556) |
| `src/components/Map.astro` | component | event-driven | NEW | RESEARCH.md § Pattern 1: Click-to-Load Third-Party Embed (lines 204–315) |
| `src/components/HoursTable.astro` | component | transform | NEW | RESEARCH.md § Pattern 3: Hours with Client-Side Timezone & Exceptions (line 571) + Phase 1 utilities (TBD) |
| `src/components/UpcomingExceptions.astro` | component | transform | NEW | RESEARCH.md § Pattern 3: Hours + Code Examples § Example 1 (lines 719–787) |
| `src/components/ContactActions.astro` | component | request-response | NEW | RESEARCH.md § Code Examples § Example 1: Contact Actions Component (lines 719–787) |
| `src/components/Address.astro` | component | transform | NEW | RESEARCH.md § Architectural Responsibility Map (line 62) + UI-SPEC § Component-Specific Contracts (line 160) |
| `src/content/config.ts` | config | N/A | EXTEND | Phase 1 creates base; Phase 3 extends schema for contact page, map, form, hours exceptions |
| `src/content/data/site.yml` | data | N/A | EXTEND | Phase 1 creates base; Phase 3 extends with: contact labels, map consent note, Web3Forms key placeholder, form messages, upcoming exceptions list |

---

## Pattern Assignments

### `src/pages/contact.astro` (page, request-response)

**Pattern Source:** RESEARCH.md § Architecture Patterns, System Architecture Diagram (lines 123–167)

**Purpose:** Main contact page that composes all Phase 3 components. Returns static HTML with no-JS fallback for all interactions (form POST, no map until click).

**Imports pattern** (derived from RESEARCH.md and Astro conventions):
```typescript
---
import { getEntry } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro'; // From Phase 1
import ContactActions from '../components/ContactActions.astro';
import Address from '../components/Address.astro';
import HoursTable from '../components/HoursTable.astro';
import UpcomingExceptions from '../components/UpcomingExceptions.astro';
import ContactForm from '../components/ContactForm.astro';
import Map from '../components/Map.astro';

const siteData = await getEntry('data', 'site');
const { business, contact } = siteData.data;
---
```

**Layout pattern:**
- Mobile-first single column (CONTEXT.md D-01)
- Tablet+ two-column layout (CONTEXT.md D-04): left column (contact + address + hours), right column (form), full-width map below
- Use BaseLayout from Phase 1 (wraps header/footer/notice)
- Use color tokens from Phase 1 `tokens.css`

**Component composition** (CONTEXT.md D-01 mobile order):
```astro
<BaseLayout title="Contact & Hours" description={contact.metaDescription}>
  <main class="contact-page">
    <!-- 1. Contact actions (Call, Email) -->
    <ContactActions />
    
    <!-- 2. Address + Get directions -->
    <Address />
    
    <!-- 3. Hours section -->
    <section class="hours-section">
      <h2>Hours</h2>
      <HoursTable />
      <UpcomingExceptions />
    </section>
    
    <!-- 4. Contact form -->
    <ContactForm />
    
    <!-- 5. Map (full width) -->
    <Map />
  </main>
</BaseLayout>
```

---

### `src/components/ContactForm.astro` (component, request-response)

**Pattern Source:** RESEARCH.md § Pattern 2: Web3Forms Form with No-JS Fallback (lines 321–556)

**Responsibility:** Web3Forms contact form with fetch/AJAX submission on JS-enabled browsers, full-page POST redirect fallback for no-JS.

**Imports & Data Access**:
```typescript
---
import { getEntry } from 'astro:content';
const siteData = await getEntry('data', 'site');
const { contact, business } = siteData.data;

// Validate Web3Forms key is not placeholder
const web3FormsKey = contact.web3FormsKey;
const isPlaceholder = web3FormsKey.toLowerCase().includes('placeholder') || 
                      web3FormsKey === 'change_me' ||
                      web3FormsKey.length < 10;
---
```

**No-JS Fallback Pattern** (CONTEXT.md D-03, D-49):
```html
<form
  id="contact-form"
  action="https://api.web3forms.com/submit"
  method="POST"
  class="contact-form"
>
  <!-- Access key for Web3Forms -->
  <input type="hidden" name="access_key" value={web3FormsKey} />
  
  <!-- Honeypot field (spam protection, CONTEXT.md Claude's Discretion D-50) -->
  <input type="hidden" name="botcheck" />
  
  <!-- Form fields: name, email, message -->
  <!-- Submit button -->
</form>
```

**Placeholder Handling** (CONTEXT.md Claude's Discretion D-51):
```astro
{isPlaceholder && (
  <div class="form-not-ready">
    <p>Form not yet connected. Please <a href={`tel:${business.phone}`}>call</a> or <a href={`mailto:${business.email}`}>email</a> us.</p>
  </div>
)}
```

**Fetch/AJAX Pattern** (CONTEXT.md D-49):
```javascript
// On form submit (with JS), prevent default POST redirect
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Disable button, show "Sending…"
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  
  // fetch() to Web3Forms
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: new FormData(form),
  });
  
  // Show inline success/error message (aria-live="polite")
  if (response.ok) {
    resultDiv.className = 'form-result success';
    resultDiv.textContent = 'Thank you! We\'ll be in touch soon.';
    form.reset();
  } else {
    resultDiv.className = 'form-result error';
    resultDiv.textContent = 'Something went wrong. Please try again or call/email us.';
  }
  
  // Re-enable button
  submitBtn.disabled = false;
  submitBtn.textContent = 'Send message';
});
```

**Accessibility Pattern**:
```html
<!-- Result message with role="status" + aria-live="polite" for screen readers -->
<div
  id="form-result"
  class="form-result"
  role="status"
  aria-live="polite"
  aria-atomic="true"
></div>
```

**Styling** (UI-SPEC §§ 178–191):
- Form fields: min-height 44px, border using secondary color (#EEEEEE), 4px border-radius, focus outline accent
- Submit button: accent background, white text, min-height 44px, disabled state opacity 0.6
- Result message: green bg for success, red bg for error, 4px left border using semantic color

---

### `src/components/Map.astro` (component, event-driven)

**Pattern Source:** RESEARCH.md § Pattern 1: Click-to-Load Third-Party Embed (lines 204–315)

**Responsibility:** Consent placeholder that reserves space; only loads Google Maps iframe after user clicks "Show map" (D-05, D-06, D-09).

**Critical Rule (D-09):** No `<link rel="preconnect">`, no `<link rel="prefetch">`, no hidden iframe. Page must make zero requests to any Google domain before user click.

**Initial State: Placeholder** (CONTEXT.md D-05, D-06):
```astro
---
import { getEntry } from 'astro:content';
const siteData = await getEntry('data', 'site');
const { business, contact, map } = siteData.data;

// Build embed URL from address (keyless form, D-08)
const mapAddress = encodeURIComponent(business.address);
const mapEmbedUrl = `https://www.google.com/maps/embed?pb=...&q=${mapAddress}&output=embed`;
---

<div class="map-container">
  <!-- Placeholder (initial state, no iframe) -->
  <div id="map-placeholder" class="map-placeholder">
    <div class="placeholder-inner">
      {/* Inline map pin SVG icon */}
      <svg class="map-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
      
      <p class="address-text">{business.address}</p>
      
      <button id="show-map-btn" class="btn-show-map">
        Show map
      </button>
      
      {map?.consentNote && (
        <p class="consent-note">{map.consentNote}</p>
      )}
    </div>
  </div>
  
  <!-- Container for iframe (hidden until click) -->
  <div id="map-embed" style="display: none;"></div>
</div>
```

**Styling Pattern** (UI-SPEC § 193–203, § 256–270):
```css
.map-placeholder {
  aspect-ratio: 4 / 3;  /* Mobile */
  background-color: var(--color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .map-placeholder {
    aspect-ratio: 16 / 9;  /* Tablet+ */
  }
}
```

**Click-to-Load Behavior** (CONTEXT.md D-05, D-06, D-07):
```javascript
const showMapBtn = document.getElementById('show-map-btn');
const mapPlaceholder = document.getElementById('map-placeholder');
const mapEmbed = document.getElementById('map-embed');

if (showMapBtn) {
  showMapBtn.addEventListener('click', () => {
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = mapEmbedUrl;  // First Google request happens NOW
    iframe.title = `Map of ${business.name}`;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allow = 'fullscreen';
    iframe.style.cssText = 'width:100%; aspect-ratio: 4/3; border:none;';
    
    // Adjust aspect ratio for tablet+
    if (window.matchMedia('(min-width: 768px)').matches) {
      iframe.style.aspectRatio = '16 / 9';
    }
    
    // Swap placeholder for iframe
    mapEmbed.appendChild(iframe);
    mapPlaceholder.style.display = 'none';
    mapEmbed.style.display = 'block';
  });
}
```

**No-JS Fallback:** Placeholder always renders. "Get directions" link (from Address component) always works independently (CONTEXT.md D-03, D-09).

---

### `src/components/HoursTable.astro` (component, transform)

**Pattern Source:** RESEARCH.md § Pattern 3: Hours with Client-Side Timezone & Exceptions (line 571)

**Responsibility:** Render weekly hours table. Calculate "today" row highlight client-side using Phase 1 utilities. Support split hours and closed days.

**Dependencies on Phase 1:**
- Phase 1 must deliver: `src/lib/hours.ts` utilities for timezone conversion, "today" calculation, exception lookup
- Phase 1 data file schema must define: `business.hours` (weekly Mon–Sun) + `business.timezone` + `business.exceptions`

**Imports & Data Access**:
```typescript
---
import { getEntry } from 'astro:content';
import { getTodayIndex, isClosed } from '../lib/hours'; // From Phase 1
const siteData = await getEntry('data', 'site');
const { business } = siteData.data;
---
```

**Semantic HTML Pattern** (UI-SPEC § 212–220):
```html
<table class="hours-table">
  <thead>
    <tr>
      <th>Day</th>
      <th>Hours</th>
    </tr>
  </thead>
  <tbody>
    {business.hours.map((day, index) => (
      <tr class={index === todayIndex ? 'is-today' : ''}>
        <td>{day.name}</td>
        <td>
          {isClosed(day) ? (
            'Closed'
          ) : (
            <>
              {day.open1} – {day.close1}
              {day.open2 && <> {day.open2} – {day.close2}</>}
            </>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

**Client-Side Today Highlight** (CONTEXT.md D-06, RESEARCH.md line 571):
```javascript
// Calculate today's row at runtime using shop timezone
const todayIndex = getTodayIndex(business.timezone);
// Apply CSS class: tr.is-today { background-color: var(--color-secondary); }
```

**Closed Day Rendering** (CONTEXT.md Claude's Discretion D-48):
```
Monday: Closed
Tuesday: 9am – 5pm
Wednesday: Closed
Thursday: 9am – 1pm, 2pm – 5pm (split hours)
```

**Note:** Do not hardcode hours in HTML. Hours must come from Phase 1 data file. Phase 3 components call Phase 1 utilities; no duplication (CONTEXT.md D-06).

---

### `src/components/UpcomingExceptions.astro` (component, transform)

**Pattern Source:** RESEARCH.md § Pattern 3: Hours with Client-Side Timezone & Exceptions (line 571) + Example 2 Code context

**Responsibility:** Show upcoming holiday/special hours within 30–60 day window. Render nothing if no exceptions exist (CONTEXT.md Claude's Discretion D-48).

**Dependencies on Phase 1:**
- Phase 1 must deliver: `src/lib/hours.ts` utility for exception lookup within date window
- Phase 1 data file schema must define: `business.exceptions` array with `date`, `status` (closed/open), and `hours`

**Imports & Data Access**:
```typescript
---
import { getEntry } from 'astro:content';
import { getUpcomingExceptions } from '../lib/hours'; // From Phase 1
const siteData = await getEntry('data', 'site');
const { business, contact } = siteData.data;

// Fetch exceptions within ~60 day window
const upcomingExceptions = getUpcomingExceptions(business.exceptions, 60);
---
```

**Conditional Render** (no empty heading):
```astro
{upcomingExceptions.length > 0 && (
  <div class="upcoming-exceptions">
    <h3>{contact.upcomingChangesHeading || 'Upcoming changes'}</h3>
    <ul class="exceptions-list">
      {upcomingExceptions.map(exc => (
        <li>
          <strong>{exc.date}</strong>:{' '}
          {exc.status === 'closed' ? 'Closed' : exc.hours}
        </li>
      ))}
    </ul>
  </div>
)}
```

**Styling** (UI-SPEC § 221–225):
- Subtle background color (secondary tint)
- Padding sm/md
- Border-left with accent color as visual anchor
- Clear "Closed" label for closure dates

---

### `src/components/ContactActions.astro` (component, request-response)

**Pattern Source:** RESEARCH.md § Code Examples § Example 1: Contact Actions Component (lines 719–787)

**Responsibility:** Tap-to-call and tap-to-email buttons. Full-width stacked on mobile, side-by-side on tablet+.

**Phone/Email Normalization** (CONTEXT.md D-02):
```typescript
---
import { getEntry } from 'astro:content';
const siteData = await getEntry('data', 'site');
const { business } = siteData.data;

// Normalize phone for tel: protocol (digits + leading + only)
const phoneNormalized = business.phone.replace(/\D/g, '');
const phoneForTel = `+1${phoneNormalized}`; // Adjust country code as needed

// Display format keeps original formatting
const phoneDisplay = business.phone;
const emailDisplay = business.email;
---
```

**Markup Pattern** (CONTEXT.md D-02):
```astro
<div class="contact-actions">
  <a href={`tel:${phoneForTel}`} class="btn btn-primary">
    Call {phoneDisplay}
  </a>
  <a href={`mailto:${emailDisplay}`} class="btn btn-primary">
    Email us
  </a>
</div>
```

**Responsive Layout** (CONTEXT.md D-04, UI-SPEC § 256–270):
```css
.contact-actions {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Tablet+: side-by-side */
@media (min-width: 768px) {
  .contact-actions {
    flex-direction: row;
  }
  
  .btn {
    flex: 1;
  }
}
```

**Button Styling** (UI-SPEC § 228–240):
- Min-height: 44px (tap target, WCAG AAA)
- Background: accent color (#0066CC)
- Text: white, 16px, weight 600
- Hover: darker accent (#0052A3)

---

### `src/components/Address.astro` (component, transform)

**Pattern Source:** CONTEXT.md § Integration Points + UI-SPEC § Component-Specific Contracts (line 160)

**Responsibility:** Display full address + "Get directions" link that opens Google Maps directions in new tab (CONTEXT.md D-03).

**No Google preconnect here** (all Google requests deferred to Map component via click).

**Imports & Data Access**:
```typescript
---
import { getEntry } from 'astro:content';
const siteData = await getEntry('data', 'site');
const { business, contact } = siteData.data;

// Build Google Maps directions URL (keyless)
const directionsUrl = `https://maps.google.com/maps?q=${encodeURIComponent(business.address)}`;
---
```

**Markup Pattern** (CONTEXT.md D-03):
```astro
<div class="address-section">
  <h3>{contact.addressHeading || 'Address'}</h3>
  <p class="address-text">
    {business.address}
  </p>
  <a href={directionsUrl} target="_blank" rel="noopener noreferrer" class="get-directions-link">
    Get directions
  </a>
</div>
```

**Link Always Works** (CONTEXT.md D-03, D-09):
- No third-party requests until click
- Fallback if map never loads (privacy-first design)
- Opens in new tab (doesn't navigate away from contact page)

---

### `src/content/config.ts` (config, N/A)

**Pattern Source:** Astro Content Collections + Phase 1 schema base

**Responsibility:** Define Zod schema for contact page data. Extend Phase 1 base schema.

**Dependencies on Phase 1:**
- Phase 1 must deliver base schema in `config.ts` for `business`, `hours`, `timezone`, etc.
- Phase 3 extends with: `contact` (form labels, headings, messages), `map` (consent note), `form` (Web3Forms key, success/error messages)

**Phase 3 Schema Extension Pattern**:
```typescript
---
import { defineCollection, z } from 'astro:content';
// Import Phase 1 base schema
// Extend with Phase 3 fields

const data = defineCollection({
  schema: z.object({
    // Phase 1 fields (inherited)
    business: z.object({
      name: z.string(),
      address: z.string(),
      phone: z.string(),
      email: z.string(),
      timezone: z.string(),
      hours: z.array(z.object({
        name: z.string(),
        open1: z.string(),
        close1: z.string(),
        open2: z.string().optional(),
        close2: z.string().optional(),
      })),
      exceptions: z.array(z.object({
        date: z.string(),
        status: z.enum(['closed', 'open']),
        hours: z.string().optional(),
      })).optional(),
    }),
    
    // Phase 3 extensions
    contact: z.object({
      addressHeading: z.string().optional(),
      web3FormsKey: z.string(),
      formSubmitLabel: z.string(),
      formSuccessMessage: z.string(),
      formErrorMessage: z.string(),
      upcomingChangesHeading: z.string().optional(),
    }),
    map: z.object({
      consentNote: z.string().optional(),
      showMapButtonLabel: z.string(),
    }),
  }),
});

export const collections = { data };
```

---

### `src/content/data/site.yml` (data, N/A)

**Pattern Source:** Phase 1 base + RESEARCH.md § Integration Points

**Responsibility:** Centralized data file for all content. Phase 1 creates base; Phase 3 extends.

**One-File Content Swap** (CONTEXT.md § Carried Forward, D-05):
All content lives in this single file. No hardcoding in components.

**Phase 3 Data Structure Extension**:
```yaml
# Phase 1 base (inherited)
business:
  name: "Shop Name"
  address: "123 Main Street, Springfield, IL 62701"
  phone: "555-123-4567"
  email: "hello@shop.com"
  timezone: "America/Chicago"
  hours:
    - name: "Monday"
      open1: "9:00"
      close1: "17:00"
    # ... rest of week
  exceptions:
    - date: "2026-12-25"
      status: "closed"
    - date: "2026-12-26"
      status: "open"
      hours: "11:00–17:00"

# Phase 3 extensions
contact:
  addressHeading: "Our Location"
  web3FormsKey: "placeholder_change_me_at_launch"  # Obviously placeholder
  formSubmitLabel: "Send message"
  formSuccessMessage: "Thank you! We'll be in touch soon."
  formErrorMessage: "Something went wrong. Please try again or call/email us."
  upcomingChangesHeading: "Upcoming changes"

map:
  consentNote: "Loading the map connects to Google, which may set cookies."
  showMapButtonLabel: "Show map"
```

**Placeholder Values Must Be Obvious** (RESEARCH.md Pitfall 4, lines 695–714):
- Web3Forms key: contains "placeholder" or "change_me" or < 10 chars
- Address: "123 Main Street" or similar generic
- Phone: "555-…"
- Never ship production with unvalidated placeholders

---

## Shared Patterns

### Pattern 1: Responsive Flex Layout (All Components)

**Apply to:** ContactActions, ContactForm (on tablet+), Map, page layout

**Source:** UI-SPEC § 256–270, CONTEXT.md D-04

**Pattern:**
```css
/* Mobile-first: single column, full-width */
.container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Tablet+: two columns or row layout */
@media (min-width: 768px) {
  .container {
    flex-direction: row;
  }
  
  .column {
    flex: 1;
  }
}
```

### Pattern 2: Aspect Ratio for Responsive Media (Map, any future embeds)

**Apply to:** Map.astro, UpcomingExceptions (if visual), any embedded third-party content

**Source:** UI-SPEC § 256–270, RESEARCH.md § Architecture Patterns

**Pattern:**
```css
/* Responsive aspect ratio without fixed height */
.media-container {
  width: 100%;
  aspect-ratio: 4 / 3;  /* Mobile */
}

@media (min-width: 768px) {
  .media-container {
    aspect-ratio: 16 / 9;  /* Tablet+ */
  }
}
```

### Pattern 3: Touch-Friendly Buttons (All Interactive Elements)

**Apply to:** All buttons in ContactActions, ContactForm, Map, throughout site

**Source:** UI-SPEC § 228–240, § 178–191

**Pattern:**
```css
button, .btn, a.btn-link {
  min-height: 44px;          /* WCAG AAA touch target */
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  transition: background-color 0.2s;
}

button:hover,
button:focus {
  background-color: var(--color-accent-hover);  /* #0052A3 */
  outline: none;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
```

### Pattern 4: Color Tokens & Semantic Styling (All Components)

**Apply to:** All components that render color

**Source:** UI-SPEC § 71–100, Phase 1 tokens

**Pattern:**
```css
/* Inherited from tokens.css (Phase 1) */
:root {
  --color-primary-bg: #ffffff;
  --color-secondary-bg: #f5f5f5;
  --color-text: #1a1a1a;
  --color-text-secondary: #666666;
  --color-accent: #0066cc;
  --color-accent-hover: #0052a3;
  --color-border: #eeeeee;
  --color-success: #388e3c;
  --color-error: #d32f2f;
}

/* Use in components */
.contact-form {
  background: var(--color-primary-bg);
}

.form-field {
  border-color: var(--color-border);
}

.form-result.success {
  background-color: var(--color-success);
  color: white;
}
```

### Pattern 5: Accessibility (ARIA, Semantic HTML, Labels)

**Apply to:** ContactForm (labels, aria-live), Map (iframe title, button aria-label), all form fields

**Source:** UI-SPEC § 178–191, 208–211, RESEARCH.md § Validation Architecture

**Pattern:**
```html
<!-- Semantic HTML -->
<form id="contact-form" action="..." method="POST">
  <!-- Labeled form fields -->
  <label for="name">Your name</label>
  <input id="name" type="text" name="name" required aria-required="true" />
  
  <!-- Accessible result message -->
  <div id="form-result" role="status" aria-live="polite" aria-atomic="true"></div>
  
  <!-- Disabled button during submit -->
  <button type="submit" id="submit-btn">Send message</button>
</form>

<!-- Map iframe title for screen readers -->
<iframe title="Map of Shop Name" src="..."></iframe>
```

### Pattern 6: Form Submission with No-JS Fallback

**Apply to:** ContactForm.astro

**Source:** RESEARCH.md § Pattern 2 (lines 321–556), CONTEXT.md D-49

**Pattern:**
1. Form has `action="https://api.web3forms.com/submit"` + `method="POST"` (works without JS)
2. JavaScript intercepts with `addEventListener('submit', async (e) => { e.preventDefault(); ... fetch() ... })`
3. Show result message inline, retain input on error
4. If no JS, form POSTs directly to Web3Forms (full-page redirect)
5. Honeypot field (`name="botcheck"`) is hidden and filtered by Web3Forms server

### Pattern 7: Click-to-Load Third-Party (No Preconnect)

**Apply to:** Map.astro, any future embedded third-party resources

**Source:** RESEARCH.md § Pattern 1 (lines 204–315), CONTEXT.md D-05, D-06, D-09

**Critical Rule:**
- No `<link rel="preconnect">` to third-party domain
- No `<link rel="prefetch">`
- No hidden iframe
- Page makes zero requests to third-party domain until user clicks
- Show consent placeholder with address and button
- Placeholder reserves space with aspect-ratio (no layout shift)
- After click, replace placeholder with iframe

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| All Phase 3 files | — | — | **Codebase is empty.** Phase 1 and Phase 2 have not been built yet. No existing code to pattern-match against. All patterns extracted from RESEARCH.md code examples, upstream decisions (CONTEXT.md), and UI-SPEC. |

**Critical Dependencies on Phase 1:**

| Phase 3 Component | Requires Phase 1 | Use Case |
|-------------------|------------------|----------|
| HoursTable | `src/lib/hours.ts` (utilities for getTodayIndex, isClosed) | Calculate "today" row, render closed days, support split hours |
| UpcomingExceptions | `src/lib/hours.ts` (utility for getUpcomingExceptions) | Filter exceptions within 30–60 day window |
| All components | `src/layouts/BaseLayout.astro` | Wrap page with header, footer, notice banner |
| All components | `src/styles/tokens.css` | Color tokens, spacing scale, typography scale |
| config.ts | `src/content/config.ts` base schema | Extend business/hours/timezone schema |
| data/site.yml | Base data from Phase 1 | Extend with contact/map/form fields |
| contact.astro (page) | Phase 1 data file structure | Access business.address, business.phone, business.email, business.hours, business.timezone |

**If Phase 1 is delayed:** Phase 3 cannot proceed. Coordinate with Phase 1 planner on:
1. Hours utility delivery timeline (`getTodayIndex`, `isClosed`, `getUpcomingExceptions`)
2. BaseLayout, tokens.css, content schema finalization
3. Data file format and Phase 3 schema extension

---

## Metadata

**Pattern source:** RESEARCH.md + CONTEXT.md + UI-SPEC (upstream decisions)  
**Codebase scan:** Empty project; Phase 1 and Phase 2 not yet built  
**Files scanned:** 0 existing Astro/TypeScript files  
**Analogs found:** 0 (patterns derived entirely from specification documents)  
**Critical path items:** Phase 1 hours utilities, BaseLayout, tokens.css (blocks all Phase 3 component development)

**Mapping date:** 2026-10-02  
**Valid until:** Phase 1 planning completes or Phase 1 schema changes

---

## Summary

Phase 3 is planned before Phase 1 execution, so no code analogs exist. All patterns are derived from:

1. **RESEARCH.md code examples** (Pattern 1–3, specific component patterns)
2. **CONTEXT.md decisions** (D-01 through D-09, Claude's Discretion defaults)
3. **UI-SPEC.md** (component contracts, styling, responsive behavior)

**Key pattern themes:**
- **Click-to-load consent** for third-party embeds (no preconnect)
- **Fetch/AJAX form submission** with no-JS POST fallback
- **Client-side timezone-aware hours** calculation (reuse Phase 1 utilities)
- **Mobile-first responsive layout** with tablet+ two-column variant
- **Semantic HTML + ARIA** for accessibility
- **Centralized data file** (one-file content swap, no hardcoding)
- **Touch-friendly buttons** (44px min-height)
- **Color tokens & CSS custom properties** from Phase 1

**Blockers:** Phase 1 must deliver hours utilities (`getTodayIndex`, `isClosed`, `getUpcomingExceptions`), BaseLayout, tokens.css, and content schema before Phase 3 can be implemented.
