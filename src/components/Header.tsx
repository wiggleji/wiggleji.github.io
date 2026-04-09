import React from "react";
import { Link } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import LanguageToggle from "./LanguageToggle";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useI18next();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--color-bg)",
        borderBottom: "1px solid var(--color-border)",
        height: "var(--header-height)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 var(--space-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to={`/${language}/`}
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "var(--color-heading)",
            textDecoration: "none",
          }}
        >
          wiggleji's memento
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "var(--space-lg)" }}>
          <Link
            to={`/${language}/`}
            style={{ color: "var(--color-text)", fontSize: "0.9rem" }}
          >
            {t("home")}
          </Link>
          <Link
            to={`/${language}/tags/`}
            style={{ color: "var(--color-text)", fontSize: "0.9rem" }}
          >
            {t("tags")}
          </Link>
          <Link
            to={`/${language}/categories/`}
            style={{ color: "var(--color-text)", fontSize: "0.9rem" }}
          >
            {t("categories")}
          </Link>
          <LanguageToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
