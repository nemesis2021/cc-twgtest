import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { CLINICAL_STUDIES_PAGE } from '../../routes';
import HEADER_SECTION_CENTERED from '../../gqls/headerSectionCentered';
import { ClinicalStudiesPageModel } from '../../models/pages/ClinicalStudiesPageModel';

const GET_CLINICAL_STUDIES_PAGE = gql`
  query GET_CLINICAL_STUDIES_PAGE {
    page(id: "${CLINICAL_STUDIES_PAGE}", idType: URI) {
      id
      clinicalStudiesPage {
        headerSection {
          ${HEADER_SECTION_CENTERED}
        }
      }
    }
  }
`;

interface Response {
  page: ClinicalStudiesPageModel;
}

const getClinicalStudiesPage = async () => {
  const { data } = await client.query<Response>({
    query: GET_CLINICAL_STUDIES_PAGE,
  });

  return data.page;
};

export default getClinicalStudiesPage;
