import { CATEGORIES_GQL } from './categoryGql';
import IMAGE_GQL from './imageGql';

const BLOG_PARTIAL_GQL = `
  id
  slug
  title
  categories {
    ${CATEGORIES_GQL}
  }
  blogPostType {
    thumbnail {
      ${IMAGE_GQL}
    }
    shortDescription
  }
`;

export default BLOG_PARTIAL_GQL;
