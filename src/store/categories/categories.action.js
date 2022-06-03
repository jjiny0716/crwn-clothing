import { CATEGORIES_ACTION_TYPE } from './categories.types';
import { createAction } from '../../util/reducer/reducer.util';

export const setCategories = (categories) => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categories);

export const fetchCategoiresStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_START);

export const fetchCategoiresSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_SUCCESS, categories);

export const fetchCategoiresFailed = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_FAILED, error);

