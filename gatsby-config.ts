import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Wiggleji's Blog`,
    siteUrl: `https://wiggleji.github.io`,
    description: `A bilingual tech blog`,
    author: `wiggleji`,
  },
  plugins: [
    // Source: blog content (EN)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog-en`,
        path: `${__dirname}/content/en`,
      },
    },
    // Source: blog content (KO)
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog-ko`,
        path: `${__dirname}/content/ko`,
      },
    },
    // Source: i18n locale files
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locale`,
        path: `${__dirname}/locales`,
      },
    },
    // Source: images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    // MDX with remark sub-plugins
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: 100,
              icon: false,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    // Image processing
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // i18n
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`,
        languages: [`en`, `ko`],
        defaultLanguage: `en`,
        siteUrl: `https://wiggleji.github.io`,
        i18nextOptions: {
          fallbackLng: `en`,
          interpolation: {
            escapeValue: false,
          },
        },
      },
    },
    // Google Analytics (GA4)
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-XXXXXXXXXX"], // TODO: Replace with your GA4 measurement ID
        pluginConfig: {
          head: true,
        },
      },
    },
  ],
};

export default config;
