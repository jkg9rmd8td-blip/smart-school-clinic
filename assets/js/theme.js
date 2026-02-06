// Simple theme manager (dark only now, extensible later)
window.themeManager = {
  current: "dark",

  toggleTheme() {
    // جاهز للتوسع لاحقًا (Light Mode)
    if (this.current === "dark") {
      document.documentElement.setAttribute("data-theme", "light");
      this.current = "light";
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      this.current = "dark";
    }
  }
};
