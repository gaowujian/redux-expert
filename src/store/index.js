import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga";
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

// sagamiddleware 是一个执行器
sagaMiddleWare.run(rootSaga);
export default store;
