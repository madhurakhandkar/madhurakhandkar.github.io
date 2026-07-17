/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export is only needed for the production build that gets deployed
  // to GitHub Pages. Skipping it in dev avoids a Next.js dev-server bug where
  // the file-based icon route 500s when "output: export" is set.
  ...(process.env.NODE_ENV === "production" ? { output: "export" } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
