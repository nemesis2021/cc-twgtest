import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { KnowledgeHubPageModel } from '../../models/pages/KnowledgeHubPage';
import { BLOG_HUB_PAGE } from '../../routes';
import GENERAL_HEADER_SECTION_GQL from '../../gqls/generalHeaderSectionGql';
import PRODUCTS_SECTION_GQL from '../../gqls/productsSectionGql';
import SEO_SECTION_GQL from '../../gqls/seoSectionGql';

const GET_KNOWLEDGEHUB_PAGE = gql`
  query GET_KNOWLEDGEHUB_PAGE {
    page(id: "${BLOG_HUB_PAGE}", idType: URI) {
      id
      knowledgeHubPage {
        generalHeaderSection {
          ${GENERAL_HEADER_SECTION_GQL}
        }
        productsSection {
          ${PRODUCTS_SECTION_GQL}
        }
        seoSection {
          ${SEO_SECTION_GQL}
        }
      }
    }
  }
`;

interface Response {
  page: KnowledgeHubPageModel;
}

const getBlogHubPage = async () => {
  const { data } = await client.query<Response>({
    query: GET_KNOWLEDGEHUB_PAGE,
  });

  return data.page;
};

export default getBlogHubPage;
