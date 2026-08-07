import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";
const isGitHubPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGitHubPagesBuild ? "export" : undefined,
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: isGitHubPagesBuild,
  typescript: {
    tsconfigPath: isGitHubPagesBuild ? "tsconfig.pages.json" : "tsconfig.json",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
