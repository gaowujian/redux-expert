import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import createSagaMiddleware from "../redux-saga";
import rootSaga from "./sagas";
import logger from "redux-logger";
// 创建出一个内部带有发布订阅机制的中间件
const sagaMiddleWare = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleWare));

// sagamiddleware 是一个执行器
// 内置co库，自动执行
// 执行这个generator，注册订阅事件，等派发动作的时候会发布事件

sagaMiddleWare.run(rootSaga);
export default store;
