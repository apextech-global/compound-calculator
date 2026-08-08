import { expect, test } from "@playwright/test";
import { languageCodes, publicLocaleCodes } from "@/lib/locales";

const locales: readonly string[] = publicLocaleCodes;
const localizedLinkCopied: Record<string, string> = {
  en: "Link copied",
  id: "Tautan disalin",
  ko: "링크가 복사되었습니다",
  ms: "Pautan disalin",
  "zh-CN": "链接已复制",
  "zh-TW": "連結已複製",
};
const unsupportedLocales = languageCodes.filter(
  (code) => !(publicLocaleCodes as readonly string[]).includes(code)
);

const nonEnglishFallbackPhrases = [
  "What is",
  "Can I",
  "Select",
  "Open calculator",
  "DCA Calculator",
  "Compound Calculator",
  "Higher historical final value",
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
      await expect(page.getByTestId("calculator-empty-state")).toBeVisible();
      await expect(page.getByTestId("calculate-primary-button")).toBeVisible();
      await expect(page.locator("footer")).toBeVisible();
    });
  }
});

test.describe("unsupported locales are not publicly routable", () => {
  for (const locale of unsupportedLocales) {
    test(`/${locale} returns 404`, async ({ page }) => {
      const response = await page.goto(`/${locale}`);
      expect(response?.status()).toBe(404);
    });
  }

  const unsupportedExampleRoutes = [
    "/ru/dca-calculator",
    "/fr/recommended-tools",
    "/ja/supported-assets",
  ];

  for (const path of unsupportedExampleRoutes) {
    test(`${path} returns 404`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
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

test("JSON-LD scripts expose object roots for Safari-compatible inspection", async ({
  page,
}) => {
  for (const path of ["/en", "/en/voo-vs-spy", "/en/learn"]) {
    await page.goto(path);
    const payloads = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();

    expect(payloads.length, `${path} JSON-LD scripts`).toBeGreaterThan(0);

    for (const payload of payloads) {
      const jsonLd = JSON.parse(payload);

      expect(Array.isArray(jsonLd), `${path} JSON-LD root`).toBe(false);
      expect(jsonLd["@context"], `${path} JSON-LD context`).toBe(
        "https://schema.org"
      );
    }
  }
});

test("Korean launch exposes Korean UI, KRW, and eight historical Korea assets", async ({
  page,
}) => {
  const response = await page.goto(
    "/ko?market=south-korea&type=ETF&asset=069500.KS"
  );

  expect(response?.status()).toBe(200);
  await expect(page.locator("#language-switcher")).toHaveValue("ko");
  await expect(page.locator("#currency-switcher")).toHaveValue("KRW");
  await expect(page.locator("#calculator select").nth(0)).toHaveValue(
    "South Korea"
  );
  await expect(page.locator("#calculator select").nth(1)).toHaveValue("ETF");
  await expect(page.locator("#calculator select").nth(2)).toHaveValue(
    "069500-ks"
  );
  await expect(
    page.locator("p").filter({ hasText: "069500.KS - KODEX 200 ETF" }).first()
  ).toBeVisible();
  await expect(page.getByText("과거 시장 데이터로 월별 투자 테스트")).toBeVisible();

  await page.goto("/ko/supported-assets");
  const koreaRows = page.locator("article").filter({ hasText: "South Korea" });
  await expect(koreaRows).toHaveCount(8);

  for (const row of await koreaRows.all()) {
    await expect(row).toContainText("과거 데이터 사용 가능");
  }

  await page.goto("/ko/recommended-tools");
  await expect(page.getByRole("heading", { name: "추천 도구" })).toBeVisible();
  await expect(page.getByText("증권사 플랫폼", { exact: true })).toBeVisible();

  await page.goto("/ko/voo-vs-spy");
  await expect(page.getByText("성과 요약", { exact: true })).toBeVisible();
  await expect(page.getByText("총보수율", { exact: true })).toBeVisible();

  await page.goto("/ko/privacy");
  await expect(page.getByRole("heading", { name: "개인정보 처리방침" })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://dcabacktest.com/ko/privacy"
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="ko"]')
  ).toHaveAttribute("href", "https://dcabacktest.com/ko/privacy");

  const sitemap = await page.request.get("/sitemap.xml");
  expect(await sitemap.text()).toContain(
    "<loc>https://dcabacktest.com/ko/supported-assets</loc>"
  );
});

test("calculator V3.2 dashboard keeps controls and honest result hierarchy usable", async ({
  page,
}) => {
  await prepareEnglishHome(page);

  const dashboard = page.getByTestId("calculator-dashboard");
  await expect(dashboard).toBeVisible();
  await expect(page.getByTestId("calculator-input-panel")).toBeVisible();
  await expect(page.getByTestId("calculator-result-panel")).toBeVisible();
  await expect(page.getByTestId("calculator-empty-state")).toBeVisible();
  await expect(page.getByTestId("calculator-primary-metrics")).toHaveCount(0);
  await expect(page.getByTestId("calculator-result-panel")).not.toContainText(
    /\$0(?:[.,]0+)?|0\.0%/
  );
  await expect(
    page.locator("p").filter({ hasText: /Next step: compare this result/i })
  ).toHaveCount(0);

  for (const control of await dashboard.locator("input, select, button").all()) {
    const box = await control.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }

  await clickVisible(page.getByTestId("calculate-primary-button"));
  await expect(page.getByTestId("calculator-primary-metrics")).toBeVisible();
  await expect(
    page.locator("p").filter({ hasText: /Next step: compare this result/i })
  ).toBeVisible();

  for (const action of await page
    .getByTestId("calculator-result-panel")
    .locator("button")
    .all()) {
    const box = await action.boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }

  const resultOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth
  );
  expect(resultOverflow).toBeLessThanOrEqual(1);

  await clickVisible(page.getByTestId("compound-open-button"));
  await expect(page.getByTestId("calculator-dashboard")).toBeVisible();
  await expect(page.getByTestId("calculator-empty-state")).toBeVisible();
  await expect(page.getByTestId("calculator-primary-metrics")).toHaveCount(0);
});

test("calculator results stay empty until calculation and then update with inputs", async ({ page }) => {
  await prepareEnglishHome(page);
  await clickVisible(page.getByTestId("compound-open-button"));

  const finalValue = page.getByTestId("metric-final-value");
  await expect(page.getByTestId("calculator-empty-state")).toBeVisible();
  await expect(finalValue).toHaveCount(0);

  await clickVisible(page.getByTestId("calculate-primary-button"));
  await expect(finalValue).toBeVisible();
  const initialResult = await finalValue.textContent();
  expect(initialResult?.trim()).toBeTruthy();
  expect(initialResult).not.toMatch(/^\s*\$?0(?:[.,]0+)?\s*$/);

  const initialInvestment = page
    .getByTestId("calculator-input-panel")
    .locator("input[type='number']")
    .first();
  await initialInvestment.fill("0");
  await expect(finalValue).not.toHaveText(initialResult ?? "");

  const updatedResult = await finalValue.textContent();
  expect(updatedResult?.trim()).toBeTruthy();
});

test("result metric colors distinguish positive and neutral performance", async ({
  page,
}) => {
  await prepareEnglishHome(page);
  await clickVisible(page.getByTestId("calculate-primary-button"));
  await expect(page.getByTestId("metric-total-profit")).toHaveAttribute(
    "data-performance-tone",
    "positive"
  );
  await expect(page.getByTestId("metric-total-return")).toHaveAttribute(
    "data-performance-tone",
    "positive"
  );

  await clickVisible(page.getByTestId("compound-open-button"));
  await page
    .getByTestId("calculator-input-panel")
    .locator("input[type='number']")
    .nth(2)
    .fill("0");
  await clickVisible(page.getByTestId("calculate-primary-button"));
  await expect(page.getByTestId("metric-total-profit")).toHaveAttribute(
    "data-performance-tone",
    "neutral"
  );
});

test("English homepage advanced options toggle works", async ({ page }) => {
  const consoleErrors = await prepareEnglishHome(page);
  const toggle = page.getByTestId("advanced-toggle-button");
  const panel = page.getByTestId("advanced-options-panel");

  await expect(panel).toHaveAttribute("data-open", "false");
  await clickVisible(toggle);
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(panel).toHaveAttribute("data-open", "true");
  await expect(page.getByText(/Broker fee per purchase/i)).toBeVisible();
  await clickVisible(toggle);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(panel).toHaveAttribute("data-open", "false");
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("calculate-primary-button")).toBeFocused();
  await expect(page.getByText(/Broker fee per purchase/i)).not.toBeVisible();

  expect(consoleErrors).toEqual([]);
});

test("advanced result metrics stay in the detail reveal before actions and chart", async ({
  page,
}) => {
  await prepareEnglishHome(page);
  await clickVisible(page.getByTestId("advanced-toggle-button"));
  await clickVisible(page.getByTestId("calculate-primary-button"));

  const revealOrder = await page
    .locator("[data-result-reveal-step]")
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-result-reveal-step"))
    );
  expect(revealOrder).toEqual(["1", "2", "3", "3", "4", "5"]);
});

