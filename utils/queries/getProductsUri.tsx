import { gql } from '@apollo/client';
import client from '../apolloClient';
import { REVALIDATE_PAGES } from '../globals';
import { PageUriModel } from '../models/PageUriModel';
import getApolloFetchPolicy from './getApolloFetchPolicy';

const GET_PRODUCTS_URI = gql`
  query GET_PRODUCTS_URI(
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
    products(first: $first, last: $last, after: $after, before: $before) {
      nodes {
        id
        uri
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

interface Input {
  first?: number;
  last?: number;
  after?: string;
  before?: string;
}

interface Response {
  products: {
    nodes: PageUriModel[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

const getProductsUri = async () => {
  let uris: PageUriModel[] = [];
  let hasNextPage = true;
  let endCursor = 'null';

  while (hasNextPage) {
    // eslint-disable-next-line no-await-in-loop
    const { data } = await client.query<Response, Input>({
      query: GET_PRODUCTS_URI,
      variables: {
        first: 100,
        after: endCursor,
      },
      fetchPolicy: getApolloFetchPolicy(
        `GET_PRODUCTS_URI${endCursor}`,
        REVALIDATE_PAGES,
      ),
    });
    const { nodes, pageInfo } = data.products;

    uris = uris.concat(nodes);
    hasNextPage = pageInfo.hasNextPage;
    endCursor = pageInfo.endCursor;
  }

  return uris;
};

export default getProductsUri;
