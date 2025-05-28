const getStoredTheme = () => localStorage.getItem("theme");
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);
const getPreferredTheme = () =>
  getStoredTheme() || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const setTheme = (theme) =>
  document.documentElement.setAttribute(
    "data-bs-theme",
    theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : theme,
  );

setTheme(getPreferredTheme());

function showActiveTheme(theme, focus = false) {
  const themeSwitcher = document.querySelector(".dark-theme-toggle");
  const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
  document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
    element.classList.remove("active");
    element.setAttribute("aria-pressed", "false");
  });
  btnToActive.classList.add("active");
  btnToActive.setAttribute("aria-pressed", "true");
  const ariaLabel = (themeSwitcher.textContent || "").trim();
  themeSwitcher.setAttribute("aria-label", `${ariaLabel} (${btnToActive.dataset.bsThemeValue})`);
  if (focus) themeSwitcher.focus();
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    showActiveTheme(getPreferredTheme());
    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        if (theme) {
          setStoredTheme(theme);
          setTheme(theme);
          showActiveTheme(theme, true);
        }
      });
    });
  },
  false,
);
