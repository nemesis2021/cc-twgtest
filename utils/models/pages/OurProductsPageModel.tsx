import { MainContentSectionModel } from '../sections/MainContentSectionModel';
import { ProductPartialModel } from '../woocommerce/ProductModel';

export interface OurProductsSectionModel {
  products: {
    nodes: ProductPartialModel[];
  };
}

export interface OurProductsPageModel {
  ourProductsPage: {
    mainContentSection: MainContentSectionModel;
    productsSection: OurProductsSectionModel;
  };
}
