import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { routerMiddleware } from "connected-react-router";
import history from "./history";
export default createStore(
  rootReducer,
  applyMiddleware(routerMiddleware(history))
);
