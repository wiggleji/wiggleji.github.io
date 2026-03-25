import React from "react";
import { graphql, PageProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import SEO from "../components/SEO";
import * as styles from "../styles/layout.module.css";

interface IndexData {
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
      internal: {
        contentFilePath: string;
      };
    }[];
  };
}

const IndexPage: React.FC<PageProps<IndexData>> = ({ data }) => {
  const { language } = useI18next();

  // Filter posts by current language
  const posts = data.allMdx.nodes.filter((node) =>
    node.internal.contentFilePath.includes(`/content/${language}/`)
  );

  return (
    <Layout>
      <div className={styles.listLayout}>
        <Sidebar />
        <PostList posts={posts} />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <SEO />;

export const query = graphql`
  query IndexPage($language: String!) {
    allMdx(sort: { frontmatter: { date: DESC } }) {
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
