import React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "var(--space-xl) var(--space-lg)",
        textAlign: "center",
        fontSize: "0.85rem",
        color: "var(--color-text-secondary)",
      }}
    >
      <p>
        &copy; {year} Wiggleji. {t("copyright")}
      </p>
      <p style={{ marginTop: "var(--space-sm)" }}>
        Built with{" "}
        <a href="https://www.gatsbyjs.com" target="_blank" rel="noopener noreferrer">
          Gatsby
        </a>
      </p>
    </footer>
  );
};

export default Footer;
