// ============================================================
//  GCC Luxury Real Estate — Property Detail Page (Phase 2)
//  Reads slug from URL, renders full property details,
//  Floor Plans, Location & Landmarks, Sticky Inquiry Card & Supabase
// ============================================================

import { PROPERTIES, getPropertyBySlug, getRelatedProperties, formatPrice, formatPriceFull } from './data.js';
import { submitInquiry } from './supabase.js';
import { initI18n, t } from './i18n.js';
import { trackEvent } from './analytics.js';
import './register.js';

// ---------- Slug extraction ----------

function getSlugFromURL() {
  const path = window.location.pathname;
  const match = path.match(/\/property\/([a-z0-9-]+)/);
  return match ? match[1] : null;
}

// ---------- SVG Icon Library ----------

const ICONS = {
  bed: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20M2 20v-8M22 20v-8"/><path d="M2 12V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><rect x="6" y="7" width="4" height="5" rx="1"/></svg>`,
  bath: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z"/><path d="M6 12V5a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2"/><line x1="7" y1="20" x2="7" y2="22"/><line x1="17" y1="20" x2="17" y2="22"/></svg>`,
  sqft: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>`,
  type: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>`,
  pin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.013a9.634 9.634 0 0 1-4.907-1.344l-.352-.209-3.65.957.974-3.558-.23-.365A9.608 9.608 0 0 1 2.43 12.05c.002-5.316 4.33-9.643 9.65-9.643a9.58 9.58 0 0 1 6.824 2.825 9.58 9.58 0 0 1 2.822 6.826c-.003 5.316-4.33 9.643-9.647 9.643l-.028.084zM20.52 3.449C18.24 1.245 15.24 0 12.05 0 5.463 0 .104 5.334.101 11.893a11.832 11.832 0 0 0 1.587 5.945L0 24l6.335-1.652A11.882 11.882 0 0 0 12.05 23.8c6.59 0 11.95-5.335 11.953-11.893A11.82 11.82 0 0 0 20.52 3.449z"/></svg>`,
  user: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  map: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  pool: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 20c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0 3.5-1 5 0"/><path d="M2 16c1.5-1 3.5-1 5 0s3.5 1 5 0 3.5-1 5 0 3.5-1 5 0"/><path d="M6 12V4M18 12V4M6 4h12"/></svg>`,
  smart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="18.01"/></svg>`,
  concierge: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M18 20V10a6 6 0 0 0-12 0v10"/><line x1="2" y1="20" x2="22" y2="20"/><circle cx="12" cy="4" r="1"/></svg>`,
  parking: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>`,
  view: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  gym: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 5v14M18 5v14M6 12h12M3 8v8M21 8v8"/></svg>`,
  terrace: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M2 22h20M12 2v10M2 12h20M4 12v10M20 12v10M7.5 12l4.5-10 4.5 10"/></svg>`,
  security: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  garden: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12 22V12"/><path d="M7 12c-1.5 0-4-1-4-5 0-3 2.5-5 5-5 1 0 2.5.5 4 3 1.5-2.5 3-3 4-3 2.5 0 5 2 5 5 0 4-2.5 5-4 5"/></svg>`,
  check: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  alert: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  calendar: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  blueprint: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9M15 9v12"/></svg>`,
  download: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>`,
};

function injectSchemaJSONLD(property) {
  let script = document.getElementById('schema-jsonld');
  if (!script) {
    script = document.createElement('script');
    script.id = 'schema-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.name,
    description: property.description.join(' '),
    url: window.location.href,
    image: property.gallery.map(g => g.url),
    price: property.price,
    priceCurrency: 'AED',
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'AED',
      availability: 'https://schema.org/InStock',
    },
    about: {
      '@type': property.type === 'villa' ? 'SingleFamilyResidence' : 'Apartment',
      name: property.name,
      numberOfBedrooms: property.beds,
      numberOfBathroomsTotal: property.baths,
      floorSize: {
        '@type': 'QuantitativeValue',
        value: property.sqft,
        unitCode: 'FTK',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.address?.streetAddress || property.location,
        addressLocality: property.address?.addressLocality || 'Dubai',
        addressRegion: property.address?.addressRegion || 'Dubai',
        postalCode: property.address?.postalCode || '00000',
        addressCountry: property.address?.addressCountry || 'AE',
      },
    },
  };

  script.textContent = JSON.stringify(structuredData);
}

// ---------- Render the full page ----------

function renderProperty(property) {
  const main = document.getElementById('property-main');
  const breadcrumbName = document.getElementById('breadcrumb-name');

  // Update SEO Page Title & Breadcrumb
  document.title = `${property.name} | ${property.location} — GCC Luxury Real Estate`;
  breadcrumbName.textContent = property.name;

  // Dynamic Open Graph & Canonical Update
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const canonical = document.getElementById('canonical-url');
  if (ogTitle) ogTitle.content = `${property.name} — GCC Luxury Real Estate`;
  if (ogImage) ogImage.content = property.heroImage;
  if (ogDesc) ogDesc.content = `${property.tagline} ${property.location} · ${formatPriceFull(property.price)}`;
  if (canonical) canonical.href = `https://gcc-luxury-real-estate.com/property/${property.slug}`;

  // Inject Schema.org JSON-LD Structured Data
  injectSchemaJSONLD(property);

  const related = getRelatedProperties(property.slug, 3);
  const waEncodedMsg = encodeURIComponent(`Hi, I'm interested in viewing ${property.name} (${property.location}) listed at ${formatPriceFull(property.price)} on GCC Luxury Real Estate.`);

  main.innerHTML = `
    <!-- ===================== GALLERY ===================== -->
    <div class="gallery">
      <div class="gallery-main" id="gallery-main">
        <div class="gallery-main-img" id="gallery-img">
          <img 
            id="gallery-active-img"
            src="${property.gallery[0].url}" 
            alt="${property.gallery[0].alt}" 
            class="gallery-active-img"
            width="1200"
            height="520"
            decoding="async"
          />
        </div>
        <span class="gallery-main-label" id="gallery-label">${property.gallery[0].label}</span>
        <span class="gallery-counter" id="gallery-counter">1 / ${property.gallery.length}</span>
      </div>
      <div class="gallery-thumbs" id="gallery-thumbs">
        ${property.gallery.map((img, i) => `
          <div class="gallery-thumb ${i === 0 ? 'active' : ''}" data-index="${i}">
            <img 
              src="${img.thumb}" 
              alt="${img.alt}" 
              class="gallery-thumb-img" 
              loading="lazy" 
              width="120"
              height="80"
              decoding="async"
            />
            <span class="gallery-thumb-label">${img.label}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ===================== PROPERTY HEADER ===================== -->
    <div class="prop-header">
      <div class="prop-header-left">
        <div class="prop-badge-row">
          <span class="prop-tag">${property.typeLabel}</span>
          <span class="prop-status-tag status-${property.status.toLowerCase()}">${property.status}</span>
          <span class="prop-verified-badge" title="Authenticated Title & Direct Developer Authorization">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Verified Listing
          </span>
        </div>
        <h1 class="prop-name">${property.name}</h1>
        <div class="prop-location">${ICONS.pin} <span>${property.location}</span></div>
        <p class="prop-tagline">${property.tagline}</p>
      </div>
      <div class="prop-header-right">
        <div class="prop-price">${formatPriceFull(property)}</div>
        <div class="prop-price-sub">Direct Fiduciary Acquisition · ${property.ownershipType}</div>
      </div>
    </div>

    <!-- ===================== QUICK SPECS ===================== -->
    <div class="prop-specs">
      <div class="prop-spec">
        ${ICONS.bed}
        <div>
          <div class="prop-spec-value">${property.beds} Bedrooms</div>
          <div class="prop-spec-label">Private Suites</div>
        </div>
      </div>
      <div class="prop-spec">
        ${ICONS.bath}
        <div>
          <div class="prop-spec-value">${property.baths} Bathrooms</div>
          <div class="prop-spec-label">En-Suite</div>
        </div>
      </div>
      <div class="prop-spec">
        ${ICONS.sqft}
        <div>
          <div class="prop-spec-value">${property.sqft.toLocaleString()} sqft</div>
          <div class="prop-spec-label">Built-Up Area</div>
        </div>
      </div>
      <div class="prop-spec">
        ${ICONS.type}
        <div>
          <div class="prop-spec-value">${property.typeLabel}</div>
          <div class="prop-spec-label">Property Class</div>
        </div>
      </div>
    </div>

    <!-- ===================== CONTENT GRID ===================== -->
    <div class="prop-content">
      <div class="prop-main-col">
        <!-- Description -->
        <div class="prop-description">
          <h2 data-i18n="prop.aboutResidence">About This Residence</h2>
          ${property.description.map(p => `<p>${p}</p>`).join('')}
        </div>

        <!-- Key Financial & Acquisition Overview Section -->
        <div class="prop-overview-section">
          <h2>Acquisition &amp; Investment Details</h2>
          <div class="overview-specs-grid">
            <div class="overview-spec-item">
              <span class="overview-spec-label">Master Developer</span>
              <span class="overview-spec-value">${property.developer}</span>
            </div>
            <div class="overview-spec-item">
              <span class="overview-spec-label">Property Status</span>
              <span class="overview-spec-value">
                <span class="status-pill status-${property.status.toLowerCase()}">${property.status}</span>
              </span>
            </div>
            <div class="overview-spec-item">
              <span class="overview-spec-label">Handover / Delivery</span>
              <span class="overview-spec-value">${property.handoverDate}</span>
            </div>
            <div class="overview-spec-item">
              <span class="overview-spec-label">Ownership Type</span>
              <span class="overview-spec-value">${property.ownershipType}</span>
            </div>
            <div class="overview-spec-item">
              <span class="overview-spec-label">Service Charges</span>
              <span class="overview-spec-value">${property.serviceCharges}</span>
            </div>
            <div class="overview-spec-item">
              <span class="overview-spec-label">Payment Structure</span>
              <span class="overview-spec-value">${property.paymentPlan}</span>
            </div>
          </div>

          <!-- Indicative Yield Card -->
          <div class="yield-callout-card">
            <div class="yield-callout-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              <span class="yield-title">Indicative Rental Yield: <strong>6.8%–9.2%</strong> <span class="yield-baseline">(${property.rentalYield} project baseline)</span></span>
            </div>
            <p class="yield-disclaimer">*Indicative only, not guaranteed. Actual net returns vary based on tenancy agreements and seasonal occupancy.</p>
          </div>
        </div>

        <!-- Amenities -->
        <div class="prop-amenities">
          <h2 data-i18n="prop.amenities">Amenities & Features</h2>
          <div class="amenities-grid">
            ${property.amenities.map(a => `
              <div class="amenity-item">
                ${ICONS[a.icon] || ICONS.view}
                <span>${a.label}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Floor Plan Section (Phase 2) -->
        <div class="prop-floorplan-section">
          <h2 data-i18n="prop.floorPlan">Architectural Floor Plan</h2>
          <p class="floorplan-subtext" data-i18n="prop.floorPlanSub">Bespoke layout engineered for grand entertaining and private family living.</p>
          
          <div class="floorplan-card">
            <div class="floorplan-diagram">
              <svg viewBox="0 0 800 480" class="floorplan-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Architectural Grid Background -->
                <defs>
                  <pattern id="fpGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(196,164,132,0.08)" stroke-width="1"/>
                  </pattern>
                </defs>
                <rect width="800" height="480" fill="#171311" rx="4"/>
                <rect width="800" height="480" fill="url(#fpGrid)" rx="4"/>

                <!-- Exterior Walls Perimeter -->
                <rect x="50" y="40" width="700" height="400" fill="none" stroke="#E0B04C" stroke-width="3" stroke-dasharray="0" rx="2"/>

                <!-- Grand Salon / Living -->
                <rect x="50" y="40" width="380" height="230" fill="rgba(224,176,76,0.04)" stroke="rgba(196,164,132,0.4)" stroke-width="1.5"/>
                <text x="240" y="145" fill="#F0E9DD" font-family="'Playfair Display', serif" font-size="16" font-weight="600" text-anchor="middle">GRAND SALON &amp; DINING</text>
                <text x="240" y="170" fill="#C4A484" font-family="'Inter', sans-serif" font-size="12" text-anchor="middle">1,820 sq ft · 14.5m × 11.6m</text>

                <!-- Master Suite -->
                <rect x="430" y="40" width="320" height="230" fill="rgba(196,164,132,0.05)" stroke="rgba(196,164,132,0.4)" stroke-width="1.5"/>
                <text x="590" y="135" fill="#F0E9DD" font-family="'Playfair Display', serif" font-size="15" font-weight="600" text-anchor="middle">MASTER SUITE</text>
                <text x="590" y="160" fill="#C4A484" font-family="'Inter', sans-serif" font-size="12" text-anchor="middle">850 sq ft · Dressing &amp; Spa Bath</text>

                <!-- Show & Prep Kitchen -->
                <rect x="50" y="270" width="220" height="170" fill="rgba(224,176,76,0.03)" stroke="rgba(196,164,132,0.4)" stroke-width="1.5"/>
                <text x="160" y="350" fill="#F0E9DD" font-family="'Playfair Display', serif" font-size="14" font-weight="600" text-anchor="middle">CHEF'S KITCHEN</text>
                <text x="160" y="372" fill="#C4A484" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Gaggenau · 420 sq ft</text>

                <!-- Guest Suites -->
                <rect x="270" y="270" width="260" height="170" fill="rgba(196,164,132,0.03)" stroke="rgba(196,164,132,0.4)" stroke-width="1.5"/>
                <text x="400" y="350" fill="#F0E9DD" font-family="'Playfair Display', serif" font-size="14" font-weight="600" text-anchor="middle">GUEST BEDROOMS</text>
                <text x="400" y="372" fill="#C4A484" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">3 En-Suite Chambers</text>

                <!-- Private Terrace / Pool -->
                <rect x="530" y="270" width="220" height="170" fill="rgba(224,176,76,0.08)" stroke="#E0B04C" stroke-width="1.5" stroke-dasharray="4,4"/>
                <text x="640" y="350" fill="#E0B04C" font-family="'Playfair Display', serif" font-size="14" font-weight="600" text-anchor="middle">PRIVATE TERRACE</text>
                <text x="640" y="372" fill="#C4A484" font-family="'Inter', sans-serif" font-size="11" text-anchor="middle">Infinity Plunge · 1,100 sq ft</text>

                <!-- Dimension Marks -->
                <line x1="50" y1="20" x2="750" y2="20" stroke="#C4A484" stroke-width="1"/>
                <circle cx="50" cy="20" r="3" fill="#C4A484"/>
                <circle cx="750" cy="20" r="3" fill="#C4A484"/>
                <text x="400" y="16" fill="#C4A484" font-family="'Inter', sans-serif" font-size="10" letter-spacing="1" text-anchor="middle">OVERALL LENGTH: 32.8 METRES</text>
              </svg>
            </div>

            <!-- Floor Plan Area Breakdown -->
            <div class="floorplan-meta-grid">
              <div class="fp-meta-item">
                <span class="fp-meta-label" data-i18n="prop.totalArea">Total Built-Up Area</span>
                <span class="fp-meta-val">${property.floorPlan?.totalArea || `${property.sqft.toLocaleString()} sq ft`}</span>
              </div>
              <div class="fp-meta-item">
                <span class="fp-meta-label" data-i18n="prop.internalArea">Internal Living Area</span>
                <span class="fp-meta-val">${property.floorPlan?.internalArea || 'N/A'}</span>
              </div>
              <div class="fp-meta-item">
                <span class="fp-meta-label" data-i18n="prop.terraceArea">Balcony &amp; Private Terrace</span>
                <span class="fp-meta-val">${property.floorPlan?.terraceArea || 'N/A'}</span>
              </div>
            </div>

            <!-- Key Rooms List -->
            <div class="floorplan-rooms-list">
              ${(property.floorPlan?.rooms || []).map(r => `
                <div class="fp-room-pill">
                  <span class="room-name">${r.name}</span>
                  <span class="room-size">${r.size}</span>
                </div>
              `).join('')}
            </div>

            <button type="button" class="floorplan-download-btn" onclick="alert('Floor plan technical architectural dossier prepared for ${property.name}. Contact advisor for full CAD/PDF specification.');">
              ${ICONS.download}
              <span data-i18n="prop.downloadPlan">Download Floor Plan Dossier (PDF)</span>
            </button>
          </div>
        </div>

        <!-- Location & Nearby Landmarks Section (Phase 2) -->
        <div class="prop-location-section">
          <h2 data-i18n="prop.locationSection">Location & Neighbourhood</h2>
          
          <div class="location-map-visual">
            <svg viewBox="0 0 800 320" class="map-svg" xmlns="http://www.w3.org/2000/svg">
              <rect width="800" height="320" fill="#1C1714" rx="4"/>
              
              <!-- Subtle Styled Topographic / Grid Lines -->
              <path d="M 0 60 Q 200 40 400 90 T 800 70" fill="none" stroke="rgba(196,164,132,0.15)" stroke-width="1.5"/>
              <path d="M 0 140 Q 250 110 500 180 T 800 130" fill="none" stroke="rgba(196,164,132,0.18)" stroke-width="1.5"/>
              <path d="M 0 220 Q 300 260 550 210 T 800 270" fill="none" stroke="rgba(196,164,132,0.12)" stroke-width="1.5"/>

              <!-- Coastline / Water Body Accent -->
              <path d="M 520 0 C 480 120 540 220 460 320 L 800 320 L 800 0 Z" fill="rgba(224,176,76,0.04)" stroke="rgba(224,176,76,0.2)" stroke-width="1.5"/>
              <text x="660" y="160" fill="rgba(224,176,76,0.3)" font-family="'Playfair Display', serif" font-size="20" letter-spacing="3" text-anchor="middle">ARABIAN GULF</text>

              <!-- Central Pin Marker -->
              <circle cx="340" cy="150" r="32" fill="rgba(224,176,76,0.12)"/>
              <circle cx="340" cy="150" r="14" fill="rgba(224,176,76,0.3)"/>
              <circle cx="340" cy="150" r="6" fill="#E0B04C"/>
              
              <!-- Location Marker Label -->
              <rect x="230" y="70" width="220" height="42" fill="rgba(26,22,20,0.92)" stroke="rgba(224,176,76,0.5)" rx="3"/>
              <text x="340" y="96" fill="#F0E9DD" font-family="'Playfair Display', serif" font-size="13" font-weight="600" text-anchor="middle">${property.name.toUpperCase()}</text>
            </svg>
            <div class="map-overlay-badge">${ICONS.pin} <span>${property.location}</span></div>
          </div>

          <p class="location-area-text">${property.areaDescription}</p>

          <!-- Nearby Landmarks List -->
          <div class="landmarks-block">
            <h3 class="landmarks-title" data-i18n="prop.nearbyLandmarks">Nearby Landmarks & Proximity</h3>
            <div class="landmarks-grid">
              ${(property.landmarks || []).map(lm => `
                <div class="landmark-item">
                  <span class="landmark-bullet">◆</span>
                  <span class="landmark-name">${lm.name}</span>
                  <span class="landmark-dist">${lm.dist}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== STICKY INQUIRY SIDEBAR ===================== -->
      <aside class="prop-sidebar" id="prop-sidebar">
        <div class="sticky-inquiry-card">
          <!-- Price & Viewing Availability Header -->
          <div class="inquiry-card-top">
            <div class="inquiry-price-val">${formatPriceFull(property)}</div>
            <div class="sidebar-viewing-avail">
              <span class="avail-dot" aria-hidden="true"></span>
              <span>Private viewing available</span>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="inquiry-quick-actions">
            <button type="button" class="sidebar-action-btn sidebar-btn-primary" id="btn-scroll-to-form">
              ${ICONS.calendar}
              <span>Request a Viewing</span>
            </button>
            <a href="https://wa.me/923062320099?text=${waEncodedMsg}" target="_blank" rel="noopener" class="sidebar-action-btn sidebar-btn-whatsapp">
              ${ICONS.whatsapp}
              <span>Speak on WhatsApp</span>
            </a>
          </div>

          <!-- Advisor Avatar Meta -->
          <div class="sidebar-advisor-row">
            <div class="advisor-avatar">${ICONS.user}</div>
            <div class="advisor-details">
              <span class="advisor-name">${property.agent.name}</span>
              <span class="advisor-title">${property.agent.title}</span>
            </div>
          </div>

          <!-- Shortened Consultation Lead Form -->
          <form class="contact-form" id="contact-form" novalidate>
            <h4 data-i18n="prop.consultationTitle">Private Consultation Request</h4>
            
            <div class="form-error" id="form-error" style="display: none;">
              <span class="form-error-icon">${ICONS.alert}</span>
              <span class="form-error-text" id="form-error-text"></span>
            </div>

            <!-- Anti-Bot Honeypot -->
            <input type="text" name="b_address" id="cf-b_address" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />

            <!-- Field 1: Full Name -->
            <div class="form-group">
              <label for="cf-name">Full Name <span class="required-star">*</span></label>
              <input type="text" id="cf-name" placeholder="e.g. Tariq Al-Hashemi" autocomplete="name" required />
              <span class="field-error" id="cf-name-error"></span>
            </div>

            <!-- Field 2: WhatsApp Number -->
            <div class="form-group">
              <label for="cf-phone">WhatsApp Number <span class="required-star">*</span></label>
              <input type="tel" id="cf-phone" placeholder="e.g. +971 50 123 4567" autocomplete="tel" required />
              <span class="field-error" id="cf-phone-error"></span>
            </div>

            <!-- Field 3: Email Address -->
            <div class="form-group">
              <label for="cf-email">Email Address <span class="required-star">*</span></label>
              <input type="email" id="cf-email" placeholder="e.g. client@domain.com" autocomplete="email" required />
              <span class="field-error" id="cf-email-error"></span>
            </div>

            <!-- Field 4: Preferred Location -->
            <div class="form-group">
              <label for="cf-location">Preferred Location <span class="required-star">*</span></label>
              <div class="select-wrapper">
                <select id="cf-location">
                  <option value="Dubai" ${property.locationKey === 'dubai' ? 'selected' : ''}>Dubai</option>
                  <option value="Abu Dhabi" ${property.locationKey === 'abu-dhabi' ? 'selected' : ''}>Abu Dhabi</option>
                  <option value="Doha" ${property.locationKey === 'doha' ? 'selected' : ''}>Doha</option>
                </select>
                <svg class="select-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4.5l3 3 3-3"/></svg>
              </div>
            </div>

            <!-- Field 5: Message -->
            <div class="form-group">
              <label for="cf-message">Message <span class="optional-label">(Optional)</span></label>
              <textarea id="cf-message" placeholder="Preferred viewing dates, investment questions, or specific requirements for ${property.name}…"></textarea>
            </div>

            <button type="submit" id="cf-submit" class="agent-btn agent-btn-primary form-submit">
              <span class="btn-spinner" aria-hidden="true"></span>
              <span class="btn-text" data-i18n="prop.submitBtn">Request Private Consultation</span>
            </button>
          </form>

          <!-- Success State -->
          <div class="form-success" id="form-success" style="display: none;">
            <div class="success-icon-wrap">
              ${ICONS.check}
            </div>
            <h4 class="success-title">Consultation Request Confirmed</h4>
            <p class="success-desc">
              Thank you, <strong id="success-client-name"></strong>. A Senior Advisor for <strong id="success-prop-name">${property.name}</strong> will contact you directly via WhatsApp at <strong id="success-whatsapp-num" class="gold"></strong> within 15 minutes to coordinate your private viewing and provide the official dossier.
            </p>
            <div class="success-meta">
              <span>Reference: <strong id="success-ref-id"></strong></span>
            </div>
            <button type="button" class="form-reset-btn" id="form-reset-btn">
              Submit Another Inquiry
            </button>
          </div>
        </div>
      </aside>
    </div>

    <!-- ===================== RELATED PROPERTIES ===================== -->
    <div class="prop-related">
      <h2 data-i18n="prop.sisterResidences">Curated Sister Residences</h2>
      <div class="related-grid">
        ${related.map(r => `
          <a href="/property/${r.slug}" class="related-card">
            <div class="property-card__content">
              <div class="related-card-image">
                <img 
                  src="${r.cardImage}" 
                  alt="${r.name} in ${r.location}" 
                  class="related-card-img" 
                  loading="lazy" 
                  width="600"
                  height="180"
                  decoding="async"
                />
                <span class="related-card-tag">${r.typeLabel}</span>
              </div>
              <div class="related-card-body">
                <h4>${r.name}</h4>
                <div class="rc-location">${r.location}</div>
                <div class="rc-price">${formatPriceFull(r)}</div>
              </div>
            </div>
          </a>
        `).join('')}
      </div>
    </div>
  `;

  // --- Interactive behaviors ---
  initGallery(property);
  initContactForm(property);

  const scrollBtn = document.getElementById('btn-scroll-to-form');
  scrollBtn?.addEventListener('click', () => {
    const nameField = document.getElementById('cf-name');
    nameField?.focus();
    nameField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Re-apply language translations to dynamically injected elements
  initI18n();
}

// ---------- Gallery interaction ----------

function initGallery(property) {
  const thumbs = document.querySelectorAll('.gallery-thumb');
  const mainImg = document.getElementById('gallery-active-img');
  const label = document.getElementById('gallery-label');
  const counter = document.getElementById('gallery-counter');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.dataset.index, 10);
      const img = property.gallery[idx];

      if (mainImg) {
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = img.url;
          mainImg.alt = img.alt;
          mainImg.style.opacity = '1';
        }, 150);
      }

      if (label) label.textContent = img.label;
      if (counter) counter.textContent = `${idx + 1} / ${property.gallery.length}`;

      // Update active thumbnail
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
}

// ---------- Contact form with Supabase submission ----------

function initContactForm(property) {
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const formErrorText = document.getElementById('form-error-text');
  const submitBtn = document.getElementById('cf-submit');
  const btnText = submitBtn?.querySelector('.btn-text');

  const nameInput = document.getElementById('cf-name');
  const phoneInput = document.getElementById('cf-phone');
  const emailInput = document.getElementById('cf-email');
  const locSelect = document.getElementById('cf-location');
  const messageInput = document.getElementById('cf-message');

  const nameError = document.getElementById('cf-name-error');
  const phoneError = document.getElementById('cf-phone-error');
  const emailError = document.getElementById('cf-email-error');

  const resetBtn = document.getElementById('form-reset-btn');

  // Real-time error clearing
  const clearFieldError = (input, errorEl) => {
    input?.classList.remove('input-error');
    if (errorEl) errorEl.textContent = '';
  };

  nameInput?.addEventListener('input', () => clearFieldError(nameInput, nameError));
  phoneInput?.addEventListener('input', () => clearFieldError(phoneInput, phoneError));
  emailInput?.addEventListener('input', () => clearFieldError(emailInput, emailError));

  let lastSubmissionTime = 0;

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Anti-Spam Honeypot Check: silently reject bot submissions
    const honeypotVal = form.querySelector('input[name="b_address"]')?.value || '';
    if (honeypotVal) {
      console.warn('Spam submission filtered via honeypot.');
      form.style.display = 'none';
      if (successBox) successBox.style.display = 'block';
      return;
    }

    // Rate Limiting: prevent rapid repetitive submissions
    const now = Date.now();
    if (now - lastSubmissionTime < 3000) {
      if (formError) {
        if (formErrorText) formErrorText.textContent = 'Please wait a moment before submitting again.';
        formError.style.display = 'flex';
      }
      return;
    }

    // Reset previous errors
    if (formError) {
      formError.style.display = 'none';
      if (formErrorText) formErrorText.textContent = '';
    }

    let isValid = true;
    const nameVal = nameInput?.value.trim() || '';
    const phoneVal = phoneInput?.value.trim() || '';
    const emailVal = emailInput?.value.trim() || '';
    const locVal = locSelect?.value || 'Dubai';
    const messageVal = messageInput?.value.trim() || '';

    // 1. Name validation
    if (!nameVal || nameVal.length < 2) {
      nameInput?.classList.add('input-error');
      if (nameError) nameError.textContent = 'Please enter your full name.';
      isValid = false;
    } else {
      clearFieldError(nameInput, nameError);
    }

    // 2. WhatsApp Number validation
    const phoneDigits = phoneVal.replace(/\D/g, '');
    if (!phoneVal || phoneDigits.length < 6) {
      phoneInput?.classList.add('input-error');
      if (phoneError) phoneError.textContent = 'Please enter a valid WhatsApp number.';
      isValid = false;
    } else {
      clearFieldError(phoneInput, phoneError);
    }

    // 3. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      emailInput?.classList.add('input-error');
      if (emailError) emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    } else {
      clearFieldError(emailInput, emailError);
    }

    if (!isValid) {
      const firstInvalid = form.querySelector('.input-error');
      firstInvalid?.focus();
      return;
    }

    // Check offline status
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      if (formError) {
        if (formErrorText) {
          formErrorText.textContent = 'You appear to be offline — please check your connection and try again.';
        }
        formError.style.display = 'flex';
      }
      return;
    }

    // Enter loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    if (btnText) btnText.textContent = 'Submitting...';

    try {
      const combinedMessage = `[Preferred Market: ${locVal}] ${messageVal}`.trim();

      const result = await submitInquiry({
        property_name: property.name,
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        message: combinedMessage,
      });

      trackEvent('form_submit', {
        form_id: 'property_inquiry_form',
        form_name: 'Property Detail Consultation Request',
        property_name: property.name,
      });

      // Show success state
      form.style.display = 'none';
      successBox.style.display = 'block';

      const clientNameEl = document.getElementById('success-client-name');
      const waNumEl = document.getElementById('success-whatsapp-num');
      const refIdEl = document.getElementById('success-ref-id');
      
      if (clientNameEl) clientNameEl.textContent = nameVal;
      if (waNumEl) waNumEl.textContent = phoneVal;

      if (refIdEl) {
        const refId = result?.data?.[0]?.id
          ? `GCC-${result.data[0].id.slice(0, 8).toUpperCase()}`
          : `GCC-${Date.now().toString(36).toUpperCase()}`;
        refIdEl.textContent = refId;
      }
    } catch (err) {
      console.error('Consultation request submission error:', err);
      if (formError) {
        if (formErrorText) {
          if (typeof navigator !== 'undefined' && !navigator.onLine) {
            formErrorText.textContent = 'You appear to be offline — please check your connection and try again.';
          } else {
            formErrorText.textContent = 'Something went wrong — please try again or contact us directly on WhatsApp (+92 306 2320099).';
          }
        }
        formError.style.display = 'flex';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      if (btnText) btnText.textContent = 'Request Private Consultation';
    }
  });

  // Reset button to allow another submission
  resetBtn?.addEventListener('click', () => {
    form.reset();
    clearFieldError(nameInput, nameError);
    clearFieldError(phoneInput, phoneError);
    clearFieldError(emailInput, emailError);
    if (formError) formError.style.display = 'none';
    form.style.display = 'block';
    successBox.style.display = 'none';
  });
}

// ---------- 404 page ----------

function render404() {
  const main = document.getElementById('property-main');
  const breadcrumbName = document.getElementById('breadcrumb-name');
  if (breadcrumbName) breadcrumbName.textContent = 'Not Found';
  document.title = 'Property Not Found — GCC Luxury Real Estate';

  main.innerHTML = `
    <div class="property-not-found-section">
      <div class="not-found-badge">Private Register Restricted</div>
      <div class="not-found-num">404</div>
      <h1 class="not-found-title">Residence Not Located</h1>
      <p class="not-found-desc">
        The requested address is either unavailable, has been acquired off-market, or is restricted to our private confidential portfolio.
      </p>
      <div class="not-found-actions">
        <a href="/listings.html" class="not-found-btn-primary">Explore Available Residences</a>
        <a href="/contact.html" class="not-found-btn-secondary">Request Off-Market Search</a>
      </div>
    </div>
  `;
}

// ---------- Navigation (hamburger) ----------

const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav?.classList.toggle('open');
});

mobileNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    mobileNav?.classList.remove('open');
  });
});

// ---------- Init ----------

const slug = getSlugFromURL();
const property = slug ? getPropertyBySlug(slug) : null;

if (property) {
  renderProperty(property);
} else {
  render404();
}
