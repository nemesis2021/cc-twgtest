import { LinkModel } from '../LinkModel';
import { MainContentSectionModel } from '../sections/MainContentSectionModel';
import { MediaContentSectionModel } from '../sections/MediaContentSectionModel';
import { ProductSectionModel } from '../sections/ProductSectionModel';
import { SeoSectionModel } from '../sections/SeoSectionModel';
import { ProductPartialModel } from '../woocommerce/ProductModel';

export interface HeaderSectionModel {
  heading: string;
  description: string;
  link1: LinkModel;
  link2: LinkModel;
}

export interface HomePageModel {
  homePage: {
    featuredProduct: { nodes: ProductPartialModel[] };
    headerSection: HeaderSectionModel;
    productsSection: ProductSectionModel;
    mainContentSection: MainContentSectionModel;
    mediaContentSection1: MediaContentSectionModel;
    mediaContentSection2: MediaContentSectionModel;
    seoSection: SeoSectionModel;
  };
}
