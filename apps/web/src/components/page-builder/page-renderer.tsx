"use client";

import React from "react";
import { PageDesign } from "@/lib/types/page-builder";
import BlockRenderer from "./block-renderer";

interface PageRendererProps {
  design: PageDesign | null;
  className?: string;
}

export const PageRenderer: React.FC<PageRendererProps> = ({ design, className = "" }) => {
  if (!design || !design.blocks || design.blocks.length === 0) {
    return null;
  }

  const sortedBlocks = [...design.blocks].sort((a, b) => a.order - b.order);

  return (
    <div className={`page-renderer space-y-6 ${className}`}>
      {sortedBlocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
};

export default PageRenderer;