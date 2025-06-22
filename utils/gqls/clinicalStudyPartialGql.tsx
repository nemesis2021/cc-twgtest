import IMAGE_GQL from './imageGql';

const CLINICAL_STUDY_PARTIAL_GQL = `
  id
  slug
  title
  featuredImage {
      ${IMAGE_GQL}
    }
  clinicalStudyPostType {

    source
  }
`;

export default CLINICAL_STUDY_PARTIAL_GQL;
