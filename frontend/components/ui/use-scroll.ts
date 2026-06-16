"use client";
import React from "react";

export function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(
    () => typeof window !== "undefined" && window.scrollY > threshold,
  );

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return scrolled;
}
