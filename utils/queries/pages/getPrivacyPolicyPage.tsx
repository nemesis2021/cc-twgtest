import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { PrivacyPolicyPageModel } from '../../models/pages/PrivacyPolicyPageModel';
import { PRIVACY_POLICY_PAGE } from '../../routes';

const GET_PRIVACY_POLICY_PAGE = gql`
  query GET_PRIVACY_POLICY_PAGE {
    page(id: "${PRIVACY_POLICY_PAGE}", idType: URI) {
      id
      privacyPolicyPage {
        heading
        contents {
          title
          body
        }
      }
    }
  }
`;

interface Response {
  page: PrivacyPolicyPageModel;
}

const getPrivacyPolicyPage = async () => {
  const { data } = await client.query<Response>({
    query: GET_PRIVACY_POLICY_PAGE,
  });

  return data.page;
};

export default getPrivacyPolicyPage;
