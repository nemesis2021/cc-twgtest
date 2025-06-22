import { ProductPartialModel } from '../woocommerce/ProductModel';

export interface ProductSectionModel {
  heading: string;
  products: {
    nodes: ProductPartialModel[];
  };
}
