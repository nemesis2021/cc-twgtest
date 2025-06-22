import { ImageModel } from '../ImageModel';

export interface TestimonialCardModel {
  image?: ImageModel;
  title?: string;
  body?: string;
  name?: string;
  verifiedBuyer: boolean;
}
