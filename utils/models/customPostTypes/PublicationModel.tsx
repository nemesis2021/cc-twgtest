import { CategoriesModel } from '../CategoryModel';
import { FileModel } from '../FileModel';
import { ImageModel } from '../ImageModel';

export interface PublicationPartialModel {
  id: string;
  title: string;
  categories: CategoriesModel;
  publicationPostType: {
    thumbnail?: ImageModel;
    shortDescription?: string;
    file: FileModel;
  };
}
