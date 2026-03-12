const revealElements = document.querySelectorAll(".reveal");
const quickstartTabs = document.querySelectorAll("[data-tab-target]");
const quickstartPanels = document.querySelectorAll("[data-tab-panel]");
const copyButtons = document.querySelectorAll("[data-copy-target]");
const heroVideoFrame = document.querySelector(".hero-video-frame");
const year = document.querySelector("#year");
const mouseGlow = document.getElementById("mouse-glow");
const auras = document.querySelectorAll(".page-aura");
const featureCards = document.querySelectorAll(".feature-card");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

// Mobile menu toggle
if (mobileMenuToggle && siteNav && siteHeader) {
  const setMobileMenuState = (isOpen) => {
    siteHeader.classList.toggle("is-menu-open", isOpen);
    mobileMenuToggle.classList.toggle("is-active", isOpen);
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  const closeMobileMenu = () => {
    setMobileMenuState(false);
  };

  mobileMenuToggle.addEventListener("click", () => {
    const isOpen = !siteHeader.classList.contains("is-menu-open");
    setMobileMenuState(isOpen);
  });

  // Close menu when clicking a link
  siteHeader.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 940) {
        closeMobileMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 940) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target) && siteHeader.classList.contains("is-menu-open")) {
      closeMobileMenu();
    }
  });
}

// Mouse glow and card effects
document.addEventListener("mousemove", (e) => {
  if (mouseGlow) {
    mouseGlow.style.opacity = "1";
    mouseGlow.style.left = `${e.clientX}px`;
    mouseGlow.style.top = `${e.clientY}px`;
  }

  // Card highlight effect
  featureCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });

  // Subtle aura parallax
  auras.forEach((aura, index) => {
    const speed = (index + 1) * 20;
    const x = (window.innerWidth - e.pageX * speed) / 100;
    const y = (window.innerHeight - e.pageY * speed) / 100;
    aura.style.transform = `translate(${x}px, ${y}px)`;
  });
});

document.addEventListener("mouseleave", () => {
  if (mouseGlow) {
    mouseGlow.style.opacity = "0";
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0,
    rootMargin: "0px 0px 24% 0px",
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

const setActiveTab = (target) => {
  quickstartTabs.forEach((tab) => {
    const isActive = tab.dataset.tabTarget === target;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  quickstartPanels.forEach((panel) => {
    const isActive = panel.dataset.tabPanel === target;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
};

quickstartTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveTab(tab.dataset.tabTarget);
  });
});

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const targetId = button.dataset.copyTarget;
    const target = document.getElementById(targetId);

    if (!target) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      const previousText = button.textContent;
      button.textContent = "Copied";
      button.classList.add("is-copied");

      window.setTimeout(() => {
        button.textContent = previousText;
        button.classList.remove("is-copied");
      }, 1400);
    } catch (_error) {
      button.textContent = "Failed";
      window.setTimeout(() => {
        button.textContent = "Copy";
      }, 1400);
    }
  });
});

if (heroVideoFrame && window.location.protocol !== "file:") {
  const baseSrc = heroVideoFrame.dataset.baseSrc?.trim();

  if (baseSrc) {
    const separator = baseSrc.includes("?") ? "&" : "?";
    heroVideoFrame.src = `${baseSrc}${separator}origin=${encodeURIComponent(window.location.origin)}`;
  }
}

if (year) {
  year.textContent = String(new Date().getFullYear());
}
