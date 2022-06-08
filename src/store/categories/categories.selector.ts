import { createSelector } from "reselect";
import { RootState } from '../store';
import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './categories.types';

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

export const selectCategory = createSelector([selectCategoryReducer], (categoriesSlice) => categoriesSlice.categories);

export const selectCategoriesMap = createSelector([selectCategory], (categories) =>
  categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading,
)
