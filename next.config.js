/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        TILES_TOKEN: process.env.TILES_TOKEN,
    }
}

module.exports = nextConfig