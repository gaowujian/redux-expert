import React, { Component } from "react";
import { connect } from "../react-redux";
import { counter2Actions } from "../store/actions";

class Counter2 extends Component {
  render() {
    const { number, add, minus } = this.props;
    return (
      <div>
        <p>number:{number}</p>
        <button onClick={add}>+</button>
        <br />
        <button onClick={minus}>-</button>
      </div>
    );
  }
}
export default connect((state) => state.counter2, counter2Actions)(Counter2);
