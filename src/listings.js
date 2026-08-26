// ============================================================
//  GCC Luxury Real Estate — Listings Page Handler
//  Client-side filtering, sorting, premium card rendering
// ============================================================

import { PROPERTIES, formatPriceFull } from './data.js';
import { initI18n } from './i18n.js';
import './register.js';

// Fallback dataset to guarantee properties are never empty
const FALLBACK_PROPERTIES = [
  {
    id: 'skyline-penthouse',
    slug: 'skyline-penthouse',
    name: 'Skyline Penthouse',
    location: 'Downtown Dubai, UAE',
    locationKey: 'dubai',
    priceUSD: 24500000,
    priceAED: 90000000,
    beds: 4,
    baths: 5,
    sqft: 6200,
    type: 'penthouse',
    typeLabel: 'Waterfront Penthouse',
    purpose: 'primary',
    badge: 'Featured',
    status: 'Ready',
    added: '2024-11-15',
    cardImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'palm-villa-retreat',
    slug: 'palm-villa-retreat',
    name: 'Palm Villa Retreat',
    location: 'Palm Jumeirah, Dubai',
    locationKey: 'dubai',
    priceUSD: 18500000,
    priceAED: 67895000,
    beds: 5,
    baths: 6,
    sqft: 12400,
    type: 'villa',
    typeLabel: 'Beachfront Villa',
    purpose: 'investment',
    badge: 'Investment',
    status: 'Ready',
    added: '2024-10-20',
    cardImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'corniche-residence',
    slug: 'corniche-residence',
    name: 'Corniche Residence',
    location: 'Doha Corniche, Qatar',
    locationKey: 'doha',
    priceUSD: 12800000,
    priceAED: 46976000,
    priceQAR: 46976000,
    beds: 3,
    baths: 4,
    sqft: 4100,
    type: 'apartment',
    typeLabel: 'Skyline Apartment',
    purpose: 'investment',
    badge: 'New',
    status: 'Off-Plan',
    added: '2024-12-01',
    cardImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=75',
  },
  {
    id: 'marina-heights-estate',
    slug: 'marina-heights-estate',
    name: 'Marina Heights Estate',
    location: 'Al Raha Beach, Abu Dhabi',
    locationKey: 'abu-dhabi',
    priceUSD: 15200000,
    priceAED: 55784000,
    beds: 4,
    baths: 4,
    sqft: 9800,
    type: 'waterfront-villa',
    typeLabel: 'Waterfront Estate',
    purpose: 'primary',
    badge: 'Exclusive',
    status: 'Ready',
    added: '2024-12-10',
    cardImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=75',
  },
];

function getDataset() {
  if (Array.isArray(PROPERTIES) && PROPERTIES.length > 0) {
    return PROPERTIES;
  }
  return FALLBACK_PROPERTIES;
}

// ---------- Card Renderer ----------

