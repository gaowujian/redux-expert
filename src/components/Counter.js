import React from "react";
import { connect } from "react-redux";
import * as counterActions from "../redux/actions/counter";

class Counter extends React.Component {
  render() {
    return (
      <div>
        <h1>Counter案例</h1>
        <p>number:{this.props.number}</p>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.minus}>-</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.counter;
export default connect(mapStateToProps, counterActions)(Counter);
