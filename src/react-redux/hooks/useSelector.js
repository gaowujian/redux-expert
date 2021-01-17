// 对应原来的mapStateToProps的作用
import { useContext, useReducer, useLayoutEffect } from "react";
import ReactReduxContext from "../ReactReduxContext";

function useSelector(selector) {
  const { store } = useContext(ReactReduxContext);
  let state = store.getState();
  let selectedState = selector(state);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  useLayoutEffect(() => {
    store.subscribe(forceUpdate);
  }, [store]);
  return selectedState;
}

export default useSelector;
