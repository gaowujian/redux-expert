import React from "react";
import ReactDOM from "react-dom";
import Counter from "./components/Counter";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return <Counter />;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
