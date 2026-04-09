import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import * as styles from "../styles/sidebar.module.css";

interface SidebarData {
  allMdx: {
    nodes: {
      frontmatter: {
        category: string;
        tags: string[];
      };
      fields: {
        lang: string;
      };
    }[];
  };
}

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useI18next();

  const data: SidebarData = useStaticQuery(graphql`
    query SidebarQuery {
      allMdx {
        nodes {
          frontmatter {
            category
            tags
          }
          fields {
            lang
          }
        }
      }
    }
  `);

  // Filter posts by current language
  const langPosts = data.allMdx.nodes.filter(
    (node) => node.fields?.lang === language
  );

  // Count categories
  const categoryCount: Record<string, number> = {};
  langPosts.forEach((node) => {
    const cat = node.frontmatter.category;
    categoryCount[cat] = (categoryCount[cat] || 0) + 1;
  });

  // Collect unique tags
  const allTags = new Set<string>();
  langPosts.forEach((node) => {
    node.frontmatter.tags?.forEach((tag) => allTags.add(tag));
  });

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>{t("categories")}</h3>
        <ul className={styles.categoryList}>
          {Object.entries(categoryCount)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([category, count]) => {
              const slug = category.toLowerCase().replace(/\s+/g, "-");
              return (
                <li key={category} className={styles.categoryItem}>
                  <Link
                    to={`/${language}/categories/${slug}/`}
                    className={styles.categoryLink}
                  >
                    <span>{category}</span>
                    <span className={styles.categoryCount}>{count}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      <div className={styles.sidebarSection}>
        <h3 className={styles.sidebarTitle}>{t("tags")}</h3>
        <div className={styles.tagCloud}>
          {Array.from(allTags)
            .sort()
            .map((tag) => {
              const slug = tag.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  key={tag}
                  to={`/${language}/tags/${slug}/`}
                  className={styles.tagCloudItem}
                >
                  #{tag}
                </Link>
              );
            })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
