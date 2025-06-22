export interface CategoryModel {
  databaseId: number;
  name: string;
  slug?: string;
}

export interface CategoriesModel extends CategoryModel {
  nodes?: CategoryModel[];
}
