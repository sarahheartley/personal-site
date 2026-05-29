import type { NextConfig } from "next";

/**
 * For GitHub Pages project sites, set NEXT_PUBLIC_BASE_PATH to your repo name
 * (e.g. "personal-portfolio" → https://username.github.io/personal-portfolio/).
 * Leave unset for user/organization sites (username.github.io).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(basePath && {
    basePath,
    assetPrefix: `${basePath}/`,
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
