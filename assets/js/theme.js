// theme.js — Smart School Clinic Theme Controller

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;

  // قراءة الثيم المحفوظ أو اختيار الداكن كافتراضي
  const savedTheme = localStorage.getItem("theme") || "dark";
  root.setAttribute("data-theme", savedTheme);

  // زر التبديل
  const toggle = document.getElementById("theme-toggle");

  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";

      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
});
