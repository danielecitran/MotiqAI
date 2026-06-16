"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const PENDING_SHORTEN_URL_KEY = "shortr.shorten.pendingUrl";

type ShortenUrlModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ShortenUrlModal({ isOpen, onClose }: ShortenUrlModalProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;
    const pendingUrl = sessionStorage.getItem(PENDING_SHORTEN_URL_KEY);
    if (!pendingUrl) return;

    sessionStorage.removeItem(PENDING_SHORTEN_URL_KEY);
    const frameId = requestAnimationFrame(() => {
      setUrl(pendingUrl);
    });

    return () => cancelAnimationFrame(frameId);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setError("Bitte gib eine URL ein.");
      return;
    }

    try {
      const parsed = new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
      if (!["http:", "https:"].includes(parsed.protocol)) {
        setError("Nur HTTP- und HTTPS-URLs werden unterstützt.");
        return;
      }

      if (!isAuthenticated) {
        sessionStorage.setItem(PENDING_SHORTEN_URL_KEY, parsed.toString());
        router.push("/anmelden");
        onClose();
        return;
      }

      setError("URL-Kürzung ist noch nicht angebunden. Backend folgt.");
    } catch {
      setError("Bitte gib eine gültige URL ein.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shorten-url-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Dialog schliessen"
      />
      <div
        className={cn(
          "relative w-full max-w-lg rounded-2xl border border-white/12",
          "bg-[#0d0d0d]/95 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl",
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Schliessen"
        >
          <X className="size-5" />
        </button>

        <h2
          id="shorten-url-title"
          className="text-xl font-bold tracking-tight text-white"
        >
          URL kürzen
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Füge deine lange URL ein und erhalte einen kurzen Link.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="long-url" className="sr-only">
              Lange URL
            </label>
            <input
              id="long-url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://beispiel.ch/sehr/langer/link"
              className={cn(
                "w-full rounded-xl border border-white/12 bg-white/5 px-4 py-3",
                "text-sm text-white placeholder:text-white/35",
                "outline-none transition-colors focus:border-white/25 focus:ring-2 focus:ring-indigo-400/30",
              )}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-rose-400" role="alert">
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={onClose}
            >
              Abbrechen
            </Button>
            <Button type="submit" className="flex-1">
              {isAuthenticated ? "Kürzen" : "Weiter zur Anmeldung"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
