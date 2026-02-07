// THEME MANAGER (Dark + Light with persistence)
(function () {
  const STORAGE_KEY = "ssc-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  function loadTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  }

  const current = loadTheme();
  applyTheme(current);

  window.themeManager = {
    current,
    toggleTheme() {
      this.current = this.current === "dark" ? "light" : "dark";
      applyTheme(this.current);
      localStorage.setItem(STORAGE_KEY, this.current);
    }
  };
})();
