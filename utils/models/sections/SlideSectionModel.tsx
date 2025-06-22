import { ImageModel } from '../ImageModel';

export interface StepCardModel {
  image?: ImageModel;
  body1?: string;
  body2?: string;
  title?: string;
}
export interface SlideSectionModel {
  heading?: string;
  body?: string;
  slides: StepCardModel[];
}
