import { CATEGORIES_ACTION_TYPE, Category } from "./categories.types";
import { createAction, Action, ActionWithPayload, withMatcher } from "../../util/reducer/reducer.util";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_START>;

export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_SUCCESS, Category[]>;

export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_FAILED, Error>;

export const fetchCategoiresStart = withMatcher((): FetchCategoriesStart => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_START));

export const fetchCategoiresSuccess = withMatcher((categories: Category[]): FetchCategoriesSuccess =>
  createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_SUCCESS, categories));

export const fetchCategoiresFailed = withMatcher((error: Error): FetchCategoriesFailed => createAction(CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_FAILED, error));
