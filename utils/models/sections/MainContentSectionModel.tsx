import { GalleryModel } from '../ImageModel';
import { LinkModel } from '../LinkModel';

export interface MainContentSectionModel {
  heading?: string;
  body?: string;
  images?: GalleryModel;
  link?: LinkModel;
}
