import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { InstagramSectionModel } from '../../models/sections/InstagramSectionModel';
import LINK_GQL from '../../gqls/linkGql';

export const GET_INSTAGRAM_SECTION = gql`
  query GET_INSTAGRAM_SECTION {
    globals {
      globalContent {
        instagramSection {
          visibility
          caption
          heading
          link {
            ${LINK_GQL}
          }
          widgetId
        }
      }
    }
  }
`;

interface Response {
  globals: {
    globalContent: { instagramSection: InstagramSectionModel };
  };
}

const getInstagramSection = async () => {
  const { data } = await client.query<Response>({
    query: GET_INSTAGRAM_SECTION,
  });
  return data.globals.globalContent.instagramSection;
};

export default getInstagramSection;
