import { expect, test } from "@playwright/test";

const locales = [
  "en",
  "zh-CN",
  "zh-TW",
  "ms",
  "id",
  "ja",
  "ko",
  "ar",
  "es",
  "fr",
  "de",
  "it",
  "ru",
  "ta",
];

const nonEnglishFallbackPhrases = [
  "What is",
  "Can I",
  "Select",
  "Open calculator",
  "DCA Calculator",
  "Compound Calculator",
  "Better performer",
];

async function installClipboardStub(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "clipboard", {
      configurable: true,
      get: () => ({
        writeText: async () => undefined,
      }),
    });
    Object.defineProperty(Navigator.prototype, "share", {
      configurable: true,
      value: undefined,
    });
    Object.defineProperty(Navigator.prototype, "canShare", {
      configurable: true,
      value: () => false,
    });
  });
}

async function waitForHydration(page: import("@playwright/test").Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(500);
}

function collectConsoleErrors(page: import("@playwright/test").Page) {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() !== "error") {
      return;
    }

    const text = message.text();

    if (
      text.includes("_next/webpack-hmr") ||
      text.includes("WebSocket connection") ||
      text.includes("favicon")
    ) {
      return;
    }

    errors.push(text);
  });
  page.on("pageerror", (error) => errors.push(error.message));

  return errors;
}

async function prepareEnglishHome(page: import("@playwright/test").Page) {
  await installClipboardStub(page);
  const consoleErrors = collectConsoleErrors(page);

  await page.goto("/en");
  await waitForHydration(page);

  return consoleErrors;
}

async function clickVisible(testButton: import("@playwright/test").Locator) {
  await testButton.scrollIntoViewIfNeeded();
  await expect(testButton).toBeVisible({ timeout: 5_000 });
  await testButton.click({ timeout: 5_000 });
}

test.describe("localized public homepages", () => {
  for (const locale of locales) {
    test(`/${locale} renders core calculator controls`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page.getByText("DCA Backtest").first()).toBeVisible();
      await expect(page.locator("#language-switcher")).toBeVisible();
      await expect(page.locator("#currency-switcher")).toBeVisible();
      await expect(page.locator("#calculator")).toBeVisible();
      await expect(page.locator("#calculator select").nth(2)).toBeVisible();
      await expect(page.locator("input[type='number']").first()).toBeVisible();
      await expect(page.locator(".recharts-responsive-container").first()).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    });
  }
});

test("English homepage calculator controls render", async ({ page }) => {
  const consoleErrors = await prepareEnglishHome(page);

  await expect(page.getByTestId("dca-open-button")).toBeVisible();
  await expect(page.getByTestId("compound-open-button")).toBeVisible();
  await expect(page.locator("#language-switcher")).toBeVisible();
  await expect(page.locator("#currency-switcher")).toBeVisible();
  await expect(page.locator("#calculator")).toBeVisible();
  await page.locator("#currency-switcher").selectOption("MYR");
  await expect(page.locator("#currency-switcher")).toHaveValue("MYR");

  expect(consoleErrors).toEqual([]);
});

test("English homepage advanced options toggle works", async ({ page }) => {
  const consoleErrors = await prepareEnglishHome(page);
  const toggle = page.getByTestId("advanced-toggle-button");

  await clickVisible(toggle);
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await clickVisible(toggle);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  expect(consoleErrors).toEqual([]);
});

test("English homepage share buttons work when visible", async ({ page }) => {
  const consoleErrors = await prepareEnglishHome(page);

  const shareButton = page.getByTestId("share-result-button");
  if ((await shareButton.count()) > 0 && (await shareButton.isVisible())) {
    await clickVisible(shareButton);
  }

  await clickVisible(page.getByTestId("copy-link-button"));
  await expect(page.getByText(/Link copied/i)).toBeVisible({ timeout: 5_000 });

  await clickVisible(page.getByTestId("copy-caption-button"));
  await expect(page.getByText(/Caption copied/i)).toBeVisible({
    timeout: 5_000,
  });

  await clickVisible(page.getByTestId("download-result-image-button"));

  expect(consoleErrors).toEqual([]);
});

test("English homepage compound calculator button works", async ({ page }) => {
  const consoleErrors = await prepareEnglishHome(page);

  await clickVisible(page.getByTestId("compound-open-button"));
  await expect(page.getByText(/Projected portfolio value/i)).toBeVisible();
  await clickVisible(page.getByTestId("dca-open-button"));
  await expect(page.getByText(/DCA Scenario/i)).toBeVisible();

  expect(consoleErrors).toEqual([]);
});

