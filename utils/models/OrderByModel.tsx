export enum OrderByValue {
  menuOrder = 'menuOrder',
  newest = 'newest',
  oldest = 'oldest',
  aToZ = 'aToZ',
  zToA = 'zToA',
}

export interface OrderByOption {
  value: OrderByValue;
  text: string;
}

export const orderByChoices: OrderByOption[] = [
  { value: OrderByValue.menuOrder, text: 'Best Selling' },
  { value: OrderByValue.newest, text: 'Newest' },
  { value: OrderByValue.oldest, text: 'Oldest' },
  { value: OrderByValue.aToZ, text: 'A - Z' },
  { value: OrderByValue.zToA, text: 'Z - A' },
];

export const clinicalStudyOrderChoice: OrderByOption[] = [
  { value: OrderByValue.menuOrder, text: 'Default' },
  { value: OrderByValue.newest, text: 'Newest' },
  { value: OrderByValue.oldest, text: 'Oldest' },
  { value: OrderByValue.aToZ, text: 'A - Z' },
  { value: OrderByValue.zToA, text: 'Z - A' },
];
