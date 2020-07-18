import React from "react";
import ReactDOM from "react-dom";
import * as counter1Actions from "./redux/actions/counter1";
import * as counter2Actions from "./redux/actions/counter2";

import { createStore, bindActionCreators } from "./redux";
import rootReducer from "./redux/reducers";

const store = createStore(rootReducer);

// 当参数是function的时候
// const add = bindActionCreators(counter1Actions.add, store.dispatch);
// const minus = bindActionCreators(counter1Actions.minus, store.dispatch);

// 当参数是对象的时候

const boundCounter1Actions = bindActionCreators(
  counter1Actions,
  store.dispatch
);
const boundCounter2Actions = bindActionCreators(
  counter2Actions,
  store.dispatch
);

class Counter1 extends React.Component {
  constructor() {
    super();
    this.state = store.getState().counter1;
  }
  render() {
    return (
      <div>
        <h1>Counter案例</h1>
        <p>number:{this.state.number}</p>
        <button onClick={boundCounter1Actions.add}>+</button>
        <button onClick={boundCounter1Actions.minus}>-</button>
      </div>
    );
  }
  componentDidMount() {
    const unsubscribe = store.subscribe(() => {
      this.setState(store.getState().counter1);
    });
    this.unsubscribe = unsubscribe;
  }
}

class Counter2 extends React.Component {
  constructor() {
    super();
    this.state = store.getState().counter2;
  }
  render() {
    return (
      <div>
        <h1>Counter案例</h1>
        <p>number:{this.state.number}</p>
        <button onClick={boundCounter2Actions.add}>+</button>
        <button onClick={boundCounter2Actions.minus}>-</button>
        <br />
      </div>
    );
  }
  componentDidMount() {
    const unsubscribe = store.subscribe(() => {
      this.setState(store.getState().counter2);
    });
    this.unsubscribe = unsubscribe;
  }
}

ReactDOM.render(
  <div>
    <Counter1 />
    <br />
    <Counter2 />
  </div>,
  document.getElementById("root")
);
