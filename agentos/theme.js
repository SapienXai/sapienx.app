(() => {
  const STORAGE_KEY = "agentos-theme";
  const THEMES = ["dark", "light"];
  const root = document.documentElement;
  const mediaQuery =
    typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: light)")
      : null;

  const getStoredTheme = () => {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return THEMES.includes(value) ? value : null;
    } catch {
      return null;
    }
  };

  const getPreferredTheme = () => getStoredTheme() || (mediaQuery?.matches ? "light" : "dark");

  const applyTheme = (theme) => {
    const nextTheme = THEMES.includes(theme) ? theme : "dark";
    const isLight = nextTheme === "light";

    root.dataset.theme = nextTheme;
    root.style.colorScheme = isLight ? "light" : "dark";
    document
      .querySelectorAll("[data-theme-toggle]")
      .forEach((toggle) => {
        toggle.setAttribute("aria-pressed", String(isLight));
        toggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
        const label = toggle.querySelector("[data-theme-toggle-label]");
        if (label) {
          label.textContent = isLight ? "Light" : "Dark";
        }
      });

    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) => meta.setAttribute("content", isLight ? "#f7f4ee" : "#09111d"));
  };

  applyTheme(getPreferredTheme());

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-theme-toggle]");
    if (!toggle) {
      return;
    }

    const nextTheme = root.dataset.theme === "light" ? "dark" : "light";

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Theme selection still applies for the current page when storage is unavailable.
    }

    applyTheme(nextTheme);
  });

  mediaQuery?.addEventListener?.("change", () => {
    if (!getStoredTheme()) {
      applyTheme(getPreferredTheme());
    }
  });
})();
