import { CALL_HISTORY_METHOD } from "./constant";

export default function (history) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (action.type === CALL_HISTORY_METHOD) {
      const [method, path] = action.payload;
      history[method](path);
    } else {
      next(action);
    }
  };
}