test("English homepage FAQ accordion works", async ({ page }) => {
  const consoleErrors = await prepareEnglishHome(page);

  const faqSummary = page
    .locator("summary")
    .filter({ hasText: /What is a DCA backtest/i });
  await faqSummary.scrollIntoViewIfNeeded();
  await faqSummary.click();
  await expect(page.getByText(/simulates investing a fixed amount/i)).toBeVisible();

  expect(consoleErrors).toEqual([]);
});

test("English homepage comparison controls work", async ({ page }) => {
  const consoleErrors = await prepareEnglishHome(page);

  await expect(page.getByText(/Higher historical final value/i)).toBeVisible();
  await clickVisible(page.getByTestId("comparison-copy-link-button"));
  await expect(page.getByText(/Comparison link copied/i)).toBeVisible({
    timeout: 5_000,
  });
  await clickVisible(page.getByTestId("comparison-copy-caption-button"));
  await expect(page.getByText(/Comparison caption copied/i)).toBeVisible({
    timeout: 5_000,
  });

  expect(consoleErrors).toEqual([]);
});

test("non-English homepages do not show obvious English fallback UI", async ({
  page,
}) => {
  for (const locale of locales.filter((value) => value !== "en")) {
    await page.goto(`/${locale}`);
    const text = await page.locator("main").innerText();
    const failures = nonEnglishFallbackPhrases.filter((phrase) =>
      text.includes(phrase)
    );

    expect(failures, `${locale} fallback phrases`).toEqual([]);
  }
});

test("supported assets page distinguishes historical data from sample data", async ({
  page,
}) => {
  await page.goto("/en/supported-assets");
  await expect(page.getByText(/Supported Assets and Market Data/i)).toBeVisible();
  await expect(page.getByText(/Historical data available/i).first()).toBeVisible();
  await expect(page.getByText(/Sample only - not real market data/i).first()).toBeVisible();
  const historicalRows = page.locator("article").filter({
    hasText: /Historical data available/i,
  });
  const sampleRows = page.locator("article").filter({
    hasText: /Sample data only/i,
  });
  await expect(historicalRows.first()).toContainText(
    /Last updated: unavailable|\d{4}-\d{2}-\d{2}/
  );
  await expect(sampleRows.first()).toContainText(/Sample only - not real market data/i);
});

test("legal pages contain launch-critical disclosures", async ({ page }) => {
  await page.goto("/en/disclaimer");
  const disclaimerText = await page.locator("main").innerText();
  expect(disclaimerText).toMatch(/educational/i);
  expect(disclaimerText).toMatch(/not financial advice/i);
  expect(disclaimerText).toMatch(/investment advice/i);
  expect(disclaimerText).toMatch(/tax advice/i);
  expect(disclaimerText).toMatch(/legal advice/i);
  expect(disclaimerText).toMatch(/buy, sell, or hold/i);
  expect(disclaimerText).toMatch(/Past performance/i);
  expect(disclaimerText).toMatch(/delayed, adjusted, incomplete/i);
  expect(disclaimerText).toMatch(/licensed financial adviser/i);

  await page.goto("/en/terms");
  await expect(page.locator("main")).toContainText(/Users are responsible/i);

  await page.goto("/en/privacy");
  const privacyText = await page.locator("main").innerText();
  expect(privacyText).toMatch(/Google Analytics/i);
  expect(privacyText).toMatch(/Google AdSense/i);
  expect(privacyText).toMatch(/third-party advertising vendors/i);
  expect(privacyText).toMatch(/cookies/i);
  expect(privacyText).toMatch(/browser settings/i);
  expect(privacyText).toMatch(/support@dcabacktest.com/i);
});

test("footer legal and supported asset links are reachable", async ({ page }) => {
  await page.goto("/en");
  const links = [
    ["about", /About/i],
    ["privacy", /Privacy Policy/i],
    ["terms", /Terms of Use/i],
    ["disclaimer", /Disclaimer/i],
    ["contact", /Contact/i],
    ["supported-assets", /Supported Assets/i],
  ] as const;

  for (const [slug, label] of links) {
    await page.getByRole("contentinfo").getByRole("link", { name: label }).first().click();
    await expect(page).toHaveURL(new RegExp(`/en/${slug}`));
    await page.goto("/en");
  }
});
