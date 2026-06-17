import { preload } from "react-dom";
import { AppShell } from "@/components/app-shell";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  preload("/motiqai_logo.svg", { as: "image", type: "image/svg+xml" });

  return <AppShell>{children}</AppShell>;
}
