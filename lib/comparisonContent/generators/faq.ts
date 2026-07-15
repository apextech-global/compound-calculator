import type { ComparisonPageConfig } from "../models";

export function generateFaq(config: ComparisonPageConfig) {
  return config.faqs.map((faq) => ({ ...faq }));
}
