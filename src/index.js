import { ConnectedRouter } from "connected-react-router";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import Counter from "./components/Counter";
import Home from "./components/Home";
import store from "./redux";
import history from "./redux/history";
import "./style.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NavLink to="/home" className="link">
            home
          </NavLink>
          <NavLink to="/counter" className="link">
            counter
          </NavLink>
          <Route path="/home" exact component={Home}></Route>
          <Route path="/counter" exact component={Counter}></Route>
        </ConnectedRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
