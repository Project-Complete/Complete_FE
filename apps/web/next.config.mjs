import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'search.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'www.shinsegae-lnb.com',
      },
    ],
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  transpilePackages: ['@team-complete/complete-ui/dist'],
  sassOptions: {
    prependData: `@import "@repo/mantine-theme/_mantine.scss";`,
  },
});
