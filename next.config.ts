import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  sassOptions: {
    implementation: 'sass-embedded',
    // Lets any .scss do `@use "references" as *` — the `@/` alias is
    // webpack/TS-side only and does not resolve inside Sass.
    loadPaths: [path.join(process.cwd(), 'src/styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dpk0cuwnf/**',
      },
    ],
  },
  // Portuguese is the primary locale; both locales are prefixed, so `/` has no
  // page of its own.
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pt',
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', 'react-icons'],
  }
};

export default nextConfig;
