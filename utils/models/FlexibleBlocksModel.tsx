import { FileModel } from './FileModel';
import {
  ImageModel,
  ImageModelWithoutNode,
  ImageWithMediaDetailsModel,
} from './ImageModel';
import { LinkModel } from './LinkModel';

export enum BlockTypeEnum {
  QuoteBlock = 'Quote',
  GalleryBlock = 'Gallery',
  ParagraphBlock = 'Paragraph',
  VideoBlock = 'Video',
  LinksBlock = 'Links',
  GraphBlock = 'Graph',
  ReferencesBlock = 'ReferencesBlock',
}

export interface ParagraphBlockModel {
  __typename: BlockTypeEnum.ParagraphBlock;
  body?: string;
}

export interface QuoteBlockModel {
  __typename: BlockTypeEnum.QuoteBlock;
  body?: string;
}

export interface GalleryBlockModel {
  __typename: BlockTypeEnum.GalleryBlock;
  gallery?: { nodes: ImageModelWithoutNode[] };
}

export interface VideoBlockModel {
  __typename: BlockTypeEnum.VideoBlock;
  videoFile?: FileModel;
  videoLink?: string;
  thumbnail?: ImageModel;
}

export interface LinksBlockModel {
  __typename: BlockTypeEnum.LinksBlock;
  links?: {
    link: LinkModel;
  }[];
}

export interface GraphBlockModel {
  __typename: BlockTypeEnum.GraphBlock;
  image?: ImageWithMediaDetailsModel;
}

export interface ReferencesBlockModel {
  __typename: BlockTypeEnum.ReferencesBlock;
  body?: string;
}

export type FlexibleBlockType =
  | ParagraphBlockModel
  | QuoteBlockModel
  | GalleryBlockModel
  | VideoBlockModel
  | LinksBlockModel
  | GraphBlockModel
  | ReferencesBlockModel;

export interface FlexibleBlocksModel {
  flexibleBlock: FlexibleBlockType[];
}
