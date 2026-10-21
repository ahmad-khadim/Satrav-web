import type { NextConfig } from "next";

// Sur GitHub Pages, le site est servi depuis /Satrav-web et doit être exporté en fichiers statiques.
const surGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(surGithubPages && {
    output: "export",
    basePath: "/Satrav-web",
    images: { unoptimized: true },
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
