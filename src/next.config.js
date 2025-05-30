/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    optimizeCss: true,
  },
  transpilePackages: [
    "gsap",
    "gsap/all",
    "gsap/SplitText",
    "gsap/ScrollTrigger",
  ],
};

export default nextConfig;
