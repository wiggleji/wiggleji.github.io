import React from "react";
import { graphql, PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import SEO from "../components/SEO";

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
      <div style={{ maxWidth: "var(--content-max-width)", margin: "0 auto" }}>
        <h1>
          {t("postsTaggedWith")} <em>#{tag}</em>
        </h1>
        <PostList posts={data.allMdx.nodes} />
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
      filter: { frontmatter: { tags: { in: [$tag] } } }
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
