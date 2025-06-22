import { GeneralHeaderSectionModel } from '../sections/GeneralHeaderSectionModel';
import { MediaContentSectionModel } from '../sections/MediaContentSectionModel';
import { SeoSectionModel } from '../sections/SeoSectionModel';

export interface BreastfeedingPageModel {
  breastfeedingPage: {
    generalHeaderSection: GeneralHeaderSectionModel;
    breastfeedingContentSection: {
      mediaContentSections: MediaContentSectionModel[];
    };
    seoSection: SeoSectionModel;
  };
}
