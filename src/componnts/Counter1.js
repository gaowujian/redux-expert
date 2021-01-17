import React, { Component } from "react";
import store from "../store";
import { bindActionCreators } from "../redux/index";
import count1Actions from "../store/actions/counter1";
const bindActions = bindActionCreators(count1Actions, store.dispatch);

class Counter1 extends Component {
  constructor() {
    super();

    this.state = {
      number: store.getState().c1.number,
    };
  }

  componentDidMount() {
    // 订阅，只要有action触发了就去触发回调函数
    this.unsubscribe = store.subscribe(() => {
      this.setState({ number: store.getState().c1.number });
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
export default Counter1;
