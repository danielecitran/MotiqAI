import type { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardAssetPreloads } from "@/components/dashboard/dashboard-asset-preloads";

export const metadata: Metadata = {
  title: "Dashboard | MotiqAI",
  description:
    "MotiqAI Motion Control Dashboard | Generate UGC videos with motion guidance.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark relative h-screen overflow-hidden bg-[#030303]">
      <DashboardAssetPreloads />
      {/* Header schwebt absolut über beiden Panels */}
      <DashboardHeader />
      {/* Panels füllen volle Bildschirmhöhe, pt-[60px] sitzt innerhalb der Panels */}
      <main className="h-full">{children}</main>
    </div>
  );
}
