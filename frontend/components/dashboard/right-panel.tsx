"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  { id: "history", label: "History", iconSrc: "/history.svg" },
  { id: "about", label: "About", iconSrc: "/about.svg" },
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

      {TABS.map(({ id, label, iconSrc }) => (
        <button
          key={id}
          data-tab={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            "group relative z-10 flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm font-medium transition-colors duration-200",
            active === id ? "text-white" : "text-white/40 hover:text-white/65",
          )}
        >
          <Image
            src={iconSrc}
            alt=""
            width={14}
            height={14}
            className={cn(
              "h-3.5 w-3.5 shrink-0 transition-opacity duration-200",
              active === id ? "opacity-100" : "opacity-40 group-hover:opacity-65",
            )}
            aria-hidden="true"
          />
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
        <Image
          src="/camera_off.svg"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 opacity-30"
          aria-hidden="true"
        />
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

function SplitViewDemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    void video.play().catch(() => {});

    const keepPlaying = () => {
      if (video.paused) {
        void video.play().catch(() => {});
      }
    };

    video.addEventListener("pause", keepPlaying);
    video.addEventListener("ended", keepPlaying);

    return () => {
      video.removeEventListener("pause", keepPlaying);
      video.removeEventListener("ended", keepPlaying);
    };
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/9 bg-black">
      <video
        ref={videoRef}
        src="/split-view-motion-control.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        // @ts-expect-error fetchPriority is valid on video in modern browsers
        fetchPriority="high"
        disablePictureInPicture
        controls={false}
        tabIndex={-1}
        aria-label="Motion Control Split-View Demo: Base und Output"
        onContextMenu={(event) => event.preventDefault()}
        className="pointer-events-none h-full w-full select-none object-cover"
      />

      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10"
        aria-hidden="true"
      />

      <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/85 backdrop-blur-sm">
        Base
      </span>
      <span className="absolute right-3 top-3 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium text-white/85 backdrop-blur-sm">
        Output
      </span>

      <div className="pointer-events-none absolute bottom-3 left-3 z-10">
        <Image
          src="/girl-with-katana.png"
          alt="Referenzbild Character"
          width={76}
          height={76}
          priority
          className="h-[4.25rem] w-[4.25rem] rounded-xl object-cover shadow-[0_4px_16px_rgba(0,0,0,0.45)] sm:h-[4.75rem] sm:w-[4.75rem]"
        />
      </div>
    </div>
  );
}

function AboutTab() {
  return (
    <div className="flex h-full flex-col justify-center overflow-y-auto dashboard-scrollbar">
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        <SplitViewDemoVideo />

        <div className="mt-6 px-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STEPS.map((step) => (
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
