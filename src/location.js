// ============================================================
//  GCC Luxury Real Estate — Location Landing Pages (Phase 2)
//  Renders city intro, market stats, filtered properties, and i18n
// ============================================================

import { LOCATIONS, getPropertiesByLocation, formatPriceFull } from './data.js';
import { initI18n } from './i18n.js';
import './register.js';

function getCityKey() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes('dubai')) return 'dubai';
  if (path.includes('abu-dhabi')) return 'abu-dhabi';
  if (path.includes('doha')) return 'doha';
  return 'dubai';
}

function initLocationPage() {
  initI18n();

  const cityKey = getCityKey();
  const cityData = LOCATIONS[cityKey] || LOCATIONS.dubai;
  const properties = getPropertiesByLocation(cityKey);

  // Set Page Title & Meta
  document.title = `${cityData.name} Luxury Real Estate — GCC Luxury Real Estate`;

  // Render Hero Content
  const heroTitle = document.getElementById('location-hero-title');
  const heroTagline = document.getElementById('location-hero-tagline');
  const heroIntro = document.getElementById('location-hero-intro');
  const heroImage = document.getElementById('location-hero-bg');

  if (heroTitle) heroTitle.textContent = `${cityData.name} Collection`;
  if (heroTagline) heroTagline.textContent = cityData.tagline;
  if (heroIntro) heroIntro.textContent = cityData.intro;
  if (heroImage) heroImage.src = cityData.heroImage;

  // Render Market Stats
  const statsContainer = document.getElementById('location-stats-grid');
  if (statsContainer) {
    statsContainer.innerHTML = cityData.stats.map(s => `
      <div class="loc-stat-card">
        <div class="loc-stat-val gold">${s.value}</div>
        <div class="loc-stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  // Render Properties Grid
  const grid = document.getElementById('location-properties-grid');
  if (grid) {
    if (properties.length === 0) {
      grid.innerHTML = `
        <div class="listings-empty" style="grid-column: 1 / -1;">
          <h3>Exclusive Off-Market Registry</h3>
          <p>Additional private residences in ${cityData.name} are currently restricted to confidential client dossiers. <a href="/#contact" class="empty-reset">Inquire with a Senior Advisor</a>.</p>
        </div>
      `;
    } else {
      grid.innerHTML = properties.map((property, idx) => {
        const badgeClass = property.badge ? property.badge.toLowerCase() : 'featured';
        return `
          <article class="property-card" data-delay="${idx * 0.1}">
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
                  <span>${property.beds} Beds</span><span class="spec-dot">·</span>
                  <span>${property.baths} Baths</span><span class="spec-dot">·</span>
                  <span>${property.sqft.toLocaleString()} sq ft</span>
                </div>
                <div class="property-card-footer">
                  <a href="/property/${property.slug}" class="view-property-btn">
                    <span>View Property</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }
  }

  // Mobile navigation
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
}

document.addEventListener('DOMContentLoaded', initLocationPage);
