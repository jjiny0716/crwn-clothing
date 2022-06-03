import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { logger } from "redux-logger";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from './root-saga';

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== "production" && logger, sagaMiddleware].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const componsedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// 리듀서, 초기 상태, 인핸서를 받는다
export const store = createStore(persistedReducer, undefined, componsedEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);