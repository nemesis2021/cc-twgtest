const CATEGORY_GQL = `
  databaseId
  name
  slug
`;

export const CATEGORIES_GQL = `
  nodes {
    databaseId
    name
    count
  }
`;

export default CATEGORY_GQL;
