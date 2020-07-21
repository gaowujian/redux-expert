import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
// import { applyMiddleware } from "redux";
import applyMiddleware from "./redux/applyMiddleware";
import rootReducer from "./redux/reducers";
import * as actions from "./redux/actions/counter";
import Counter from "./components/Counter";

const logger = function ({ getState, dispatch }) {
  return function (next) {
    console.log("logger装饰前");
    return function (action) {
      console.log("logger装饰后");
      console.log(`老状态:${JSON.stringify(store.getState())}`);
      next(action);
      console.log(`新状态:${JSON.stringify(store.getState())}`);
    };
  };
};

const thunk = function ({ getState, dispatch }) {
  // chain的数组就是下边函数的一个数组
  return function (next) {
    console.log("thunk装饰前");
    return function (action) {
      console.log("thunk装饰后");
      if (typeof action === "function") {
        return action(dispatch);
      } else {
        next(action);
      }
    };
  };
};

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
);
