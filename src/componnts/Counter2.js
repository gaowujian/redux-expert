import React, { Component } from "react";
import store from "../store";
import { bindActionCreators } from "../redux/index";
import count2Actions from "../store/actions/counter2";

const bindActions = bindActionCreators(count2Actions, store.dispatch);

class Counter2 extends Component {
  state = {
    number: store.getState().counter2.number,
  };
  componentDidMount() {
    // 订阅，只要有action触发了就去触发回调函数
    this.unsubscribe = store.subscribe(() => {
      this.setState({ number: store.getState().counter2.number });
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <p>number:{this.state.number}</p>
        <button
          onClick={() => {
            bindActions.add();
          }}
        >
          +
        </button>
        <br />
        <button
          onClick={() => {
            bindActions.minus();
          }}
        >
          -
        </button>
      </div>
    );
  }
}
export default Counter2;
