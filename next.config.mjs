/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
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
  }
};

export default nextConfig;
