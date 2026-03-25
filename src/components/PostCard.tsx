import React from "react";
import { Link } from "gatsby";
import { useI18next } from "gatsby-plugin-react-i18next";
import { CategoryBadge, TagBadge } from "./CategoryTag";
import * as styles from "../styles/post.module.css";

interface PostCardProps {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  description?: string;
  excerpt?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  slug,
  date,
  category,
  tags,
  description,
  excerpt,
}) => {
  const { language } = useI18next();

  return (
    <article className={styles.postCard}>
      <h2 className={styles.postTitle}>
        <Link to={`/${language}/blog/${slug}/`}>{title}</Link>
      </h2>
      <div className={styles.postMeta}>
        <span className={styles.postDate}>{date}</span>
        <CategoryBadge category={category} lang={language} />
        {tags.map((tag) => (
          <TagBadge key={tag} tag={tag} lang={language} />
        ))}
      </div>
      {(description || excerpt) && (
        <p className={styles.postExcerpt}>{description || excerpt}</p>
      )}
    </article>
  );
};

export default PostCard;
