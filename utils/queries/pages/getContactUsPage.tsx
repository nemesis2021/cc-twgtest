import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { CONTACT_US_PAGE } from '../../routes';
import LINK_GQL from '../../gqls/linkGql';
import { ContactUsPageModel } from '../../models/pages/ContactUsPageModel';

const GET_CONTACT_US_PAGE = gql`
  query GET_CONTACT_US_PAGE {
    page(id: "${CONTACT_US_PAGE}", idType: URI) {
      id
      contactUsPage {
        heading
        description
        contactInfoSection {
          phone
          address
          addressLink
          infoList {
            link {
              ${LINK_GQL}
            }
            label
          }
 
        }
      }
    }
  }
`;

interface Response {
  page: ContactUsPageModel;
}

const getContactUsPage = async () => {
  const { data } = await client.query<Response>({ query: GET_CONTACT_US_PAGE });
  return data.page;
};

export default getContactUsPage;
