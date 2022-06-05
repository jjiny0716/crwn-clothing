export enum CATEGORIES_ACTION_TYPE {
  FETCH_CATEGOIRES_START = "category/FETCH_CATEGOIRES_START",
  FETCH_CATEGOIRES_SUCCESS = "category/FETCH_CATEGOIRES_SUCCESS",
  FETCH_CATEGOIRES_FAILED = "category/FETCH_CATEGOIRES_FAILED",
}

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  imageUrl: string;
  items: CategoryItem[];
};

export type CategoryMap = Record<string, CategoryItem[]>