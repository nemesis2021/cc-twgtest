import { gql, useQuery } from '@apollo/client';
import { PublicationPartialModel } from '../../models/customPostTypes/PublicationModel';
import { OrderByValue } from '../../models/OrderByModel';
import { TaxonomyModel } from '../../models/TaxonomyModel';
import PUBLICATION_PARTIAL_GQL from '../../gqls/publicationPartialGql';

function getGql(input: Input) {
  const { taxArray, orderBy } = input;

  let taxQueryGql = '';

  if (taxArray && taxArray.length > 0) {
    taxQueryGql = `
      taxQuery: {
        relation: AND,
        taxArray: [
          ${taxArray.map(
            (entry) =>
              `
              {
                terms: "${entry.terms}",
                taxonomy: ${entry.taxonomy},
                field: TAXONOMY_ID,
              },
            `,
          )}
        ]
      } 
    `;
  }

  let orderByGql = `
  orderby: {
    field: MENU_ORDER,
    order: ASC
  }
`;

  if (orderBy === OrderByValue.newest) {
    orderByGql = `
  orderby: {
    field: DATE,
    order: DESC
  }
`;
  } else if (orderBy === OrderByValue.oldest) {
    orderByGql = `
    orderby: {
      field: DATE,
      order: ASC
    }
  `;
  } else if (orderBy === OrderByValue.aToZ) {
    orderByGql = `
    orderby: {
      field: TITLE,
      order: ASC
    }
  `;
  } else if (orderBy === OrderByValue.zToA) {
    orderByGql = `
    orderby: {
      field: TITLE,
      order: DESC
    }
  `;
  }

  return gql`
    query GET_PUBLICATIONS(
      $first: Int
      $size: Int
      $offset: Int
    ) {
      publications(
        first: $first,
        where: {
          offsetPagination: {offset: $offset, size: $size}
          ${taxQueryGql}
          ${orderByGql}
        }
      ) {
        edges {
          cursor
          node {
            ${PUBLICATION_PARTIAL_GQL}
          }
        }
        pageInfo {
          offsetPagination {
            hasMore
            hasPrevious
            total
          }
        }
      }
    }
`;
}

interface Input {
  first?: number;
  offset?: number;
  size?: number;
  taxArray?: TaxonomyModel[];
  orderBy?: OrderByValue;
}

interface Response {
  publications: {
    edges: {
      node: PublicationPartialModel;
    }[];
    pageInfo: {
      offsetPagination: {
        hasMore: boolean;
        hasPrevious: boolean;
        total: number;
      };
    };
  };
}

const useGetPublications = (input: Input) => {
  const { data, error, loading, fetchMore, networkStatus, refetch } = useQuery<
    Response,
    Input
  >(getGql(input), {
    variables: input,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data,
    error,
    loading,
    fetchMore,
    networkStatus,
    refetch,
  };
};

export default useGetPublications;
