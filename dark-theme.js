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
    for (let toggle of document.querySelectorAll(".bootstrap-dark-theme")) toggle.outerHTML = toggleHTML;
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

const toggleHTML = /* html */ `
<div class="position-relative" role="group" aria-label="Toggle dark mode" title="Toggle Dark Mode">
  <button class="dark-theme-toggle btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Open navigation menu">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-half" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
    </svg>
  </button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><button class="dropdown-item" data-bs-theme-value="light">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-sun-fill" viewBox="0 0 16 16">
          <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
        </svg>
        Light</button></li>
    <li><button class="dropdown-item" data-bs-theme-value="dark">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-moon-stars-fill" viewBox="0 0 16 16">
          <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
          <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
        </svg>
        Dark</button></li>
    <li><button class="dropdown-item" data-bs-theme-value="auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-circle-half" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
        </svg>
        Auto</button></li>
  </ul>
</div>`;
