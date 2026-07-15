# Content Engine V1 Design

## Goal

Provide one stateless, configuration-driven content engine for every comparison-style page while preserving existing URLs, visible content, SEO behavior, CTA behavior, and calculator availability.

## Scope

The engine covers ETF comparison pages, `dca-vs-lump-sum`, `etf-comparison-calculator`, and Malaysia broker comparisons. Non-comparison SEO pages remain on the existing landing-page system.

## Architecture

Each page is represented by a discriminated configuration with `comparisonKind: "etf" | "strategy" | "calculator" | "broker"`. Configuration owns page-specific content and policy. The engine is stateless: generators receive configuration plus an explicit generation context and return immutable content models without reading routing state or page-specific globals.

Small generators have one responsibility:

- `HeroGenerator`: H1 and introduction
- `MetadataGenerator`: title and description content model
- `JsonLdGenerator`: page-type, FAQ, ItemList, and breadcrumb models
- `FAQGenerator`: FAQ content
- `RelatedLinksGenerator`: related comparison slugs
- `CalculatorCtaGenerator`: CTA visibility, query, and notice
- `ProsConsGenerator`: pros and cons sections

`ComparisonContentEngine` composes generator results into one `ComparisonContentModel`. The page component renders that model and does not branch on comparison kind.

## Compatibility

Existing page copy is migrated into configuration without editorial rewriting. Canonical and hreflang URLs continue to come from the existing SEO route registry. Article versus WebApplication structured-data behavior is represented by configuration. Unsupported calculators remain unavailable and never simulate returns.

## Testing

Site-quality assertions verify that every comparison-style slug is registered with the engine and that generators remain separate and stateless. Build, site checks, lint, full production QA, and `git diff --check` provide integration evidence.
