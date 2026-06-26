document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initFAQAccordion();
  initNewsletter();
  initDummyInteractions();
});

/* =======================================================
   1. Floating Navbar Scroll Effect
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
   2. FAQ Accordion
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
   3. Newsletter Form Subscription Demo
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
   4. Dummy Phone UI Micro-Interactions
   ======================================================= */
function initDummyInteractions() {
  // Dummy chips toggle in Phone 1
  const dummyChips = document.querySelectorAll(".dummy-chip");
  dummyChips.forEach(chip => {
    chip.addEventListener("click", () => {
      dummyChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });

  // Dummy tabs toggle in Phone 2
  const dummyTabs = document.querySelectorAll(".dummy-tab");
  dummyTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      dummyTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // Dummy bottom nav tabs toggle
  const dummyNavs = document.querySelectorAll(".nav-tab");
  dummyNavs.forEach(nav => {
    nav.addEventListener("click", () => {
      const parent = nav.parentElement;
      parent.querySelectorAll(".nav-tab").forEach(n => n.classList.remove("active"));
      nav.classList.add("active");
    });
  });
}
