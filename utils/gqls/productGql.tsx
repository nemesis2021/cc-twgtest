import IMAGE_GQL, { IMAGE_GQL_WITHOUT_NODE } from './imageGql';
import LINK_GQL from './linkGql';
import MAIN_CONTENT_SECTION_GQL from './mainContentSectionGql';

const PRODUCT_PARTIAL_GQL = `
  databaseId
  slug
  name
  image {
    ${IMAGE_GQL_WITHOUT_NODE}
  }
  productFields {
    filterButtonLabel
    productDisplayName {
      shortName
      longName
    }
    productCardContent {
      caption
      description
    }
    wrapper {
      ${IMAGE_GQL}
    }
    colorTheme
    colors {
      primaryColor
      secondaryColor
    }
    productOverview {
      description
      productOverviewContents {
        title
        body
      }
    }
    productInfo {
      ... on ProductFieldsProductInfoListBlockLayout {
        fieldGroupName
        label
        list {
          image {
            ${IMAGE_GQL}
          }
          title
          body
        }
      }
    }
  }
`;

const PRODUCT_GQL = `
  name
  description
  featuredImage {
    ${IMAGE_GQL}
  }
  image {
    ${IMAGE_GQL_WITHOUT_NODE}
  }
  galleryImages {
    nodes {
      ${IMAGE_GQL_WITHOUT_NODE}
    }
  }
  productFields {
    productDisplayName {
      longName
    }
    colorTheme
    wrapper {
      ${IMAGE_GQL}
    }
    colors {
      primaryColor
      secondaryColor
    }
    tag {
      ${IMAGE_GQL}
    }
    link {
      ${LINK_GQL}
    }
    productInfo {
      ... on ProductFieldsProductInfoListBlockLayout {
        fieldGroupName
        label
        list {
          image {
            ${IMAGE_GQL}
          }
          title
          body
        }
      }
      ... on ProductFieldsProductInfoFreeTextBlockLayout {
        fieldGroupName
        label
        text
      }
      ... on ProductFieldsProductInfoEquationBlockLayout {
        fieldGroupName
        label
        text1 {
          text
          suffix
        }
        text2 {
          text
          suffix
        }
        text3 {
          text
          suffix
        }
      }
      ... on ProductFieldsProductInfoImageTextBlockLayout {
        fieldGroupName
        label
        description
        items {
          title
          body
          image {
            ${IMAGE_GQL}
          }
        }
      }
      ... on ProductFieldsProductInfoImageWithLightBoxBlockLayout {
        fieldGroupName
        label
        partialImage {
          ${IMAGE_GQL}
        }
        modalImages {
         nodes {
          ${IMAGE_GQL_WITHOUT_NODE}
         }
        }
      }
    }
    mainContentSection {
      ${MAIN_CONTENT_SECTION_GQL}
    }
    faqSection {
      heading
      link {
        ${LINK_GQL}
      }
      faqs {
        title
        body
      }
    }
  }
`;

export { PRODUCT_GQL, PRODUCT_PARTIAL_GQL };
