import { CATEGORIES_ACTION_TYPE } from './categories.types';
import { createAction } from '../../util/reducer/reducer.util';

export const setCategoriesMap = (categoriesMap) => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES_MAP, categoriesMap);
export const setCategories = (categories) => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categories);
