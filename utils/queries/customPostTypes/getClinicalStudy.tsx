import { gql } from '@apollo/client';
import client from '../../apolloClient';
import getContentBlocksGql from '../../gqls/flexibleBlocksGql';
import { ClinicalStudyModel } from '../../models/customPostTypes/ClinicalStudyModel';
import IMAGE_GQL from '../../gqls/imageGql';

export const CLINICAL_STUDY_POST_PREFIX =
  'ClinicalStudyPostTypeFlexibleBlocksFlexibleBlock';

const GET_CLINICAL_STUDY_POST = gql`
  query GET_CLINICAL_STUDY_POST($id: ID!) {
    clinicalStudy(id: $id, idType: SLUG) {
      id
      slug
      title
      featuredImage {
        ${IMAGE_GQL}
      }
      clinicalStudyPostType {
        heading
        source
        flexibleBlocks {
          ${getContentBlocksGql(CLINICAL_STUDY_POST_PREFIX)}
        }
      }
    }
  }
`;

interface Input {
  id: string;
}

interface Response {
  clinicalStudy: ClinicalStudyModel;
}

const getClinicalStudy = async (input: Input) => {
  const { data } = await client.query<Response, Input>({
    query: GET_CLINICAL_STUDY_POST,
    variables: input,
  });

  return data.clinicalStudy;
};

export default getClinicalStudy;
