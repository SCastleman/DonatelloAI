/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
// Weird error with vercel prevents this from building there, though it succeeds locally. Seems to be a package issue: https://github.com/vercel/next.js/issues/36019
typescript: {
    ignoreBuildErrors: true
}
