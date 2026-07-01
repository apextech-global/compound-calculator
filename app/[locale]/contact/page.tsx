import StaticContentPage from "@/components/StaticContentPage";
import { createStaticPageMetadata } from "@/lib/seoMetadata";

export const generateMetadata = createStaticPageMetadata("contact");

export default function ContactPage() {
  return <StaticContentPage pageKey="contact" />;
}
