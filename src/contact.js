// ============================================================
//  GCC Luxury Real Estate — Contact & Consultation Page Handler
// ============================================================

import { submitInquiry } from './supabase.js';
import { initI18n } from './i18n.js';
import { trackEvent } from './analytics.js';
import './register.js';

initI18n();

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultation-form');
  const errorAlert = document.getElementById('consult-error-alert');
  const submitBtn = document.getElementById('consult-submit-btn');
  const successCard = document.getElementById('consult-success-card');

  if (!form) return;

  const formInitTime = Date.now();
  let lastSubmissionTime = 0;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Anti-Spam Honeypot Check: silently reject bot submissions
    const honeypotVal = form.querySelector('input[name="_hp_company_sec"]')?.value || '';
    if (honeypotVal) {
      console.warn('Spam submission filtered via honeypot.');
      form.style.display = 'none';
      if (successCard) successCard.style.display = 'block';
      return;
    }

    // Time-based bot detection: bots submit instantaneously (< 800ms)
    if (Date.now() - formInitTime < 800) {
      console.warn('Spam submission filtered via interaction speed check.');
      form.style.display = 'none';
      if (successCard) successCard.style.display = 'block';
      return;
    }

    // Rate Limiting: prevent rapid repetitive submissions
    const now = Date.now();
    if (lastSubmissionTime > 0 && now - lastSubmissionTime < 3000) {
      showError('Please wait a moment before submitting again.');
      return;
    }
    lastSubmissionTime = now;

    // Reset error
    if (errorAlert) {
      errorAlert.style.display = 'none';
      errorAlert.textContent = '';
    }

    const name = form.querySelector('[name="name"]')?.value.trim() || '';
    const email = form.querySelector('[name="email"]')?.value.trim() || '';
    const phone = form.querySelector('[name="phone"]')?.value.trim() || '';
    const market = form.querySelector('[name="market"]')?.value || 'General Consultation';
    const message = form.querySelector('[name="message"]')?.value.trim() || '';

    // Validation
    if (!name || name.length < 2) {
      showError('Please provide your full legal or corporate name.');
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    if (!phone || phone.length < 6) {
      showError('Please provide a valid direct telephone or mobile number with country code.');
      return;
    }

    // Check offline status
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      showError('You appear to be offline — please check your connection and try again.');
      return;
    }

    // Loading
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      submitBtn.textContent = 'Submitting...';
    }

    try {
      await submitInquiry({
        property_name: `Private Advisory Consultation [${market}]`,
        name,
        email,
        phone,
        message: message ? `[Target Market: ${market}] ${message}` : `[Target Market: ${market}] Consultation Requested`,
      });

      trackEvent('form_submit', {
        form_id: 'consultation_form',
        form_name: 'Private Advisory Consultation',
        market_focus: market,
      });

      // Show success
      form.style.display = 'none';
      if (successCard) {
        successCard.style.display = 'block';
      }
    } catch (err) {
      console.error('Consultation submission error:', err);
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        showError('You appear to be offline — please check your connection and try again.');
      } else {
        showError('Something went wrong — please try again or contact us directly on WhatsApp (+92 306 2320099).');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Submit Advisory Request →';
      }
    }
  });

  function showError(msg) {
    if (errorAlert) {
      errorAlert.textContent = msg;
      errorAlert.style.display = 'block';
    }
  }
});
