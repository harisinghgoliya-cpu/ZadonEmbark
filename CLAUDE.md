# ZadonEmbark Website — Project Rules & Dev Handoff

## Project Overview
Static marketing website for ZadonEmbark at zadonembark.com.
Bilingual (English + Hindi), no backend, no login, no database.

**Live URL:** https://zadonembark.com
**Repo:** ~/ZadonEmbark (local) → GitHub → Azure Static Web Apps (CI/CD)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro (latest stable), `output: 'static'`, TypeScript |
| Styling | CSS custom properties (design tokens) + scoped CSS — NO CSS framework |
| Content | Markdown/MDX + YAML in `src/content/` with Zod schemas |
| Fonts | Self-hosted via @fontsource — Plus Jakarta Sans, Inter, Noto Sans Devanagari, Mukta |
| Images | Astro `<Image>` / `<Picture>` → AVIF + WebP, responsive, lazy-load |
| JavaScript | Vanilla JS only (mobile menu, tabs, sticky bar, form loader) |
| Forms | Tally (embedded, lazy-loaded) — form IDs in `site.ts` only |
| Analytics | Cloudflare Web Analytics (cookieless) — NO cookie banner needed |
| Hosting | **Azure Static Web Apps (Free tier)** |
| CI/CD | GitHub → Azure Static Web Apps Git integration |
| Node | Current LTS (build only) |

---

## Deployment — Azure Static Web Apps

> TRD originally specified Cloudflare Pages. Azure Static Web Apps used instead (same free tier, same team as other Azure resources).

- **Build command:** `npm run build`
- **Output dir:** `dist`
- **Config file:** `staticwebapp.config.json` (security headers, redirects) — replaces TRD's `_headers` / `_redirects`
- **Environments:**
  - Local: `localhost:4321` (`npm run dev`)
  - Preview: auto-generated per PR (staging URL from Azure)
  - Production: `https://zadonembark.com` (merge to `main`)
- **Custom domain:** `zadonembark.com` + `www` → apex in Azure Static Web Apps
- **DNS:** GoDaddy (do NOT change nameservers — email is on GoDaddy Titan)

### staticwebapp.config.json handles
- Security headers (HSTS, CSP, X-Frame-Options, etc.)
- www → apex redirect (301)
- Trailing slash normalisation
- `/thank-you/*` → noindex header
- Future renamed URL redirects

---

## Email & Forms

**All 3 mailboxes are on GoDaddy Professional Email (Titan) — zadonembark.com**

| Mailbox | Purpose |
|---------|---------|
| info@zadonembark.com | General contact, fraud reports |
| hari@zadonembark.com | Internal |
| manu@zadonembark.com | Internal |

**Form → Email flow:**
- Forms built in Tally (tally.so) — account on `admin@harisingh93hotmail.onmicrosoft.com`
- Tally sends email notifications directly to role inboxes
- Site never receives or stores personal data

| Form Key | Tally Notify → |
|----------|----------------|
| candidate | jobs@zadonembark.com |
| student | admissions@zadonembark.com |
| employer | partners@zadonembark.com |
| partner | partners@zadonembark.com |
| report | info@zadonembark.com |
| general (contact) | info@zadonembark.com |

> `jobs@`, `admissions@`, `partners@` mailboxes to be created later when needed.

---

## DNS — DO NOT TOUCH

GoDaddy DNS must stay as-is. Email (Titan) depends on these records:
- MX → mx1.titan.email, mx2.titan.email
- TXT SPF → `v=spf1 include:spf.titan.email include:secureserver.net ~all`

For Azure Static Web Apps custom domain, only add:
- CNAME `www` → Azure-provided URL
- TXT record for apex domain verification (Azure will give this)

---

## Project Structure

