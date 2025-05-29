const validTheme = (theme) => (["light", "dark", "auto"].includes(theme) ? theme : "auto");
const getStoredTheme = () => validTheme(localStorage.getItem("theme"));
const setStoredTheme = (theme) => localStorage.setItem("theme", theme);
const getPreferredTheme = () =>
  getStoredTheme() || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
const setBootstrapTheme = (theme) => {
  if (theme === "auto") theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-bs-theme", theme);
};

setBootstrapTheme(getPreferredTheme());

function updateButtons(theme, focus = false) {
  const themeSwitcher = document.querySelector(".dark-theme-toggle");
  // If the theme is invalid, show "auto" theme
  const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"],[data-bs-theme-value="auto"]`);
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
    updateButtons(getPreferredTheme());
    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const themeValue = toggle.getAttribute("data-bs-theme-value");
        if (themeValue) {
          const theme = validTheme(themeValue);
          setStoredTheme(theme);
          setBootstrapTheme(theme);
          updateButtons(theme, true);
        }
      });
    });
  },
  false,
);
