# Domain Pitfalls: Small Retail Brochure Websites

**Domain:** Small business informational (brochure) website for physical retail  
**Researched:** 2026-10-02  
**Scope:** Static multi-page site with contact form, Google Maps, opening hours, mobile-first design  
**Overall Confidence:** HIGH

---

## Critical Pitfalls

These cause data loss, SEO damage, security issues, or complete project failure.

### Pitfall 1: Placeholder Content Ships to Production

**What goes wrong:**  
Mock data (business name "Acme Shop," address "123 Main St," phone "555-1234," email "contact@example.com," product categories "Category 1" / "Category 2," "lorem ipsum" descriptions) appears on the live production website. Visitors see obviously fake information and lose trust instantly. Search engines index stale placeholder content. The site looks unfinished even though development is complete.

**Why it happens:**  
Placeholder data lives in code (config files, data files, hardcoded strings) and developers forget to replace it before deployment. No CI gate prevents shipping sites with known placeholder markers. The centralized content strategy (good for real data) isn't enforced to exclude test/demo values. Content arrives late, developer deploys early assuming a content update will come later (it doesn't).

**Consequences:**  
- Destroyed credibility on first visitor view
- Search engines index and rank the placeholder copy
- Real content update requires re-deployment (not a simple content-only change)
- Client receives a "finished" site but it's visibly unready to publish
- Difficult to detect: "looks fine in staging" → "oops, production has lorem ipsum"

**Warning signs:**
- Content file uses obvious placeholder patterns (e.g., addresses starting "123", emails using "example.com", names "Store 1", "Category 1")
- No pre-deployment checklist includes placeholder detection
- Content wasn't finalized during dev phase
- Difference between staging and production isn't verified before go-live

**Prevention:**
1. **Enforce at build time:** Add a pre-commit / pre-deploy CI check that fails if known placeholder markers appear in the production bundle (e.g., regex scan for "example.com", "123 Main", "lorem ipsum", "Contact Us", "Acme Shop").
2. **Centralize with validation:** All content lives in a single config/data file with schema validation. Invalid/missing required fields (phone, address, hours) cause build failure.
3. **Staging vs. production parity:** Deploy to staging first, manually verify all content is real before promoting to production.
4. **Content-ready gate:** Require client to sign off that real content is ready before any production deployment is scheduled.
5. **Obvious staging mark:** If staging is public, add a banner "STAGING - NOT THE LIVE SITE".

**Phase to address:**  
**Phase 2 (Design & Architecture)** — Set up content schema, validation, and CI gates.  
**Phase 5 (Testing & Deployment)** — Final content audit before launch.

---

### Pitfall 2: Contact Form Emails Go to Spam or Never Arrive

**What goes wrong:**  
Visitor submits the contact form. The form seems to work (no error message). Days pass. Client never receives the email. Visitor thinks the business ignored them. Leads are lost silently, and nobody knows it happened until a frustrated customer calls to ask "did you get my message?"

**Why it happens:**  
Hosted form services (Formspree, Web3Forms, FormSubmit) are free but operate with weak email authentication. Form submissions arrive from the service's domain (not the client's), with no SPF/DKIM/DMARC configured on the client's email. Gmail, Outlook, and corporate firewalls flag the message as spam or silently drop it. During high-traffic periods, some free form services rate-limit or fail silently.

**Consequences:**  
- Zero visibility into delivery failure (form shows success message)
- Lost business inquiries (nobody knows)
- Damaged client relationship when they discover missing inquiries
- Difficult diagnosis: client assumes form is broken, but it actually works

**Warning signs:**
- Client says "I'm not getting any submissions" but form appears functional
- No monitoring/logging of form submissions (success page ≠ delivery confirmation)
- Form service doesn't send notification of delivery failure
- Email provider filters all messages from form service domain as spam

**Prevention:**
1. **Choose form service carefully:** Verify that the service:
   - Sends from the client's own domain (not service domain) OR
   - Includes SPF/DKIM/DMARC headers OR
   - Has documented high deliverability rates and spam filtering bypass options
