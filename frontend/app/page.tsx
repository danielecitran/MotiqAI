"use client";

import { motion } from "framer-motion";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { GlowingEffectFeatures } from "@/components/glowing-effect-featutes";
import { BGPattern } from "@/components/bg-pattern";
import { useAuth } from "@/lib/auth-context";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="bg-[#030303]">
      <HeroGeometric />
      {!isAuthenticated && (
        <>
          <section
            id="features"
            className="dark mx-auto w-full max-w-6xl scroll-mt-24 px-4 pb-20 md:scroll-mt-28 md:px-6"
          >
            <GlowingEffectFeatures />
          </section>
          <section
            id="about"
            className="dark relative w-full min-h-88 scroll-mt-32 overflow-hidden pb-24 md:scroll-mt-36"
          >
            <div className="relative min-h-88">
              <BGPattern
                variant="grid"
                mask="fade-edges"
                fill="rgba(229,231,235,0.16)"
                className="z-0"
              />
              <div className="relative z-10 mx-auto flex min-h-88 w-full max-w-6xl items-center justify-center px-4 md:px-6">
                <div className="max-w-2xl text-center">
                  <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                    About
                  </h2>
                  <p className="text-base leading-relaxed text-white/70 md:text-lg">
                    Access to all tools you need in one subscription with
                    ToolSuite
                  </p>
                  <div className="relative mt-8 inline-flex">
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-0.5 rounded-full bg-sky-300/25 blur-md"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.a
                      href="https://whop.com/toolsuite/buy-vip/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-flex h-12 items-center justify-center rounded-full bg-linear-to-r from-sky-50 via-blue-50 to-sky-100 px-8 text-base font-semibold tracking-wide text-black shadow-[0_0_18px_rgba(125,211,252,0.22)] transition-[filter,box-shadow] duration-300 hover:brightness-[1.03] hover:shadow-[0_0_22px_rgba(125,211,252,0.28)]"
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 500, damping: 28 }}
                    >
                      Get VIP Access
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
