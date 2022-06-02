import { CATEGORIES_ACTION_TYPE } from './categories.types';
import { createAction } from '../../util/reducer/reducer.util';
import { getCategoriesAndDocuments } from '../../util/firebase/firebase';

export const setCategories = (categories) => createAction(CATEGORIES_ACTION_TYPE.SET_CATEGORIES, categories);

export const fetchCategoiresStart = () => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_START);

export const fetchCategoiresSuccess = (categories) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_SUCCESS, categories);

export const fetchCategoiresFailed = (error) => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_FAILED, error);

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoiresStart());
  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoiresSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoiresFailed(error));
  }
}