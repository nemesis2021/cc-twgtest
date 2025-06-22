import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { FaqPageModel } from '../../models/pages/FaqPageModel';
import { FAQ_PAGE } from '../../routes';
import HEADER_SECTION_CENTERED from '../../gqls/headerSectionCentered';

const GET_FAQ_PAGE = gql`
  query GET_FAQ_PAGE {
    page(id: "${FAQ_PAGE}", idType: URI) {
      id
      faqPage {
        headerSection {
          ${HEADER_SECTION_CENTERED}
        }
        contentSection {
          faqs {
            title
            body
          }
        }
      }
    }
  }
`;

interface Response {
  page: FaqPageModel;
}

const getFaqPage = async () => {
  const { data } = await client.query<Response>({ query: GET_FAQ_PAGE });

  return data.page;
};

export default getFaqPage;
