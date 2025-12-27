/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
        basePath: false,
      },
    ];
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
      })
    );
    return config;
  },
  experimental: {
    optimizePackageImports: ['gsap', 'framer-motion', 'react-icons'],
  }
};

export default nextConfig;
