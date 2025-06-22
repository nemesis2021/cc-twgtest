import { ImageModel } from './ImageModel';
import { LinkModel } from './LinkModel';

export interface HeaderContentModel {
  featuredLink?: LinkModel;
}

export interface FooterContentModel {
  featuredPage: {
    title?: string;
    description?: string;
    link?: LinkModel;
  };
  description?: string;
  copyright: string;
  statement: string;
}

export interface NavigationContentModel {
  logo?: ImageModel;
  headerContent?: HeaderContentModel;
  footerContent?: FooterContentModel;
}
