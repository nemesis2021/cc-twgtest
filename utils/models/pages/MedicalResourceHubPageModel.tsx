import { ImageModel } from '../ImageModel';
import { LinkModel } from '../LinkModel';
import { FaqsSectionModel } from '../sections/FaqsSectionModel';
import { GeneralHeaderSectionModel } from '../sections/GeneralHeaderSectionModel';
import { MainContentSectionModel } from '../sections/MainContentSectionModel';
import { MediaContentSectionModel } from '../sections/MediaContentSectionModel';
import { TabContentSectionModel } from '../sections/TabContentSectionModel';

export interface IconListSectionModel {
  heading: string;
  contents: {
    image: ImageModel;
    title: string;
    description: string;
  }[];
  link: LinkModel;
}

export interface ContentSection2Model {
  body1: string;
  body2: string;
  smallText: string;
  link1: LinkModel;
  link2: LinkModel;
}

export interface HeadingAndBodyContentModel {
  heading: string;
  body: string;
}

export interface MedicalResourceHubPageModel {
  medicalResourceHubPage: {
    headerSection: GeneralHeaderSectionModel;
    contentSection1: IconListSectionModel;
    headingAndBodyContent: HeadingAndBodyContentModel;
    tabContentSection: TabContentSectionModel;
    mainContentSection: MainContentSectionModel;
    contentSection2: ContentSection2Model;
    mediaContentSection1: MediaContentSectionModel;
    mediaContentSection2: MediaContentSectionModel;
    mediaContentSection3: MediaContentSectionModel;
    faqSection: FaqsSectionModel;
  };
}
