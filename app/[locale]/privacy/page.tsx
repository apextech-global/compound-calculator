import StaticContentPage from "@/components/StaticContentPage";
import { createStaticPageMetadata } from "@/lib/seoMetadata";

export const generateMetadata = createStaticPageMetadata("privacy");

export default function PrivacyPage() {
  return <StaticContentPage pageKey="privacy" />;
}
