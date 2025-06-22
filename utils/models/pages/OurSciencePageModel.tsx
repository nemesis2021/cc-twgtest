import { GeneralHeaderSectionModel } from '../sections/GeneralHeaderSectionModel';
import { TabContentSectionModel } from '../sections/TabContentSectionModel';

export interface OurSciencePageModel {
  ourSciencePage: {
    headerSection: GeneralHeaderSectionModel;
    tabContentSection: TabContentSectionModel;
  };
}
