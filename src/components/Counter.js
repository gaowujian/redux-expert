import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions/counter";
class Counter extends Component {
  render() {
    return (
      <div>
        <h1>计数器</h1>
        <p>number:{this.props.number}</p>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.minus}>-</button>
        <button onClick={this.props.goHome}>回到首页</button>
      </div>
    );
  }
}

export default connect((state) => state.counter, actions)(Counter);
