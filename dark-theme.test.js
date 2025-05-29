import { describe, it, expect } from "vitest";
import { Browser } from "happy-dom";

const newBrowser = (settings) =>
  new Browser({
    console,
    settings: { ...settings, fetch: { virtualServers: [{ url: "https://test/", directory: "./" }] } },
  });

const lightPage = newBrowser().newPage();
const darkPage = newBrowser({ device: { prefersColorScheme: "dark" } }).newPage();

async function load(page) {
  await page.goto("https://test/dark-theme.test.html");
  await page.waitUntilComplete();
  // Manually dispatch due to https://github.com/capricorn86/happy-dom/issues/1692
  page.mainFrame.document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true, cancelable: true }));
  return { page, window: page.mainFrame.window, body: page.mainFrame.document.documentElement };
}

describe("Bootstrap Dark Theme", async () => {
  it("should initialize with light theme by default", async () => {
    const { body } = await load(lightPage);
    expect(body.getAttribute("data-bs-theme")).toBe("light");
  });

  it("should initialize with dark theme if system preference is dark", async () => {
    const { body } = await load(darkPage);
    expect(body.getAttribute("data-bs-theme")).toBe("dark");
  });

  it("should switch to light theme when light button clicked", async () => {
    const { window, body } = await load(lightPage);
    await body.querySelector('[data-bs-theme-value="light"]').click();
    expect(body.getAttribute("data-bs-theme")).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("light");
  });

  it("should switch to dark theme when dark button clicked", async () => {
    const { window, body } = await load(lightPage);
    await body.querySelector('[data-bs-theme-value="dark"]').click();
    expect(body.getAttribute("data-bs-theme")).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });

  it("should switch to browser default (light) theme when auto button clicked", async () => {
    const { window, body } = await load(lightPage);
    await body.querySelector('[data-bs-theme-value="auto"]').click();
    expect(body.getAttribute("data-bs-theme")).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("auto");
  });

  it("should switch to browser default (dark) theme when auto button clicked", async () => {
    const { window, body } = await load(darkPage);
    await body.querySelector('[data-bs-theme-value="auto"]').click();
    expect(body.getAttribute("data-bs-theme")).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("auto");
  });

  it("should treat invalid localStorage theme as auto (light)", async () => {
    const { window, body } = await load(lightPage);
    await body.querySelector('[data-bs-theme-value="invalid"]').click();
    expect(body.getAttribute("data-bs-theme")).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("auto");
  });
});
