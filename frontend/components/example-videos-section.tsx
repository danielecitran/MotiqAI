"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUpEase: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: i * 0.15,
      ease: fadeUpEase,
    },
  }),
};

function AutoplayVideo({
  src,
  className,
  label,
  eager = false,
}: {
  src: string;
  className?: string;
  label: string;
  eager?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(eager);

  useEffect(() => {
    if (eager) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [eager]);

  useEffect(() => {
    if (!isReady) return;

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
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full bg-white/4", className)}
    >
      {isReady ? (
        <video
          ref={videoRef}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          // @ts-expect-error fetchPriority is valid on video in modern browsers
          fetchPriority={eager ? "high" : "low"}
          disablePictureInPicture
          controls={false}
          tabIndex={-1}
          aria-label={label}
          onContextMenu={(event) => event.preventDefault()}
          className="pointer-events-none h-full w-full select-none object-cover"
        />
      ) : null}
    </div>
  );
}

interface VideoShowcaseProps {
  src: string;
  label: string;
  aspectClass: string;
  maxWidthClass: string;
  glowClass: string;
  index: number;
}

function VideoShowcase({
  src,
  label,
  aspectClass,
  maxWidthClass,
  glowClass,
  index,
}: VideoShowcaseProps) {
  return (
    <motion.li
      custom={index}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={cn("list-none", maxWidthClass)}
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-6 rounded-[2rem] opacity-70 blur-3xl md:-inset-10 md:rounded-[2.5rem]",
            glowClass,
          )}
        />

        <div
          className={cn(
            "relative overflow-hidden rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.75)] ring-1 ring-white/6 md:rounded-3xl",
            aspectClass,
          )}
        >
          <AutoplayVideo src={src} label={label} />
        </div>
      </div>
    </motion.li>
  );
}

export function ExampleVideosSection() {
  return (
    <section
      id="examples"
      className="dark relative scroll-mt-24 overflow-hidden bg-[#030303] pt-16 pb-28 md:scroll-mt-28 md:pt-24 md:pb-40"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#030303] via-indigo-500/4 to-[#030303]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6">
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-20"
        >
          <p className="mb-3 text-xs font-medium tracking-[0.22em] text-white/35 uppercase md:text-sm">
            Examples
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            See what&apos;s possible
          </h2>
          <p className="text-base leading-relaxed text-white/50 md:text-lg">
            Record yourself once and MotiqAI replaces you with any persona or
            character. Real outputs, no editing required.
          </p>
        </motion.div>

        <ul className="mx-auto flex max-w-3xl flex-col items-center gap-16 md:gap-24">
          <VideoShowcase
            src="/motiqai_example1.mp4"
            label="Portrait UGC example"
            aspectClass="aspect-9/16 w-full"
            maxWidthClass="w-full max-w-[15rem] sm:max-w-[17rem]"
            glowClass="bg-indigo-400/12"
            index={1}
          />
          <VideoShowcase
            src="/motiqai_example2.mp4"
            label="Landscape UGC example"
            aspectClass="aspect-video w-full"
            maxWidthClass="w-full"
            glowClass="bg-rose-400/10"
            index={2}
          />
        </ul>
      </div>
    </section>
  );
}
