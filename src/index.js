import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";

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
        <button onClick={() => store.dispatch({ type: "add" })}>+</button>
        <button onClick={() => store.dispatch({ type: "minus" })}>-</button>
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
