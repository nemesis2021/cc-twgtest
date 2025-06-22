import { FaqsSectionModel } from '../sections/FaqsSectionModel';
import { HeaderSectionCenteredModel } from '../sections/HeaderSectionCenteredModel';

export interface FaqPageModel {
  faqPage: {
    headerSection: HeaderSectionCenteredModel;
    contentSection: FaqsSectionModel;
  };
}
