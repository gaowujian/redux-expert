import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import applyMiddleware from "./redux/applyMiddleware";
import rootReducer from "./redux/reducers";
import * as actions from "./redux/actions/counter";
import Counter from "./components/Counter";

const logger = function ({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      console.log(`老状态:${JSON.stringify(store.getState())}`);
      next(action);
      console.log(`新状态:${JSON.stringify(store.getState())}`);
    };
  };
};

const store = createStore(rootReducer, applyMiddleware(logger));
ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
);
