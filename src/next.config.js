/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
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
