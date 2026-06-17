"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  BookOpen,
  VideoOff,
  PlayCircle,
  MousePointerClick,
  Sparkles,
  Clapperboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Tab definitions                                                     */
/* ------------------------------------------------------------------ */
const TABS = [
  { id: "history", label: "History", icon: Clock },
  { id: "about", label: "About", icon: BookOpen },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Sliding Tab Bar                                                     */
/* ------------------------------------------------------------------ */
function TabBar({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLButtonElement>(
      `[data-tab="${active}"]`,
    );
    if (!activeBtn) return;
    setIndicatorStyle({
      left: activeBtn.offsetLeft,
      width: activeBtn.offsetWidth,
    });
  }, [active]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center gap-0.5 rounded-full border border-white/7 bg-white/3 p-1"
    >
      {/* Sliding pill indicator */}
      <motion.div
        className="absolute top-1 h-[calc(100%-8px)] rounded-full bg-white/10"
        animate={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        transition={{
          type: "tween",
          duration: 0.22,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
      />

      {TABS.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          data-tab={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "relative z-10 flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm font-medium transition-colors duration-200",
            active === id ? "text-white" : "text-white/40 hover:text-white/65",
          )}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  History Tab                                                         */
/* ------------------------------------------------------------------ */
function HistoryTab() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/8">
        <VideoOff className="h-6 w-6 text-white/30" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-white/60">
          No completed generations yet
        </p>
        <p className="mt-1 text-xs text-white/30">
          Your completed videos will appear here
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  About Tab                                                           */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    number: 1,
    title: "Select Base Video",
    description:
      "The video's movement will be used to animate the reference image.",
    icon: PlayCircle,
  },
  {
    number: 2,
    title: "Add Reference Image",
    description:
      "Upload an image of a character or person to be animated by the base video.",
    icon: MousePointerClick,
  },
  {
    number: 3,
    title: "Describe Your Vision (Optional)",
    description:
      "Write a prompt that guides the background of the output video.",
    icon: Sparkles,
  },
  {
    number: 4,
    title: "Generate",
    description: "The output video will be generated in real-time for you.",
    icon: Clapperboard,
  },
] as const;

function AboutTab() {
  return (
    <div className="flex h-full flex-col overflow-y-auto dashboard-scrollbar">
      {/* Video placeholder */}
      <div className="mx-auto mt-4 w-full max-w-2xl px-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/9 bg-white/3">
          {/* Base / Output label mock */}
          <div className="absolute inset-0 flex">
            <div className="relative flex-1 border-r border-white/9">
              <span className="absolute left-3 top-3 rounded-lg border border-white/12 bg-black/40 px-2.5 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
                Base
              </span>
              <div className="flex h-full items-center justify-center text-white/12">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <div className="relative flex-1">
              <span className="absolute right-3 top-3 rounded-lg border border-white/12 bg-black/40 px-2.5 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
                Output
              </span>
              <div className="flex h-full items-center justify-center text-white/12">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* Placeholder text */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-4">
            <p className="text-xs text-white/20">
              Video placeholder – wird bald hinzugefügt
            </p>
          </div>
        </div>
      </div>

      {/* Steps grid */}
      <div className="mx-auto mt-6 w-full max-w-2xl px-6 pb-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="flex gap-4 rounded-2xl p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-xs font-bold text-white/60">
                {step.number}
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">
                  {step.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-white/40">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Right Panel                                                         */
/* ------------------------------------------------------------------ */
export function RightPanel() {
  const [active, setActive] = useState<TabId>("about");

  return (
    <div className="flex h-full flex-col gap-0">
      {/* Tab Bar Header */}
      <div className="flex shrink-0 items-center justify-center px-6 pt-5 pb-4">
        <TabBar active={active} onChange={setActive} />
      </div>

      {/* Tab Content */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {active === "history" ? <HistoryTab /> : <AboutTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
