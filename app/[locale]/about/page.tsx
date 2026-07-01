import StaticContentPage from "@/components/StaticContentPage";
import { createStaticPageMetadata } from "@/lib/seoMetadata";

export const generateMetadata = createStaticPageMetadata("about");

export default function AboutPage() {
  return <StaticContentPage pageKey="about" />;
}
