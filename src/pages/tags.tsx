import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

interface TagsData {
  allMdx: {
    nodes: {
      frontmatter: {
        tags: string[];
      };
      internal: {
        contentFilePath: string;
      };
    }[];
  };
}

const TagsPage: React.FC<PageProps<TagsData>> = ({ data }) => {
  const { t } = useTranslation();
  const { language } = useI18next();

  const langPosts = data.allMdx.nodes.filter((node) =>
    node.internal.contentFilePath.includes(`/content/${language}/`)
  );

  // Count tags
  const tagCount: Record<string, number> = {};
  langPosts.forEach((node) => {
    node.frontmatter.tags?.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return (
    <Layout>
      <div style={{ maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
        <h1>{t("allTags")}</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--space-md)",
            marginTop: "var(--space-xl)",
          }}
        >
          {Object.entries(tagCount)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([tag, count]) => {
              const slug = tag.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  key={tag}
                  to={`/${language}/tags/${slug}/`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--space-sm)",
                    padding: "var(--space-sm) var(--space-md)",
                    backgroundColor: "var(--color-tag-bg)",
                    color: "var(--color-tag-text)",
                    borderRadius: "var(--radius-md)",
                    fontSize: "0.9rem",
                    textDecoration: "none",
                    transition: "background-color 0.2s",
                  }}
                >
                  #{tag}
                  <span
                    style={{
                      fontSize: "0.8rem",
                      backgroundColor: "var(--color-bg)",
                      padding: "0 0.4rem",
                      borderRadius: "10px",
                    }}
                  >
                    {count}
                  </span>
                </Link>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default TagsPage;

export const Head = () => <SEO title="Tags" />;

export const query = graphql`
  query TagsPage($language: String!) {
    allMdx {
      nodes {
        frontmatter {
          tags
        }
        internal {
          contentFilePath
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
