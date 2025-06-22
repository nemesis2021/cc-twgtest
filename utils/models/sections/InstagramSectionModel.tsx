import { LinkModel } from '../LinkModel';

export enum VisibilityTypeEnum {
  VISIBLE = 'Visible',
  HIDDEN = 'Hidden',
}
export type VisibilityType = 'Visible' | 'Hidden';

export interface InstagramSectionModel {
  visibility: VisibilityType;
  caption?: string;
  heading?: string;
  link?: LinkModel;
  widgetId: string;
}
