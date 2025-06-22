import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { STAGES_PAGE } from '../../routes';
import MAIN_CONTENT_SECTION_GQL from '../../gqls/mainContentSectionGql';
import { PRODUCT_GQL } from '../../gqls/productGql';
import { StagesPageModel } from '../../models/pages/StagesPageModel';

const GET_STAGES_PAGE = gql`
  query GET_STAGES_PAGE {
    page(id: "${STAGES_PAGE}", idType: URI) {
      id
      stagesPage {
        mainContentSection {
          ${MAIN_CONTENT_SECTION_GQL}
        }
        productsSection {
          products {
            nodes {
              ... on SimpleProduct {
                ${PRODUCT_GQL}
              }
              ... on VariableProduct {
                ${PRODUCT_GQL}
              }
            }
          }
        }
      }
    }
  }
`;

interface Response {
  page: StagesPageModel;
}

const getStagesPage = async () => {
  const { data } = await client.query<Response>({
    query: GET_STAGES_PAGE,
  });

  return data.page;
};

export default getStagesPage;
