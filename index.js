document.addEventListener("DOMContentLoaded", () => {
  initLenis();
  initPreloader(); // Replaces direct initGSAP to wait for preloader
  initNavbarScroll();
  initMobileMenu();
  initFAQAccordion();
  initNewsletter();
  initDummyInteractions();
  initMagneticButtons();
  initTactileTouch(); // For mobile
});

/* =======================================================
   0.5 Mobile Menu Toggle
   ======================================================= */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mobile-menu-close");
  const overlay = document.getElementById("mobile-menu-overlay");
  const links = document.querySelectorAll(".mobile-nav-link, #mobile-nav-logo, .mobile-nav-cta a");

  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  });

  const closeModal = () => {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  links.forEach(link => link.addEventListener("click", closeModal));
}

/* =======================================================
   0. Lenis Smooth Scrolling
   ======================================================= */
function initLenis() {
  const lenis = new Lenis({
    duration: 0.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

/* =======================================================
   1. Preloader & GSAP Animations
   ======================================================= */
function initPreloader() {
  const counterObj = { value: 0 };
  const counterEl = document.getElementById('preloader-counter');
  
  // Create a master timeline
  const tl = gsap.timeline({
    onComplete: () => {
      // Start the rest of the animations once preloader is done
      initGSAP();
    }
  });

  // 1. Pop the logo up
  tl.to('.preloader-logo', {
    y: 0,
    duration: 1,
    ease: "power4.out"
  });

  // 2. Count up to 100
  tl.to(counterObj, {
    value: 100,
    duration: 1.8,
    ease: "power2.inOut",
    onUpdate: () => {
      counterEl.innerText = Math.round(counterObj.value) + '%';
    }
  }, "-=0.6");

  // 3. Slide the preloader out of the way
  tl.to('.preloader', {
    yPercent: -100,
    duration: 1.2,
    ease: "power4.inOut"
  }, "+=0.2");
}

function initGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero Section Entrance
  const heroTl = gsap.timeline();
  
  heroTl.fromTo("#hero-badge", 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1, ease: "power3.out" } // No initial delay because preloader just finished
  )
  .fromTo("#hero-headline", 
    { y: 40, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    "-=0.7"
  )
  .fromTo("#hero-subtitle", 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    "-=0.7"
  )
  .fromTo("#hero-cta-group .btn", 
    { y: 20, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" },
    "-=0.7"
  )
  .fromTo(".phone-mockup", 
    { y: 150, opacity: 0, rotation: -10 }, 
    { y: 0, opacity: 1, rotation: -2, duration: 1.5, ease: "back.out(1.2)" },
    "-=0.8"
  )
  .fromTo(".laptop-mockup", 
    { y: 150, opacity: 0, rotation: 10 }, 
    { y: 0, opacity: 1, rotation: 2, duration: 1.5, ease: "back.out(1.2)" },
    "-=1.3"
  );

  // Floating Parallax on Hero Mockups on scroll
  gsap.to(".phone-mockup", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1,
    }
  });

  gsap.to(".laptop-mockup", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    }
  });

  // Section Headers Reveal
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header, 
      { y: 50, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Bento Grid Items Stagger Reveal
  gsap.fromTo(".bento-item", 
    { y: 50, opacity: 0 }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".bento-grid",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Principles Cards Reveal
  gsap.fromTo(".principle-card", 
    { y: 40, opacity: 0, scale: 0.95 }, 
    { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      duration: 0.8, 
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".principles-grid",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
  
  // Pricing Cards
  gsap.fromTo(".pricing-card", 
    { y: 50, opacity: 0 }, 
    { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".pricing-grid",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
}

/* =======================================================
   2. Magnetic Buttons (Awwwards Style)
   ======================================================= */
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.btn-hero-primary, .btn-hero-secondary, .btn-nav, .btn-cta-primary, .btn-cta-secondary');
  
  magnets.forEach((magnet) => {
    magnet.addEventListener('mousemove', function(e) {
      if (window.innerWidth <= 768) return; // Disable magnetic hover on mobile/touch screens
      const position = magnet.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      gsap.to(magnet, {
        x: x * 0.15,
        y: y * 0.15,
        duration: 0.5,
        ease: "power3.out"
      });
      
      // Also move the icon inside if it exists
      const icon = magnet.querySelector('.icon-circle');
      if(icon) {
        gsap.to(icon, {
          x: x * 0.1,
          y: y * 0.1,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    });

    magnet.addEventListener('mouseleave', function(e) {
      if (window.innerWidth <= 768) return;
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)"
      });
      
      const icon = magnet.querySelector('.icon-circle');
      if(icon) {
        gsap.to(icon, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)"
        });
      }
    });
  });
}

/* =======================================================
   2.5 Tactile Touch Feedback (Mobile)
   ======================================================= */
function initTactileTouch() {
  // Select all interactive cards and buttons
  const touchableElements = document.querySelectorAll('.bento-item, .principle-card, .testi-card, .btn');

  touchableElements.forEach((el) => {
    // When finger touches down, scale slightly down
    el.addEventListener('touchstart', () => {
      gsap.to(el, { scale: 0.96, duration: 0.2, ease: "power2.out" });
    }, { passive: true });

    // When finger lifts up or cancels, return to normal scale
    el.addEventListener('touchend', () => {
      gsap.to(el, { scale: 1, duration: 0.4, ease: "back.out(1.5)" });
    });
    el.addEventListener('touchcancel', () => {
      gsap.to(el, { scale: 1, duration: 0.4, ease: "back.out(1.5)" });
    });
  });
}

/* =======================================================
   3. Floating Navbar Scroll Effect
   ======================================================= */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* =======================================================
   4. FAQ Accordion
   ======================================================= */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (question) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active");
        // Close others
        faqItems.forEach(i => i.classList.remove("active"));
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}

/* =======================================================
   5. Newsletter Form Subscription Demo
   ======================================================= */
function initNewsletter() {
  const form = document.querySelector(".newsletter-form");
  if (form) {
    const input = form.querySelector("input");
    const button = form.querySelector("button");
    button.addEventListener("click", (e) => {
      e.preventDefault();
      if (!input.value) return;
      const originalText = button.innerText;
      button.innerText = "Berhasil Terdaftar! ✓";
      button.style.backgroundColor = "#76C352";
      button.style.color = "#028B22";
      input.value = "";
      setTimeout(() => {
        button.innerText = originalText;
        button.style.backgroundColor = "";
        button.style.color = "";
      }, 4000);
    });
  }
}

/* =======================================================
   6. Dummy Phone UI Micro-Interactions
   ======================================================= */
function initDummyInteractions() {
  const dummyChips = document.querySelectorAll(".dummy-chip");
  dummyChips.forEach(chip => {
    chip.addEventListener("click", () => {
      dummyChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });

  const dummyTabs = document.querySelectorAll(".dummy-tab");
  dummyTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      dummyTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  const dummyNavs = document.querySelectorAll(".nav-tab");
  dummyNavs.forEach(nav => {
    nav.addEventListener("click", () => {
      const parent = nav.parentElement;
      parent.querySelectorAll(".nav-tab").forEach(n => n.classList.remove("active"));
      nav.classList.add("active");
    });
  });
}
