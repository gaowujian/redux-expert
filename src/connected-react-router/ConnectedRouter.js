import React, { Component } from "react";
import { connect } from "react-redux";
import { Router } from "react-router-dom";
import { locationChange } from "./push";

class ConnectedRouter extends Component {
  componentDidMount() {
    this.props.history.listen((location, action) => {
      // 如果connect第二个参数不传，默认会把dispatch传给props
      this.props.dispatch(locationChange(location, action));
    });
  }

  render() {
    const { history, children } = this.props;
    return <Router history={history}>{children}</Router>;
  }
}

export default connect()(ConnectedRouter);
