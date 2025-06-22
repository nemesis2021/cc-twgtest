import LINK_GQL from './linkGql';

const TAB_CONTENT_SECTION_GQL = `
    tabs {
    label
    content {
      ... on TabContentsSectionTabsContentTwoColumnBlockLayout {
        __typename
        leftColumn {
          body
        }
        rightColumn {
          body
        }
      } 
      ... on TabContentsSectionTabsContentTextContentBlockLayout {
        __typename
        topDivider
        body
      }
      ... on TabContentsSectionTabsContentReferencesBlockLayout {
        __typename
        body
      }
      ... on TabContentsSectionTabsContentLinkGroupBlockLayout {
        __typename
        links {
          link {
            ${LINK_GQL}
          }
        }
      }
    }
  }
`;

export default TAB_CONTENT_SECTION_GQL;
