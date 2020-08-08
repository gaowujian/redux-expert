import { ConnectedRouter } from "connected-react-router";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import Counter from "./components/Counter";
import Home from "./components/Home";
import { store, persistor } from "./redux";
import history from "./redux/history";
import "./style.css";
import { PersistGate } from "redux-persist/integration/react";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
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
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
