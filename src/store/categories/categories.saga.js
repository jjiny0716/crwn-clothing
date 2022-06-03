import { takeLatest, all, call, put } from "redux-saga/effects"

import { getCategoriesAndDocuments } from '../../util/firebase/firebase';

import { fetchCategoiresSuccess, fetchCategoiresFailed } from './categories.action';

import { CATEGORIES_ACTION_TYPE } from './categories.types';

export function* fetchCategoriesAsync() {
  try {
    const categories = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoiresSuccess(categories));
  } catch (error) {
    yield put(fetchCategoiresFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}