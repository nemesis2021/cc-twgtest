import { ImageModel } from '../ImageModel';

export interface TeamCardModel {
  image: ImageModel;
  position?: string;
  name: string;
  description?: string;
}
