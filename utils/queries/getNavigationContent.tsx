import { gql } from '@apollo/client';
import IMAGE_GQL from '../gqls/imageGql';
import { NavigationContentModel } from '../models/NavigationModel';
import client from '../apolloClient';
import LINK_GQL from '../gqls/linkGql';

export const GET_NAVIGATION = gql`
  query GET_NAVIGATION {
    globals {
      globalContent {
        navigationContent {
          logo {
            ${IMAGE_GQL}
          }
          headerContent {
            featuredLink {
              ${LINK_GQL}
            }
          }
          footerContent {
            description
            copyright
            statement
            featuredPage {
              title
              description
              link {
                ${LINK_GQL}
              }
            }
          }
        }
      }
    }
  }
`;

interface Response {
  globals: {
    globalContent: { navigationContent: NavigationContentModel };
  };
}

const getNavigationContent = async () => {
  const { data } = await client.query<Response>({
    query: GET_NAVIGATION,
  });
  return data.globals.globalContent.navigationContent;
};

export default getNavigationContent;
