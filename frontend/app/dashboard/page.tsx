"use client";

import { LeftPanel } from "@/components/dashboard/left-panel";
import { RightPanel } from "@/components/dashboard/right-panel";

export default function DashboardPage() {
  return (
    <div className="flex h-full gap-0">
      {/* Left panel – full height so bg covers area behind floating header */}
      <aside className="flex h-full w-[340px] shrink-0 flex-col border-r border-white/7 bg-[#0e0e0e] pt-[60px] lg:w-[360px]">
        <LeftPanel />
      </aside>

      {/* Right panel – takes remaining space */}
      <section className="flex h-full flex-1 flex-col overflow-hidden pt-[60px]">
        <RightPanel />
      </section>
    </div>
  );
}
