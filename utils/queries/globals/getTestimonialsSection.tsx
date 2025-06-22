import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { TestimonialsSectionModel } from '../../models/sections/TestimonialsSectionModel';

export const GET_TESTIMONIALS_SECTION = gql`
  query GET_TESTIMONIALS_SECTION {
    globals {
      globalContent {
        testimonialsSection {
          heading
          body
        }
      }
    }
  }
`;

interface Response {
  globals: {
    globalContent: { testimonialsSection: TestimonialsSectionModel };
  };
}

const getTestimonialsSection = async () => {
  const { data } = await client.query<Response>({
    query: GET_TESTIMONIALS_SECTION,
  });
  return data.globals.globalContent.testimonialsSection;
};

export default getTestimonialsSection;
