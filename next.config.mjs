/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    implementation: 'sass-embedded',
  },
  compilerOptions: {
    baseUrl: './',
    paths: {
      '@/*': ['./src/*'],
    },
  }
};

export default nextConfig;
