import React from "react";
import { graphql, PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import SEO from "../components/SEO";
import * as layoutStyles from "../styles/layout.module.css";

interface TagPageData {
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

interface TagPageContext {
  tag: string;
  language: string;
}

const TagTemplate: React.FC<PageProps<TagPageData, TagPageContext>> = ({
  data,
  pageContext,
}) => {
  const { t } = useTranslation();
  const { tag } = pageContext;

  return (
    <Layout>
      <div className={layoutStyles.listLayout}>
        <Sidebar />
        <div>
          <h1>
            {t("postsTaggedWith")} <em>#{tag}</em>
          </h1>
          <PostList posts={data.allMdx.nodes} />
        </div>
      </div>
    </Layout>
  );
};

export default TagTemplate;

export const Head: React.FC<PageProps<TagPageData, TagPageContext>> = ({
  pageContext,
}) => <SEO title={`#${pageContext.tag}`} />;

export const query = graphql`
  query TagPage($tag: String!, $language: String!) {
    allMdx(
      filter: {
        frontmatter: { tags: { in: [$tag] } }
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
