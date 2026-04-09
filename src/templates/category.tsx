import React from "react";
import { graphql, PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import SEO from "../components/SEO";
import * as layoutStyles from "../styles/layout.module.css";

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
      <div className={layoutStyles.listLayout}>
        <Sidebar />
        <div>
          <h1>
            {t("postsInCategory")} <em>{category}</em>
          </h1>
          <PostList posts={data.allMdx.nodes} />
        </div>
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
      filter: {
        frontmatter: { category: { eq: $category } }
        fields: { lang: { eq: $language } }
      }
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
