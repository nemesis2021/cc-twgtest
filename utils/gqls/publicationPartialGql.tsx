import { CATEGORIES_GQL } from './categoryGql';
import FILE_GQL from './fileGql';
import IMAGE_GQL from './imageGql';

const PUBLICATION_PARTIAL_GQL = `
  id
  title
  categories {
    ${CATEGORIES_GQL}
  }
  publicationPostType {
    thumbnail {
      ${IMAGE_GQL}
    }
    shortDescription
    file {
      ${FILE_GQL}
    }
  }
`;

export default PUBLICATION_PARTIAL_GQL;
