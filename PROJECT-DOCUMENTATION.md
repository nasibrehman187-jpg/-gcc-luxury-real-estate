# GCC Luxury Real Estate — Project Documentation (A to Z)

---

## 1. Project Overview

### 1.1 Project Identity & Purpose
- **Project Name:** GCC Luxury Real Estate
- **Tagline:** *Where Gulf Luxury Meets Intelligent Investment*
- **Established Year:** 2009 (Demonstration Brand Context)
- **Primary Purpose:** A flagship ultra-luxury real estate and sovereign wealth investment portal designed as a high-tier portfolio piece for acquiring private clients, luxury brokerages, property developers, and family offices in the GCC region (UAE, Qatar, Saudi Arabia, Bahrain, Oman, Kuwait).
- **Core Value Proposition:** Combines institutional-grade investment metrics (cap rates, indicative yields, Golden Visa qualification, 0% tax structures) with ultra-high-end residential showcases (penthouses, private islands, beachfront villas).

### 1.2 Tech Stack & Architecture
- **Build Tool & Bundler:** [Vite](https://vitejs.dev/) v8.2.2 (Multi-page Application Rollup architecture with custom middleware routing)
- **Frontend Core:** Pure Vanilla JavaScript (Modern ES6+ Modules, Zero bloated JS framework runtime overhead)
- **Styling Engine:** Vanilla CSS3 with CSS Custom Properties (Design Tokens), Flexbox, CSS Grid, and responsive fluid typography (`clamp()`)
- **Backend & Database:** [Supabase](https://supabase.com/) (Managed PostgreSQL, PostgREST API, Row Level Security)
- **Web Analytics & Telemetry:** Google Analytics 4 (`G-5JF2QXJN4Z`) with custom user journey event tracking (`gtag.js`)
- **Motion & Interaction:** GSAP (ScrollTrigger) & native IntersectionObserver API for subtle, accessible scroll reveals
- **Internationalization (i18n):** Custom client-side bilingual translation engine supporting **English (EN)** and **Arabic (العربية / RTL)**

---

## 2. Design System: Sandstone Gulf

The visual identity is built on the bespoke **Sandstone Gulf** design system — engineered specifically to reflect the warmth, opulence, and architectural grandeur of Arabian Gulf ultra-prime real estate without visual clutter.

```
Sandstone Gulf Core Palette
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  #1A1614         │  │  #E0B04C         │  │  #C4A484         │
│  Espresso Black  │  │  Gulf Gold       │  │  Desert Sand     │
│  (Primary BG)    │  │  (CTAs & Accent) │  │  (Borders/Meta)  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  #201B18         │  │  #F0E9DD         │  │  #241F1C         │
│  Card Charcoal   │  │  Warm Silk Cream │  │  Elevated Umber  │
│  (Card Surfaces) │  │  (Primary Text)  │  │  (Hover & Menus) │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

### 2.1 Color Palette & Token Reference

| CSS Variable | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| `--bg-primary` | `#1A1614` | **Warm Espresso Black:** Canvas background across all HTML pages. |
| `--bg-secondary` | `#241F1C` | **Deep Roasted Umber:** Secondary section backgrounds, mobile nav overlay, dropdown menus. |
| `--bg-card` | `#201B18` | **Charcoal Coffee Card:** Property cards, trust metric containers, advisory process blocks. |
| `--bg-tertiary` | `#2E2723` | **Dark Sandstone Accent:** Input field backgrounds, table row alternate fills, subtle hovers. |
| `--bg-light` | `#F5EFE4` | **Warm Sand / Ivory:** High-contrast light themes or printed executive summary views. |
| `--gold` | `#E0B04C` | **Gulf Gold:** Primary CTAs, starting prices, verified badges, active navigation links, icons. |
| `--gold-light` | `#ECC56C` | **Soft Sunlight Gold:** Hover state for buttons and subtle active card glows. |
| `--gold-dark` | `#A8812E` | **Burnished Antique Gold:** Dark gold borders, outlines, and footer accents. |
| `--sandstone` | `#C4A484` | **Warm Desert Sandstone:** Section dividers, card borders, meta tags, and disclaimers. |
| `--sandstone-light`| `#D9C2AA` | **Champagne Sandstone:** Secondary icons, trust bar subtitles, spec values. |
| `--sandstone-dim` | `#9E8267` | **Muted Sandstone:** Inactive pagination dots and disabled button borders. |
| `--cream` | `#F0E9DD` | **Warm Silk Cream:** Primary body typography, headings, and data values. |
| `--text-muted` | `#BDB2A4` | **Desert Dune Gray:** Helper labels, floor plan captions, timestamps, input placeholders. |
| `--text-dark` | `#2A211C` | **Dark Espresso Text:** High-contrast text on gold badges and primary buttons (AAA compliant). |

### 2.2 Typography Hierarchy

- **Serif Heading Font:** `Playfair Display`, Georgia, serif
  - *Weights:* `400 (Regular)`, `500 (Medium)`, `600 (Semi-Bold)`, `700 (Bold)`
  - *Usage:* Page titles (`h1`), section headers (`h2`), property names (`h3`), numerical portfolio statistics.
- **Sans-Serif Body Font:** `Inter`, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
  - *Weights:* `300 (Light)`, `400 (Regular)`, `500 (Medium)`, `600 (Semi-Bold)`
  - *Usage:* Navigation links, paragraph copy, form labels, specifications, buttons, filter dropdowns.
- **Arabic Calligraphic Font:** `Amiri`, 'Traditional Arabic', serif
  - *Usage:* Activated automatically across all headings and text blocks when toggled to Arabic (`body.rtl-mode`).

### 2.3 Layout & Motion Conventions
- **Max Content Width:** `1200px` centered with auto gutters (`3rem` desktop padding, `1.5rem` tablet/mobile).
- **Responsive Breakpoints:**
  - Desktop: $>1024\text{px}$
  - Tablet: $768\text{px} - 1024\text{px}$
  - Mobile: $<768\text{px}$
- **Motion Philosophy (Restrained & Subtle):**
  - Card Hover: `transform: translateY(-4px)` with soft shadow `0 8px 30px rgba(0,0,0,0.55)` and gold border transition (no 3D tilt).
  - Button Hover: `transform: translateY(-2px)` with subtle gold glow.
  - Gallery Fade-in: Smooth opacity transition on viewport scroll via `IntersectionObserver`.
  - Accessibility: Full `@media (prefers-reduced-motion: reduce)` rules disable all transforms and transitions for users requesting reduced motion.

---

## 3. Site Structure — Page by Page Breakdown

```
Site Sitemap Architecture
├── / (Home — index.html)
├── /listings.html (Curated Portfolio & Interactive Filters)
├── /property.html (Dynamic Property Showcase & Viewing Booking)
├── /investment.html (Strategic Sovereign Intelligence & Yield Models)
├── /about.html (Institutional Profile & Advisory Process)
├── /contact.html (Private Consultation & Direct Partner Inquiries)
├── /locations/
│   ├── dubai.html (Downtown, Palm Jumeirah & DIFC)
│   ├── abu-dhabi.html (Saadiyat Cultural & Al Raha Beach)
│   └── doha.html (Doha Corniche & The Pearl-Qatar)
├── /privacy.html (Privacy Protocol & Data Handling Disclosures)
├── /terms.html (Terms of Engagement & Investment Disclaimers)
└── /404.html (Branded Not Found Recovery Page)
```

---

### 3.1 Home (`index.html` / `/`)
- **Route:** `/` or `/index.html`
- **Purpose:** Brand introduction, hero impact, credibility establishment, and direct preview of featured residences.
- **Sections (Top to Bottom):**
  1. **Top Trust Strip:** Licensed brokerage license (`RERA ORN 29481`), 15+ years experience, indicative yield baseline (`6.8% – 9.2% p.a.`).
  2. **Navigation Header:** Brand logo, navigation links, Arabic language toggle (`العربية`), and *"Schedule Consultation"* CTA button.
  3. **Static Luxury Hero:** Architectural skyline photography with dark vignette, institutional slogan (*"Where Gulf Luxury Meets Intelligent Investment"*), primary *"Explore Properties"* and secondary *"Book Private Consultation"* CTAs.
  4. **Trust Bar Metrics Strip:** RERA & DLD licensed seals, 250+ curated assets, AED 2.4B+ portfolio volume, with illustrative figures disclaimer.
  5. **Featured Residences Preview:** Static 3-card preview (Skyline Penthouse, Palm Villa Retreat, Marina Heights Estate) with prices, specs, verified seals, and a central *"View All Properties"* link.
  6. **Why Invest With Us (3 Core Pillars):** Prime Locations, Verified Listings (title deed & ownership review), and Discreet Advisory.
  7. **Footer & Private Register:** Institutional footer navigation, regulatory seal, and VIP newsletter signup.

---

### 3.2 Listings (`listings.html` / `/listings.html`)
- **Route:** `/listings.html` (Rewritten as `/listings`)
- **Purpose:** Full property catalog with 5-axis client-side filtering and real-time query string synchronization.
- **Sections:**
  1. **Header & Intro:** *"Curated Portfolio"* banner with total listing count indicator.
  2. **Interactive Filter Toolbar:**
     - **Location:** All Locations, Dubai, Abu Dhabi, Doha.
     - **Property Type:** All Types, Penthouse, Beachfront Villa, Apartment, Waterfront Estate.
     - **Price Range:** Any Price, Under AED 50M, AED 50M – 70M, AED 70M+.
     - **Bedrooms:** Any, 3+, 4+, 5+.
     - **Purpose:** Any Purpose, Investment, Primary Residence.
     - **Sort:** Featured / Newest, Price: Low to High, Price: High to Low.
     - **Reset Action:** Instant reset button.
  3. **Listings Grid:** Responsive 3-column card grid rendering active properties with status badges (*Ready*, *Off-Plan*), verified seals, dual AED/USD pricing, and *"View Residence"* actions.
  4. **Empty State:** Sandstone Gulf empty state displayed when filters yield 0 results with *"Reset Filters"* and *"Contact an Advisor"* actions.
  5. **Skeleton Loading State:** Built-in pulsing placeholder cards for simulated network delays.

---

### 3.3 Property Detail (`property.html` / `/property/:slug`)
- **Route:** Dynamic routing via `/property/:slug` (e.g., `/property/skyline-penthouse`) or query parameter `/property.html?id=skyline-penthouse`.
- **Purpose:** Deep-dive dossier for an individual residence designed to convert visitors into private viewing inquiries.
- **Sections:**
  1. **Breadcrumb Navigation:** `Home / Properties / [Property Name]`.
  2. **High-Res Interactive Gallery:** Hero image preview with thumbnail strip, counter, and fade-in viewport loading.
  3. **Property Header:** Verified title deed badge, property name, location tag, status pill, and dual AED/USD price tag.
  4. **Key Metric Specs Strip:** Bedrooms, Bathrooms, Total Area (sq ft), Indicative Rental Yield, Ownership Type, Handover Date.
  5. **Main Content Column:**
     - *Architectural Narrative:* Multi-paragraph curated description.
     - *Key Amenities Grid:* 8 icon-backed lifestyle features (Private Infinity Pool, Smart Home, Biometric Security, Concierge, etc.).
     - *Floor Plan Specifications:* Room breakdown with exact square footages.
     - *Investment & Commercial Facts:* Service charges annually, payment plan schedule, indicative yield disclaimer.
     - *Nearby Landmarks:* Bulleted transit times (e.g., *3 mins walk to Dubai Mall*).
  6. **Sticky Advisory Sidebar:**
     - Quick price summary & *"Private viewing available"* status.
     - Primary *"Request a Viewing"* gold button (scrolls to form).
     - Secondary *"Speak on WhatsApp"* direct button.
     - Dedicated Advisor Card with name, title, and direct contact.
     - **Inquiry Consultation Form:** Name, WhatsApp phone, email, preferred market selector, and message with inline validation and anti-bot security.
  7. **Related Residences Carousel:** 3 sibling properties matching market geography.

---

### 3.4 Investment Intelligence (`investment.html` / `/investment.html`)
- **Route:** `/investment.html`
- **Purpose:** High-net-worth investor dashboard demonstrating regional capital growth, tax benefits, and residency regulations.
- **Sections:**
  1. **Macro Slogan & Hero:** Sovereign investment climate across the Arabian Gulf.
  2. **Market Metric Strip:** 0% Personal & Capital Gains Tax, 100% Foreign Freehold, 10-Year Golden Visa, 6.8%–9.2% Net Yields.
  3. **Strategic Investment Pillars:** Capital Appreciation, Sovereign Security, Currency Peg stability (AED/QAR to USD), and Golden Visa thresholds (AED 2M+).
  4. **Comparative Market Matrix:** Side-by-side data table comparing Dubai, Abu Dhabi, and Doha across prime yields, capital growth, and ownership zones.
  5. **Private Capital Consultation CTA:** Direct pathway to custom portfolio allocation.

---

### 3.5 About Us (`about.html` / `/about.html`)
- **Route:** `/about.html`
- **Purpose:** Institutional credibility, advisory philosophy, leadership background, and our 4-step advisory methodology.
- **Sections:**
  1. **Hero & Mission Statement:** 15+ years of Gulf real estate excellence.
  2. **Core Pillars:** Discretion, Integrity, Institutional Market Intelligence, Fiduciary Loyalty.
  3. **"Our Advisory Process" (4-Step Workflow):**
     - **01 · Discover:** Goal, budget, and market assessment.
     - **02 · Evaluate:** Rigorous shortlisting of verified assets.
     - **03 · View:** Seamless private in-person or virtual viewings.
     - **04 · Acquire:** Transaction execution through to secure title transfer.
  4. **Regional Presence:** Overview of Downtown Dubai, Al Maryah Island (Abu Dhabi), and Doha Corniche offices.
  5. **Verified Client Testimonials:** Quotes from international family offices and managing directors.

---

### 3.6 Contact & Consultation (`contact.html` / `/contact.html`)
- **Route:** `/contact.html`
- **Purpose:** Centralized contact hub for booking consultations, private viewings, or reaching regional partners.
- **Sections:**
  1. **Direct Communication Channels:** Instant WhatsApp concierge, direct telephone, and email.
  2. **Regional Office Dossiers:** Downtown Dubai HQ, Abu Dhabi Global Market liaison, and Doha waterfront suites.
  3. **Comprehensive Consultation Form:** Full legal name, corporate entity, contact numbers, investment market preference, and message.
  4. **Interactive Validation & Anti-Bot Protection:** Honeypot field, 800ms bot interaction speed check, and 3-second rate limiter.

---

### 3.7 Market Location Focus Pages (`/locations/*`)
- **Routes:**
  - `/locations/dubai.html` — Dubai Prime Markets (Downtown, Palm Jumeirah, DIFC)
  - `/locations/abu-dhabi.html` — Abu Dhabi Capital Portfolio (Saadiyat Cultural, Al Raha)
  - `/locations/doha.html` — Doha Waterfront & The Pearl-Qatar
- **Purpose:** Geographically targeted SEO and investor dossiers highlighting neighborhood yields, infrastructure, and active property allocations.
- **Sections:** Market overview hero, key municipal metrics (yields, foreign ownership rules, Golden Visa criteria), curated local listings, and specialized advisory contact.

---

### 3.8 Legal & Utility Pages
- **Privacy Policy (`privacy.html`):** Outlines data collection protocols via forms, third-party infrastructure (Supabase, GA4), no-data-selling pledge, and privacy officer contact (`nasibrehman187@gmail.com`).
- **Terms of Service (`terms.html`):** Terms of platform engagement, intellectual property rights, non-guaranteed investment disclaimer, and governing jurisdiction.
- **404 Not Found (`404.html`):** Sandstone Gulf styled error recovery page with direct buttons back to Home and Active Listings.

---

## 4. Data & Content Specifications

All property, location, and testimonial data resides in [`src/data.js`](file:///c:/Users/FURQAN%20COMPUTERS/Desktop/GCC%20Luxury%20Real%20Estate/src/data.js) as the single source of truth.

### 4.1 The 4 Curated Properties

```
Portfolio Matrix
┌────────────────────────┬─────────────────────┬──────────────────────┬─────────────┬───────────┐
│ Property Name          │ Location            │ Price (AED / USD)    │ Specs       │ Status    │
├────────────────────────┼─────────────────────┼──────────────────────┼─────────────┼───────────┤
│ Skyline Penthouse      │ Downtown Dubai, UAE │ AED 90.0M / $24.5M   │ 4 Bed 5 Bath│ Ready     │
│ Palm Villa Retreat     │ Palm Jumeirah, UAE  │ AED 67.895M / $18.5M │ 5 Bed 6 Bath│ Ready     │
│ Corniche Residence     │ Doha Corniche, QAT  │ AED 46.976M / $12.8M │ 3 Bed 4 Bath│ Off-Plan  │
│ Marina Heights Estate  │ Al Raha Beach, AD   │ AED 55.784M / $15.2M │ 4 Bed 4 Bath│ Ready     │
└────────────────────────┴─────────────────────┴──────────────────────┴─────────────┴───────────┘
```

#### Detailed Property Breakdown:
1. **Skyline Penthouse (`skyline-penthouse`):**
   - *Location:* Downtown Dubai, UAE (Floor 72)
   - *Price:* AED 90,000,000 (≈ $24,500,000 USD)
   - *Specs:* 4 Bedrooms · 5 Bathrooms · 6,200 sq ft (576 sq m)
   - *Type:* Waterfront Penthouse | *Purpose:* Primary Residence | *Badge:* Featured | *Status:* Ready
   - *Developer:* Meridian Developments
   - *Commercials:* Service charges AED 24/sq ft annually · Freehold Title · Indicative Yield: 7.8% p.a.
   - *Landmarks:* 3 min walk to Dubai Mall, 5 min walk to Burj Khalifa, 14 min drive to DXB Airport.

2. **Palm Villa Retreat (`palm-villa-retreat`):**
   - *Location:* Frond G, Palm Jumeirah, Dubai
   - *Price:* AED 67,895,000 (≈ $18,500,000 USD)
   - *Specs:* 5 Bedrooms · 6 Bathrooms · 12,400 sq ft (1,152 sq m)
   - *Type:* Beachfront Villa | *Purpose:* Investment | *Badge:* Investment | *Status:* Ready
   - *Developer:* Horizon Properties
   - *Commercials:* Service charges AED 14/sq ft annually · Freehold Title · Indicative Yield: 7.2% p.a.
   - *Landmarks:* 4 min drive to Atlantis The Royal, 6 min to Nakheel Mall, 25 min to DXB Airport.

3. **Corniche Residence (`corniche-residence`):**
   - *Location:* Doha Waterfront Corniche, Qatar
   - *Price:* AED 46,976,000 (≈ $12,800,000 USD / QAR 46.9M)
   - *Specs:* 3 Bedrooms · 4 Bathrooms · 4,100 sq ft (381 sq m)
   - *Type:* Skyline Apartment | *Purpose:* Investment | *Badge:* New | *Status:* Off-Plan (Q4 2026)
   - *Developer:* Coastline Estates
   - *Commercials:* 60/40 Construction payment plan · Designated Freehold · Indicative Yield: 8.4% p.a.
   - *Landmarks:* 5 min walk to Museum of Islamic Art, 7 min walk to Souq Waqif, 15 min to Hamad Airport.

4. **Marina Heights Estate (`marina-heights-estate`):**
   - *Location:* Al Raha Beach, Abu Dhabi
   - *Price:* AED 55,784,000 (≈ $15,200,000 USD)
   - *Specs:* 4 Bedrooms · 4 Bathrooms · 9,800 sq ft (910 sq m)
   - *Type:* Waterfront Estate | *Purpose:* Primary Residence | *Badge:* Exclusive | *Status:* Ready
   - *Developer:* Zenith Group
   - *Commercials:* Private 55ft yacht mooring berth · Freehold Zone · Indicative Yield: 7.6% p.a.
   - *Landmarks:* 1 min walk to Marina boardwalk, 8 min drive to Yas Island, 10 min to Zayed Airport.

### 4.2 Fictional Business & Partner Details
- **Brand Identity:** GCC Luxury Real Estate (Established 2009)
- **Regulatory Registration:** RERA ORN 29481 / DLD Licensed Brokerage (Illustrative)
- **Developer Partners:** Meridian Developments, Horizon Properties, Coastline Estates, Zenith Group
- **Client Testimonials:**
  - *Tariq Al-Hashemi* (Private Family Office, UAE)
  - *Arthur Sterling* (International Portfolio Client, London)
  - *Dr. Layla Al-Sabah* (Managing Director, Doha)

---

## 5. Backend, Database & Integrations

### 5.1 Supabase Database Configuration
- **Supabase Project URL:** `https://empzkvcqbwcmecduljlv.supabase.co`
- **Tables & Schemas:**

```sql
-- 1. Table: inquiries (Property Consultation & Viewing Requests)
CREATE TABLE public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  property_name TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT
);

-- 2. Table: private_register (VIP Off-Market Email Subscription)
CREATE TABLE public.private_register (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  email TEXT NOT NULL UNIQUE
);
```

### 5.2 Row Level Security (RLS) Policy Architecture
Security audit verified:
- **`INSERT` (Write):** Publicly accessible for anonymous site visitors with `WITH CHECK (true)` on both tables, allowing form submissions without user login.
- **`SELECT` (Read):** Completely restricted to authenticated dashboard administrators (`TO authenticated USING (true)`). Public queries return an empty array (`[]`), preventing unauthorized data scraping.
- **Client Code Pattern:** In [`src/supabase.js`](file:///c:/Users/FURQAN%20COMPUTERS/Desktop/GCC%20Luxury%20Real%20Estate/src/supabase.js), inserts are performed via clean `.insert([{...}])` without `.select()`, preventing RLS select permission violations while generating reliable client-side reference IDs.

### 5.3 Live Contact Channels
- **Direct WhatsApp Concierge:** `+92 306 2320099` (Linked via dynamic `https://wa.me/923062320099` with pre-encoded inquiry parameters).
- **Direct Email:** `nasibrehman187@gmail.com`

### 5.4 Google Analytics 4 (GA4) Telemetry
- **Measurement ID:** `G-5JF2QXJN4Z`
- **Tracked Custom Events (`src/analytics.js`):**

| Event Name | Trigger | Payload Parameters |
| :--- | :--- | :--- |
| `property_card_click` | Clicking any property card | `property_id`, `property_title`, `property_price` |
| `whatsapp_click` | Clicking floating WhatsApp or button | `link_url`, `button_location` |
| `phone_click` | Clicking phone number links | `phone_number` |
| `form_start` | First focus event on any input | `form_id`, `form_name` |
| `form_submit` | Successful Supabase submission | `form_id`, `form_name`, `property_name` (optional) |
| `gallery_open` | Interacting with property gallery | `image_index` |
| `language_switch` | Toggling between EN and AR | `from_language`, `to_language` |
| `cta_click` | Clicking any primary/secondary CTA | `cta_text`, `cta_destination` |

---

## 6. Features Inventory

1. **Multi-Parameter Client-Side Filtering:**
   - Real-time instant filtering across 5 dimensions: Location, Property Type, Price Tier, Minimum Bedrooms (3+, 4+, 5+), and Intended Purpose (Investment vs. Primary).
   - Dynamic URL query parameter persistence (`?location=dubai&beds=4`).
2. **Dynamic Property Routing:**
   - Seamless route handling for clean URLs like `/property/skyline-penthouse` mapped through Vite middleware.
3. **Advanced Anti-Bot & Honeypot System:**
   - Invisible honeypot inputs (`_hp_sec_timestamp`, `_hp_company_sec`, `_hp_email_sec`) with `autocomplete="new-password"` to eliminate browser autofill false-positives.
   - **Interaction Velocity Guard:** Submissions occurring $<800\text{ms}$ after form initialization are automatically filtered as automated scripts.
   - **Submission Cooldown:** 3-second throttle preventing form submission spamming.
4. **Complete Production UI States:**
   - **Loading State:** Button spinners (`Submitting...`) and pulsing skeleton card placeholders.
   - **Empty State:** Sandstone Gulf empty results message with instant reset action.
   - **Error Handling:** Inline non-destructive error notices preserving user input on network dropouts.
   - **Success Feedback:** Booking confirmation receipt with unique reference IDs (`GCC-XXXXXXXX`).
5. **Internationalization (i18n):**
   - Full bilingual support for English and Arabic.
   - Dynamic DOM text replacement across navigation, badges, buttons, and metrics with RTL direction flipping.
6. **Mobile Optimization:**
   - Responsive hamburger navigation with full-screen slideout menu.
   - Fixed mobile bottom quick-action bar (*Call*, *WhatsApp*, *Properties*).
   - Floating WhatsApp badge with pulse animation.

---

## 7. Known Limitations & Portfolio Notes

- **Demo vs. Real Data:**
  - The 4 properties and their specifications represent realistic, curated Gulf luxury prototypes using licensed Unsplash architectural photography.
  - Testimonial names, company credentials (RERA ORN), and developer names are fictionalized for portfolio presentation.
- **Scope Boundaries (Intentionally Client-Focused):**
  - There is no direct payment gateway or checkout flow (high-value real estate transactions in the GCC require escrow agreements, title deed deeds, and legal representation).
  - Admin management is performed directly via the Supabase Dashboard rather than an embedded custom CMS.

---

## 8. Deployment & Environment Setup

### 8.1 Hosting & Version Control
- **Production Host:** [Vercel](https://vercel.com/)
- **Repository:** GitHub (`https://github.com/nasibrehman187-jpg/-gcc-luxury-real-estate.git`)
- **Continuous Deployment:** Any commit pushed to the `main` branch automatically triggers a production build and deployment on Vercel.

### 8.2 Environment Variables Configuration

Create a `.env` file in the project root with the following keys:

```env
# Supabase Database Configuration
VITE_SUPABASE_URL="https://empzkvcqbwcmecduljlv.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcHprdmNxYndjbWVjZHVsamx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczODM5MjAsImV4cCI6MjEwMjk1OTkyMH0.2nL6XXTB7L9rTcpinw1hqDQQKoFdYg1vJparlCRZTRA"

# GA4 Measurement ID (Bundled directly via analytics.js)
VITE_GA_MEASUREMENT_ID="G-5JF2QXJN4Z"
```

> [!IMPORTANT]
> Never commit `.env` to GitHub. The public `anon` key is safe for client-side execution because all sensitive database operations are strictly protected by PostgreSQL Row Level Security (RLS) policies.

### 8.3 Local Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Compile optimized production bundle into dist/
npm run build

# 4. Preview compiled production build locally
npm run preview
```
