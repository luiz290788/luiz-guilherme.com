const _ = require(`lodash`);
const path = require('path');
const typescriptConfig = require('./tsconfig.json');

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Luiz Guilherme D'Abruzzo Pereira",
    headline: 'Software developer',
    social: [
      {
        title: 'LinkedIn',
        url: 'https://www.linkedin.com/in/luiz290788/',
      },
      {
        title: 'Github',
        url: 'https://github.com/luiz290788/',
      },
      {
        title: 'Twitter',
        url: 'https://twitter.com/l2zg7e/',
      },
    ],
    homeLink: true,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-162139094-2',
        head: true,
        exclude: ['/preview/**', '/do-not-track/me/too/'],
        pageTransitionDelay: 0,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Open Sans Regular:400'],
        },
      },
    },
    { resolve: 'gatsby-plugin-typescript', options: typescriptConfig },
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'personal-information',
        path: `${__dirname}/src/personal-info`,
      },
    },
    {
      resolve: 'gatsby-transformer-yaml',
      options: {
        typeName: ({ node, object, isArray }) => {
          if (node.internal.type !== `File`) {
            return _.upperFirst(_.camelCase(`${node.internal.type}`));
          } else if (isArray || node.name.toLowerCase() === 'meta') {
            return _.upperFirst(_.camelCase(`${node.name}`));
          } else {
            return _.upperFirst(_.camelCase(`${path.basename(node.dir)}`));
          }
        },
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          {
            resolve: 'gatsby-remark-custom-blocks',
            options: {
              blocks: {
                info: {
                  classes: "info"
                }
              }
            }
          }
        ]
      }
    },
    'gatsby-plugin-react-helmet',
  ],
};
