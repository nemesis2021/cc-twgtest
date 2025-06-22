import { gql } from '@apollo/client';
import client from '../../apolloClient';
import PUBLICATION_PARTIAL_GQL from '../../gqls/publicationPartialGql';
import { PublicationSectionModel } from '../../models/sections/PublicationsSectionModel';
import LINK_GQL from '../../gqls/linkGql';

export const GET_PUBLICATION_SECTION = gql`
  query GET_PUBLICATION_SECTION {
    globals {
      globalContent {
        publicationSection {
          heading
          link {
            ${LINK_GQL}
          }

          publications {
            nodes {
              ... on Publication {
                ${PUBLICATION_PARTIAL_GQL}
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
    globalContent: { publicationSection: PublicationSectionModel };
  };
}

const getPublicationSection = async () => {
  const { data } = await client.query<Response>({
    query: GET_PUBLICATION_SECTION,
  });
  return data.globals.globalContent.publicationSection;
};

export default getPublicationSection;
