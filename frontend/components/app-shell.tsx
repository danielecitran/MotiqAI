import type { ReactNode } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