test("English homepage share buttons work when visible", async ({ page }) => {
  const consoleErrors = await prepareEnglishHome(page);

  await expect(page.getByTestId("share-result-button")).toHaveCount(0);
  await expect(page.getByTestId("copy-link-button")).toHaveCount(0);
  await expect(page.getByTestId("download-result-image-button")).toHaveCount(0);
  await expect(page.getByTestId("copy-caption-button")).toHaveCount(0);

  await clickVisible(page.getByTestId("calculate-primary-button"));

  const shareButton = page.getByTestId("share-result-button");
  if ((await shareButton.count()) > 0 && (await shareButton.isVisible())) {
    await clickVisible(shareButton);
  }

  await clickVisible(page.getByTestId("copy-link-button"));
  const feedback = page.getByTestId("result-action-feedback");
  await expect(feedback).toHaveAttribute("role", "status");
  await expect(feedback).toHaveText(/Link copied/i, { timeout: 5_000 });

  await clickVisible(page.getByTestId("copy-caption-button"));
  await expect(feedback).toHaveText(/Caption copied/i, {
    timeout: 5_000,
  });

  await clickVisible(page.getByTestId("download-result-image-button"));
  await expect(feedback).toHaveText(/Result image downloaded/i, {
    timeout: 5_000,
  });
  await expect(feedback).toHaveText("", { timeout: 3_500 });

  expect(consoleErrors).toEqual([]);
});