```
ZadonEmbark/
├─ public/
│  ├─ robots.txt
│  ├─ llms.txt
│  ├─ favicon.svg
│  └─ og/                    # default OG images
├─ src/
│  ├─ config/
│  │  ├─ site.ts             # entity name, phones, emails, WhatsApp, Tally IDs, feature flags
│  │  └─ nav.ts              # header/footer menus (en + hi)
│  ├─ content/
│  │  ├─ pages/{en,hi}/      # Markdown body copy per page
│  │  ├─ countries/          # one file per country
│  │  ├─ faqs/               # FAQ entries (en + hi)
│  │  ├─ opportunities/      # Phase 2
│  │  ├─ stories/            # Phase 2
│  │  └─ legal/              # privacy, terms, disclaimer, refunds, cookies
│  ├─ components/
│  ├─ layouts/               # BaseLayout, PageLayout, CountryLayout, LegalLayout
│  ├─ pages/                 # routes (en at root, hi under /hi/)
│  ├─ styles/                # tokens.css, base.css, utilities.css
│  ├─ scripts/               # menu.js, tabs.js, embed-loader.js
│  └─ assets/images/
├─ staticwebapp.config.json  # Azure: headers + redirects
├─ astro.config.mjs
├─ package.json
└─ CLAUDE.md
```

---

## Design Tokens

```css
:root {
  --navy-900: #14263B;  --navy-700: #22405F;  --sky-100: #DCE8F5;
  --amber-500: #F2A93B; --teal-600: #127A6E;  --red-600: #C0392B;
  --ink-800: #1F2933;   --slate-500: #5B6B7C; --cloud-50: #F6F8FB;
  --white: #FFFFFF;

  --font-head: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-hi:   'Noto Sans Devanagari', 'Mukta', sans-serif;

  --fs-h1: clamp(2rem, 4vw, 3rem);
  --fs-h2: clamp(1.625rem, 3vw, 2.125rem);
  --fs-h3: clamp(1.25rem, 2vw, 1.5rem);
  --fs-body: clamp(1rem, 1.1vw, 1.0625rem);
  --fs-small: 0.8125rem;

  --space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
  --space-6:24px; --space-8:32px; --space-12:48px; --space-16:64px; --space-24:96px;

  --radius: 8px; --radius-lg: 16px;
  --shadow: 0 2px 12px rgba(20,38,59,.08);
  --container: 1200px;
}
```

Breakpoints: 0–639 mobile · 640–1023 tablet · 1024+ desktop. Mobile first.
`:lang(hi)` → switch to `--font-hi`, body size +1px.

---

## Feature Flags (in site.ts)

```ts
showRegistration: false    // hide RA registration block until verified
showOpportunities: false   // hide /work-abroad/opportunities/ (Phase 2)
showStories: false         // hide success stories (Phase 2)
```

---

## Content Rules (MUST follow)

1. **Never** claim guaranteed jobs, visas or admissions anywhere
2. Country figures with `status: unverified` must NOT render (build warns)
3. Pages with `last_reviewed` older than 180 days → CI warning
4. Opportunities with past `closing_date` excluded at build
5. `showRegistration = false` → registration block hidden
6. All entity facts (name, address, phone) come ONLY from `site.ts` — never hardcode
7. Thank-you pages → `noindex`, excluded from sitemap
8. Forms: NEVER ask for passport number, Aadhaar, PAN or bank details
9. Every form must have consent checkbox linking to `/legal/privacy/`
10. Hindi copy is hand-written — NOT machine-translated

---

## Pages (37 total at launch)

### English Core (14)
| Route | Template |
|-------|----------|
| / | Home |
| /study-abroad/ | Overview |
| /study-abroad/[country]/ ×4 | CountryLayout |
| /work-abroad/ | Overview |
| /work-abroad/[country]/ ×3 | CountryLayout |
| /for-employers/ | PageLayout |
| /partners/ | PageLayout |
| /how-it-works/ | PageLayout |
| /about/ | PageLayout |
| /fees-and-transparency/ | PageLayout |
| /fraud-awareness/ | PageLayout |
| /faq/ | PageLayout |
| /contact/ | PageLayout |

