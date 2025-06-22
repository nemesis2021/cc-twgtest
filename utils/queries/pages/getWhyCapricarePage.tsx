import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { WHY_CAPRICARE_PAGE } from '../../routes';
import GENERAL_HEADER_SECTION_GQL from '../../gqls/generalHeaderSectionGql';
import { WhyCapricarePageModel } from '../../models/pages/WhyCapricarePageModel';
import SEO_SECTION_GQL from '../../gqls/seoSectionGql';
import MAIN_CONTENT_SECTION_GQL from '../../gqls/mainContentSectionGql';
import { PRODUCT_PARTIAL_GQL } from '../../gqls/productGql';

const GET_WHY_CAPRICARE_PAGE = gql`
  query GET_WHY_CAPRICARE_PAGE {
    page(id: "${WHY_CAPRICARE_PAGE}", idType: URI) {
      id
      whyCapricarePage {
        generalHeaderSection {
          ${GENERAL_HEADER_SECTION_GQL}
        }
        mainContentSection {
          ${MAIN_CONTENT_SECTION_GQL}
        }
        benefitsSection {
          product {
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
        seoSection {
          ${SEO_SECTION_GQL}
        }
      }
    }
  }
`;

interface Response {
  page: WhyCapricarePageModel;
}

const getWhyCapricarePage = async () => {
  const { data } = await client.query<Response>({
    query: GET_WHY_CAPRICARE_PAGE,
  });
  return data.page;
};

export default getWhyCapricarePage;
