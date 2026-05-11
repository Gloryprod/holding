import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
    domains: ['images.unsplash.com'], // Replace with your external image domains
  },
};

export default nextConfig;
