# bootstrap-dark-theme

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
<script src="https://cdn.jsdelivr.net/npm/bootstrap-dark-theme@1/dist/dark-theme.js"></script>
```

## Usage

Add [this HTML navbar](dark-theme.html) to your page, modified as required,
for a navbar with a dark theme dropdown toggle like this:

[![Dark theme example](dark-theme.png)](dark-theme.html ":include height=160px")

## Required Elements and Attributes

To implement the dark theme toggle, you need to include the following elements with specific attributes:

1. A button with the class `dark-theme-toggle` that serves as the main toggle button
2. Buttons with the attribute `data-bs-theme-value` set to one of the valid themes

### Valid Theme Values

Only the following theme values are valid for the `data-bs-theme-value` attribute:

- `light`: Forces the light theme regardless of system preference
- `dark`: Forces the dark theme regardless of system preference
- `auto`: Uses the system preference (light or dark) based on the user's OS settings

Any invalid theme value will default to the same behavior as `auto`.

### How It Works

1. The script looks for elements with the `data-bs-theme-value` attribute
2. When a user clicks on one of these elements, the script:
   - Validates the theme value (defaulting to `auto` if invalid)
   - Stores the selected theme in localStorage
   - Applies the theme to the document by setting the `data-bs-theme` attribute on the root element
   - Updates the UI to show which theme is currently active
3. On page load, the script automatically applies the previously selected theme from localStorage, or if none exists, uses the system preference

# Release notes

- [1.1.0](https://www.npmjs.com/package/bootstrap-dark-theme/v/1.1.0): 29 May 2025. Treat unknown themes as 'auto'. Add tests
- [1.0.0](https://www.npmjs.com/package/bootstrap-dark-theme/v/1.0.0): 28 May 2025. Initial release

# Setup

To run this project locally:

- Clone this repo, and run `npm install` to install dependencies
- Run `npm run build` to compile
- Open [`index.html`](index.html ":ignore") using a HTTP server (e.g. `python -m http.server`)

To release, run:

```shell
npm version minor
npm publish
git push --tags
```

# License

[MIT](LICENSE)
