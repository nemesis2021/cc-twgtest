/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out', // Optional: explicitly set output directory
  trailingSlash: true,


images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'capricare.kinsta.cloud',
        // port: '',
        // pathname: '/**',
      },
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: '@svgr/webpack',
        options: {
          svgoConfig: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
            ],
          },
        },
      },
    });

    config.module.rules.push({
      test: /\.glsl/,
      type: 'asset/source',
    });

    return config;
  },
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true,
// });

// module.exports = withBundleAnalyzer(nextConfig);

module.exports = nextConfig;
