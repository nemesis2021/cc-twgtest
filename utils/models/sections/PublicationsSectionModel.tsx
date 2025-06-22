import { PublicationPartialModel } from '../customPostTypes/PublicationModel';
import { LinkModel } from '../LinkModel';

export interface PublicationSectionModel {
  heading: string;
  link: LinkModel;
  publications: {
    nodes: PublicationPartialModel[];
  };
}
