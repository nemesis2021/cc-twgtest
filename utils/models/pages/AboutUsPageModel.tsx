import { GeneralHeaderSectionModel } from '../sections/GeneralHeaderSectionModel';
import { MediaContentSectionModel } from '../sections/MediaContentSectionModel';
import { SeoSectionModel } from '../sections/SeoSectionModel';
import { SlideSectionModel } from '../sections/SlideSectionModel';

export interface TeamSectionModel {
  heading?: string;
  body?: string;
}

export interface AboutUsPageModel {
  aboutUsPage: {
    generalHeaderSection: GeneralHeaderSectionModel;
    accordionSection: {
      accordion: {
        title: string;
        body: string;
      }[];
    };
    slideSection: SlideSectionModel;
    teamSection: TeamSectionModel;
    mediaContentSection1: MediaContentSectionModel;
    mediaContentSection2: MediaContentSectionModel;
    seoSection: SeoSectionModel;
  };
}
