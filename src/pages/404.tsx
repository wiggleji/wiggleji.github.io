import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const NotFoundPage: React.FC<PageProps> = () => {
  const { language } = useI18next();

  return (
    <Layout>
      <div style={{ textAlign: "center", padding: "var(--space-2xl) 0" }}>
        <h1 style={{ fontSize: "4rem", marginBottom: "var(--space-md)" }}>404</h1>
        <p style={{ fontSize: "1.2rem", color: "var(--color-text-secondary)", marginBottom: "var(--space-xl)" }}>
          {language === "ko"
            ? "페이지를 찾을 수 없습니다."
            : "Page not found."}
        </p>
        <Link
          to={`/${language}/`}
          style={{
            padding: "var(--space-sm) var(--space-lg)",
            backgroundColor: "var(--color-link)",
            color: "#fff",
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
          }}
        >
          {language === "ko" ? "홈으로 돌아가기" : "Go Home"}
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => <SEO title="404 - Not Found" />;

export const query = graphql`
  query NotFoundPage($language: String!) {
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