test("result action feedback is localized in every public locale", async ({
  page,
}) => {
  await installClipboardStub(page);

  for (const locale of locales) {
    await page.goto(`/${locale}`);
    await waitForHydration(page);
    await clickVisible(page.getByTestId("calculate-primary-button"));
    await clickVisible(page.getByTestId("copy-link-button"));
    await expect(page.getByTestId("result-action-feedback")).toHaveText(
      localizedLinkCopied[locale]
    );
  }
});

test("result actions announce a localized error when an action fails", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "clipboard", {
      configurable: true,
      get: () => ({
        writeText: async () => {
          throw new Error("Clipboard unavailable");
        },
      }),
    });
    Object.defineProperty(Navigator.prototype, "share", {
      configurable: true,
      value: undefined,
    });
  });
  const consoleErrors = collectConsoleErrors(page);

  await page.goto("/en");
  await waitForHydration(page);
  await clickVisible(page.getByTestId("calculate-primary-button"));
  await clickVisible(page.getByTestId("copy-link-button"));

  await expect(page.getByTestId("result-action-feedback")).toHaveText(
    /could not complete that action/i
  );
  expect(consoleErrors).toEqual([]);
});

test("legacy clipboard failures are reported and clean up temporary controls", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "clipboard", {
      configurable: true,
      get: () => undefined,
    });
    document.execCommand = () => false;
  });

  await page.goto("/en");
  await waitForHydration(page);
  await clickVisible(page.getByTestId("calculate-primary-button"));
  await clickVisible(page.getByTestId("copy-link-button"));

  await expect(page.getByTestId("result-action-feedback")).toHaveText(
    /could not complete that action/i
  );
  await expect(page.locator("body > textarea")).toHaveCount(0);
});

