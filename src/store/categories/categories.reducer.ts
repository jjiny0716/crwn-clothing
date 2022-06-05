import { AnyAction } from 'redux';
import { Category } from "./categories.types";

import { fetchCategoiresStart, fetchCategoiresSuccess, fetchCategoiresFailed } from "./categories.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction): CategoriesState => {
  if (fetchCategoiresStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoiresSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false };
  }
  
  if (fetchCategoiresFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