### Legal (5)
`/legal/{privacy,terms,disclaimer,refunds,cookies}/`

### Thank-you (5, noindex)
`/thank-you/{candidate,student,employer,partner,report}/`

### Hindi (6)
`/hi/` + `/hi/{work-abroad,study-abroad,fees,fraud-awareness,contact}/`

### Country Pages
**Work:** Germany, Poland, UAE
**Study:** Canada, UK, Australia, Germany

### Phase 2 (built, hidden)
- `/eligibility-check/` (quiz)
- `/work-abroad/opportunities/`
- `/stories/`

---

## Components

Header, Footer, StickyActionBar, Button, Hero, AudienceCards, FeatureColumns,
ProcessStepper, CountryCard, CountryGrid, PromiseBand, TrustStrip, Callout,
FAQAccordion, Tabs, FormEmbed, BookingLink, MapEmbed, SourceList, FigureTable, SEOHead

**Button rules:** min-height 48px; amber primary always uses navy text.
**FormEmbed:** lazy-loads Tally only when in viewport; shows fallback link + WhatsApp if blocked.
**MapEmbed:** click-to-load only (no Google Maps request until user clicks).

---

## SEO & i18n

- Astro i18n: `defaultLocale: 'en'`, `locales: ['en','hi']`, `prefixDefaultLocale: false`
- English at `/`, Hindi at `/hi/`
- `hreflang` on all pages with both versions
- Sitemap via `@astrojs/sitemap` (excludes noindex + unpublished)
- Schema: Organization + BreadcrumbList (all pages), LocalBusiness (Home/About/Contact), FAQPage, JobPosting (Phase 2)
- `llms.txt` in public/ — plain summary for AI crawlers

---

## Performance Targets (mobile)

| Metric | Target |
|--------|--------|
| LCP | ≤ 2.5s on 4G |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |
| JS bundle (excl. Tally) | ≤ 30KB gzipped/page |
| Home page weight | ≤ 1MB first load |
| Lighthouse mobile | Perf ≥90, A11y ≥95, BP ≥95, SEO ≥95 |

---

## Security Headers (staticwebapp.config.json)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
X-Frame-Options: DENY
Content-Security-Policy: default-src 'self'; img-src 'self' data: https:;
  style-src 'self' 'unsafe-inline'; script-src 'self' https://tally.so https://static.cloudflareinsights.com;
  frame-src https://tally.so https://www.google.com;
  connect-src 'self' https://cloudflareinsights.com; font-src 'self';
  frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://tally.so
```

Test CSP in report-only mode first.

---

## Open Items (Business must provide before launch)

| # | Item | Blocks |
|---|------|--------|
| D1 | Legal entity name + registered address + GST/CIN | Footer, About, schema, legal pages |
| D2 | Recruitment route (own RA or partner) | Work Abroad compliance text |
| D3 | Confirm launch countries | Country pages |
| D4 | Fees + refund policy (after legal review) | Fees page |
| D5 | Lead retention period + grievance officer name | Privacy policy |
| C1 | Logo files (SVG) | Site-wide |
| C2 | Office + team photos, bios, LinkedIn URLs | About page |
| C3 | Business phone, WhatsApp, office hours, Maps location | site.ts |
| C4 | Approved English copy for all pages | All pages |
| C5 | Hindi copy for 6 Hindi pages + form labels | Hindi pages |
| C6 | Country page content with sources + review dates | Country pages |
| C7 | FAQs (English + Hindi) | FAQ page |
| C8 | Legal pages reviewed by lawyer | /legal/* |
| C9 | Microsoft Bookings page set up | BookingLink component |
| C10 | Tally account on admin@zadonembark.com | All forms |

---

## How to Run

```bash
cd ~/ZadonEmbark
npm install
npm run dev        # localhost:4321
npm run build      # builds to dist/
npm run preview    # preview build locally
```

## How to Deploy

Push to `main` → GitHub Actions → Azure Static Web Apps auto-deploys.
Every PR gets a staging preview URL.
