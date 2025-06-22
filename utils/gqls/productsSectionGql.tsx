import { PRODUCT_PARTIAL_GQL } from './productGql';

const PRODUCTS_SECTION_GQL = `
    heading
    products {
        nodes {
            ... on SimpleProduct {
                ${PRODUCT_PARTIAL_GQL}
            }
            ... on VariableProduct {
                ${PRODUCT_PARTIAL_GQL}
            }
        }
    }
`;

export default PRODUCTS_SECTION_GQL;
