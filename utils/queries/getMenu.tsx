import { gql } from '@apollo/client';
import client from '../apolloClient';
import { MenuModel } from '../models/MenuModel';

const GET_MENU = gql`
  query GET_MENU($id: ID!) {
    menu(id: $id, idType: NAME) {
      id
      name
      menuItems(first: 100) {
        nodes {
          id
          title
          url
          description
          label
          parentId
        }
      }
    }
  }
`;

interface Input {
  id: string;
}

interface Response {
  menu: MenuModel;
}

const getMenu = async (input: Input) => {
  const { data } = await client.query<Response, Input>({
    query: GET_MENU,
    variables: input,
  });

  return data.menu;
};

export default getMenu;
