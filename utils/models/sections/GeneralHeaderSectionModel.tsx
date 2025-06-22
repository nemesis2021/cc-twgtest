import { FileModel } from '../FileModel';
import { ImageModel } from '../ImageModel';
import { LinkModel } from '../LinkModel';

export interface GeneralHeaderSectionModel {
  heading: string;
  body?: string;
  image: ImageModel;
  link?: LinkModel;
  video?: FileModel;
  smallerMedia: boolean;
}
