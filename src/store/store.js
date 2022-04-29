import { compose, createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";

import { rootReducer } from './root-reducer';

const middleWares = [logger];

const componsedEnhanders = compose(applyMiddleware(...middleWares));

// 리듀서, 초기 상태, 인핸서를 받는다
export const store = createStore(rootReducer, undefined, componsedEnhanders);
