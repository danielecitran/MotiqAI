"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    id: "toolsuite",
    label: "ToolSuite Dashboard",
    iconSrc: "/dashboard.svg",
  },
  {
    id: "logout",
    label: "Log out",
    icon: LogOut,
    destructive: true,
  },
] as const;

export function DashboardHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

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

          <div ref={menuRef} className="relative z-10">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Profil: Max Mustermann"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              title="Max Mustermann"
              className={cn(
                "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#2e2e36] text-[11px] font-bold text-white/90 shadow-[0_0_0_1.5px_rgba(255,255,255,0.22)] transition-colors select-none",
                menuOpen ? "bg-[#38383f]" : "hover:bg-[#38383f]",
              )}
            >
              MM
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  role="menu"
                  aria-label="Profilmenü"
                  initial={{ opacity: 0, scale: 0.96, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -6 }}
                  transition={{
                    duration: 0.18,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute right-0 top-[calc(100%+10px)] w-56 origin-top-right overflow-hidden rounded-2xl bg-[#1a1a1f] p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
                >
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-colors",
                        "destructive" in item && item.destructive
                          ? "text-red-400 hover:bg-red-500/10 hover:text-red-300"
                          : "text-white/85 hover:bg-white/8 hover:text-white",
                      )}
                    >
                      {"iconSrc" in item ? (
                        <Image
                          src={item.iconSrc}
                          alt=""
                          width={16}
                          height={16}
                          className="h-4 w-4 shrink-0 opacity-55"
                          aria-hidden="true"
                        />
                      ) : (
                        <item.icon
                          className="h-4 w-4 shrink-0 text-red-400"
                          aria-hidden="true"
                        />
                      )}
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </header>
    </div>
  );
}
