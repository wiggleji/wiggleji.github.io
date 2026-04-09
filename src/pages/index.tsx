import React from "react";
import { graphql, PageProps } from "gatsby";
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
    }[];
  };
}

const IndexPage: React.FC<PageProps<IndexData>> = ({ data }) => {
  return (
    <Layout>
      <div className={styles.listLayout}>
        <Sidebar />
        <PostList posts={data.allMdx.nodes} />
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <SEO />;

export const query = graphql`
  query IndexPage($language: String!) {
    allMdx(
      filter: { fields: { lang: { eq: $language } } }
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
