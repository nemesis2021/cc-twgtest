import { FileModel } from '../FileModel';
import { ImageModel } from '../ImageModel';
import { LinkModel } from '../LinkModel';

export interface MediaContentSectionModel {
  heading?: string;
  body?: string;
  smallText?: string;
  smallImage?: ImageModel;
  image?: ImageModel;
  video?: FileModel;
  videoLink?: string;
  link?: LinkModel;
  mediaPosition?: '1' | '2' | ['1'] | ['2']; // new graphQL for wp plugin returns array
}
