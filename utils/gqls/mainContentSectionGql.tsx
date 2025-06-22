import { IMAGE_GQL_WITHOUT_NODE } from './imageGql';
import LINK_GQL from './linkGql';

const MAIN_CONTENT_SECTION_GQL = `
    heading
    body
    images {
      nodes {
        ${IMAGE_GQL_WITHOUT_NODE}
      }
    }
    link {
      ${LINK_GQL}
    }
`;

export default MAIN_CONTENT_SECTION_GQL;
