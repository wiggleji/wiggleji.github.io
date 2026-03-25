import React from "react";
import PostCard from "./PostCard";

interface Post {
  id: string;
  frontmatter: {
    title: string;
    slug: string;
    date: string;
    category: string;
    tags: string[];
    description: string;
  };
  excerpt?: string;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (posts.length === 0) {
    return <p style={{ color: "var(--color-text-secondary)" }}>No posts found.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.frontmatter.title}
          slug={post.frontmatter.slug}
          date={post.frontmatter.date}
          category={post.frontmatter.category}
          tags={post.frontmatter.tags}
          description={post.frontmatter.description}
          excerpt={post.excerpt}
        />
      ))}
    </div>
  );
};

export default PostList;
