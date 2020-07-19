import React from "react";
import { connect } from "../react-redux";
import * as counter1Actions from "../redux/actions/counter1";
import PureComponent from "../react-redux/PureComponent";
class Counter1 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.props.counter1;
    // console.log(this.props);
  }

  render() {
    console.log("render1");
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

const mapStateToProps = (state) => state.counter1;
export default connect(mapStateToProps, counter1Actions)(Counter1);
