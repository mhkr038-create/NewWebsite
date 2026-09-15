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
      {
        source: '/free-school-software',
        destination: '/free-school-management-software',
        permanent: true,
      },
      {
        source: '/school-software',
        destination: '/free-school-management-software',
        permanent: true,
      },
      {
        source: '/free-school-erp',
        destination: '/free-school-management-software',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
