// next.config.js or next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // You can add other Next.js configuration options here, such as:
  reactStrictMode: true,
  swcMinify: true,

  // Define environment variables that will be available in both the server and client
  env: {
    API_URL: "https://api.stocknet.me", // Production URL
  },

  // Other configurations can go here, such as with webpack, headers, redirects, etc.
};

export default nextConfig;
