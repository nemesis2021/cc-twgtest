import { GeneralHeaderSectionModel } from '../sections/GeneralHeaderSectionModel';
import { MainContentSectionModel } from '../sections/MainContentSectionModel';
import { SeoSectionModel } from '../sections/SeoSectionModel';
import { ProductPartialModel } from '../woocommerce/ProductModel';

export interface WhyCapricarePageModel {
  whyCapricarePage: {
    generalHeaderSection: GeneralHeaderSectionModel;
    mainContentSection: MainContentSectionModel;
    benefitsSection: {
      product: {
        nodes: ProductPartialModel[];
      };
    };
    seoSection: SeoSectionModel;
  };
}
