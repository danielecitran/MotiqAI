"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film,
  ImageIcon,
  Sparkles,
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
    /* Outer shell: gradient background acts as the border ring */
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
      {/* Inner card */}
      <div
        className={cn(
          "flex min-h-[148px] flex-col items-center justify-center gap-4 rounded-[1.2rem] px-5 py-8 transition-colors duration-200",
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
          <>
            <div className="text-white/25 transition-colors duration-200 group-hover:text-white/55">
              {icon}
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-white/85">{label}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/35">
                {sublabel}
              </p>
            </div>
          </>
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
            icon={<Film className="h-5 w-5" />}
            accept="video/*"
            onFile={setMotionVideo}
            file={motionVideo}
            onClear={() => setMotionVideo(null)}
          />

          <Dropzone
            label="Character Image"
            sublabel="Character image to replace the motion"
            icon={<ImageIcon className="h-5 w-5" />}
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
            "relative flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-sm font-semibold tracking-wide transition-all duration-200",
            motionVideo && characterImage
              ? "bg-linear-to-r from-indigo-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_28px_rgba(99,102,241,0.48)]"
              : "cursor-not-allowed bg-white/6 text-white/30",
          )}
        >
          <Sparkles className="h-4 w-4" />
          Generate Video
        </motion.button>
      </div>
    </div>
  );
}
