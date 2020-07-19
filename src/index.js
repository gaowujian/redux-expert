import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./redux/reducers";
import * as actions from "./redux/actions/counter";
import Counter from "./components/Counter";

export const store = createStore(rootReducer);

const oldDispatch = store.dispatch;

store.dispatch = function () {
  console.log(`老状态:${JSON.stringify(store.getState())}`);
  oldDispatch(actions.add());
  console.log(`新状态:${JSON.stringify(store.getState())}`);
};
export default store;
ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
);
