"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PageBlock,
  HeadingBlock,
  ParagraphBlock,
  ImageBlock,
  LinkBlock,
  ButtonBlock,
  SpacerBlock,
  DividerBlock,
  VideoBlock,
  CodeBlock,
  QuoteBlock,
  ListBlock,
  ColumnsBlock,
  CardBlock,
  TextStyle,
} from "@/lib/types/page-builder";

interface BlockRendererProps {
  block: PageBlock;
  isPreview?: boolean;
}

const getTextStyle = (style?: TextStyle): React.CSSProperties => {
  if (!style) return {};
  
  return {
    fontWeight: style.bold ? 'bold' : 'normal',
    fontStyle: style.italic ? 'italic' : 'normal',
    textDecoration: [
      style.underline ? 'underline' : '',
      style.strikethrough ? 'line-through' : ''
    ].filter(Boolean).join(' ') || 'none',
    color: style.color,
    backgroundColor: style.backgroundColor,
    fontSize: style.fontSize,
    fontFamily: style.fontFamily,
    textAlign: style.textAlign,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
  };
};

const HeadingRenderer: React.FC<{ block: HeadingBlock }> = ({ block }) => {
  const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
  const baseClasses = {
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };

  return (
    <Tag 
      className={baseClasses[block.level]}
      style={getTextStyle(block.style)}
    >
      {block.content}
    </Tag>
  );
};

const ParagraphRenderer: React.FC<{ block: ParagraphBlock }> = ({ block }) => {
  return (
    <p 
      className="text-base leading-relaxed"
      style={getTextStyle(block.style)}
    >
      {block.content}
    </p>
  );
};

const ImageRenderer: React.FC<{ block: ImageBlock }> = ({ block }) => {
  const alignmentClasses = {
    left: "mr-auto",
    center: "mx-auto",
    right: "ml-auto",
  };

  return (
    <div className={`${alignmentClasses[block.alignment || 'center']}`}>
      <img
        src={block.url}
        alt={block.alt}
        className={`${block.rounded ? 'rounded-lg' : ''} ${block.border ? 'border-2 border-border' : ''}`}
        style={{
          width: block.width || 'auto',
          height: block.height || 'auto',
          maxWidth: '100%',
        }}
      />
      {block.caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {block.caption}
        </p>
      )}
    </div>
  );
};

const LinkRenderer: React.FC<{ block: LinkBlock }> = ({ block }) => {
  return (
    <a
      href={block.url}
      target={block.openInNewTab ? "_blank" : "_self"}
      rel={block.openInNewTab ? "noopener noreferrer" : undefined}
      className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
      style={getTextStyle(block.style)}
    >
      {block.text}
    </a>
  );
};

const ButtonRenderer: React.FC<{ block: ButtonBlock }> = ({ block }) => {
  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div className={`flex ${alignmentClasses[block.alignment || 'left']}`}>
      <Button
        variant={block.variant || 'default'}
        size={block.size || 'default'}
        onClick={() => window.location.href = block.url}
      >
        {block.text}
      </Button>
    </div>
  );
};

const SpacerRenderer: React.FC<{ block: SpacerBlock }> = ({ block }) => {
  return <div style={{ height: block.height }} />;
};

const DividerRenderer: React.FC<{ block: DividerBlock }> = ({ block }) => {
  return (
    <hr
      style={{
        borderStyle: block.style || 'solid',
        borderColor: block.color || 'currentColor',
        borderWidth: block.thickness || '1px',
      }}
      className="my-4"
    />
  );
};

const VideoRenderer: React.FC<{ block: VideoBlock }> = ({ block }) => {
  const isYouTube = block.url.includes('youtube.com') || block.url.includes('youtu.be');
  const isVimeo = block.url.includes('vimeo.com');

  let embedUrl = block.url;
  if (isYouTube) {
    const videoId = block.url.split('v=')[1]?.split('&')[0] || block.url.split('/').pop();
    embedUrl = `https://www.youtube.com/embed/${videoId}`;
  } else if (isVimeo) {
    const videoId = block.url.split('/').pop();
    embedUrl = `https://player.vimeo.com/video/${videoId}`;
  }

  return (
    <div className="w-full">
      <iframe
        src={embedUrl}
        className="w-full rounded-lg"
        style={{
          width: block.width || '100%',
          height: block.height || '400px',
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      {block.caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {block.caption}
        </p>
      )}
    </div>
  );
};

const CodeRenderer: React.FC<{ block: CodeBlock }> = ({ block }) => {
  return (
    <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
      <code className={`language-${block.language || 'plaintext'}`}>
        {block.content}
      </code>
    </pre>
  );
};

const QuoteRenderer: React.FC<{ block: QuoteBlock }> = ({ block }) => {
  return (
    <blockquote className="border-l-4 border-primary pl-4 italic">
      <p style={getTextStyle(block.style)}>{block.content}</p>
      {block.author && (
        <footer className="text-sm text-muted-foreground mt-2">
          — {block.author}
        </footer>
      )}
    </blockquote>
  );
};

const ListRenderer: React.FC<{ block: ListBlock }> = ({ block }) => {
  const Tag = block.ordered ? 'ol' : 'ul';
  
  return (
    <Tag 
      className={`${block.ordered ? 'list-decimal' : 'list-disc'} pl-6 space-y-1`}
      style={getTextStyle(block.style)}
    >
      {block.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </Tag>
  );
};

const ColumnsRenderer: React.FC<{ block: ColumnsBlock }> = ({ block }) => {
  return (
    <div 
      className="grid gap-4"
      style={{ 
        gridTemplateColumns: `repeat(${block.columnCount}, 1fr)`,
        gap: block.gap || '1rem'
      }}
    >
      {block.columns.map((column, colIndex) => (
        <div key={colIndex} className="space-y-4">
          {column.map((innerBlock) => (
            <BlockRenderer key={innerBlock.id} block={innerBlock} />
          ))}
        </div>
      ))}
    </div>
  );
};

const CardRenderer: React.FC<{ block: CardBlock }> = ({ block }) => {
  return (
    <Card>
      {block.imageUrl && (
        <img 
          src={block.imageUrl} 
          alt={block.title || 'Card image'} 
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <CardHeader>
        {block.title && <CardTitle>{block.title}</CardTitle>}
      </CardHeader>
      <CardContent>
        <p style={getTextStyle(block.style)}>{block.content}</p>
      </CardContent>
    </Card>
  );
};

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isPreview = false }) => {
  const renderers = {
    heading: HeadingRenderer,
    paragraph: ParagraphRenderer,
    image: ImageRenderer,
    link: LinkRenderer,
    button: ButtonRenderer,
    spacer: SpacerRenderer,
    divider: DividerRenderer,
    video: VideoRenderer,
    code: CodeRenderer,
    quote: QuoteRenderer,
    list: ListRenderer,
    columns: ColumnsRenderer,
    card: CardRenderer,
  };

  const Renderer = renderers[block.type] as React.FC<{ block: any }>;
  
  if (!Renderer) {
    return <div>Unknown block type: {block.type}</div>;
  }

  return (
    <div className={`block-renderer ${isPreview ? 'preview-mode' : ''}`}>
      <Renderer block={block} />
    </div>
  );
};

export default BlockRenderer;