import React from "react";

import { connect } from "../react-redux";
import { store } from "../index";
// import { boundCounter2Actions } from "../index";
import * as counter2Actions from "../redux/actions/counter2";

class Counter2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.counter2;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) return true;
    else return false;
  }
  render() {
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
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState().counter2);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

const mapStateToProps = (state) => state.counter2;
export default connect(mapStateToProps, counter2Actions)(Counter2);
