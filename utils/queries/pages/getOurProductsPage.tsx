import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { OurProductsPageModel } from '../../models/pages/OurProductsPageModel';
import { OUR_PRODUCTS_PAGE } from '../../routes';
import MAIN_CONTENT_SECTION_GQL from '../../gqls/mainContentSectionGql';
import { PRODUCT_PARTIAL_GQL } from '../../gqls/productGql';

const GET_OUR_PRODUCTS_PAGE = gql`
  query GET_OUR_PRODUCTS_PAGE {
    page(id: "${OUR_PRODUCTS_PAGE}", idType: URI) {
      id
      ourProductsPage {
        mainContentSection {
          ${MAIN_CONTENT_SECTION_GQL}
        }
        productsSection {
          products {
            nodes {
              ... on SimpleProduct {
                ${PRODUCT_PARTIAL_GQL}
              }
              ... on VariableProduct {
                ${PRODUCT_PARTIAL_GQL}
              }
            }
          }
        }
      }
    }
  }
`;

interface Response {
  page: OurProductsPageModel;
}

const getOurProductsPage = async () => {
  const { data } = await client.query<Response>({
    query: GET_OUR_PRODUCTS_PAGE,
  });

  return data.page;
};

export default getOurProductsPage;
