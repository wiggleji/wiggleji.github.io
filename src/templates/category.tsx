import React from "react";
import { graphql, PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import SEO from "../components/SEO";

interface CategoryPageData {
  allMdx: {
    nodes: {
      id: string;
      frontmatter: {
        title: string;
        slug: string;
        date: string;
        category: string;
        tags: string[];
        description: string;
      };
      excerpt: string;
    }[];
  };
}

interface CategoryPageContext {
  category: string;
  language: string;
}

const CategoryTemplate: React.FC<PageProps<CategoryPageData, CategoryPageContext>> = ({
  data,
  pageContext,
}) => {
  const { t } = useTranslation();
  const { category } = pageContext;

  return (
    <Layout>
      <div style={{ maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
        <h1>
          {t("postsInCategory")} <em>{category}</em>
        </h1>
        <PostList posts={data.allMdx.nodes} />
      </div>
    </Layout>
  );
};

export default CategoryTemplate;

export const Head: React.FC<PageProps<CategoryPageData, CategoryPageContext>> = ({
  pageContext,
}) => <SEO title={pageContext.category} />;

export const query = graphql`
  query CategoryPage($category: String!, $language: String!) {
    allMdx(
      filter: { frontmatter: { category: { eq: $category } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          date(formatString: "MMMM DD, YYYY")
          category
          tags
          description
        }
        excerpt(pruneLength: 200)
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