test("result actions expose one accurate busy state at a time", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(Navigator.prototype, "clipboard", {
      configurable: true,
      get: () => ({
        writeText: () =>
          new Promise<void>((resolve) => {
            (
              window as typeof window & {
                releaseClipboard?: () => void;
              }
            ).releaseClipboard = resolve;
          }),
      }),
    });
  });

  await page.goto("/en");
  await waitForHydration(page);
  await clickVisible(page.getByTestId("calculate-primary-button"));

  const copyLink = page.getByTestId("copy-link-button");
  await clickVisible(copyLink);
  await expect(copyLink).toHaveAttribute("aria-busy", "true");
  await expect(page.getByTestId("share-result-button")).toBeDisabled();
  await expect(page.getByTestId("copy-caption-button")).toBeDisabled();
  await expect(page.getByTestId("download-result-image-button")).toBeDisabled();

  await page.evaluate(() => {
    (
      window as typeof window & {
        releaseClipboard?: () => void;
      }
    ).releaseClipboard?.();
  });
  await expect(page.getByTestId("result-action-feedback")).toHaveText(
    /Link copied/i
  );
  await expect(copyLink).not.toBeDisabled();
});

test("valid shared backtest URLs restore the result and result actions", async ({
  page,
}) => {
  await installClipboardStub(page);
  await page.goto(
    "/en?locale=en&market=us&type=ETF&asset=VOO&amount=500&start=2018&end=2025&currency=USD&fixedFee=0&percentageFee=0&priceMethod=close"
  );
  await waitForHydration(page);

  await expect(page.getByTestId("calculator-empty-state")).toHaveCount(0);
  await expect(page.getByTestId("metric-final-value")).toBeVisible();
  await expect(page.getByTestId("copy-link-button")).toBeVisible();
});

test("English homepage compound calculator button works", async ({ page }) => {
  const consoleErrors = await prepareEnglishHome(page);

  await clickVisible(page.getByTestId("compound-open-button"));
  await expect(page.getByText(/Grow Your Money With Compound Interest/i)).toBeVisible();
  await expect(page.getByTestId("calculator-empty-state")).toBeVisible();
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
  await expect(page.getByText(/Sample only, not real market data/i).first()).toBeVisible();
  const historicalRows = page.locator("article").filter({
    hasText: /Historical data available/i,
  });
  const sampleRows = page.locator("article").filter({
    hasText: /Sample data only/i,
  });
  await expect(historicalRows.first()).toContainText(
    /Last updated: unavailable|\d{4}-\d{2}-\d{2}/
  );
  await expect(sampleRows.first()).toContainText(/Sample only, not real market data/i);
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
    ["recommended-tools", /Recommended Tools/i],
    ["learn", /Learn/i],
  ] as const;

  for (const [slug, label] of links) {
    await page.getByRole("contentinfo").getByRole("link", { name: label }).first().click();
    await expect(page).toHaveURL(new RegExp(`/en/${slug}`));
    await page.goto("/en");
  }
});

test("footer keeps core links compact and popular guides capped at 6", async ({ page }) => {
  await page.goto("/en");
  const footer = page.getByRole("contentinfo");

  // Learn (its own nav) + supported-assets, recommended-tools, about,
  // privacy, terms, disclaimer, affiliate-disclosure, contact = 9 core
  // links. Previously this also rendered every SEO landing-page slug
  // (25+ extra links) — that wall must not come back.
  const coreLinkCount = await footer
    .getByTestId("footer-core-links")
    .getByRole("link")
    .count();
  expect(coreLinkCount).toBeLessThanOrEqual(8);

  const learnLinkCount = await footer.getByRole("link", { name: "Learn" }).count();
  expect(coreLinkCount + learnLinkCount).toBeLessThanOrEqual(9);

  const popularGuides = footer.getByTestId("footer-popular-guides");
  const popularGuideCount = await popularGuides.getByRole("link").count();
  expect(popularGuideCount).toBeLessThanOrEqual(6);
  expect(popularGuideCount).toBeGreaterThan(0);
});

test("desktop homepage shows the calculator without scrolling", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "desktop-only viewport check");

  await page.goto("/en");
  await page.waitForLoadState("networkidle");

  const viewportHeight = page.viewportSize()?.height ?? 720;
  const calculatorBox = await page.locator("#calculator").boundingBox();

  expect(calculatorBox).not.toBeNull();
  expect(calculatorBox!.y).toBeLessThan(viewportHeight);
});

