import FILE_GQL from './fileGql';
import IMAGE_GQL, {
  IMAGE_GQL_WITHOUT_NODE,
  IMAGE_WITH_DETAILS_GQL,
} from './imageGql';
import LINK_GQL from './linkGql';

const getFlexibleBlocksGql = (postTypePrefix: string) => `
  flexibleBlock {
    ... on ${postTypePrefix}ParagraphLayout {
      __typename
      body
    }
    ... on ${postTypePrefix}GalleryLayout {
      __typename
      gallery {
        nodes {
          ${IMAGE_GQL_WITHOUT_NODE}
        }
      } 
    }
    ... on ${postTypePrefix}QuoteLayout {
      __typename
      body
    }
    ... on ${postTypePrefix}VideoLayout {
      __typename
      videoFile {
        ${FILE_GQL}
      }
      videoLink
      thumbnail {
        ${IMAGE_GQL}
      }
    }
    ... on ${postTypePrefix}LinksLayout {
      __typename
      links {
        link {
          ${LINK_GQL}
        }
      }
    }
    ... on ${postTypePrefix}GraphLayout {
      __typename
      image { 
        ${IMAGE_WITH_DETAILS_GQL}
      } 
    }
    ... on ${postTypePrefix}ReferencesBlockLayout {
      __typename
      body
    }
  }
`;

export default getFlexibleBlocksGql;
