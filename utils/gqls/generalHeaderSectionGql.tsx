import FILE_GQL from './fileGql';
import IMAGE_GQL from './imageGql';
import LINK_GQL from './linkGql';

const GENERAL_HEADER_SECTION_GQL = `
  heading
  body
  image {
    ${IMAGE_GQL}
  }
  link {
    ${LINK_GQL}
  }
  video {
    ${FILE_GQL}
  }
  smallerMedia
`;

export default GENERAL_HEADER_SECTION_GQL;
