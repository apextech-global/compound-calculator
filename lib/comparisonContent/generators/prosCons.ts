import type { ComparisonPageConfig, ContentSection } from "../models";

export function generateProsCons(config: ComparisonPageConfig): ContentSection[] {
  return [config.prosCons.pros, config.prosCons.cons]
    .filter((section): section is ContentSection => Boolean(section))
    .map((section) => ({ ...section }));
}
