import React, { useState, useMemo } from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import useActiveHeading from "../hooks/useActiveHeading";
import * as styles from "../styles/toc.module.css";

interface TOCItem {
  url: string;
  title: string;
  items?: TOCItem[];
}

interface TOCProps {
  tableOfContents: {
    items?: TOCItem[];
  };
}

const flattenItems = (items: TOCItem[]): string[] => {
  return items.reduce<string[]>((acc, item) => {
    // url is like "#some-heading" — extract the id
    acc.push(item.url.replace("#", ""));
    if (item.items) {
      acc.push(...flattenItems(item.items));
    }
    return acc;
  }, []);
};

const TOCItems: React.FC<{ items: TOCItem[]; activeId: string }> = ({
  items,
  activeId,
}) => (
  <ul className={styles.tocList}>
    {items.map((item) => {
      const id = item.url.replace("#", "");
      return (
        <li key={item.url} className={styles.tocItem}>
          <a
            href={item.url}
            className={`${styles.tocLink} ${activeId === id ? styles.tocLinkActive : ""}`}
          >
            {item.title}
          </a>
          {item.items && item.items.length > 0 && (
            <TOCItems items={item.items} activeId={activeId} />
          )}
        </li>
      );
    })}
  </ul>
);

const TOC: React.FC<TOCProps> = ({ tableOfContents }) => {
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = tableOfContents?.items || [];

  const headingIds = useMemo(() => {
    if (items.length === 0) return [];
    return flattenItems(items);
  }, [items]);

  const activeId = useActiveHeading(headingIds);

  if (items.length === 0) return null;

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className={styles.tocWrapper} aria-label="Table of contents">
        <h3 className={styles.tocTitle}>{t("tableOfContents")}</h3>
        <TOCItems items={items} activeId={activeId} />
      </nav>

      {/* Mobile: collapsible */}
      <div className={styles.tocMobile}>
        <button
          className={styles.tocMobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
        >
          <span>{t("tableOfContents")}</span>
          <span>{mobileOpen ? "▲" : "▼"}</span>
        </button>
        {mobileOpen && (
          <div className={styles.tocMobileContent}>
            <TOCItems items={items} activeId={activeId} />
          </div>
        )}
      </div>
    </>
  );
};

export default TOC;
