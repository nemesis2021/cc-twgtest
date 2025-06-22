import BLOG_PARTIAL_GQL from './blogPartialGql';
import LINK_GQL from './linkGql';

const BLOG_POSTS_SECTION_GQL = `
  heading
  link {
    ${LINK_GQL}
  }
  blogPosts {
    nodes {
      ... on Post {
        ${BLOG_PARTIAL_GQL}
      }
    }
  }
`;

export default BLOG_POSTS_SECTION_GQL;
