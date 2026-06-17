"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Dropzone                                                            */
/* ------------------------------------------------------------------ */
interface DropzoneProps {
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  accept: string;
  onFile: (f: File) => void;
  file: File | null;
  onClear: () => void;
}

function Dropzone({
  label,
  sublabel,
  icon,
  accept,
  onFile,
  file,
  onClear,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) onFile(dropped);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${label} hochladen`}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "group relative cursor-pointer rounded-[1.25rem] p-px transition-all duration-200",
        dragging
          ? "bg-indigo-400/50 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]"
          : "bg-[linear-gradient(160deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.06)_50%,rgba(255,255,255,0.14)_100%)] hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.38)_0%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.2)_100%)]",
      )}
    >
      <div
        className={cn(
          "flex min-h-[148px] flex-col items-center justify-center rounded-[1.2rem] px-5 py-8 transition-colors duration-300 ease-out",
          dragging
            ? "bg-indigo-500/8"
            : "bg-[#111113] group-hover:bg-[#131315]",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onFile(f);
          }}
        />

        {file ? (
          <div className="flex w-full flex-col items-center gap-2.5">
            <Upload className="h-5 w-5 text-white/50" />
            <p className="max-w-full truncate text-center text-sm font-semibold text-white/80">
              {file.name}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
              aria-label="Datei entfernen"
            >
              <X className="h-3 w-3" /> Entfernen
            </button>
          </div>
        ) : (
          <div className="relative w-full min-h-[72px]">
            <div
              className={cn(
                "flex flex-col items-center gap-4 text-center",
                "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]",
                dragging
                  ? "pointer-events-none translate-y-[-2px] scale-[0.99] opacity-0 delay-0"
                  : "translate-y-0 scale-100 opacity-100 delay-100 group-hover:translate-y-[-2px] group-hover:scale-[0.99] group-hover:opacity-0 group-hover:delay-0",
              )}
            >
              <div className="text-white/25 transition-colors duration-500 group-hover:text-white/15">
                {icon}
              </div>
              <div>
                <p className="text-sm font-bold text-white/85">{label}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/35">
                  {sublabel}
                </p>
              </div>
            </div>

            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center gap-3 text-center",
                "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]",
                dragging
                  ? "translate-y-0 scale-100 opacity-100 delay-75"
                  : "pointer-events-none translate-y-[2px] scale-[0.99] opacity-0 delay-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-hover:delay-75",
              )}
            >
              <Upload className="h-5 w-5 text-white/85" strokeWidth={1.75} />
              <div>
                <p className="text-sm font-bold text-white">Upload</p>
                <p className="mt-1 text-xs text-white/45">Choose a file</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Left Panel                                                          */
/* ------------------------------------------------------------------ */
export function LeftPanel() {
  const [motionVideo, setMotionVideo] = useState<File | null>(null);
  const [characterImage, setCharacterImage] = useState<File | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  return (
    <div className="flex h-full flex-col">
      {/* Title */}
      <div className="shrink-0 px-5 pt-5 pb-4">
        <div className="flex items-center gap-2.5">
          <Image
            src="/doodle.svg"
            alt=""
            width={22}
            height={22}
            className="h-5 w-5 opacity-80"
            aria-hidden="true"
          />
          <div>
            <h1 className="text-sm font-semibold leading-none text-white">
              MotiqAI Motion Control
            </h1>
            <p className="mt-0.5 text-[11px] leading-none text-white/40">
              Generate UGC videos with motion guidance
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable content area */}
      <div
        className={cn(
          "flex-1 px-5 pb-4",
          advancedOpen
            ? "overflow-y-auto dashboard-scrollbar"
            : "overflow-hidden",
        )}
      >
        <div className="flex flex-col gap-3">
          <Dropzone
            label="Motion Video (Base)"
            sublabel="Used as motion reference (3–30s)"
            icon={
              <Image
                src="/video-camera.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 opacity-45"
                aria-hidden="true"
              />
            }
            accept="video/*"
            onFile={setMotionVideo}
            file={motionVideo}
            onClear={() => setMotionVideo(null)}
          />

          <Dropzone
            label="Character Image"
            sublabel="Character image to replace the motion"
            icon={
              <Image
                src="/character_image.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 opacity-45"
                aria-hidden="true"
              />
            }
            accept="image/*"
            onFile={setCharacterImage}
            file={characterImage}
            onClear={() => setCharacterImage(null)}
          />

          {/* Advanced Settings */}
          <div>
            <button
              type="button"
              onClick={() => setAdvancedOpen((v) => !v)}
              className="group/adv flex w-full cursor-pointer items-center justify-between px-1 py-2 text-left"
              aria-expanded={advancedOpen}
            >
              <span className="text-sm font-semibold text-white/60 transition-colors duration-150 group-hover/adv:text-white">
                Advanced Settings
              </span>
              <motion.span
                animate={{ rotate: advancedOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <ChevronDown className="h-4 w-4 text-white/40 transition-colors duration-150 group-hover/adv:text-white" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {advancedOpen && (
                <motion.div
                  key="advanced"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-1 pb-2 pt-1">
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="guiding-prompt"
                        className="text-sm font-semibold text-white/80"
                      >
                        Guiding Prompt
                      </label>
                      <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[11px] font-medium text-indigo-300">
                        Optional
                      </span>
                    </div>
                    <textarea
                      id="guiding-prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={5}
                      placeholder="Describe the background details or leave blank to use the image's background. Motion is controlled by the source video."
                      className="w-full resize-none rounded-xl border border-white/8 bg-[#111113] px-3.5 py-3 text-sm text-white/70 placeholder-white/25 outline-none transition-colors focus:border-indigo-400/40 focus:text-white/90"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Generate Button – always at the bottom */}
      <div className="shrink-0 px-5 pb-5 pt-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.015 }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          disabled={!motionVideo || !characterImage}
          className={cn(
            "relative flex w-full items-center justify-center gap-1.5 rounded-full py-3.5 text-sm font-semibold tracking-wide transition-all duration-200",
            motionVideo && characterImage
              ? "bg-linear-to-r from-indigo-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_28px_rgba(99,102,241,0.48)]"
              : "cursor-not-allowed bg-white/6 text-white/30",
          )}
        >
          <Image
            src="/sparkle_white.svg"
            alt=""
            width={16}
            height={16}
            className={cn(
              "h-4 w-4 shrink-0",
              motionVideo && characterImage ? "opacity-100" : "opacity-30",
            )}
            aria-hidden="true"
          />
          Generate Video
        </motion.button>
      </div>
    </div>
  );
}
