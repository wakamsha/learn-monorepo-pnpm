const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  transpilePackages: ['@learn-monorepo-pnpm/core'],
  pageExtensions: ['page.tsx'],
  // eslint-disable-next-line @typescript-eslint/require-await
  rewrites: async () => [
    {
      source: '/',
      destination: '/home',
    },
  ],
};

module.exports = nextConfig;
