// ============================================================
//  GCC Luxury Real Estate — Private Register Handler
//  Handles VIP off-market email subscription across all pages
// ============================================================

import { submitPrivateRegister } from './supabase.js';
import { trackEvent } from './analytics.js';

export function initPrivateRegister() {
  const forms = document.querySelectorAll('.footer-newsletter');

  forms.forEach((form) => {
    // Avoid double attaching
    if (form.dataset.registerBound) return;
    form.dataset.registerBound = 'true';

    const input = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Ensure honeypot field exists for spam bot detection
    let honeypot = form.querySelector('input[name="_hp_email_sec"]');
    if (!honeypot) {
      honeypot = document.createElement('input');
      honeypot.type = 'text';
      honeypot.name = '_hp_email_sec';
      honeypot.className = 'hp-field';
      honeypot.tabIndex = -1;
      honeypot.autocomplete = 'new-password';
      honeypot.setAttribute('aria-hidden', 'true');
      form.prepend(honeypot);
    }

    // Ensure error container exists
    let errorEl = form.querySelector('.register-error-msg');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'register-error-msg';
      errorEl.style.display = 'none';
      form.appendChild(errorEl);
    }

    // Ensure legal consent text exists below form
    let consentEl = form.querySelector('.form-legal-consent');
    if (!consentEl) {
      consentEl = document.createElement('p');
      consentEl.className = 'form-legal-consent';
      consentEl.style.cssText = 'margin-top: 0.6rem; font-size: 0.62rem; color: var(--text-muted); line-height: 1.4;';
      consentEl.innerHTML = 'By submitting this form, you agree to our <a href="/privacy.html" style="color: var(--sandstone); text-decoration: underline;">Privacy Policy</a>. This website does not provide legal, tax, immigration, or investment advice.';
      form.appendChild(consentEl);
    }

    const formInitTime = Date.now();
    let lastSubmissionTime = 0;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!input) return;

      // Anti-Spam Honeypot Check: silently reject bot submissions
      if (honeypot && honeypot.value) {
        console.warn('Spam submission filtered via honeypot.');
        form.style.display = 'none';
        return;
      }

      // Time-based bot detection: bots submit instantaneously (< 800ms)
      if (Date.now() - formInitTime < 800) {
        console.warn('Spam submission filtered via interaction speed check.');
        form.style.display = 'none';
        return;
      }

      // Rate Limiting: prevent rapid repetitive submissions
      const now = Date.now();
      if (lastSubmissionTime > 0 && now - lastSubmissionTime < 3000) {
        errorEl.textContent = 'Please wait a moment before submitting again.';
        errorEl.style.display = 'block';
        return;
      }
      lastSubmissionTime = now;

      const email = input.value.trim();

      // Clear previous error
      errorEl.style.display = 'none';
      errorEl.textContent = '';
      input.classList.remove('input-invalid');

      // 1. Basic client-side email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        errorEl.textContent = 'Please enter a valid email address.';
        errorEl.style.display = 'block';
        input.classList.add('input-invalid');
        input.focus();
        return;
      }

      // 2. Offline check
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        errorEl.textContent = 'You appear to be offline — please check your connection and try again.';
        errorEl.style.display = 'block';
        input.classList.add('input-invalid');
        return;
      }

      // 3. Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
      }

      try {
        await submitPrivateRegister(email);

        trackEvent('form_submit', {
          form_id: 'private_register',
          form_name: 'VIP Private Register Subscription',
        });

        // 4. Success state — transform form into Sandstone Gulf confirmation pill
        const successCard = document.createElement('div');
        successCard.className = 'register-success-card';
        successCard.innerHTML = `
          <div class="register-success-inner">
            <svg class="register-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span class="register-success-text">You're on the list — we'll be in touch.</span>
          </div>
        `;

        form.style.display = 'none';
        form.parentNode.insertBefore(successCard, form.nextSibling);
      } catch (err) {
        console.error('Private register submission error:', err);
        // 5. Inline error state — without clearing what user typed
        if (typeof navigator !== 'undefined' && !navigator.onLine) {
          errorEl.textContent = 'You appear to be offline — please check your connection and try again.';
        } else {
          errorEl.textContent = 'Something went wrong — please try again or contact us directly on WhatsApp.';
        }
        errorEl.style.display = 'block';
        input.classList.add('input-invalid');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
        }
      }
    });

    // Clear inline error on user typing
    input?.addEventListener('input', () => {
      if (errorEl.style.display !== 'none') {
        errorEl.style.display = 'none';
        errorEl.textContent = '';
        input.classList.remove('input-invalid');
      }
    });
  });
}

// Detect reduced motion preference across all pages
export function initReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return;
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    document.documentElement.classList.add('reduced-motion');
  }
  motionQuery.addEventListener?.('change', (e) => {
    if (e.matches) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  });
}

// Auto-initialize when loaded
if (typeof document !== 'undefined') {
  initReducedMotion();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPrivateRegister);
  } else {
    initPrivateRegister();
  }
}
