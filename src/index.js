import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./react-redux";
import { createStore } from "./redux";
import rootReducer from "./redux/reducers";

import Counter1 from "./components/Counter1";
import Counter2 from "./components/Counter2";

export const store = createStore(rootReducer);

export default store;
ReactDOM.render(
  <Provider store={store}>
    <Counter1 />
    <br />
    <Counter2 />
  </Provider>,
  document.getElementById("root")
);
