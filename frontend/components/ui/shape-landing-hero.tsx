"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-linear-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/15",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

function HeroGeometric({
  title1 = "Create UGC Videos",
  title2 = "in Minutes",
}: {
  title1?: string;
  title2?: string;
}) {
  const fadeUpEase: [number, number, number, number] = [0.25, 0.4, 0.25, 1];
  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: fadeUpEase,
      },
    }),
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 via-transparent to-rose-500/5 blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-indigo-500/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto flex min-h-[calc(100vh-3.5rem)] items-center px-4 md:px-6">
        <div className="max-w-3xl mx-auto translate-y-4 text-center md:translate-y-6">
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-[1.05] mb-6 md:mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-linear-to-b from-white to-white/80">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-white/90 to-rose-300 ",
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Exclusively for ToolSuite subscribers
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="dark flex justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              <button
                type="button"
                className="inline-flex h-[52px] min-w-[280px] items-center justify-center gap-3 rounded-xl border border-white/12 bg-white px-7 shadow-[0_1px_2px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-200 hover:border-white/20 hover:bg-neutral-50 hover:shadow-[0_2px_6px_rgba(0,0,0,0.14),0_8px_20px_rgba(0,0,0,0.1)]"
              >
                <Image
                  src="/toolsuite_icon.svg"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 shrink-0"
                  aria-hidden="true"
                />
                <span className="text-base leading-none text-neutral-600">
                  Continue with{" "}
                  <span className="font-semibold text-neutral-900">
                    ToolSuite
                  </span>
                </span>
              </button>
            </motion.div>
          </motion.div>

          <motion.a
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            href="#examples"
            aria-label="Zu den Beispielvideos scrollen"
            className="mt-8 inline-flex items-center justify-center rounded-full p-2 text-white/45 transition-colors hover:text-white/75"
          >
            <motion.span
              animate={{
                opacity: [0.45, 0.85, 0.45],
                filter: [
                  "drop-shadow(0 0 0px rgba(255,255,255,0))",
                  "drop-shadow(0 0 8px rgba(255,255,255,0.28))",
                  "drop-shadow(0 0 0px rgba(255,255,255,0))",
                ],
              }}
              transition={{
                duration: 2.1,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="size-6" />
            </motion.span>
          </motion.a>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </div>
  );
}

export { HeroGeometric };
