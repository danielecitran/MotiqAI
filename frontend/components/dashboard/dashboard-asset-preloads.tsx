import { preload } from "react-dom";

const DASHBOARD_ASSETS = [
  { href: "/split-view-motion-control.mp4", as: "video", type: "video/mp4" },
  { href: "/girl-with-katana.png", as: "image", type: "image/png" },
  { href: "/motiqai_logo.svg", as: "image", type: "image/svg+xml" },
  { href: "/doodle.svg", as: "image", type: "image/svg+xml" },
  { href: "/video-camera.svg", as: "image", type: "image/svg+xml" },
  { href: "/character_image.svg", as: "image", type: "image/svg+xml" },
  { href: "/sparkle_white.svg", as: "image", type: "image/svg+xml" },
  { href: "/history.svg", as: "image", type: "image/svg+xml" },
  { href: "/about.svg", as: "image", type: "image/svg+xml" },
  { href: "/dashboard.svg", as: "image", type: "image/svg+xml" },
  { href: "/camera_off.svg", as: "image", type: "image/svg+xml" },
] as const;

export function DashboardAssetPreloads() {
  for (const asset of DASHBOARD_ASSETS) {
    preload(asset.href, { as: asset.as, type: asset.type });
  }

  return null;
}
