import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";

const LanguageToggle: React.FC = () => {
  const { language, languages, changeLanguage } = useI18next();

  const otherLang = languages.find((l) => l !== language) || "en";
  const label = language === "en" ? "한국어" : "English";

  return (
    <button
      onClick={() => changeLanguage(otherLang)}
      style={{
        background: "none",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-sm)",
        padding: "0.3rem 0.8rem",
        cursor: "pointer",
        fontFamily: "var(--font-body)",
        fontSize: "0.85rem",
        color: "var(--color-text)",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = "var(--color-bg-alt)";
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.backgroundColor = "transparent";
      }}
      aria-label={`Switch to ${label}`}
    >
      {label}
    </button>
  );
};

export default LanguageToggle;
