// 对应原来的mapDispatchToProps的作用

import { useContext } from "react";
import ReactReduxContext from "../ReactReduxContext";

function useDispatch() {
  const { store } = useContext(ReactReduxContext);
  return store.dispatch;
}

export default useDispatch;
