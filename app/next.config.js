/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  publicRuntimeConfig: {
    LOCAL_API_URL: process.env.LOCAL_API_URL
  }
};

module.exports = nextConfig;
