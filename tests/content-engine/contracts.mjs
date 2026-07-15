import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

const outputRoot = process.env.CONTENT_ENGINE_OUT;
if (!outputRoot) throw new Error("CONTENT_ENGINE_OUT is required");

const load = async (relativePath) => {
  const loadedModule = await import(pathToFileURL(path.join(outputRoot, relativePath)));
  return loadedModule.default ?? loadedModule;
};
const { generateComparisonContent } = await load("lib/comparisonContent/engine.js");
const { generateComparisonPage } = await load("lib/comparisonContent/service.js");
const {
  auditComparisonConfigRegistry,
  comparisonConfigRegistry,
  getComparisonConfigDescriptor,
} = await load("lib/comparisonContent/registry.js");
const {
  comparisonLibrarySlugs,
  getBrokerComparisonEntry,
  getComparisonLibraryEntry,
} = await load("lib/comparisonLibrary.js");

const comparisonLibraryExpansionV2Slugs = [
  "schd-vs-vig",
  "schd-vs-dgro",
  "schd-vs-vym",
  "voo-vs-vti",
  "vti-vs-itot",
  "cspx-vs-voo",
  "cspx-vs-ivv",
  "swda-vs-vwra",
  "swda-vs-iwda",
  "vwra-vs-vti",
  "vuaa-vs-cspx",
  "spyl-vs-cspx",
  "spyl-vs-vuaa",
  "qqq-vs-schg",
  "qqq-vs-xlk",
  "vxus-vs-ixus",
  "vt-vs-vti",
  "vt-vs-vwra",
];

const context = {
  locale: "en",
  pageUrl: "https://dcabacktest.com/en/a-vs-b",
  homeUrl: "https://dcabacktest.com/en",
  publisherUrl: "https://dcabacktest.com/",
};

function config(kind, overrides = {}) {
  const pageType = kind === "calculator" ? "WebApplication" : "Article";
  const unavailable = kind === "broker";
  return {
    slug: "a-vs-b",
    comparisonKind: kind,
    hero: { h1: "A vs B", intro: "Localized introduction" },
    metadata: { title: "A vs B title", description: "Unique description" },
    summarySections: [{ title: "Summary", body: "Educational summary" }],
    prosCons: {
      pros: { title: "Pros", body: "Transparent benefit" },
      cons: { title: "Cons", body: "Transparent risk" },
    },
    faqs: [{ question: "Visible question?", answer: "Visible answer." }],
    relatedLinks: ["other-comparison"],
    calculatorCta: unavailable
      ? { availability: "unavailable", notice: "No historical data is fabricated." }
      : { availability: "available", query: "?asset=A" },
    jsonLd: { pageType, comparedItems: [{ name: "A" }, { name: "B" }] },
    supportedLocales: ["en", "zh-CN"],
    ...overrides,
  };
}

for (const [kind, expectedType] of [
  ["etf", "Article"],
  ["strategy", "Article"],
  ["calculator", "WebApplication"],
  ["broker", "Article"],
]) {
  test(`${kind} contract generates deterministic ${expectedType} content`, () => {
    const input = config(kind);
    const first = generateComparisonContent(input, context);
    const second = generateComparisonContent(input, context);
    assert.deepEqual(first, second);
    assert.equal(first.comparisonKind, kind);
    assert.equal(first.metadata.title, input.metadata.title);
    assert.equal(first.metadata.canonical, context.pageUrl);
    assert.equal(first.hero.intro, "Localized introduction");
    assert.deepEqual(first.relatedLinks, ["other-comparison"]);
    assert.equal(first.jsonLd[0]["@type"], expectedType);
    assert.equal(first.jsonLd[1]["@type"], "BreadcrumbList");
    assert.equal(first.jsonLd[1].itemListElement[1].item, context.pageUrl);
  });
}

test("invalid configuration fails safely", () => {
  assert.equal(
    generateComparisonContent(config("etf", { metadata: { title: "", description: "" } }), context),
    null
  );
});

test("current page and duplicate related links are excluded", () => {
  const result = generateComparisonContent(
    config("etf", { relatedLinks: ["a-vs-b", "other-comparison", "other-comparison"] }),
    context
  );
  assert.deepEqual(result.relatedLinks, ["other-comparison"]);
});

test("broker comparison cannot enable a calculator", () => {
  assert.equal(
    generateComparisonContent(
      config("broker", { calculatorCta: { availability: "available", query: "?asset=A" } }),
      context
    ),
    null
  );
});

test("unsupported history is never represented by an enabled CTA", () => {
  const result = generateComparisonContent(config("broker"), context);
  assert.equal(result.calculatorCta.availability, "unavailable");
  assert.match(result.calculatorCta.notice, /No historical data is fabricated/);
});

test("missing config lookup and generation fail safely", () => {
  assert.equal(getComparisonConfigDescriptor("missing-vs-page"), null);
  assert.equal(generateComparisonPage(null, context), null);
});