test("quick-start presets show more/less toggle reveals and applies hidden presets", async ({
  page,
}) => {
  const consoleErrors = await prepareEnglishHome(page);
  const toggle = page.getByTestId("quick-start-toggle-button");
  const hiddenPreset = page.getByTestId(
    "quick-start-preset-dca-vs-lump-sum"
  );

  await expect(hiddenPreset).not.toBeVisible();
  await clickVisible(toggle);
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(hiddenPreset).toBeVisible();

  const monthlyAmountInput = page.locator("#calculator input[type='number']").first();
  await expect(monthlyAmountInput).not.toHaveValue("1000");

  await clickVisible(hiddenPreset);
  await expect(monthlyAmountInput).toHaveValue("1000");
  await expect(hiddenPreset).toHaveAttribute("aria-pressed", "true");

  await clickVisible(toggle);
  await page.keyboard.press("Tab");
  await expect(hiddenPreset).not.toBeFocused();

  expect(consoleErrors).toEqual([]);
});

test("calculator motion reveals state in order without delaying accessibility", async ({
  page,
}) => {
  await prepareEnglishHome(page);

  const primaryAction = page.getByTestId("calculate-primary-button");
  await primaryAction.hover();
  await page.waitForTimeout(200);
  const hoverTransform = await primaryAction.evaluate(
    (element) => getComputedStyle(element).transform
  );
  await page.mouse.down();
  await page.waitForTimeout(200);
  const pressedTransform = await primaryAction.evaluate(
    (element) => getComputedStyle(element).transform
  );
  await page.mouse.move(0, 0);
  await page.mouse.up();
  expect(pressedTransform).not.toBe(hoverTransform);

  const modePanel = page.getByTestId("calculator-mode-panel");
  await expect(modePanel).toHaveAttribute("data-calculator-mode", "dca");
  const panelAnimationDuration = await modePanel.evaluate((element) =>
    Number.parseFloat(getComputedStyle(element).animationDuration) * 1000
  );
  expect(panelAnimationDuration).toBeGreaterThanOrEqual(220);
  expect(panelAnimationDuration).toBeLessThanOrEqual(500);

  const emptyStateItems = page.locator(
    "[data-testid='calculator-empty-state'] [data-empty-state-item]"
  );
  await expect(emptyStateItems).toHaveCount(3);
  const emptyStateDurations = await emptyStateItems.evaluateAll((elements) =>
    elements.map(
      (element) => Number.parseFloat(getComputedStyle(element).animationDuration) * 1000
    )
  );
  expect(emptyStateDurations.every((duration) => duration >= 220)).toBe(true);

  await clickVisible(page.getByTestId("calculate-primary-button"));
  const revealSections = page.locator("[data-result-reveal-step]");
  await expect(revealSections).toHaveCount(5);
  await expect(page.getByTestId("metric-final-value")).toBeVisible();

  const revealDelays = await revealSections.evaluateAll((elements) =>
    elements.map(
      (element) => Number.parseFloat(getComputedStyle(element).animationDelay) * 1000
    )
  );
  expect(revealDelays).toEqual([...revealDelays].sort((a, b) => a - b));

  await clickVisible(page.getByTestId("compound-open-button"));
  await expect(modePanel).toHaveAttribute("data-calculator-mode", "compound");
  await expect(page.getByTestId("calculator-empty-state")).toBeVisible();
});

test("reduced motion presents empty and result content immediately", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await prepareEnglishHome(page);

  await expect(page.getByTestId("calculator-dashboard")).toHaveAttribute(
    "data-reduced-motion",
    "true"
  );

  const emptyStateItems = page.locator(
    "[data-testid='calculator-empty-state'] [data-empty-state-item]"
  );
  await expect(emptyStateItems).toHaveCount(3);
  const emptyStateStyles = await emptyStateItems.evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      return {
        animationName: style.animationName,
        opacity: style.opacity,
        transform: style.transform,
      };
    })
  );
  expect(emptyStateStyles).toEqual(
    emptyStateStyles.map(() => ({
      animationName: "none",
      opacity: "1",
      transform: "none",
    }))
  );

  await clickVisible(page.getByTestId("calculate-primary-button"));
  const revealSections = page.locator("[data-result-reveal-step]");
  await expect(revealSections).toHaveCount(5);
  const resultStyles = await revealSections.evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element);
      return {
        animationName: style.animationName,
        opacity: style.opacity,
        transform: style.transform,
      };
    })
  );
  expect(resultStyles).toEqual(
    resultStyles.map(() => ({
      animationName: "none",
      opacity: "1",
      transform: "none",
    }))
  );

  const chartLines = page
    .getByTestId("calculator-result-panel")
    .locator(".recharts-line-curve");
  await expect(chartLines).toHaveCount(2);
  const chartPaths = await chartLines.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("d"))
  );
  expect(chartPaths.every((path) => Boolean(path))).toBe(true);
});

