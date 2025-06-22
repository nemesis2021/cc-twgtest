import { MenuItemModel } from './MenuItemModel';

export interface MenuModel {
  id: string;
  name: string;
  menuItems: {
    nodes: MenuItemModel[];
  };
}
