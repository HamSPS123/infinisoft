export enum BlockType {
  PARAGRAPH = 'paragraph',
  HEADING = 'heading',
  IMAGE = 'image',
  LIST = 'list',
  QUOTE = 'quote',
  CODE = 'code',
  EMBED = 'embed',
  COLUMNS = 'columns',
  BUTTON = 'button',
  SPACER = 'spacer',
  HTML = 'html',
  TABLE = 'table',
}

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
}

export interface ParagraphBlock extends BaseBlock {
  type: BlockType.PARAGRAPH;
  content: string;
  align?: 'left' | 'center' | 'right';
}

export interface HeadingBlock extends BaseBlock {
  type: BlockType.HEADING;
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  align?: 'left' | 'center' | 'right';
}

export interface ImageBlock extends BaseBlock {
  type: BlockType.IMAGE;
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  align?: 'left' | 'center' | 'right' | 'wide' | 'full';
}

export interface ListBlock extends BaseBlock {
  type: BlockType.LIST;
  items: string[];
  listType: 'ordered' | 'unordered';
}

export interface QuoteBlock extends BaseBlock {
  type: BlockType.QUOTE;
  content: string;
  citation?: string;
}

export interface CodeBlock extends BaseBlock {
  type: BlockType.CODE;
  content: string;
  language?: string;
}

export interface EmbedBlock extends BaseBlock {
  type: BlockType.EMBED;
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface ColumnsBlock extends BaseBlock {
  type: BlockType.COLUMNS;
  columns: {
    width: number;
    blocks: ContentBlock[];
  }[];
}

export interface ButtonBlock extends BaseBlock {
  type: BlockType.BUTTON;
  text: string;
  url: string;
  style?: 'primary' | 'secondary' | 'outline';
  align?: 'left' | 'center' | 'right';
}

export interface SpacerBlock extends BaseBlock {
  type: BlockType.SPACER;
  height: number;
}

export interface HtmlBlock extends BaseBlock {
  type: BlockType.HTML;
  content: string;
}

export interface TableBlock extends BaseBlock {
  type: BlockType.TABLE;
  rows: string[][];
  hasHeader: boolean;
}

export type ContentBlock = 
  | ParagraphBlock 
  | HeadingBlock 
  | ImageBlock 
  | ListBlock
  | QuoteBlock
  | CodeBlock
  | EmbedBlock
  | ColumnsBlock
  | ButtonBlock
  | SpacerBlock
  | HtmlBlock
  | TableBlock;

export interface PageContent {
  blocks: ContentBlock[];
  version: string; // For tracking content structure version
}
