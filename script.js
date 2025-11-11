// script.js — small, dependency-free utilities:
// - mobile nav toggle
// - reveal-on-scroll (Intersection Observer)
// - smooth scroll for internal links
// - ripple effect for store buttons

document.addEventListener('DOMContentLoaded', () => {

  // Mobile nav toggle (simple)
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      const nav = document.querySelector('.nav-links');
      if (nav) {
        nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
        nav.style.flexDirection = 'column';
        nav.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.45), rgba(255,255,255,0.02))';
        nav.style.position = 'absolute';
        nav.style.top = '72px';
        nav.style.right = '20px';
        nav.style.padding = '12px';
        nav.style.borderRadius = '12px';
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
      }
    });
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.16 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    // fallback
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  // Ripple effect on store buttons
  document.querySelectorAll('.store-button').forEach(btn => {
    btn.classList.add('ripple');
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 1.2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      ripple.className = 'ripple-effect';
      btn.appendChild(ripple);
      setTimeout(()=> ripple.remove(), 700);
    });
  });

});
