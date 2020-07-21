import { createStore, compose } from "redux";
import reducer from "./reducers";

export default function applyMiddleware(...middlewares) {
  const store = createStore(reducer);
  let dispatch;

  const middlewareAPI = {
    getState: store.getState,
    dispatch: (action, ...args) => dispatch(action, ...args),
  };
  const chain = middlewares.map((middleware) => middleware(middlewareAPI));
  dispatch = compose(...chain)(store.dispatch);

  return {
    ...store,
    dispatch,
  };
}
