import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { CTASectionModel } from '../../models/sections/CTASectionModel';
import LINK_GQL from '../../gqls/linkGql';
import IMAGE_GQL from '../../gqls/imageGql';

export const GET_CTA_SECTION = gql`
  query GET_CTA_SECTION {
    globals {
      globalContent {
        ctaSection {
          heading
          body
          image {
            ${IMAGE_GQL}
          }
          link {
            ${LINK_GQL}
          }
        }
      }
    }
  }
`;

interface Response {
  globals: {
    globalContent: { ctaSection: CTASectionModel };
  };
}

const getCTASection = async () => {
  const { data } = await client.query<Response>({
    query: GET_CTA_SECTION,
  });
  return data.globals.globalContent.ctaSection;
};

export default getCTASection;
