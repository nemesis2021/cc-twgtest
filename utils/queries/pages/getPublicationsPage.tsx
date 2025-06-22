import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { PUBLICATIONS_PAGE } from '../../routes';
import HEADER_SECTION_CENTERED from '../../gqls/headerSectionCentered';
import { OurPublicationsPageModel } from '../../models/pages/OurPublicationsPageModel';

const GET_PUBLICATIONS_PAGE = gql`
  query GET_PUBLICATIONS_PAGE {
    page(id: "${PUBLICATIONS_PAGE}", idType: URI) {
      id
      ourPublicationsPage {
        headerSection {
          ${HEADER_SECTION_CENTERED}
        }
      }
    }
  }
`;

interface Response {
  page: OurPublicationsPageModel;
}

const getPublicationsPage = async () => {
  const { data } = await client.query<Response>({
    query: GET_PUBLICATIONS_PAGE,
  });

  return data.page;
};

export default getPublicationsPage;
