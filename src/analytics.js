// ============================================================
//  GCC Luxury Real Estate — GA4 Event Tracking Module
//  Measurement ID: G-5JF2QXJN4Z
// ============================================================

export const GA_MEASUREMENT_ID = 'G-5JF2QXJN4Z';

/**
 * Send custom GA4 event safely
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, {
        send_to: GA_MEASUREMENT_ID,
        ...params,
      });
    } catch (err) {
      console.debug('GA4 tracking error:', err);
    }
  }
}

/**
 * Initialize automatic click & form interaction tracking
 */
export function initAnalyticsTracking() {
  if (typeof document === 'undefined') return;

  // 1. Click-based tracking (delegated)
  document.addEventListener('click', (e) => {
    const target = e.target.closest('a, button, [role="button"], .property-card, .gallery-thumb');
    if (!target) return;

    // A. WhatsApp Click
    if (target.matches('a[href*="wa.me"], .floating-whatsapp, .wa-btn, .mobile-bar-whatsapp, .agent-btn-secondary')) {
      const href = target.getAttribute('href') || '';
      trackEvent('whatsapp_click', {
        link_url: href,
        button_location: target.className || 'whatsapp_button',
      });
      return;
    }

    // B. Phone Click
    if (target.matches('a[href^="tel:"]')) {
      const tel = target.getAttribute('href') || '';
      trackEvent('phone_click', {
        phone_number: tel.replace('tel:', ''),
      });
      return;
    }

    // C. Property Card Click
    const propertyCard = target.closest('.property-card');
    if (propertyCard && !target.closest('.card-save-btn')) {
      const propId = propertyCard.getAttribute('data-id') || '';
      const propTitle = propertyCard.querySelector('.card-title, h3')?.textContent?.trim() || '';
      const propPrice = propertyCard.querySelector('.price-aed, .card-price')?.textContent?.trim() || '';
      trackEvent('property_card_click', {
        property_id: propId,
        property_title: propTitle,
        property_price: propPrice,
      });
      return;
    }

    // D. Gallery Thumbnail / Image Click
    if (target.closest('.gallery-thumb') || target.closest('.gallery-main')) {
      const activeThumb = target.closest('.gallery-thumb');
      const idx = activeThumb?.getAttribute('data-index') || '0';
      trackEvent('gallery_open', {
        image_index: idx,
      });
      return;
    }

    // E. Language Switch Click
    if (target.closest('#lang-toggle-btn') || target.closest('.lang-toggle-btn') || target.closest('#mobile-lang-btn')) {
      const activeLang = document.documentElement.getAttribute('lang') || 'en';
      trackEvent('language_switch', {
        from_language: activeLang,
        to_language: activeLang === 'ar' ? 'en' : 'ar',
      });
      return;
    }

    // F. General CTA Click
    if (target.matches('.nav-cta, .mobile-nav-cta, .hero-btn-primary, .hero-btn-secondary, .sidebar-cta-btn, .cta-banner a, .cta-button, .empty-btn-primary, .empty-btn-secondary')) {
      const ctaText = target.textContent?.trim() || '';
      const ctaHref = target.getAttribute('href') || '';
      trackEvent('cta_click', {
        cta_text: ctaText,
        cta_destination: ctaHref,
      });
    }
  }, { passive: true });

  // 2. Form Start Tracking (captures when user starts interacting)
  const trackedForms = new WeakSet();
  document.addEventListener('focusin', (e) => {
    const input = e.target.closest('input, textarea, select');
    if (!input) return;
    const form = input.closest('form');
    if (!form || trackedForms.has(form)) return;

    trackedForms.add(form);
    const formId = form.id || form.className || 'generic_form';
    trackEvent('form_start', {
      form_id: formId,
      form_name: form.getAttribute('name') || formId,
    });
  }, { passive: true });

  // 3. Custom Language Event Listener
  window.addEventListener('gcc_language_changed', (e) => {
    trackEvent('language_switch', {
      language: e.detail?.lang || 'unknown',
    });
  });
}

// Auto-initialize analytics tracking
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalyticsTracking);
  } else {
    initAnalyticsTracking();
  }
}
