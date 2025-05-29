/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  transpilePackages: [
    "gsap",
    "gsap/all",
    "gsap/SplitText",
    "gsap/ScrollTrigger",
  ],
};

export default nextConfig;
