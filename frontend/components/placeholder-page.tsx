import Link from "next/link";
import { Button } from "@/components/ui/button";

type PlaceholderPageProps = {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function PlaceholderPage({
  title,
  description,
  backHref = "/",
  backLabel = "Zur Startseite",
  actionHref,
  actionLabel,
}: PlaceholderPageProps) {
  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-[#030303] px-4 py-16">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0b0b0f] p-8 text-center shadow-2xl shadow-black/40">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/60 md:text-base">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="outline" className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link href={backHref}>{backLabel}</Link>
          </Button>
          {actionHref && actionLabel && (
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
