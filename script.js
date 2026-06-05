const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const currentYear = document.getElementById('current-year');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

navToggle?.addEventListener('click', () => {
  siteNav.classList.toggle('open');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
});

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-card, .section-header, .about-card, .education-card, .timeline-item, .skill-grid, .contact-card, .footer-inner'
);

revealTargets.forEach((element) => element.classList.add('animate-reveal'));

const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.2,
  }
);

revealTargets.forEach((element) => scrollObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const navLink = document.querySelector(`.site-nav a[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        navLink?.classList.add('active');
      }
    });
  },
  {
    root: null,
    rootMargin: '0px',
    threshold: 0.45,
  }
);

const sections = document.querySelectorAll('section');
sections.forEach((section) => sectionObserver.observe(section));

const heroSection = document.querySelector('.hero-section');
const heroVisuals = document.querySelector('.hero-visuals');
const heroMesh = document.querySelector('.hero-mesh');
const keywordCloud = document.querySelector('.keyword-cloud');
let parallaxFrame = null;
let parallaxData = { x: 0, y: 0 };

if (heroSection && heroVisuals && heroMesh && keywordCloud) {
  const updateParallax = () => {
    parallaxFrame = null;
    const rotateX = parallaxData.y * 10;
    const rotateY = parallaxData.x * 12;
    const meshMoveX = parallaxData.x * 18;
    const meshMoveY = parallaxData.y * 12;
    const cloudMoveX = parallaxData.x * -26;
    const cloudMoveY = parallaxData.y * -20;

    heroVisuals.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    heroMesh.style.transform = `translate3d(${meshMoveX}px, ${meshMoveY}px, 24px)`;
    keywordCloud.style.transform = `translate3d(${cloudMoveX}px, ${cloudMoveY}px, 48px)`;
  };

  heroSection.addEventListener('mousemove', (event) => {
    const rect = heroSection.getBoundingClientRect();
    parallaxData.x = (event.clientX - rect.left) / rect.width - 0.5;
    parallaxData.y = (event.clientY - rect.top) / rect.height - 0.5;

    if (!parallaxFrame) {
      parallaxFrame = requestAnimationFrame(updateParallax);
    }
  });

  heroSection.addEventListener('mouseleave', () => {
    parallaxData = { x: 0, y: 0 };
    if (!parallaxFrame) {
      parallaxFrame = requestAnimationFrame(updateParallax);
    }
  });
}

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