test("unsupported locale cannot generate localized content", () => {
  const input = config("etf", { supportedLocales: ["zh-CN"] });
  assert.equal(generateComparisonContent(input, context), null);
});

test("broken related link fails validation when the route registry is supplied", () => {
  const input = config("etf", { relatedLinks: ["missing-page"] });
  assert.equal(
    generateComparisonContent(input, { ...context, validRelatedSlugs: ["a-vs-b"] }),
    null
  );
});

test("registered comparison configs are unique and internally valid", () => {
  const expected = comparisonConfigRegistry.map((entry) => entry.slug);
  const validPages = [...new Set([
    ...expected,
    ...comparisonConfigRegistry.flatMap((entry) => entry.relatedLinks),
  ])];
  assert.deepEqual(auditComparisonConfigRegistry(expected, validPages), []);
  assert.equal(new Set(expected).size, expected.length);
});

test("real strategy and calculator descriptors select distinct behavior", () => {
  const strategy = getComparisonConfigDescriptor("dca-vs-lump-sum");
  const calculator = getComparisonConfigDescriptor("etf-comparison-calculator");
  assert.equal(strategy.comparisonKind, "strategy");
  assert.equal(strategy.pageType, "Article");
  assert.equal(calculator.comparisonKind, "calculator");
  assert.equal(calculator.pageType, "WebApplication");
  assert.equal(calculator.calculatorAvailability, "available");
});

test("real ETF locale override and unsupported calculator config generate honestly", () => {
  const entry = getComparisonLibraryEntry("zh-CN", "vti-vs-schb");
  const result = generateComparisonPage({ slug: "vti-vs-schb", ...entry }, {
    ...context,
    locale: "zh-CN",
    pageUrl: "https://dcabacktest.com/zh-CN/vti-vs-schb",
    homeUrl: "https://dcabacktest.com/zh-CN",
    validRelatedSlugs: comparisonConfigRegistry.flatMap((item) => [item.slug, ...item.relatedLinks]),
  });
  assert.ok(result);
  assert.equal(result.contentEngine.comparisonKind, "etf");
  assert.equal(result.calculatorStatus, "unavailable");
  assert.match(result.calculatorNotice, /不会模拟或估算回报/);
  assert.match(result.title, /费用/);
});

test("real broker config remains educational and unavailable", () => {
  const entry = getBrokerComparisonEntry("ibkr-vs-moomoo-malaysia");
  const result = generateComparisonPage({ slug: "ibkr-vs-moomoo-malaysia", ...entry }, {
    ...context,
    locale: "zh-CN",
    pageUrl: "https://dcabacktest.com/zh-CN/ibkr-vs-moomoo-malaysia",
    homeUrl: "https://dcabacktest.com/zh-CN",
  });
  assert.ok(result);
  assert.equal(result.calculatorStatus, "unavailable");
  assert.equal(result.contentEngine.jsonLd[0]["@type"], "Article");
  assert.match(result.faqs.at(-1).answer, /仅供教育用途/);
});

test("Comparison Library Expansion V2 registers and generates every requested page", () => {
  const registrySlugs = comparisonConfigRegistry.map((entry) => entry.slug);
  const validRelatedSlugs = comparisonConfigRegistry.flatMap((entry) => [
    entry.slug,
    ...entry.relatedLinks,
  ]);

  for (const slug of comparisonLibraryExpansionV2Slugs) {
    assert.equal(comparisonLibrarySlugs.filter((item) => item === slug).length, 1, `${slug}: library registration`);
    assert.equal(registrySlugs.filter((item) => item === slug).length, 1, `${slug}: registry registration`);

    const entry = getComparisonLibraryEntry("en", slug);
    const result = generateComparisonPage({ slug, ...entry }, {
      ...context,
      pageUrl: `https://dcabacktest.com/en/${slug}`,
      validRelatedSlugs,
    });

    assert.ok(result, `${slug}: generated page`);
    assert.ok(result.title, `${slug}: metadata title`);
    assert.ok(result.description, `${slug}: metadata description`);
    assert.ok(result.faqs.length > 0, `${slug}: FAQ`);
    assert.equal(result.contentEngine.jsonLd[0]["@type"], "Article", `${slug}: Article JSON-LD`);
    assert.equal(result.contentEngine.jsonLd[1]["@type"], "BreadcrumbList", `${slug}: breadcrumb JSON-LD`);
    assert.equal(result.contentEngine.jsonLd[1].itemListElement[1].item, `https://dcabacktest.com/en/${slug}`, `${slug}: breadcrumb URL`);
    assert.ok(result.contentEngine.relatedLinks.length > 0, `${slug}: related links`);
    assert.ok(!result.contentEngine.relatedLinks.includes(slug), `${slug}: no self-link`);
  }
});
