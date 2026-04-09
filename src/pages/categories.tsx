import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import SEO from "../components/SEO";
import * as layoutStyles from "../styles/layout.module.css";

interface CategoriesData {
  allMdx: {
    nodes: {
      frontmatter: {
        category: string;
      };
    }[];
  };
}

const CategoriesPage: React.FC<PageProps<CategoriesData>> = ({ data }) => {
  const { t } = useTranslation();
  const { language } = useI18next();

  const categoryCount: Record<string, number> = {};
  data.allMdx.nodes.forEach((node) => {
    const cat = node.frontmatter.category;
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  return (
    <Layout>
      <div className={layoutStyles.listLayout}>
        <Sidebar />
        <div>
          <h1>{t("allCategories")}</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "var(--space-md)",
              marginTop: "var(--space-xl)",
            }}
          >
            {Object.entries(categoryCount)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([category, count]) => {
                const slug = category.toLowerCase().replace(/\s+/g, "-");
                return (
                  <Link
                    key={category}
                    to={`/${language}/categories/${slug}/`}
                    style={{
                      display: "block",
                      padding: "var(--space-lg)",
                      backgroundColor: "var(--color-bg-alt)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-border)",
                      textDecoration: "none",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--color-heading)",
                        marginBottom: "var(--space-sm)",
                      }}
                    >
                      {category}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                      {count} {count === 1 ? "post" : "posts"}
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;

export const Head = () => <SEO title="Categories" />;

export const query = graphql`
  query CategoriesPage($language: String!) {
    allMdx(filter: { fields: { lang: { eq: $language } } }) {
      nodes {
        frontmatter {
          category
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
