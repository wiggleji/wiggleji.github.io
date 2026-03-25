import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Mermaid from "./src/components/Mermaid";

const components = {
  Mermaid,
};

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
