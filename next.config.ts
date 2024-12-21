import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'i.imgur.com',
  //       port: '',
  //       // pathname: '/account123/**',
  //       search: '',
  //     },
  //   ],
  // },

  images: {
    domains: [
      'res.cloudinary.com',
      // Add other image domains you need to support
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        // pathname: '/account123/**',
        search: '',
      },
    ],
  },
};

// module.exports = nextConfig;

export default nextConfig;
