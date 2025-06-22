import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { ABOUT_US_PAGE } from '../../routes';
import GENERAL_HEADER_SECTION_GQL from '../../gqls/generalHeaderSectionGql';
import { AboutUsPageModel } from '../../models/pages/AboutUsPageModel';
import IMAGE_GQL from '../../gqls/imageGql';
import MEDIA_CONTENT_SECTION_GQL from '../../gqls/mediaContentSectionGql';
import SEO_SECTION_GQL from '../../gqls/seoSectionGql';

const GET_ABOUT_US_PAGE = gql`
  query GET_ABOUT_US_PAGE {
    page(id: "${ABOUT_US_PAGE}", idType: URI) {
      id
      aboutUsPage {
        generalHeaderSection {
          ${GENERAL_HEADER_SECTION_GQL}
        }
        accordionSection {
          accordion {
            title
            body
          }
        }
        slideSection {
          heading
          body
          slides {
            title
            image {
              ${IMAGE_GQL}
            }
            body1
            body2
          }
        }
        teamSection {
          heading
          body
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
  page: AboutUsPageModel;
}

const getAboutUsPage = async () => {
  const { data } = await client.query<Response>({ query: GET_ABOUT_US_PAGE });
  return data.page;
};

export default getAboutUsPage;
