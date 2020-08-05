import React from "react";
import dva, { connect } from "./dva";
import { Router, Route } from "dva/router";

const app = dva();

function delay(ms) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms);
  });
}
app.model({
  namespace: "counter",
  state: {
    number: 20,
  },
  reducers: {
    add(state) {
      return { ...state, number: state.number + 1 };
    },
    minus(state) {
      return { ...state, number: state.number - 1 };
    },
  },
  effects: {
    // 原理就是去监听 counter/asyncAdd的方法, 监听到了这个saga
    // TakeEvery("counter/asyncAdd",*asyncAdd(action,effects))
    *asyncAdd(action, { call, put }) {
      yield delay(1000);
      yield put({ type: "add" });
      // 也可以去派发别的effects，而不一定是reducers
      // yield put({ type: "asyncMinus" });
    },
    *asyncMinus(action, { call, put }) {
      yield delay(1000);
      yield put({ type: "minus" });
    },
  },
});

function Counter(props) {
  return (
    <div>
      <h1>counter</h1>
      <p>number:{props.number}</p>
      <button
        onClick={() => {
          props.dispatch({ type: "counter/add" });
        }}
      >
        +
      </button>

      <button
        onClick={() => {
          props.dispatch({ type: "counter/asyncAdd" });
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          props.dispatch({ type: "counter/asyncMinus" });
        }}
      >
        -
      </button>
    </div>
  );
}

const ConnectedCounter = connect((state) => state.counter)(Counter);
app.router(() => {
  // return (
  //   <Router history={history}>
  //     <Route path="/counter" component={ConnectedCounter} />
  //   </Router>
  // );
  return <ConnectedCounter />;
});

app.start("#root");
