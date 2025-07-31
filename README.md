# bootstrap-dark-theme

[![npm version](https://img.shields.io/npm/v/bootstrap-dark-theme.svg)](https://www.npmjs.com/package/bootstrap-dark-theme)
[![Bootstrap](https://img.shields.io/badge/Framework-Bootstrap%205-7952b3)](https://getbootstrap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![bundle size](https://img.shields.io/bundlephobia/minzip/bootstrap-dark-theme)](https://bundlephobia.com/package/bootstrap-dark-theme)

Adds a [Bootstrap 5](https://getbootstrap.com/docs/5.3/) light/dark theme toggle button in the navbar using [Bootstrap color mode](https://getbootstrap.com/docs/5.3/customize/color-modes/)

## Installation

Install via `npm`:

```bash
npm install bootstrap-dark-theme@1
```

Use locally:

```html
<script src="./node_modules/bootstrap-dark-theme/dist/dark-theme.js"></script>
```

Use via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap-dark-theme@1"></script>
```

## Usage

Add a `<div class="bootstrap-dark-theme"></div>` inside your navbar. The dark theme toggle _replaces_ it.

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" />

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <div class="bootstrap-dark-theme"></div>
  </div>
</nav>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap-dark-theme@1/dist/dark-theme.js" type="module"></script>
```

[![Dark theme example](dark-theme.png)](dark-theme.html ":include height=160px")

### Custom Styling

You can replace `<div class="bootstrap-theme"></div>` with your toggle. For example:

```html
<div class="position-relative" role="group" aria-label="Toggle dark mode" title="Toggle Dark Mode">
  <button class="dark-theme-toggle btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Open navigation menu">
    <i class="bi bi-circle-half"></i>
  </button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li><button class="dropdown-item" data-bs-theme-value="light"><i class="me-2 bi sun-fill"></i> Light</button></li>
    <li><button class="dropdown-item" data-bs-theme-value="dark"><i class="me-2 bi bi-moon-stars-fill"> Dark</button></li>
    <li><button class="dropdown-item" data-bs-theme-value="auto"><i class="me-2 bi bi-circle-half"> Auto</button></li>
  </ul>
</div>
```

Make sure you have:

1. A button with the class `dark-theme-toggle` that serves as the main toggle button
2. Buttons with the attribute `data-bs-theme-value` with values:
   - `light`: Forces the light theme regardless of system preference
   - `dark`: Forces the dark theme regardless of system preference
   - `auto`: Uses the system preference (light or dark) based on the user's OS settings
   - Any invalid theme value will default to the same behavior as `auto`.

How it works:

1. The script looks for elements with the `data-bs-theme-value` attribute
2. When a user clicks on one of these elements, the script:
   - Validates the theme value (defaulting to `auto` if invalid)
   - Stores the selected theme in localStorage
   - Applies the theme to the document by setting the `data-bs-theme` attribute on the root element
   - Updates the UI to show which theme is currently active
3. On page load, the script automatically applies the previously selected theme from localStorage, or if none exists, uses the system preference

## Development

```bash
git clone https://github.com/sanand0/bootstrap-dark-theme.git
cd bootstrap-dark-theme

npm install
npm run lint && npm run build && npm test

npm publish
git commit . -m"$COMMIT_MSG"; git tag $VERSION; git push --follow-tags
```

## Release notes

- [1.3.1](https://www.npmjs.com/package/bootstrap-dark-theme/v/1.3.1): 31 Jul 2025. Standardized package.json & README.md
- [1.2.1](https://www.npmjs.com/package/bootstrap-dark-theme/v/1.2.1): 24 Jun 2025. Enable default file: `https://cdn.jsdelivr.net/npm/bootstrap-dark-theme@1`
- [1.2.0](https://www.npmjs.com/package/bootstrap-dark-theme/v/1.2.0): 24 Jun 2025. Embed HTML via `<div class="bootstrap-theme"></div>`
- [1.1.0](https://www.npmjs.com/package/bootstrap-dark-theme/v/1.1.0): 29 May 2025. Treat unknown themes as 'auto'. Add tests
- [1.0.0](https://www.npmjs.com/package/bootstrap-dark-theme/v/1.0.0): 28 May 2025. Initial release

## License

[MIT](LICENSE)
