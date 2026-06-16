"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export function Footer() {
  const { isAuthenticated } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="dark w-full border-t border-white/10 bg-[#050505] px-4 pt-14 pb-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <Link href="/#top" aria-label="Zur Startseite nach oben">
          <Image
            src="/motiqai_logo.svg"
            alt="MotiqAI Logo"
            width={124}
            height={28}
            className="h-7 w-auto"
          />
        </Link>

        {!isAuthenticated && (
          <nav className="mt-9 flex flex-col items-center gap-3 text-sm font-semibold tracking-[0.08em] uppercase text-white/78">
            <Link href="/#features" className="transition-colors hover:text-white">
              Features
            </Link>
            <Link href="/#about" className="transition-colors hover:text-white">
              About
            </Link>
          </nav>
        )}

        <p className="mt-8 text-xs text-white/45">
          © {year} ToolSuite LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
