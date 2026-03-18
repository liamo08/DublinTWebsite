/* ==========================================================================
   Dublin T-Shirt Print — Main JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initFAQ();
  initMobileNav();
  initDropdowns();
  initFormHandling();
  initHeroSlideshow();
});

/* ---------- Navigation ---------- */
function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;
  const threshold = 100;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    const mobileOpen = document.querySelector('.nav__mobile--open');
    if (mobileOpen) return;

    if (currentScroll > threshold && currentScroll > lastScroll) {
      nav.classList.add('nav--hidden');
    } else {
      nav.classList.remove('nav--hidden');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileNav = document.querySelector('.nav__mobile');

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('nav__hamburger--active');
    mobileNav.classList.toggle('nav__mobile--open');
    const isOpen = mobileNav.classList.contains('nav__mobile--open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const label = hamburger.querySelector('.nav__hamburger-label');
    if (label) label.textContent = isOpen ? 'Close' : 'Menu';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('nav__hamburger--active');
      mobileNav.classList.remove('nav__mobile--open');
      document.body.style.overflow = '';
    });
  });
}

/* ---------- Dropdown Menus ---------- */
function initDropdowns() {
  const dropdownTriggers = document.querySelectorAll('.nav__link--dropdown');

  dropdownTriggers.forEach(trigger => {
    const dropdown = trigger.querySelector('.nav__dropdown');
    if (!dropdown) return;

    let hideTimeout;

    trigger.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout);
      document.querySelectorAll('.nav__dropdown--visible').forEach(d => d.classList.remove('nav__dropdown--visible'));
      dropdown.classList.add('nav__dropdown--visible');
    });

    trigger.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => dropdown.classList.remove('nav__dropdown--visible'), 200);
    });
  });
}

/* ---------- Scroll Reveal ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-item__question');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-item--open');

      faqItems.forEach(i => i.classList.remove('faq-item--open'));

      if (!isOpen) {
        item.classList.add('faq-item--open');
      }
    });
  });
}

/* ---------- Form Handling ---------- */
function initFormHandling() {
  const forms = document.querySelectorAll('.form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const submitBtn = form.querySelector('.btn[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';

      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

      // Simulate form submission
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = 'Sent! We\'ll be in touch.';
          submitBtn.style.background = 'var(--mint)';
          submitBtn.style.color = 'var(--bg)';
        }

        setTimeout(() => {
          form.reset();
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
          }
        }, 3000);
      }, 1000);
    });
  });
}

/* ---------- Hero Slideshow ---------- */
function initHeroSlideshow() {
  const slideshow = document.querySelector('.hero__slideshow');
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll('.hero__slide');
  if (slides.length <= 1) return;

  // Create indicators
  const hero = slideshow.closest('.hero');
  const indicators = document.createElement('div');
  indicators.className = 'hero__slide-indicators';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero__slide-dot' + (i === 0 ? ' hero__slide-dot--active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goToSlide(i));
    indicators.appendChild(dot);
  });
  hero.appendChild(indicators);

  let current = 0;
  let interval;
  const dots = indicators.querySelectorAll('.hero__slide-dot');

  function goToSlide(index) {
    slides[current].classList.remove('hero__slide--active');
    dots[current].classList.remove('hero__slide-dot--active');
    current = index;
    slides[current].classList.add('hero__slide--active');
    dots[current].classList.add('hero__slide-dot--active');
    resetInterval();
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 4000);
  }

  resetInterval();
}

/* ---------- Smooth Scroll for Anchor Links ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
