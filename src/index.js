import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Counter from "./components/Counter";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
