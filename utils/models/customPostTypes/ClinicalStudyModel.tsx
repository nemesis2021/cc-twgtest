import { FlexibleBlocksModel } from '../FlexibleBlocksModel';
import { ImageModel } from '../ImageModel';

export interface ClinicalStudyPartialModel {
  id: string;
  slug: string;
  title: string;
  featuredImage: ImageModel;
  clinicalStudyPostType: {
    source?: string;
  };
}

export interface ClinicalStudyModel {
  id: string;
  slug: string;
  title: string;
  clinicalStudyPostType: {
    heading?: string;
    source?: string;
    flexibleBlocks: FlexibleBlocksModel;
  };
}
