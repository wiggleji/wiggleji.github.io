import React from "react";
import GiscusComponent from "@giscus/react";

interface GiscusProps {
  lang: string;
}

const Giscus: React.FC<GiscusProps> = ({ lang }) => {
  return (
    <GiscusComponent
      repo="wiggleji/wiggleji.github.io"
      repoId="" // TODO: Get from https://giscus.app
      category="Blog Comments"
      categoryId="" // TODO: Get from https://giscus.app
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="light"
      lang={lang === "ko" ? "ko" : "en"}
      loading="lazy"
    />
  );
};

export default Giscus;
