// ============================================================
//  GCC Luxury Real Estate — Listings Page (Phase 1)
//  Client-side filtering, sorting, premium card rendering
// ============================================================

import { PROPERTIES, formatPriceFull } from './data.js';
import { initI18n } from './i18n.js';
import './register.js';

initI18n();

// ---------- DOM References ----------

const grid = document.getElementById('listings-grid');
const emptyState = document.getElementById('listings-empty');
const resultsCount = document.getElementById('results-count');
const filterLocation = document.getElementById('filter-location');
const filterType = document.getElementById('filter-type');
const filterPrice = document.getElementById('filter-price');
const filterSort = document.getElementById('filter-sort');
const resetBtn = document.getElementById('filter-reset');
const emptyResetBtn = document.getElementById('empty-reset');

// ---------- Card Renderer (Matches Homepage Standard) ----------

function createCard(property, index = 0) {
  const badgeClass = property.badge ? property.badge.toLowerCase() : 'featured';

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
          <span class="card-verified-badge" title="Authenticated Title & Direct Developer Authorization">
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
            <span class="property-type-tag">${property.typeLabel}</span>
          </div>
          <h3 class="property-name">${property.name}</h3>
          <div class="property-price-row">
            <span class="price-label">Starting Price</span>
            <div class="property-price">${formatPriceFull(property)}</div>
          </div>
          <div class="property-specs-row">
            <span>${property.beds} Beds</span>
            <span class="spec-dot">·</span>
            <span>${property.baths} Baths</span>
            <span class="spec-dot">·</span>
            <span>${property.sqft.toLocaleString()} sq ft</span>
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

// ---------- Skeleton Renderer ----------

function renderSkeletons(count = 4) {
  if (!grid) return;
  const skeletons = Array.from({ length: count }).map(() => `
    <div class="property-card skeleton-card" aria-hidden="true">
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-line skeleton-tag"></div>
        <div class="skeleton-line skeleton-title"></div>
        <div class="skeleton-line skeleton-price"></div>
        <div class="skeleton-line skeleton-specs"></div>
        <div class="skeleton-line skeleton-btn"></div>
      </div>
    </div>
  `).join('');
  grid.innerHTML = skeletons;
}

// ---------- Filter & Sort Logic ----------

function getFiltered() {
  const loc = filterLocation?.value || 'all';
  const type = filterType?.value || 'all';
  const price = filterPrice?.value || 'all';
  const sort = filterSort?.value || 'newest';

  let results = [...PROPERTIES];

  // Filter: Location
  if (loc !== 'all') {
    results = results.filter(p => p.locationKey === loc);
  }

  // Filter: Type
  if (type !== 'all') {
    results = results.filter(p => p.type === type);
  }

  // Filter: Price range
  if (price === 'under-50m') {
    results = results.filter(p => (p.priceAED || p.price * 3.67) < 50_000_000);
  } else if (price === '50m-70m') {
    results = results.filter(p => {
      const aed = p.priceAED || p.price * 3.67;
      return aed >= 50_000_000 && aed <= 70_000_000;
    });
  } else if (price === '70m-plus') {
    results = results.filter(p => (p.priceAED || p.price * 3.67) > 70_000_000);
  }

  // Sort
  if (sort === 'price-asc') {
    results.sort((a, b) => (a.priceAED || a.price) - (b.priceAED || b.price));
  } else if (sort === 'price-desc') {
    results.sort((a, b) => (b.priceAED || b.price) - (a.priceAED || a.price));
  } else if (sort === 'newest') {
    results.sort((a, b) => new Date(b.added) - new Date(a.added));
  }

  return results;
}

// ---------- Render Results ----------

function render() {
  if (!grid) return;
  const filtered = getFiltered();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (resultsCount) resultsCount.textContent = '0 Residences Found';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  grid.innerHTML = filtered.map((p, i) => createCard(p, i)).join('');

  if (resultsCount) {
    const total = PROPERTIES.length;
    resultsCount.textContent = `Showing ${filtered.length} of ${total} Residences`;
  }
}

// ---------- Reset Filters ----------

function resetAllFilters() {
  if (filterLocation) filterLocation.value = 'all';
  if (filterType) filterType.value = 'all';
  if (filterPrice) filterPrice.value = 'all';
  if (filterSort) filterSort.value = 'newest';
  render();
}

// ---------- URL Params Sync (e.g. ?type=penthouse) ----------

function applyUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const typeParam = params.get('type');
  const locParam = params.get('location');

  if (typeParam && filterType) {
    filterType.value = typeParam;
  }
  if (locParam && filterLocation) {
    filterLocation.value = locParam;
  }
}

// ---------- Event Listeners ----------

[filterLocation, filterType, filterPrice, filterSort].forEach(el => {
  el?.addEventListener('change', render);
});

resetBtn?.addEventListener('click', resetAllFilters);
emptyResetBtn?.addEventListener('click', resetAllFilters);

// Initial Load with Skeleton State
renderSkeletons(4);
setTimeout(() => {
  applyUrlParams();
  render();
}, 120);
