const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
});

module.exports = {
  env: {
    PRESALE_CONTRACT_ADDRESS: process.env.PRESALE_CONTRACT_ADDRESS,
    TOKEN_ADDRESS: process.env.TOKEN_ADDRESS
  },
}
