import { ColorTheme } from '../ColorTheme';
import { GalleryModel, ImageModel, ImageModelWithoutNode } from '../ImageModel';
import { LinkModel } from '../LinkModel';
import { MainContentSectionModel } from '../sections/MainContentSectionModel';

export interface ColorsModel {
  primaryColor: string;
  secondaryColor: string;
}

export interface ProductDisplayNameModel {
  shortName: string;
  longName: string;
}

export interface ProductCardContentModel {
  caption: string;
  description: string;
}

export interface BenefitModel {
  image: ImageModel;
  title: string;
  description: string;
}

export interface ProductOverviewModel {
  description: string;
  productOverviewContents: {
    title: string;
    body: string;
  }[];
}

export interface PartialProductFieldsModel {
  wrapper: ImageModel;
  colorTheme: ColorTheme;
  colors: ColorsModel;
  productDisplayName: ProductDisplayNameModel;
  filterButtonLabel: string;
  productOverview: ProductOverviewModel;
  productCardContent: ProductCardContentModel;
}

export interface ProductPartialModel {
  databaseId: number;
  slug: string;
  name: string;
  image?: ImageModelWithoutNode;
  productFields: PartialProductFieldsModel;
}

export enum ProductInfoBlockTypeEnum {
  ListBlock = 'ProductFieldsProductInfoListBlockLayout',
  FreeTextBlock = 'ProductFieldsProductInfoFreeTextBlockLayout',
TabelBlock = 'ProductFieldsProductInfoBlockTableLayout',
EquationBlock = 'ProductFieldsProductInfoEquationBlockLayout',
  ImageTextBlock = 'ProductFieldsProductInfoImageTextBlockLayout',
  ImageWithLightBoxBlock = 'ProductFieldsProductInfoImageWithLightBoxBlockLayout',
}

export interface ListItemModel {
  image: ImageModel;
  title: string;
  body: string;
}

export interface ListBlockModel {
  fieldGroupName: ProductInfoBlockTypeEnum.ListBlock;
  label: string;
  list: ListItemModel[];
}

export interface FreeTextBlockModel {
  fieldGroupName: ProductInfoBlockTypeEnum.FreeTextBlock;
  label: string;
  text: string;
}

export interface EquationBlockModel {
  fieldGroupName: ProductInfoBlockTypeEnum.EquationBlock;
  label: string;
  text1: {
    text: string;
    suffix?: string;
  };
  text2: {
    text: string;
    suffix?: string;
  };
  text3: {
    text: string;
    suffix?: string;
  };
}

export interface ImageTextBlockModel {
  fieldGroupName: ProductInfoBlockTypeEnum.ImageTextBlock;
  label: string;
  description: string;
  items: {
    image: ImageModel;
    title: string;
    body: string;
  }[];
}

export interface ImageWithLightBoxBlockModel {
  fieldGroupName: ProductInfoBlockTypeEnum.ImageWithLightBoxBlock;
  label: string;
  partialImage: ImageModel;
  modalImages: GalleryModel;
}

export type ProductContentBlockTypes =
  | ListBlockModel
  | FreeTextBlockModel
  | EquationBlockModel
  | ImageTextBlockModel
  | ImageWithLightBoxBlockModel;

export interface ProductFields extends PartialProductFieldsModel {
  wrapper: ImageModel;
  tag?: ImageModel;
  productInfo?: ProductContentBlockTypes[];
  mainContentSection: MainContentSectionModel;
  link?: LinkModel;
  faqSection: {
    heading: string;
    faqs: {
      title: string;
      body: string;
    }[];
  };
}

export interface ProductModel {
  name: string;
  description: string;
  image?: ImageModelWithoutNode;
  galleryImages: GalleryModel;
  productFields: ProductFields;
}
