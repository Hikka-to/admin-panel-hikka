const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true
  }
};

module.exports = withNextIntl(nextConfig);