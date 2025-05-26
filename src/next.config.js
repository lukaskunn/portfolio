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
  //   async rewrites() {
  //     return [
  //       {
  //         source: "/:path*",
  //         destination: "/:path*",
  //       },
  //       {
  //         source: "/my-stuff",
  //         destination: "https://personal-stuff.vercel.app/my-stuff",
  //       },
  //       {
  //         source: "/my-stuff/:path*",
  //         destination: "https://personal-stuff.vercel.app/my-stuff/:path*",
  //       }
  //     ];
  //   },
};

export default nextConfig;
