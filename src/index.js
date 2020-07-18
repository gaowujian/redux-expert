import React from "react";
import ReactDOM from "react-dom";
import * as counterActions from "./redux/actions/counter";

import { createStore, bindActionCreators } from "redux";

const initialState = {
  number: 0,
};

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case "add":
      return { ...state, number: state.number + 1 };

    case "minus":
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
};

const store = createStore(reducer);

// 当参数是function的时候
// const add = bindActionCreators(counterActions.add, store.dispatch);
// const minus = bindActionCreators(counterActions.minus, store.dispatch);

// 当参数是对象的时候

const boundCounterActions = bindActionCreators(counterActions, store.dispatch);

class App extends React.Component {
  constructor() {
    super();
    this.state = store.getState();
  }
  render() {
    return (
      <div>
        <h1>Counter案例</h1>
        <p>number:{this.state.number}</p>
        <button onClick={boundCounterActions.add}>+</button>
        <button onClick={boundCounterActions.minus}>-</button>
        <br />
        <button
          onClick={() => {
            this.unsubscribe = store.subscribe(() => {
              this.setState(store.getState());
            });
          }}
        >
          添加监听
        </button>
        <button
          onClick={() => {
            this.unsubscribe();
          }}
        >
          取消监听{" "}
        </button>
      </div>
    );
  }
  componentDidMount() {
    const unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
    this.unsubscribe = unsubscribe;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
