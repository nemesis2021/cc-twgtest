import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { COOKIE_POLICY_PAGE } from '../../routes';
import { CookiePolicyPageModel } from '../../models/pages/CookiePolicyPageModel';

const GET_COOKIE_POLICY_PAGE = gql`
  query GET_COOKIE_POLICY_PAGE {
    page(id: "${COOKIE_POLICY_PAGE}", idType: URI) {
      id
      cookiePolicyPage {
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
  page: CookiePolicyPageModel;
}

const getCookiePolicyPage = async () => {
  const { data } = await client.query<Response>({
    query: GET_COOKIE_POLICY_PAGE,
  });

  return data.page;
};

export default getCookiePolicyPage;
