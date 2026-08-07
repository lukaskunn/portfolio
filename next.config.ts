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
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/home',
  //       permanent: true,
  //       basePath: false,
  //     },
  //   ];
  // },
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', 'react-icons'],
  }
};

export default nextConfig;
