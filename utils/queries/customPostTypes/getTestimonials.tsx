import { gql } from '@apollo/client';
import client from '../../apolloClient';
import IMAGE_GQL from '../../gqls/imageGql';
import { TestimonialModel } from '../../models/customPostTypes/TestimonialModel';

export const TESTIMONIALS_GQL = `
  id
  testimonialPostType {
    name
    title
    body
    verifiedBuyer
    image {
      ${IMAGE_GQL}
    }
  }
`;

const GET_TESTIMONIALS_GQL = gql`
  query GET_TESTIMONIALS_GQL($first: Int!) {
    testimonials(
      first: $first
    ) {
      nodes {
        ${TESTIMONIALS_GQL}
      }
    }
  }
`;

interface Input {
  first: number;
}

interface Response {
  testimonials: {
    nodes: TestimonialModel[];
  };
}

const getTestimonials = async (input: Input) => {
  const { data } = await client.query<Response, Input>({
    query: GET_TESTIMONIALS_GQL,
    variables: input,
  });

  return data.testimonials.nodes;
};

export default getTestimonials;
