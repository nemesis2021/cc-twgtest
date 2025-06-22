import { gql, useQuery } from '@apollo/client';

const GET_ANNOUNCEMENT = gql`
  query GET_ANNOUNCEMENT {
    globals {
      globalContent {
        announcement
      }
    }
  }
`;

interface Response {
  globals: {
    globalContent: { announcement?: string };
  };
}
const useGetAnnouncement = () => {
  const { data, error } = useQuery<Response>(GET_ANNOUNCEMENT, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  return {
    data: data?.globals.globalContent.announcement,
    error,
  };
};

export default useGetAnnouncement;
