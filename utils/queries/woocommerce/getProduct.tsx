import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { ProductModel } from '../../models/woocommerce/ProductModel';
import { PRODUCT_GQL } from '../../gqls/productGql';

const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id, idType: SLUG) {
      databaseId
      name
      ${PRODUCT_GQL}
    }
  }
`;

interface Input {
  id: string;
}

interface Response {
  product: ProductModel;
}

const getProduct = async (input: Input) => {
  const { data } = await client.query<Response, Input>({
    query: GET_PRODUCT,
    variables: input,
  });

  return data.product;
};

export default getProduct;
