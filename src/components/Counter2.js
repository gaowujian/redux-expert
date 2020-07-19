import React from "react";
import { connect } from "../react-redux";
import * as counter2Actions from "../redux/actions/counter2";
import PureComponent from "../react-redux/PureComponent";

class Counter2 extends PureComponent {
  constructor(props) {
    super(props);
    this.state = this.props.counter2;
  }
  render() {
    console.log("render2");
    return (
      <div>
        <h1>Counter案例</h1>
        <p>number:{this.props.number}</p>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.minus}>-</button>
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => state.counter2;
export default connect(mapStateToProps, counter2Actions)(Counter2);
