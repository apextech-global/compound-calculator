import type { Metadata } from "next";
import HealthPage from "@/app/admin/health/page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Internal Site Health | DCA Backtest",
  description: "Internal site health dashboard for DCA Backtest.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default HealthPage;
