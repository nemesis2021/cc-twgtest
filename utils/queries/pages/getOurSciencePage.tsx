import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { MedicalResourceHubPageModel } from '../../models/pages/MedicalResourceHubPageModel';
import GENERAL_HEADER_SECTION_GQL from '../../gqls/generalHeaderSectionGql';
import { OUR_SCIENCE_PAGE } from '../../routes';
import TAB_CONTENT_SECTION_GQL from '../../gqls/tabContentSectionGql';

const GET_OUR_SCIENCE_PAGE = gql`
  query GET_OUR_SCIENCE_PAGE {
    page(id: "${OUR_SCIENCE_PAGE}", idType: URI) {
      id
      ourSciencePage {
        headerSection {
          ${GENERAL_HEADER_SECTION_GQL}
        }
        tabContentSection {
          ${TAB_CONTENT_SECTION_GQL}
        }
      }
    }
  }
`;

interface Response {
  page: MedicalResourceHubPageModel;
}

const getOurSciencePage = async () => {
  const { data } = await client.query<Response>({
    query: GET_OUR_SCIENCE_PAGE,
  });

  return data.page;
};

export default getOurSciencePage;
