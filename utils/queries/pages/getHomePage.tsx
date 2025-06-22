import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { HomePageModel } from '../../models/pages/HomePageModel';
import { HOME_PAGE } from '../../routes';
import LINK_GQL from '../../gqls/linkGql';
import { PRODUCT_PARTIAL_GQL } from '../../gqls/productGql';
import PRODUCTS_SECTION_GQL from '../../gqls/productsSectionGql';
import SEO_SECTION_GQL from '../../gqls/seoSectionGql';
import MEDIA_CONTENT_SECTION_GQL from '../../gqls/mediaContentSectionGql';
import MAIN_CONTENT_SECTION_GQL from '../../gqls/mainContentSectionGql';

const GET_HOME_PAGE = gql`
  query GET_HOME_PAGE {
    page(id: "${HOME_PAGE}", idType: URI) {
      id
      homePage {
        featuredProduct {
          nodes {
            ... on SimpleProduct {
                ${PRODUCT_PARTIAL_GQL}
            }
          }
        }
        headerSection {
          heading
          description
          link1 {
            ${LINK_GQL}
          }
          link2 {
            ${LINK_GQL}
          }
        }
        productsSection {
          ${PRODUCTS_SECTION_GQL}
        }
        mainContentSection {
          ${MAIN_CONTENT_SECTION_GQL}
        }
        mediaContentSection1 {
          ${MEDIA_CONTENT_SECTION_GQL}
        }
        mediaContentSection2 {
          ${MEDIA_CONTENT_SECTION_GQL}
        }
        seoSection {
          ${SEO_SECTION_GQL}
        }
      }
    }
  }
`;

interface Response {
  page: HomePageModel;
}

const getHomePage = async () => {
  const { data } = await client.query<Response>({ query: GET_HOME_PAGE });

  return data.page;
};

export default getHomePage;
