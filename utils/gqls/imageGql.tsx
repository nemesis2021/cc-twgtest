export const IMAGE_WITH_DETAILS_GQL = `
  node {
    altText
    sourceUrl
    mediaDetails {
      height
      width
    }
  }
`;

export const IMAGE_GQL_WITHOUT_NODE = `
  altText
  sourceUrl
`;

const IMAGE_GQL = `
  node {  
    ${IMAGE_GQL_WITHOUT_NODE}
  }
`;

export default IMAGE_GQL;
