import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { STOCKISTS_PAGE } from '../../routes';
import { StockistsPageModel } from '../../models/pages/StockistsPageModel';
import HEADER_SECTION_CENTERED from '../../gqls/headerSectionCentered';

const GET_STOCKISTS_PAGE = gql`
  query GET_STOCKISTS_PAGE {
    page(id: "${STOCKISTS_PAGE}", idType: URI) {
      id
      stockistsPage {
         headerSection {
          ${HEADER_SECTION_CENTERED}
        } 
      }
    }
  }
`;

interface Response {
  page: StockistsPageModel;
}

const getStockistsPage = async () => {
  const { data } = await client.query<Response>({ query: GET_STOCKISTS_PAGE });
  return data.page;
};

export default getStockistsPage;
