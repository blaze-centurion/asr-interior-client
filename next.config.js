/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'www.ulcdn.net', 'storage.googleapis.com'],
  },
}

module.exports = nextConfig
