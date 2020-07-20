import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

// sagamiddleware 是一个执行器
// 内置co库，自动执行
sagaMiddleWare.run(rootSaga);
export default store;
