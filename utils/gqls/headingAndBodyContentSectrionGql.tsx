import LINK_GQL from './linkGql';

const HEADING_AND_BODY_CONTENT_SECTION_GQL = `
  heading
  body
  link {
    ${LINK_GQL}
  }
`;

export default HEADING_AND_BODY_CONTENT_SECTION_GQL;
