import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { MedicalResourceHubPageModel } from '../../models/pages/MedicalResourceHubPageModel';
import GENERAL_HEADER_SECTION_GQL from '../../gqls/generalHeaderSectionGql';
import { MEDICAL_RESOURCE_HUB_PAGE } from '../../routes';
import IMAGE_GQL from '../../gqls/imageGql';
import LINK_GQL from '../../gqls/linkGql';
import MAIN_CONTENT_SECTION_GQL from '../../gqls/mainContentSectionGql';
import MEDIA_CONTENT_SECTION_GQL from '../../gqls/mediaContentSectionGql';
import TAB_CONTENT_SECTION_GQL from '../../gqls/tabContentSectionGql';
import HEADING_AND_BODY_CONTENT_SECTION_GQL from '../../gqls/headingAndBodyContentSectrionGql';

const GET_MEDICAL_RESOURCE_HUB_PAGE = gql`
  query GET_MEDICAL_RESOURCE_HUB_PAGE {
    page(id: "${MEDICAL_RESOURCE_HUB_PAGE}", idType: URI) {
      id
      medicalResourceHubPage {
        headerSection {
          ${GENERAL_HEADER_SECTION_GQL}
        }
        contentSection1 {
          heading
          contents {
            image {
              ${IMAGE_GQL}
            }
            title
            description
          }
          link {
            ${LINK_GQL}
          }
        }
        headingAndBodyContent {
          ${HEADING_AND_BODY_CONTENT_SECTION_GQL}
        }
        tabContentSection {
          ${TAB_CONTENT_SECTION_GQL}
        }
        mainContentSection {
          ${MAIN_CONTENT_SECTION_GQL}
        }  
        contentSection2 {
          body1
          body2
          smallText
          link1 {
            ${LINK_GQL}
          }
          link2 {
            ${LINK_GQL}
          }
        }
        mediaContentSection1 {
          ${MEDIA_CONTENT_SECTION_GQL}
        }
        mediaContentSection2 {
          ${MEDIA_CONTENT_SECTION_GQL}
        }
        mediaContentSection3 {
          ${MEDIA_CONTENT_SECTION_GQL}
        }
        faqSection {
          heading
          faqs {
            title
            body
          }
          smallText
        }
      }
    }
  }
`;

interface Response {
  page: MedicalResourceHubPageModel;
}

const getMedicalResourceHubPage = async () => {
  const { data } = await client.query<Response>({
    query: GET_MEDICAL_RESOURCE_HUB_PAGE,
  });

  return data.page;
};

export default getMedicalResourceHubPage;
