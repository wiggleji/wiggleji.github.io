import React, { useEffect, useRef, useState } from "react";

interface MermaidProps {
  chart: string;
}

let mermaidInitialized = false;
let idCounter = 0;

const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !chart) return;

    const renderChart = async () => {
      try {
        const mermaid = (await import("mermaid")).default;

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            fontFamily: "var(--font-body)",
          });
          mermaidInitialized = true;
        }

        const id = `mermaid-${idCounter++}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart.trim());
        setSvg(renderedSvg);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError("Failed to render diagram");
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div
        style={{
          padding: "var(--space-md)",
          backgroundColor: "var(--color-bg-alt)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-secondary)",
          fontSize: "0.9rem",
        }}
      >
        {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div
        style={{
          padding: "var(--space-lg)",
          textAlign: "center",
          color: "var(--color-text-secondary)",
        }}
      >
        Loading diagram...
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        margin: "var(--space-lg) 0",
        textAlign: "center",
        overflow: "auto",
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default Mermaid;
