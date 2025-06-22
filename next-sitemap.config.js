/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://capricare.kinsta.cloud',
  generateRobotsTxt: true,
exclude: [
    '/sitemap-blog-posts.xml',
    '/sitemap-clinical-studies.xml',
    '/sitemap-products.xml',
  ],
  robotsTxtOptions: {
    additionalSitemaps: ['https://capricare.kinsta.cloud/sitemap-blog-posts.xml',
      'https://capricare.kinsta.cloud/sitemap-clinical-studies.xml',
      'https://capricare.kinsta.cloud/sitemap-products.xml',
    ],
    policies: [
      {
        userAgent: '*',
        disallow: '/_next',
      },
    ],
  },
};

module.exports = config;
