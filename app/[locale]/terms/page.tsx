import StaticContentPage from "@/components/StaticContentPage";
import { createStaticPageMetadata } from "@/lib/seoMetadata";

export const generateMetadata = createStaticPageMetadata("terms");

export default function TermsPage() {
  return <StaticContentPage pageKey="terms" />;
}
