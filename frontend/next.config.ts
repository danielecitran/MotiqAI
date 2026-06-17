import type { NextConfig } from "next";

const staticAssetCache = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*.mp4",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.webm",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.svg",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.png",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.jpg",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
      {
        source: "/:path*.webp",
        headers: [{ key: "Cache-Control", value: staticAssetCache }],
      },
    ];
  },
};

export default nextConfig;
