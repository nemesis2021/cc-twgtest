import { MainContentSectionModel } from '../sections/MainContentSectionModel';
import { ProductModel } from '../woocommerce/ProductModel';

export interface OurProductsSectionModel {
  products: {
    nodes: ProductModel[];
  };
}

export interface StagesPageModel {
  stagesPage: {
    mainContentSection: MainContentSectionModel;
    productsSection: OurProductsSectionModel;
  };
}
