/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@team-complete/complete-ui/dist'],
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/i,
  //     use: ['@svgr/webpack'],
  //   });
  //   return config;
  // },
  // experimental: {
  //   turbo: {
  //     rules: {
  //       '*.svg': {
  //         loaders: ['@svgr/webpack'],
  //         as: '*.js',
  //       },
  //     },
  //   },
  // },
  // experimental: {
  //   turbo: {
  //     loaders: {
  //       '.svg': ['@svgr/webpack'],
  //     },
  //     rules: {
  //       '*.someother': ['@svgr/webpack'],
  //     },
  //   },
  // },
};
