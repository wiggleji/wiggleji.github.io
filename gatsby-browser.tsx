import React from "react";
import { MDXProvider } from "@mdx-js/react";
import Mermaid from "./src/components/Mermaid";

// Import Prism Solarized Light theme
import "prismjs/themes/prism-solarizedlight.css";

// Import global styles
import "./src/styles/global.css";

// Make Mermaid available in all MDX files without explicit import
const components = {
  Mermaid,
};

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
