/** @type {import('next').NextConfig} */

let withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // Always static HTML export for Cloudflare Pages / any static host.
  // Dev-only file-write tooling lives outside the App Router (see scripts/dev-schematic-api.mjs).
  output: 'export',
};

module.exports = withBundleAnalyzer(nextConfig);