2. **Test delivery before launch:** Submit multiple test forms and confirm emails arrive in inbox (not spam). Repeat with common providers (Gmail, Outlook, corporate).
3. **Add delivery logging:** Capture all form submissions in a log (even if external service) so you can see submission volume vs. delivery complaints.
4. **Configure client email:** Whitelist the form service in email client filters. Add the service domain to SPF records if possible.
5. **Fallback contact method:** Display alternate contact method (phone/email directly) so visitors can reach out if form fails.
6. **Monitor free tier limits:** If using free tier, document the submission limit (e.g., Formspree free = 50/month). Add a note to escalate if approaching limit.

**Phase to address:**  
**Phase 4 (Content & Integration)** — Set up form service, configure delivery.  
**Phase 5 (Testing & Deployment)** — Full deliverability test before launch.

---

### Pitfall 3: Business Hours Display is Wrong on Holidays or Timezone Edge Cases

**What goes wrong:**  
Business hours show "Open Now" on a public holiday when the shop is actually closed. Or the site shows the wrong hours in the visitor's timezone. Or "Open Now" logic fails when the business has split hours (closed 1-3pm for lunch). Visitors plan to visit and waste a trip. Trust erodes.

**Why it happens:**  
The implementation reads only weekly recurring hours (Mon–Fri 9am–5pm) and ignores exceptions. No timezone conversion logic exists, so times are relative to the server's timezone, not the shop's location. No support for special hours on holidays or days off. "Open now" logic is simplistic: current time >= opening AND current time <= closing, with no holiday or split-hour awareness.

**Consequences:**  
- Visitors show up to a closed shop
- Legitimate inquiries are turned away
- Customer trust is damaged
- Local SEO rankings hurt (Google uses business hours for local search)
- Repeated complaints to the client ("Your website says you're open!")

**Warning signs:**
- Business hours are hardcoded (not data-driven) so changes require code edits
- No timezone tracking (e.g., "Eastern", "PST")
- "Open now" calculation is only a simple time range check
- Special hours (holidays, closures, early closing) don't exist in the data model
- Hours in Google Business Profile don't match the website

**Prevention:**
1. **Data structure for exceptions:** Business hours should separate:
   - **Recurring hours:** Mon–Fri 9am–5pm, Sat 10am–4pm, Sun closed
   - **Exceptions:** Dec 25 closed (Christmas), Jan 1 closed (New Year), May 1 10am–2pm (special event)
2. **Timezone storage:** Store business location timezone (e.g., "America/New_York") and always calculate "open now" relative to that timezone, never the browser/server time.
3. **Split hours support:** Allow defining multiple time ranges per day (e.g., "9am–1pm, 2pm–5pm" for a lunch break).
4. **JSON-LD structured data:** Use schema.org `openingHoursSpecification` with all recurring hours and holiday exceptions. Test with Google's Rich Results Test.
5. **Sync with Google Business:** When hours change on the website, require a note to update the client's Google Business Profile (you can't auto-sync, but make it part of the handoff docs).
6. **Test "open now" logic:** On the day before a holiday, verify it correctly shows as closed. Test boundary times (9:00am exactly, 5:00pm exactly, 12:59pm lunch hour).

**Phase to address:**  
**Phase 2 (Design & Architecture)** — Define data model for hours, timezone handling.  
**Phase 3 (Development)** — Implement "open now" logic correctly.  
**Phase 4 (Content & Integration)** — Populate all recurring hours and known exceptions.  
**Phase 6 (Client Handoff)** — Document how to add holiday closures or hours changes.

---

### Pitfall 4: Google Maps Causes Unexpected Billing or Privacy/Cookie Consent Issues

**What goes wrong:**  
One of two scenarios:

