import React from "react";
import { Link } from "gatsby";

interface CategoryBadgeProps {
  category: string;
  lang: string;
}

interface TagBadgeProps {
  tag: string;
  lang: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, lang }) => {
  const slug = category.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link
      to={`/${lang}/categories/${slug}/`}
      style={{
        display: "inline-block",
        padding: "0.15rem 0.6rem",
        backgroundColor: "var(--color-category-bg)",
        color: "var(--color-category-text)",
        borderRadius: "var(--radius-sm)",
        fontSize: "0.8rem",
        fontWeight: 500,
        textDecoration: "none",
        transition: "opacity 0.2s",
      }}
    >
      {category}
    </Link>
  );
};

export const TagBadge: React.FC<TagBadgeProps> = ({ tag, lang }) => {
  const slug = tag.toLowerCase().replace(/\s+/g, "-");
  return (
    <Link
      to={`/${lang}/tags/${slug}/`}
      style={{
        display: "inline-block",
        padding: "0.15rem 0.6rem",
        backgroundColor: "var(--color-tag-bg)",
        color: "var(--color-tag-text)",
        borderRadius: "var(--radius-sm)",
        fontSize: "0.8rem",
        textDecoration: "none",
        transition: "background-color 0.2s",
      }}
    >
      #{tag}
    </Link>
  );
};
