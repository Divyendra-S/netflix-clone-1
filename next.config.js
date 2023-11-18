/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
    // images: {
    //     domains: ["image.tmdb.org"],
    //   },
}

module.exports = nextConfig
