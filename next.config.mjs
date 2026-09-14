/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/products',
        destination: '/digital-products',
        permanent: true,
      },
      {
        source: '/submit-request',
        destination: '/intake-form',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