function createCard(property, index = 0) {
  const badgeClass = property.badge ? property.badge.toLowerCase() : 'featured';
  const priceDisplay = typeof formatPriceFull === 'function' ? formatPriceFull(property) : `
    <div class="price-dual-box">
      <span class="price-aed-primary">AED ${(property.priceAED || 0).toLocaleString()}</span>
      <span class="price-usd-secondary">≈ $${(property.priceUSD || 0).toLocaleString()}</span>
    </div>
  `;

  return `
    <article class="property-card" data-id="${property.id}" data-delay="${index * 0.08}">
      <div class="property-card__content">
        <div class="property-card-image">
          <img 
            src="${property.cardImage}" 
            alt="${property.name} in ${property.location}" 
            class="property-card-img" 
            loading="lazy" 
            width="600"
            height="240"
            decoding="async"
          />
          <div class="card-badges-left">
            <span class="property-badge badge-${badgeClass}">${property.badge || 'Featured'}</span>
            <span class="property-status-badge status-${(property.status || 'ready').toLowerCase()}">${property.status || 'Ready'}</span>
          </div>
          <span class="card-verified-badge" title="Sample Curated Residence · Illustrative Verification">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Verified
          </span>
          <button class="card-save-btn" aria-label="Save ${property.name}" onclick="event.preventDefault(); this.classList.toggle('saved');">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
        <div class="property-card-body">
          <div class="property-subhead">
            <span class="property-location-tag">${property.location}</span>
            <span class="property-type-tag">${property.typeLabel || property.type}</span>
          </div>
          <h3 class="property-name">${property.name}</h3>
          <div class="property-price-row">
            <span class="price-label">Starting Price</span>
            <div class="property-price">${priceDisplay}</div>
          </div>
          <div class="property-specs-row">
            <span>${property.beds} Beds</span>
            <span class="spec-dot">·</span>
            <span>${property.baths} Baths</span>
            <span class="spec-dot">·</span>
            <span>${(property.sqft || 0).toLocaleString()} sq ft</span>
          </div>
          <div class="property-card-footer">
            <a href="/property/${property.slug}" class="view-property-btn">
              <span>View Property</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

// ---------- Filter & Sort Logic ----------

function getFiltered() {
  const filterLocation = document.getElementById('filter-location');
  const filterType = document.getElementById('filter-type');
  const filterPrice = document.getElementById('filter-price');
  const filterBeds = document.getElementById('filter-beds');
  const filterPurpose = document.getElementById('filter-purpose');
  const filterSort = document.getElementById('filter-sort');

  const loc = filterLocation?.value || 'all';
  const type = filterType?.value || 'all';
  const price = filterPrice?.value || 'all';
  const beds = filterBeds?.value || 'all';
  const purpose = filterPurpose?.value || 'all';
  const sort = filterSort?.value || 'newest';

  let results = [...getDataset()];

  // Filter: Location
  if (loc && loc !== 'all') {
    results = results.filter(p => p.locationKey === loc);
  }

  // Filter: Type
  if (type && type !== 'all') {
    results = results.filter(p => p.type === type);
  }

  // Filter: Price range
  if (price === 'under-50m') {
    results = results.filter(p => (p.priceAED || (p.priceUSD ? p.priceUSD * 3.67 : (p.price || 0) * 3.67)) < 50_000_000);
  } else if (price === '50m-70m') {
    results = results.filter(p => {
      const aed = p.priceAED || (p.priceUSD ? p.priceUSD * 3.67 : (p.price || 0) * 3.67);
      return aed >= 50_000_000 && aed <= 70_000_000;
    });
  } else if (price === '70m-plus') {
    results = results.filter(p => (p.priceAED || (p.priceUSD ? p.priceUSD * 3.67 : (p.price || 0) * 3.67)) > 70_000_000);
  }

  // Filter: Bedrooms (3+, 4+, 5+)
  if (beds && beds !== 'all') {
    const minBeds = parseInt(beds, 10);
    if (!isNaN(minBeds)) {
      results = results.filter(p => (p.beds || 0) >= minBeds);
    }
  }

  // Filter: Purpose (Investment, Primary Residence)
  if (purpose && purpose !== 'all') {
    if (purpose === 'investment') {
      results = results.filter(p => p.purpose === 'investment' || p.badge?.toLowerCase() === 'investment' || p.badge?.toLowerCase() === 'new');
    } else if (purpose === 'primary') {
      results = results.filter(p => p.purpose === 'primary' || p.badge?.toLowerCase() === 'featured' || p.badge?.toLowerCase() === 'exclusive');
    }
  }

  // Sort
  if (sort === 'price-asc') {
    results.sort((a, b) => (a.priceAED || a.priceUSD || a.price || 0) - (b.priceAED || b.priceUSD || b.price || 0));
  } else if (sort === 'price-desc') {
    results.sort((a, b) => (b.priceAED || b.priceUSD || b.price || 0) - (a.priceAED || a.priceUSD || a.price || 0));
  } else if (sort === 'newest') {
    results.sort((a, b) => new Date(b.added || 0) - new Date(a.added || 0));
  }

  return results;
}

// ---------- Render Results ----------

function render() {
  const grid = document.getElementById('listings-grid');
  const emptyState = document.getElementById('listings-empty');
  const resultsCount = document.getElementById('results-count');

  if (!grid) return;

  const filtered = getFiltered();
  const dataset = getDataset();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (resultsCount) resultsCount.textContent = '0 Residences Found';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  grid.innerHTML = filtered.map((p, i) => createCard(p, i)).join('');

  if (resultsCount) {
    resultsCount.textContent = `Showing ${filtered.length} of ${dataset.length} Residences`;
  }
}

// ---------- Reset Filters ----------

function resetAllFilters() {
  const filterLocation = document.getElementById('filter-location');
  const filterType = document.getElementById('filter-type');
  const filterPrice = document.getElementById('filter-price');
  const filterBeds = document.getElementById('filter-beds');
  const filterPurpose = document.getElementById('filter-purpose');
  const filterSort = document.getElementById('filter-sort');

  if (filterLocation) filterLocation.value = 'all';
  if (filterType) filterType.value = 'all';
  if (filterPrice) filterPrice.value = 'all';
  if (filterBeds) filterBeds.value = 'all';
  if (filterPurpose) filterPurpose.value = 'all';
  if (filterSort) filterSort.value = 'newest';

  render();
}

// ---------- URL Params Sync ----------

function applyUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type')?.toLowerCase();
  const locParam = params.get('location')?.toLowerCase();
  const bedsParam = params.get('beds')?.toLowerCase();
  const purposeParam = params.get('purpose')?.toLowerCase();

  const filterType = document.getElementById('filter-type');
  const filterLocation = document.getElementById('filter-location');
  const filterBeds = document.getElementById('filter-beds');
  const filterPurpose = document.getElementById('filter-purpose');

  if (typeParam && filterType) {
    const isValid = Array.from(filterType.options).some(opt => opt.value === typeParam);
    if (isValid) filterType.value = typeParam;
  }

  if (locParam && filterLocation) {
    const isValid = Array.from(filterLocation.options).some(opt => opt.value === locParam);
    if (isValid) filterLocation.value = locParam;
  }

  if (bedsParam && filterBeds) {
    const isValid = Array.from(filterBeds.options).some(opt => opt.value === bedsParam);
    if (isValid) filterBeds.value = bedsParam;
  }

  if (purposeParam && filterPurpose) {
    const isValid = Array.from(filterPurpose.options).some(opt => opt.value === purposeParam);
    if (isValid) filterPurpose.value = purposeParam;
  }
}

// ---------- Initialization ----------

function initListingsPage() {
  initI18n();

  const filterLocation = document.getElementById('filter-location');
  const filterType = document.getElementById('filter-type');
  const filterPrice = document.getElementById('filter-price');
  const filterBeds = document.getElementById('filter-beds');
  const filterPurpose = document.getElementById('filter-purpose');
  const filterSort = document.getElementById('filter-sort');
  const resetBtn = document.getElementById('filter-reset');
  const emptyResetBtn = document.getElementById('empty-reset');

  [filterLocation, filterType, filterPrice, filterBeds, filterPurpose, filterSort].forEach(el => {
    el?.addEventListener('change', render);
  });

  resetBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    resetAllFilters();
  });

  emptyResetBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    resetAllFilters();
  });

  applyUrlParams();
  render();
}

// Robust execution whether DOM is already parsed or loading
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initListingsPage);
} else {
  initListingsPage();
}
