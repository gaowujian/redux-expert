import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/action";
class Counter extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <p>{this.props.number}</p>
        <button onClick={this.props.increment}>+</button>
        <button onClick={this.props.asyncIncrement}>+</button>
      </div>
    );
  }
}

export default connect((state) => state.counter, actions)(Counter);