**Scenario A (API Key Billing):**  
Developer uses Google Maps JavaScript API with an API key. The key is exposed in client-side code. Bad actors make requests to the API using the stolen key, racking up hundreds of dollars in usage charges. Surprise bill arrives. OR the API key is rate-limited mid-campaign, and the map stops working for visitors.

**Scenario B (Privacy/Consent):**  
Developer embeds Google Maps via iframe, which works fine. But later, the site must comply with GDPR/cookie consent laws (or the client's privacy policy demands it). Maps loads from Google's domain, which sets cookies. The site has no cookie consent mechanism to gate the Maps embed. Visitors see a non-compliant site.

**Why it happens:**  
Developer doesn't realize that API keys in client code can be stolen and abused. They don't restrict the key to the domain. Alternatively, developer assumes iframe embed is "free and simple" and doesn't think about cookies or privacy until compliance review surfaces the issue.

**Consequences (Scenario A):**  
- Unexpected billing (hundreds to thousands of dollars)
- API disabled mid-traffic, map stops working
- Poor user experience and lost trust
- Difficult to debug (why did usage spike?)

**Consequences (Scenario B):**  
- Non-compliance with GDPR, CCPA, or local privacy laws
- Risk of regulatory fines or complaints
- Difficult to retrofit consent later (site already deployed)

**Warning signs:**
- API key is visible in browser DevTools network tab
- No domain restriction on API key
- Map stops working for some visitors (rate-limit reached)
- Privacy review flags "Google Maps is setting cookies without consent"
- Google Cloud Console shows unexpected usage charges

**Prevention:**

**For API Key (JavaScript):**
1. **Restrict the API key** to the specific domain (e.g., "example.com") in Google Cloud Console. This prevents stolen keys from being used on other domains.
2. **Enable billing alerts** in Google Cloud to catch usage spikes early.
3. **Use iframe instead (simpler):** For a simple "show shop location" use case, iframe embed is easier and free. Google Maps embed iframe (`<iframe src="https://www.google.com/maps/embed?...">`) doesn't require an API key and is completely free.

**For Privacy/Cookies:**
1. **Use iframe by default** for small brochure sites. It's free, doesn't require API key, and you can gate it behind consent.
2. **Implement cookie consent:** Add a simple banner or modal that explains "This site uses Google Maps from Google" and asks for consent before loading the embed.
3. **Lazy-load the map:** Don't embed the map in the initial HTML. Only load it if user gives consent OR after scrolling to the map section.
4. **Update privacy policy:** Document that Google Maps may set cookies and explain in your privacy statement.

**Recommendation for Kelvin:**  
Use **iframe embed** (free, no key, no billing risk). Add a simple consent banner that says "This page uses Google Maps. By continuing, you agree to Google's privacy policy." Load the iframe only after user consent or after they scroll to the map section.

**Phase to address:**  
**Phase 2 (Design & Architecture)** — Choose iframe vs. API and plan consent strategy.  
**Phase 4 (Content & Integration)** — Implement consent banner and embed map.  
**Phase 5 (Testing & Deployment)** — Verify map loads correctly and consent is requested.

---

## Moderate Pitfalls

Mistakes that cause poor user experience, SEO damage, or accessibility failures but don't break the site entirely.

### Pitfall 5: Mobile UX Breaks Due to Oversized Images or Unresponsive Layout

**What goes wrong:**  
Site is responsive on desktop but on mobile:
- Images don't scale and overflow the viewport
- Text is too small to read
- Buttons are too small to tap (< 24x24 CSS pixels)
- No touch-friendly spacing between clickable elements
- Map embed takes up full viewport and can't be scrolled
- Contact form is hard to fill on a phone

Visitors bounce immediately. Local SEO rankings drop (Google penalizes mobile-unfriendly sites).

**Why it happens:**  
Developer doesn't test on actual mobile devices during development. CSS media queries are missing or incomplete. Images are sized for desktop and don't scale down. Navigation is mouse-only (no touch support). Form labels are too small.

**Consequences:**  
- High bounce rate on mobile (which is likely the majority of traffic for a local retail site)
- Lower Google rankings (Google prioritizes mobile-friendliness)
- Poor user experience and lost foot traffic

**Warning signs:**
- Site looks good on desktop but is hard to use on a 5.5" phone screen
- Images are wider than viewport on mobile
- Buttons are < 24px tall
- Text is smaller than 16px on mobile
- Navigation menu is hidden in a hamburger menu but hard to tap

**Prevention:**
1. **Mobile-first development:** Design for mobile first, then add desktop enhancements. Don't retrofit mobile onto a desktop design.
2. **Test on real devices:** Use Chrome DevTools mobile emulation during dev, but also test on actual phones before launch.
3. **Image optimization:**
   - Use `<picture>` or `srcset` to serve different image sizes based on viewport width
   - Use modern formats (WebP, AVIF) with fallbacks
   - Compress images (TinyPNG, ImageKit)
   - Use `loading="lazy"` to avoid blocking initial page load
4. **Touch-friendly interactions:**
   - Buttons and clickable elements are at least 24x24 CSS pixels
   - Spacing between buttons is at least 8px
   - Forms have large, clear labels
5. **Test with Google's Mobile-Friendly Test:** Visit https://search.google.com/test/mobile-friendly and verify the site passes.

**Phase to address:**  
**Phase 2 (Design & Architecture)** — Set up responsive breakpoints and mobile-first layout.  
**Phase 3 (Development)** — Implement responsive images, touch-friendly elements.  
**Phase 5 (Testing & Deployment)** — Test on real mobile devices, run Google Mobile-Friendly Test.

---

### Pitfall 6: Local SEO Fails Due to Incorrect or Missing Structured Data

**What goes wrong:**  
Google Business Profile, website structured data, and on-page content (name, address, phone) don't match. Website has no LocalBusiness schema markup. Business name/address are inconsistent across the website. Google can't reliably extract the business information and doesn't show it in local search results. Competitors with clean data outrank you.

**Why it happens:**  
Developer adds generic schema without reading what LocalBusiness requires. Name/address differ between footer, contact page, and schema. The schema type is generic (LocalBusiness) when a more specific type (HealthAndBeautyBusiness, RetailStore) would be better. Schema is never validated. No link between website and Google Business Profile.

**Consequences:**  
- Weak local search visibility (visitors searching for "retail shop near me" won't find you)
- Rich snippets don't appear in Google results (no address, phone, hours, reviews)
- Lower click-through rate from local search
- Missed foot traffic

**Warning signs:**
- Schema Markup Validator or Google Rich Results Test shows errors
- Name/address/phone differ in different parts of the website
- No `<script type="application/ld+json">` tag with LocalBusiness schema
- Google Business Profile information doesn't match website

**Prevention:**
1. **Centralize business info:** Store name, address, phone, hours in a single config/data file. All pages pull from this source.
2. **Use LocalBusiness schema:** Add a JSON-LD `LocalBusiness` (or more specific subtype like `Store` or `ShoppingMall` if appropriate) schema to the homepage with:
   - `name`: Business name
   - `address`: Full address with street, city, state, zip
   - `telephone`: Phone number
   - `openingHoursSpecification`: Weekly recurring hours
   - `geo`: Latitude/longitude (or let Google infer from address)
   - `image`: Logo or shop photo
3. **Match NAP (Name/Address/Phone):** Ensure name, address, phone are identical on the website, Google Business Profile, and schema markup.
4. **Validate schema:** Use Google's Rich Results Test (https://search.google.com/test/rich-results) or Schema.org Validator to verify no errors.
5. **Link to Google Business:** Include a microdata `<link>` to the Google Business Profile in the HTML `<head>`.

**Phase to address:**  
**Phase 2 (Design & Architecture)** — Design centralized business info structure.  
**Phase 4 (Content & Integration)** — Populate schema with real business data.  
**Phase 5 (Testing & Deployment)** — Validate schema before launch.

---

### Pitfall 7: Images Are Too Heavy, Causing Slow Load Times and High Data Usage

**What goes wrong:**  
The site loads slowly on mobile, especially on 3G/4G connections. Large, unoptimized images (5-10MB each) delay the Largest Contentful Paint (LCP). Users see a blank page for 5+ seconds. Visitors with limited data plans use their entire monthly allowance on a single visit. Local SEO ranking drops (Google prioritizes fast-loading sites). Visitors bounce.

**Why it happens:**  
Developer doesn't compress images before uploading. Photos are shot at full camera resolution (4000x3000 pixels) and used at that size on the website. No modern formats (WebP, AVIF) are used; everything is JPEG at 100% quality. No lazy loading; all images load on page load even if below the fold.

**Consequences:**  
- Slow page load (LCP > 3 seconds)
- Lower Google rankings (PageSpeed Insights penalizes heavy pages)
- High data usage for mobile visitors (especially on limited plans)
- Lost foot traffic due to bounces

**Warning signs:**
- PageSpeed Insights score < 50 on mobile
- First Contentful Paint > 3 seconds
- Images are uncompressed or in old formats (JPEG at 100% quality)
- No lazy loading in place
- Site is noticeably slow on a throttled 4G connection

**Prevention:**
1. **Compress images aggressively:** Use TinyPNG, ImageKit, or similar to compress all images before upload.
2. **Use modern formats:** Convert large JPEG/PNG to WebP (30–50% smaller) or AVIF (even smaller). Provide JPEG fallback for older browsers.
3. **Resize for the web:** Don't use 4000x3000 photos at full size. Resize to match max display width (e.g., 1200px for full-width hero image, 400px for thumbnails).
4. **Implement lazy loading:** Use `loading="lazy"` on images below the fold to defer loading until they're about to enter the viewport.
5. **Responsive images:** Use `<picture>` or `srcset` to serve smaller images on mobile, larger on desktop.
6. **Test page speed:** Use Google PageSpeed Insights and aim for a score of 75+ on mobile.

**Phase to address:**  
**Phase 3 (Development)** — Set up image optimization and lazy loading.  
**Phase 4 (Content & Integration)** — Compress all images before adding to site.  
**Phase 5 (Testing & Deployment)** — Run PageSpeed Insights, confirm LCP < 3 seconds.

---

### Pitfall 8: Accessibility Violations Exclude Users and Create Legal Risk

**What goes wrong:**  
A user with a screen reader tries to navigate the site and finds:
- Images have no alt text
- Form inputs have no labels
- Color contrast is too low (e.g., gray text on white background)
- Navigation is mouse-only (no keyboard support)
- Buttons are too small to tap or click

The user gives up and goes to a competitor's site. Additionally, the site may violate WCAG 2.1 standards and expose the client to ADA compliance complaints or fines.

**Why it happens:**  
Accessibility is an afterthought. Developer doesn't add alt text to images or test with keyboard-only navigation. Color choices are made for aesthetics without measuring contrast. Automated scanners catch only 30–40% of issues, so manual testing is skipped.

**Consequences:**  
- Users with disabilities are excluded
- Lower Google rankings (Google favors accessible sites)
- Potential ADA complaints or legal liability
- Reputational damage

**Warning signs:**
- No alt text on images
- Form inputs lack `<label>` elements
- Color contrast fails WCAG standards (< 4.5:1 for normal text)
- Keyboard Tab key doesn't navigate the site
- No focus indicators on buttons/links

**Prevention:**
1. **Alt text for all images:** Every image needs a descriptive alt text that conveys meaning (not just "image.jpg"). Decorative images can have empty alt text (`alt=""`).
2. **Form labels:** Every `<input>` must have a corresponding `<label>` that describes its purpose.
3. **Color contrast:** Test with a contrast checker (WebAIM Contrast Checker). Aim for at least 4.5:1 for normal text, 3:1 for large text (18px+).
4. **Keyboard navigation:** Tab through the site with keyboard only. Ensure all interactive elements are reachable. Add visual focus indicators (e.g., outline on :focus).
5. **Heading hierarchy:** Use `<h1>`, `<h2>`, `<h3>` in order; don't skip levels. Screen readers rely on heading structure.
6. **Test with WAVE or Lighthouse:** Use automated tools to catch basic issues. Follow up with manual keyboard and screen reader testing.

**Phase to address:**  
**Phase 2 (Design & Architecture)** — Plan accessible color palette and layout.  
**Phase 3 (Development)** — Add alt text, labels, and keyboard navigation.  
**Phase 5 (Testing & Deployment)** — Run WAVE audit, test with keyboard/screen reader.

---

## Minor Pitfalls

These degrade the experience or maintainability but don't cause catastrophic failures.

### Pitfall 9: Free Tier Hosting Limits Cause Surprise Outages or Billing

**What goes wrong:**  
Site is deployed to Netlify or Vercel free tier. Everything works fine until:
- A product launch or viral social media post drives traffic
- The site uses 100GB of bandwidth in one day and hits the limit
- Daily blog updates cause the free tier build minutes (300/month on Netlify) to run out
- Overages trigger surprise charges ($55 per 100GB on Netlify)
- OR the site is built for commercial use (which violates Vercel's non-commercial restriction)

Site goes down or gets restricted mid-campaign.

**Why it happens:**  
Developer doesn't review free tier limits carefully. Netlify's 300 credits/month (≈ 15 production deploys + minimal traffic) is tight for an active site. Build minutes can run out on Netlify if deploying frequently or building large sites. Vercel's non-commercial restriction is overlooked (it applies to freelancer work for clients).

**Consequences:**  
- Unexpected billing or service restrictions mid-campaign
- Site outage during peak traffic
- Client relationship damaged

**Warning signs:**
- Free tier limits are not documented
- No monitoring of build minutes, bandwidth, or deploy frequency
- Site is used for client work on Vercel (violates terms)

**Prevention:**
1. **Review free tier limits before choosing:** Compare Netlify, Vercel, Cloudflare Pages, GitHub Pages:
   - **Cloudflare Pages:** Unlimited bandwidth, unlimited sites, 500 builds/month (best for brochure sites)
   - **Netlify:** 300 credits/month, 300 build minutes/month
   - **Vercel:** Non-commercial use only on free tier
   - **GitHub Pages:** Free, but GitHub account required
2. **For Kelvin specifically, recommend Cloudflare Pages** (best free tier for brochure sites).
3. **Set up billing alerts:** If using a service with potential charges, enable alerts if spending exceeds $5/month.
4. **Document limits:** Write down the service's bandwidth, build time, and deploy limits and share with the client during handoff.

**Phase to address:**  
**Phase 1 (Discovery & Planning)** — Choose hosting provider based on needs.  
**Phase 2 (Design & Architecture)** — Confirm build and bandwidth assumptions.  
**Phase 6 (Client Handoff)** — Document hosting limits and when to upgrade.

---

### Pitfall 10: Client Can't Easily Update Content or Make Changes

**What goes wrong:**  
After handoff, the client needs to update:
- Business hours (new seasonal hours for winter)
- Phone number or email address
- A product category description
- "We're hiring" notice on the homepage

But the content is scattered throughout the codebase (some in HTML, some in JSON, some in CSS constants). Changing the phone number requires editing multiple files. Or the content is hardcoded in components, requiring a developer rebuild and redeploy to update text.

Client calls you: "I need to change the hours but I don't know where." Either you end up doing all updates (high maintenance burden), or the client gives up and the site becomes outdated.

**Why it happens:**  
Centralized content strategy (good idea!) isn't fully implemented. Some content is left hardcoded in components. Build process is complex, so client doesn't understand how to redeploy after making changes. No admin interface or simple editing mechanism exists.

**Consequences:**  
- High maintenance burden on the developer (all content changes require code edits)
- Site becomes outdated because client can't make changes independently
- Client frustration
- Difficult handoff experience

**Warning signs:**
- Content is scattered in multiple files (some in data.json, some in HTML, some in CSS)
- No single source of truth for business info (name, phone, address)
- No simple way to update hours or email without touching code
- Build process is unclear to non-technical users
- No documentation on "how to update [content type]"

**Prevention:**
1. **Enforce centralized content file:** All business info lives in one file (e.g., `src/data/site.json`):
   ```json
   {
     "business": {
       "name": "Kelvin",
       "phone": "555-1234",
       "email": "info@kelvinshop.com",
       "address": "123 Main St, Springfield, IL 62701",
       "hours": {
         "mon": { "open": "09:00", "close": "17:00" },
         "sun": null
       }
     }
   }
   ```
2. **Templating or static generation:** Use a static site generator (11ty, Hugo, Jekyll) so that content changes don't require rebuilding or redeploying—just edit the file and redeploy.
3. **Simple deployment:** Either:
   - Use a Git-based deployment (Netlify/Vercel: push to GitHub = auto-deploy), so the client can edit the file in GitHub's web UI and deploy automatically.
   - Or, use a simple CMS or headless CMS (Contentful, Storyblok) so the client can edit content via a UI without touching code.
4. **Documentation:** Provide a step-by-step guide: "To update hours: Open `data/site.json` → Edit the `hours` section → Commit and push → Site auto-deploys in 2 minutes."

**Phase to address:**  
**Phase 2 (Design & Architecture)** — Design centralized content structure.  
**Phase 3 (Development)** — Implement templating and auto-deployment.  
**Phase 6 (Client Handoff)** — Provide content update guide and demonstrate the process.

---

### Pitfall 11: Client Doesn't Understand the Website After Handoff

**What goes wrong:**  
Handoff happens. Client receives a folder of files, login credentials, and a 20-page technical manual. They don't understand:
- How to change content
- How to deploy updates
- What "staging" vs. "production" means
- When to call their ISP vs. when to call the developer
- How to report a bug (or if something is a bug)
- Who manages the domain, email, hosting

Six months later, something breaks and the client doesn't know how to report it or who to contact. Or the client accidentally deletes something and doesn't have a backup.

**Why it happens:**  
Handoff is treated as a one-time event, not a process. Documentation is technical (command-line steps, server configs) instead of client-friendly. No training or walkthroughs happen. Client is overwhelmed and disengages.

**Consequences:**  
- Client feels abandoned
- Small issues go unreported
- Accidental data loss (no backup strategy explained)
- Long-term maintenance relationship breaks down

**Warning signs:**
- Handoff materials are technical (console commands, git workflows)
- No walkthrough or Q&A session with the client
- Client has lots of questions immediately after handoff
- No backup/recovery plan is explained

**Prevention:**
1. **Client-friendly documentation package:**
   - **"How to update [content type]"** with screenshots (no command line)
   - **"When to call your developer vs. your hosting provider"** (clear decision tree)
   - **"Common issues and fixes"** (e.g., "Map not showing? Try reloading the page")
   - **Glossary** of terms (staging, production, DNS, etc.)
2. **Walkthrough/training:** Schedule a 30-minute call with the client to:
   - Walk through how to update business hours
   - Show how to deploy changes
   - Demonstrate the contact form and where submissions appear
   - Explain how to reach out if something breaks
3. **Backup plan:** Explain how backups work and what to do if something gets deleted.
4. **Support model:** Define whether you're available for free support, paid support, or no support after handoff. Set clear expectations.

**Phase to address:**  
**Phase 6 (Client Handoff & Launch)** — Create client-friendly docs, conduct training call.

---

## Phase-Specific Warnings

| Phase | Topic | Likely Pitfall | Mitigation |
|-------|-------|---|---|
| **Phase 1: Discovery & Planning** | Content strategy | Placeholder content ends up in final product | Define central data file. Plan how client will provide real content before launch. |
| **Phase 1** | Hosting choice | Free tier limits cause outages/billing | Audit free tier limits upfront. For Kelvin: choose Cloudflare Pages. |
| **Phase 2: Design & Architecture** | Data model | Hours display will fail on holidays/timezones | Design schema for recurring hours + exceptions + timezone from the start. |
| **Phase 2** | Contact form | Deliverability issues after launch | Choose form service carefully. Plan deliverability testing. Test with real email providers. |
| **Phase 2** | Maps | API key billing or privacy consent issues | Decide: iframe (free, simpler) or API (customizable). If using API, restrict key and plan consent strategy. |
| **Phase 3: Development** | Mobile UX | Oversized images or unresponsive layout | Test on real mobile devices continuously. Implement lazy loading and responsive images. |
| **Phase 3** | Accessibility | WCAG violations | Add alt text, labels, keyboard navigation during development, not as afterthought. Test early. |
| **Phase 4: Content & Integration** | SEO | Inconsistent NAP or missing schema | Verify name/address/phone match across all pages and schema. Validate schema before launch. |
| **Phase 4** | Images | Heavy images slow site down | Compress and optimize all images before adding to site. Test PageSpeed. |
| **Phase 5: Testing & Deployment** | Placeholder detection | Fake data ships to production | Run pre-deploy CI check for known placeholder markers. Manual content audit. |
| **Phase 5** | Contact form | Emails go to spam | Test form deliverability with Gmail, Outlook, corporate email. |
| **Phase 5** | Mobile | Responsive issues discovered too late | Test on real devices during dev, not only at the end. |
| **Phase 6: Client Handoff** | Maintenance | Client can't update content | Ensure content updates don't require code changes. Provide simple, clear update guides. Conduct training call. |
| **Phase 6** | Support | Client feels abandoned | Define post-launch support model. Provide glossary and "when to contact" guide. |

---

## Sources

- [The Biggest Website Mistakes Small Businesses Make](https://growwithgrit.substack.com/p/the-biggest-website-mistakes-small)
- [Small business web design: common mistakes to avoid - Marketeam](https://marketeam.com.au/resources/articles/web-design/small-business-web-design-common-mistakes-to-avoid)
- [Why Your Contact Form Emails Are Going to Spam (+ How To Fix It)](https://wpforms.com/why-your-contact-form-emails-are-going-to-spam-how-to-fix-it/)
- [A Complete Guide to Embedding Google Maps in Website](https://www.baslondigital.com/post/a-complete-guide-to-embedding-google-maps-in-website/)
- [A Complete Guide to Local Business Schema Markup - AgencyAnalytics](https://agencyanalytics.com/blog/local-business-schema-markup)
- [Common Mistakes To Avoid With Schema Implementation On Local Business Sites](https://rookdigital.com/common-mistakes-to-avoid-with-schema-implementation-on-local-business-sites/)
- [Image Optimization: 8 Ways To Boost Store Speed (2026) - Shopify](https://www.shopify.com/blog/7412852-10-must-know-image-optimization-tips)
- [5 Common Accessibility Issues on Small Business Websites (And How to Fix Them)](https://wcagpros.com/wcag-articles/5-common-accessibility-issues-on-small-business-websites-and-how-to-fix-them/)
- [Top 10 WCAG violations found on business websites](https://www.adacompliancepros.com/blog/top-10-wcag-violations-found-on-business-websites)
- [How to Successfully Hand Off a Website to Your Client](https://www.cloudways.com/blog/hand-off-a-website/)
- [Every hosting provider's free tier, side by side (checked September 2026)](https://flaviocopes.com/hosting-free-tiers/)
- [Netlify vs Vercel and the Static Hosting Landscape — What Are the Real Limits for Personal Users?](https://cmaven.github.io/en/hosting/netlify-vercel-static-hosting-comparison/)
