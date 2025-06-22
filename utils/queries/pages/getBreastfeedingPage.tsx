import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { BREASTFEEDING_PAGE } from '../../routes';
import GENERAL_HEADER_SECTION_GQL from '../../gqls/generalHeaderSectionGql';
import { BreastfeedingPageModel } from '../../models/pages/BreastfeedingPageModel';
import MEDIA_CONTENT_SECTION_GQL from '../../gqls/mediaContentSectionGql';
import SEO_SECTION_GQL from '../../gqls/seoSectionGql';

const GET_BREASTFEEDING_PAGE = gql`
  query GET_BREASTFEEDING_PAGE {
    page(id: "${BREASTFEEDING_PAGE}", idType: URI) {
      id
      breastfeedingPage {
        generalHeaderSection {
          ${GENERAL_HEADER_SECTION_GQL}
        }
        breastfeedingContentSection {
          mediaContentSections {
            ${MEDIA_CONTENT_SECTION_GQL}
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
  page: BreastfeedingPageModel;
}

const getBreastfeedingPage = async () => {
  const { data } = await client.query<Response>({
    query: GET_BREASTFEEDING_PAGE,
  });
  return data.page;
};

export default getBreastfeedingPage;
