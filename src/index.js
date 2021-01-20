import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import history from "./history";
import { ConnectedRouter } from "./connected-react-router";
import { Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Counter from "./components/Counter";
function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ul>
          <li>
            <Link to="/">首页</Link>
            <Link to="/counter">counter</Link>
          </li>
        </ul>
        <Route path="/" exact component={Home} />
        <Route path="/counter" exact component={Counter} />
      </ConnectedRouter>
    </Provider>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
