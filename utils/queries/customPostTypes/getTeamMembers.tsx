import { gql } from '@apollo/client';
import client from '../../apolloClient';
import IMAGE_GQL from '../../gqls/imageGql';
import { TeamMemberModel } from '../../models/customPostTypes/TeamMemberModel';

export const TEAM_MEMBER_GQL = `
  id
  teamMemberPostType {
    name
    position
    description
    image {
      ${IMAGE_GQL}
    }
  }
`;

const GET_TEAM_MEMBERS_GQL = gql`
  query GET_TEAM_MEMBERS_GQL($first: Int!) {
    teamMembers(
      first: $first
      where: {
        orderby: {
          field: MENU_ORDER
          order: ASC
        }
      }
    ) {
      nodes {
        ${TEAM_MEMBER_GQL}
      }
    }
  }
`;

interface Input {
  first: number;
}

interface Response {
  teamMembers: {
    nodes: TeamMemberModel[];
  };
}

const getTeamMembers = async (input: Input) => {
  const { data } = await client.query<Response, Input>({
    query: GET_TEAM_MEMBERS_GQL,
    variables: input,
  });

  return data.teamMembers.nodes;
};

export default getTeamMembers;
