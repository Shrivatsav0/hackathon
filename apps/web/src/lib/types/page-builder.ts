export type BlockType = 
  | 'heading' 
  | 'paragraph' 
  | 'image' 
  | 'link' 
  | 'button' 
  | 'spacer' 
  | 'divider' 
  | 'video' 
  | 'code' 
  | 'quote' 
  | 'list'
  | 'columns'
  | 'card';

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  letterSpacing?: string;
}

export interface BlockBase {
  id: string;
  type: BlockType;
  order: number;
}

export interface HeadingBlock extends BlockBase {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
  style?: TextStyle;
}

export interface ParagraphBlock extends BlockBase {
  type: 'paragraph';
  content: string;
  style?: TextStyle;
}

export interface ImageBlock extends BlockBase {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
  width?: string;
  height?: string;
  alignment?: 'left' | 'center' | 'right';
  rounded?: boolean;
  border?: boolean;
}

export interface LinkBlock extends BlockBase {
  type: 'link';
  text: string;
  url: string;
  openInNewTab?: boolean;
  style?: TextStyle;
}

export interface ButtonBlock extends BlockBase {
  type: 'button';
  text: string;
  url: string;
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'default' | 'lg';
  alignment?: 'left' | 'center' | 'right';
}

export interface SpacerBlock extends BlockBase {
  type: 'spacer';
  height: string;
}

export interface DividerBlock extends BlockBase {
  type: 'divider';
  style?: 'solid' | 'dashed' | 'dotted';
  color?: string;
  thickness?: string;
}

export interface VideoBlock extends BlockBase {
  type: 'video';
  url: string;
  caption?: string;
  width?: string;
  height?: string;
}

export interface CodeBlock extends BlockBase {
  type: 'code';
  content: string;
  language?: string;
}

export interface QuoteBlock extends BlockBase {
  type: 'quote';
  content: string;
  author?: string;
  style?: TextStyle;
}

export interface ListBlock extends BlockBase {
  type: 'list';
  items: string[];
  ordered?: boolean;
  style?: TextStyle;
}

export interface ColumnsBlock extends BlockBase {
  type: 'columns';
  columns: PageBlock[][];
  columnCount: 2 | 3 | 4;
  gap?: string;
}

export interface CardBlock extends BlockBase {
  type: 'card';
  title?: string;
  content: string;
  imageUrl?: string;
  style?: TextStyle;
}

export type PageBlock = 
  | HeadingBlock 
  | ParagraphBlock 
  | ImageBlock 
  | LinkBlock 
  | ButtonBlock 
  | SpacerBlock 
  | DividerBlock 
  | VideoBlock 
  | CodeBlock 
  | QuoteBlock 
  | ListBlock
  | ColumnsBlock
  | CardBlock;

export interface PageDesign {
  version: string;
  blocks: PageBlock[];
  createdAt: string;
  updatedAt: string;
}