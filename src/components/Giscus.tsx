import React from "react";
import GiscusComponent from "@giscus/react";

interface GiscusProps {
  lang: string;
}

const Giscus: React.FC<GiscusProps> = ({ lang }) => {
  return (
    <GiscusComponent
      repo="wiggleji/wiggleji.github.io"
      repoId="R_kgDORwKcAw"
      category="General"
      categoryId="DIC_kwDORwKcA84C5Oio"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme="preferred_color_scheme"
      lang={lang === "ko" ? "ko" : "en"}
      loading="lazy"
    />
  );
};

export default Giscus;
