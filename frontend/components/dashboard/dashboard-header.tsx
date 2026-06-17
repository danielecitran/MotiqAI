"use client";

import Image from "next/image";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <div className="dark absolute inset-x-0 top-0 z-50 px-4 pt-3 pb-0">
      <header className="mx-auto max-w-4xl overflow-visible">
        <nav className="relative flex h-12 w-full items-center justify-between rounded-full border border-white/15 bg-background/50 pl-3 pr-[7px] shadow shadow-black/25 backdrop-blur-lg after:absolute after:inset-0 after:rounded-full after:p-px after:pointer-events-none after:bg-[linear-gradient(115deg,rgba(255,255,255,0.18),rgba(226,232,240,0.06),rgba(255,255,255,0.16))] after:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] after:mask-exclude">
          <Link href="/" aria-label="Zur Startseite">
            <Image
              src="/motiqai_logo.svg"
              alt="MotiqAI Logo"
              width={120}
              height={28}
              className="h-6 w-auto"
              priority
            />
          </Link>

          <div
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#2e2e36] text-[11px] font-bold text-white/90 shadow-[0_0_0_1.5px_rgba(255,255,255,0.18)] transition-colors hover:bg-[#38383f] select-none"
            aria-label="Profil: Max Mustermann"
            title="Max Mustermann"
          >
            MM
          </div>
        </nav>
      </header>
    </div>
  );
}
