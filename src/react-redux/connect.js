import ReactReduxContext from "./ReactReduxContext";
import React, { useContext, useLayoutEffect, useMemo, useReducer } from "react";
import { bindActionCreators } from "../redux";

// 函数写法
function connect(mapStateToProps, mapDispatchToProps) {
  // mapStateToProps => state=>state.counter1
  return function (WrappedComponent) {
    return function (props) {
      const { store } = useContext(ReactReduxContext);
      const storeState = store.getState(); // {counter1:{},counter2:{}}
      // 处理仓库状态
      const stateToProps = useMemo(() => mapStateToProps(storeState), [
        storeState,
      ]); // counter1
      // 处理派发动作
      const dispatchProps = useMemo(() => {
        let dispatchProps;
        if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapStateToProps(store.dispatch);
        } else if (typeof mapDispatchToProps === "object") {
          dispatchProps = bindActionCreators(
            mapDispatchToProps,
            store.dispatch
          );
        } else {
          dispatchProps = { dispatch: store.dispatch };
        }

        return dispatchProps;
      }, [store.dispatch]);
      // 注册订阅
      const [, forceUpdate] = useReducer((x) => x + 1, 0);
      useLayoutEffect(() => {
        store.subscribe(forceUpdate);
      }, [store]);

      return (
        <WrappedComponent {...props} {...stateToProps} {...dispatchProps} />
      );
    };
  };
}

export default connect;
