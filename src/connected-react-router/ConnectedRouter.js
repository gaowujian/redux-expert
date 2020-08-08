// 监听路径的变化，如果路径有变化就想仓库中去派发一个路径改变的动作
import React from "react";
import { Router } from "react-router-dom";
import { connect, ReactReduxContext } from "react-redux";
import { LOCATION_CHANGE } from "connected-react-router";

class ConnectedRouter extends React.Component {
  // 要让组件的contextType等于react-redux中的上下文，这样才可以接受到store
  static contextType = ReactReduxContext;
  componentDidMount() {
    // 每当路径变化之后都会执行该函数
    // 这个action和redux中的action不是一回事，而是给history的action
    // 包括 push pops
    this.props.history.listen((location, action) => {
      // 通过上下文来接受store中传下来的方法
      this.context.store.dispatch({
        type: LOCATION_CHANGE,
        payload: {
          location,
          action,
        },
      });
    });
  }
  render() {
    const { history, children } = this.props;
    return <Router history={history}>{children}</Router>;
  }
}
export default connect(ConnectedRouter);
