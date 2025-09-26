/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk']
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    POSTGRES_URL: process.env.POSTGRES_URL,
    NOTION_TOKEN: process.env.NOTION_TOKEN,
    NOTION_DATABASE_ID: process.env.NOTION_DATABASE_ID,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  },
  images: {
    domains: ['avatar.vercel.sh'],
  },
}

module.exports = nextConfig