import { gql } from '@apollo/client';
import client from '../apolloClient';
import { CategoriesModel } from '../models/CategoryModel';

const GET_CATEGORIES = gql`
  query GET_CATEGORIES {
    categories(first: 20, where: { parent: 0, exclude: "1" }) {
      nodes {
        databaseId
        name
        children {
          nodes {
            databaseId
            name
          }
        }
      }
    }
  }
`;

interface Response {
  categories: {
    nodes: {
      databaseId: number;
      name: string;
      children: {
        nodes: {
          databaseId: number;
          name: string;
        }[];
      };
    }[];
  };
}

const getCategories = async (): Promise<CategoriesModel[]> => {
  const { data } = await client.query<Response>({
    query: GET_CATEGORIES,
  });

  return data.categories.nodes.map((category) => ({
    databaseId: category.databaseId,
    name: category.name,
    nodes:
      category.children.nodes.length > 0
        ? category.children.nodes.map((child) => ({
            databaseId: child.databaseId,
            name: child.name,
          }))
        : undefined,
  }));
};

export default getCategories;
