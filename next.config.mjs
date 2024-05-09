/** @type {import('next').NextConfig} */
const nextConfig = {};

// Dummmy data URL
// const API_URL = "https://b76860c2-24fd-4dae-8650-cadbdc567a5d.mock.pstmn.io";

// To work local
// const API_URL = "http://localhost:3000";


// To work in cloud
const API_URL = "https://api.stocknet.me";

export default {
  nextConfig,
  API_URL,
};