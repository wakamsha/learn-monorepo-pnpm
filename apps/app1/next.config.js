const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  transpilePackages: ['@learn-monorepo-pnpm/core'],
  pageExtensions: ['page.tsx'],
  rewrites: async () => [
    {
      source: '/',
      destination: '/home',
    },
  ],
};

export default nextConfig;
