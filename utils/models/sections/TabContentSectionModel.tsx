import { LinkModel } from '../LinkModel';

export enum TabContentBlockTypeEnum {
  TwoColumnBlock = 'TabContentsSectionTabsContentTwoColumnBlockLayout',
  TextContentBlock = 'TabContentsSectionTabsContentTextContentBlockLayout',
  ReferencesBlock = 'TabContentsSectionTabsContentReferencesBlockLayout',
  LinkGroupBlock = 'TabContentsSectionTabsContentLinkGroupBlockLayout',
}

export interface TwoColumnBlockModel {
  __typename: TabContentBlockTypeEnum.TwoColumnBlock;
  leftColumn: {
    body: string;
  };
  rightColumn: {
    body: string;
  };
}

export interface TextContentBlockModel {
  __typename: TabContentBlockTypeEnum.TextContentBlock;
  topDivider: boolean;
  body: string;
}

export interface ReferencesBlockModel {
  __typename: TabContentBlockTypeEnum.ReferencesBlock;
  body: string;
}

export interface LinkGroupBlockModel {
  __typename: TabContentBlockTypeEnum.LinkGroupBlock;
  links: {
    link: LinkModel;
  }[];
}

export type TabContentBlockTypes =
  | TwoColumnBlockModel
  | TextContentBlockModel
  | ReferencesBlockModel
  | LinkGroupBlockModel;

export interface TabModel {
  label: string;
  content: TabContentBlockTypes[];
  bottomContent: string;
}

export interface TabContentSectionModel {
  tabs: TabModel[];
}
