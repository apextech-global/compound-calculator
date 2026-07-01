import StaticContentPage from "@/components/StaticContentPage";
import { createStaticPageMetadata } from "@/lib/seoMetadata";

export const generateMetadata = createStaticPageMetadata("disclaimer");

export default function DisclaimerPage() {
  return <StaticContentPage pageKey="disclaimer" />;
}
