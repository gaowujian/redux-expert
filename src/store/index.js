import { createStore, applyMiddleware } from "redux";

import rootReducer from "./reducers";
import { routerMiddleware } from "../connected-react-router";
import history from "../history";
const store = applyMiddleware(routerMiddleware(history))(createStore)(
  rootReducer
);
window.store = store;
export default store;
