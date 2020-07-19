import React, { Component } from "react";

export default class PureComponent extends Component {
  static isPureComponent = true;
  //   询问组件是否刷新
  shouldComponentUpdate(nextProps, nextState) {}
  render() {
    return <div></div>;
  }
}
