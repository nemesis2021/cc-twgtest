import { ImageModel } from '../ImageModel';
import { LinkModel } from '../LinkModel';

export interface CTASectionModel {
  heading?: string;
  body?: string;
  image?: ImageModel;
  link?: LinkModel;
}
