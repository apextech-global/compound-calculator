import StaticContentPage from "@/components/StaticContentPage";
import { createStaticPageMetadata } from "@/lib/seoMetadata";

export const generateMetadata = createStaticPageMetadata(
  "affiliate-disclosure"
);

export default function AffiliateDisclosurePage() {
  return <StaticContentPage pageKey="affiliate-disclosure" />;
}
