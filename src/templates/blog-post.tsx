import React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import TOC from "../components/TOC";
import Giscus from "../components/Giscus";
import SEO from "../components/SEO";
import { CategoryBadge, TagBadge } from "../components/CategoryTag";
import * as layoutStyles from "../styles/layout.module.css";
import * as postStyles from "../styles/post.module.css";

interface BlogPostData {
  mdx: {
    frontmatter: {
      title: string;
      date: string;
      category: string;
      tags: string[];
      description: string;
      slug: string;
    };
    tableOfContents: {
      items?: { url: string; title: string; items?: any[] }[];
    };
  };
}

const BlogPostTemplate: React.FC<PageProps<BlogPostData>> = ({
  data,
  children,
  pageContext,
}) => {
  const { frontmatter, tableOfContents } = data.mdx;
  const lang = (pageContext as any).language || "en";

  return (
    <Layout>
      <div className={layoutStyles.postLayout}>
        <article className={layoutStyles.content}>
          {/* Mobile TOC */}
          <TOC tableOfContents={tableOfContents} />

          <header className={postStyles.postHeader}>
            <h1 className={postStyles.postHeaderTitle}>{frontmatter.title}</h1>
            <div className={postStyles.postHeaderMeta}>
              <span>{frontmatter.date}</span>
              <CategoryBadge category={frontmatter.category} lang={lang} />
            </div>
          </header>

          <div className={postStyles.postBody}>{children}</div>

          <div className={postStyles.postTags}>
            {frontmatter.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} lang={lang} />
            ))}
          </div>

          <div className={postStyles.commentsSection}>
            <Giscus lang={lang} />
          </div>
        </article>

        {/* Desktop TOC */}
        <TOC tableOfContents={tableOfContents} />
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head: React.FC<PageProps<BlogPostData>> = ({ data }) => (
  <SEO
    title={data.mdx.frontmatter.title}
    description={data.mdx.frontmatter.description}
  />
);

export const query = graphql`
  query BlogPostByID($id: String!, $language: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
        tags
        description
        slug
      }
      tableOfContents
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
