import './style.css';
import { initPrivateRegister } from './register.js';
import { initI18n } from './i18n.js';

// ============================================================
//  GCC Luxury Real Estate — Homepage Main Controller
// ============================================================

// 1. Initialize bilingual i18n
initI18n();

// 2. Initialize Private Register Newsletter
initPrivateRegister();

// 3. Branded Sandstone Gulf Loader
const loader = document.getElementById('loader');
const loaderFill = document.querySelector('.loader-bar-fill');

function hideLoader() {
  if (loaderFill) loaderFill.style.width = '100%';
  setTimeout(() => {
    loader?.classList.add('hidden');
  }, 250);
}

// Ensure loader hides cleanly once DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hideLoader);
} else {
  hideLoader();
}

// 4. Navigation & Dropdowns
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.nav-hamburger');
const mobileNav = document.getElementById('mobile-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar?.classList.add('scrolled');
  } else {
    navbar?.classList.remove('scrolled');
  }
}, { passive: true });

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav?.classList.toggle('open');
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger?.classList.remove('active');
    mobileNav?.classList.remove('open');
  });
});

