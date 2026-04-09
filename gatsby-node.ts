import type { GatsbyNode } from "gatsby";
import path from "path";

interface MdxNode {
  id: string;
  frontmatter: {
    title: string;
    slug: string;
    date: string;
    category: string;
    tags: string[];
    description: string;
  };
  internal: {
    contentFilePath: string;
  };
}

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`);
  const tagTemplate = path.resolve(`./src/templates/tag.tsx`);
  const categoryTemplate = path.resolve(`./src/templates/category.tsx`);

  const result = await graphql<{ allMdx: { nodes: MdxNode[] } }>(`
    query {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
          id
          frontmatter {
            title
            slug
            date
            category
            tags
            description
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
    return;
  }

  const posts = result.data!.allMdx.nodes;

  // Track all tags and categories per language
  const tagsByLang: Record<string, Set<string>> = { en: new Set(), ko: new Set() };
  const categoriesByLang: Record<string, Set<string>> = { en: new Set(), ko: new Set() };

  // Create individual blog post pages
  posts.forEach((node) => {
    const lang = node.internal.contentFilePath.includes("/content/ko/") ? "ko" : "en";
    const slug = node.frontmatter.slug;

    // Collect tags and categories
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach((tag) => tagsByLang[lang].add(tag));
    }
    if (node.frontmatter.category) {
      categoriesByLang[lang].add(node.frontmatter.category);
    }

    createPage({
      path: `/${lang}/blog/${slug}/`,
      component: `${blogPostTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
        language: lang,
        slug: slug,
      },
    });
  });

  // Create tag pages for each language
  for (const lang of ["en", "ko"]) {
    tagsByLang[lang].forEach((tag) => {
      const tagSlug = tag.toLowerCase().replace(/\s+/g, "-");
      createPage({
        path: `/${lang}/tags/${tagSlug}/`,
        component: tagTemplate,
        context: {
          tag: tag,
          language: lang,
        },
      });
    });

    // Create category pages for each language
    categoriesByLang[lang].forEach((category) => {
      const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
      createPage({
        path: `/${lang}/categories/${categorySlug}/`,
        component: categoryTemplate,
        context: {
          category: category,
          language: lang,
        },
      });
    });
  }
};

// Add a `lang` field to each MDX node based on its file path
export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
}) => {
  const { createNodeField } = actions;
  if (node.internal.type === "Mdx") {
    const filePath = node.internal.contentFilePath || "";
    const lang = filePath.includes("/content/ko/") ? "ko" : "en";
    createNodeField({
      node,
      name: "lang",
      value: lang,
    });
  }
};

// Create schema customization to ensure frontmatter fields have correct types
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
  actions,
}) => {
  const { createTypes } = actions;
  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: MdxFields
    }
    type MdxFields {
      lang: String
    }
    type Frontmatter {
      title: String!
      slug: String!
      date: Date! @dateformat
      category: String!
      tags: [String!]!
      description: String
    }
  `);
};
