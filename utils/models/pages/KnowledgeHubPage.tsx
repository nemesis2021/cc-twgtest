import { GeneralHeaderSectionModel } from '../sections/GeneralHeaderSectionModel';
import { ProductSectionModel } from '../sections/ProductSectionModel';
import { SeoSectionModel } from '../sections/SeoSectionModel';

export interface KnowledgeHubPageModel {
  knowledgeHubPage: {
    generalHeaderSection: GeneralHeaderSectionModel;
    productsSection: ProductSectionModel;
    seoSection: SeoSectionModel;
  };
}