test("calculator mode switch has complete tab accessibility wiring", async ({ page }) => {
  await prepareEnglishHome(page);

  const dcaTab = page.getByTestId("dca-open-button");
  const compoundTab = page.getByTestId("compound-open-button");
  const panel = page.locator("#calculator");

  await expect(dcaTab).toHaveAttribute("role", "tab");
  await expect(compoundTab).toHaveAttribute("role", "tab");
  await expect(dcaTab).toHaveAttribute("aria-selected", "true");
  await expect(compoundTab).toHaveAttribute("aria-selected", "false");
  await expect(dcaTab).toHaveAttribute("aria-controls", "calculator");
  await expect(compoundTab).toHaveAttribute("aria-controls", "calculator");
  await expect(panel).toHaveAttribute("role", "tabpanel");

  const dcaTabId = await dcaTab.getAttribute("id");
  const compoundTabId = await compoundTab.getAttribute("id");
  expect(dcaTabId).toBeTruthy();
  expect(compoundTabId).toBeTruthy();
  await expect(panel).toHaveAttribute("aria-labelledby", dcaTabId!);
});

test("calculator mode switch supports keyboard arrow navigation", async ({ page }) => {
  await prepareEnglishHome(page);

  const dcaTab = page.getByTestId("dca-open-button");
  const compoundTab = page.getByTestId("compound-open-button");
  const panel = page.locator("#calculator");

  await dcaTab.focus();
  await expect(dcaTab).toBeFocused();

  await page.keyboard.press("ArrowRight");
  await expect(compoundTab).toBeFocused();
  await expect(compoundTab).toHaveAttribute("aria-selected", "true");
  await expect(dcaTab).toHaveAttribute("tabindex", "-1");
  await expect(compoundTab).toHaveAttribute("tabindex", "0");
  const compoundTabId = await compoundTab.getAttribute("id");
  await expect(panel).toHaveAttribute("aria-labelledby", compoundTabId!);
  await expect(page.getByText(/Grow Your Money With Compound Interest/i)).toBeVisible();

  await page.keyboard.press("ArrowLeft");
  await expect(dcaTab).toBeFocused();
  await expect(dcaTab).toHaveAttribute("aria-selected", "true");
  await expect(page.getByText(/DCA Scenario/i)).toBeVisible();
});

test("calculator mode switch labels are not truncated in any public locale", async ({
  page,
}) => {
  for (const locale of locales) {
    await page.goto(`/${locale}`);
    await page.waitForLoadState("networkidle");

    for (const testId of ["dca-open-button", "compound-open-button"]) {
      const tab = page.getByTestId(testId);
      const overflow = await tab.evaluate(
        (el) => el.scrollWidth - el.clientWidth
      );
      expect(overflow, `${locale} ${testId} should not clip its label`).toBeLessThanOrEqual(1);
    }
  }
});

test.describe("mobile layout has no horizontal overflow", () => {
  for (const locale of locales) {
    test(`/${locale} does not overflow horizontally on mobile`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );

      expect(overflow).toBeLessThanOrEqual(1);

      const dashboard = page.getByTestId("calculator-dashboard");
      await expect(dashboard).toBeVisible();
      const clippedText = await dashboard.locator("label, button").evaluateAll(
        (elements) =>
          elements.filter(
            (element) => element.scrollWidth - element.clientWidth > 1
          ).length
      );
      expect(clippedText, `${locale} calculator labels should not clip`).toBe(0);
    });
  }
});
