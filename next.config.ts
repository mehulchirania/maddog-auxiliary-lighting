import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export keeps the demo deployable to Vercel, Firebase Hosting,
  // Netlify or any bucket without a server runtime.
  output: "export",
  images: {
    // Required by output: "export" — the CDN already serves optimised WebP.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "d32yu5nuptb5qv.cloudfront.net" },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
