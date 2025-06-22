import { gql, useQuery } from '@apollo/client';
import CLINICAL_STUDY_PARTIAL_GQL from '../../gqls/clinicalStudyPartialGql';
import { ClinicalStudyPartialModel } from '../../models/customPostTypes/ClinicalStudyModel';
import { OrderByValue } from '../../models/OrderByModel';

function getGql(input: Input) {
  const { orderBy } = input;

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
    query GET_CLINICAL_STUDY(
      $first: Int
      $size: Int
      $offset: Int
    ) {
      clinicalStudies(
        first: $first,
        where: {
          offsetPagination: {offset: $offset, size: $size}
          ${orderByGql}
        }
      ) {
        edges {
          cursor
          node {
            ${CLINICAL_STUDY_PARTIAL_GQL}
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
  orderBy?: OrderByValue;
}

interface Response {
  clinicalStudies: {
    edges: {
      node: ClinicalStudyPartialModel;
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

const useGetClinicalStudies = (input: Input) => {
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

export default useGetClinicalStudies;
