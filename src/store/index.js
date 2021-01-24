import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducers";

import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
const sagaMiddleware = createSagaMiddleware();
const store = applyMiddleware(sagaMiddleware)(createStore)(rootReducer);

// 等价于co库，让generator函数自动执行
sagaMiddleware.run(rootSaga);
window.store = store;
export default store;
