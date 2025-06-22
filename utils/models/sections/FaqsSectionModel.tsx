import { LinkModel } from '../LinkModel';

export interface FAQModel {
  title: string;
  body: string;
}

export interface FaqsSectionModel {
  heading: string;
  faqs: FAQModel[];
  smallText?: string;
  link?: LinkModel;
}
