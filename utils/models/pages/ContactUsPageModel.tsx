import { LinkModel } from '../LinkModel';

export interface ContactInfoSectionModel {
  phone: string;
  address: string;
  addressLink: string;
  infoList: {
    link: LinkModel;
    label: string;
  }[];
}

export interface ContactUsPageModel {
  id: string;
  contactUsPage: {
    heading: string;
    description?: string;
    contactInfoSection: ContactInfoSectionModel;
  };
}
