import FILE_GQL from './fileGql';
import IMAGE_GQL from './imageGql';
import LINK_GQL from './linkGql';

const MEDIA_CONTENT_SECTION_GQL = `
    heading
    body
    smallText
    smallImage {
      ${IMAGE_GQL}
    }
    image {
      ${IMAGE_GQL}
    }
    link {
      ${LINK_GQL}
    }
    video {
      ${FILE_GQL}
    }
    videoLink
    mediaPosition
`;

export default MEDIA_CONTENT_SECTION_GQL;
