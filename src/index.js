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
    "counter/add"(state) {
      return { ...state, number: state.number + 1 };
    },
  },
  effects: {
    *asyncAdd(state, { call, put }) {
      yield delay(1000);
      yield put({ type: "counter/add" });
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
      <br />
      <button
        onClick={() => {
          props.dispatch({ type: "counter/asyncAdd" });
        }}
      >
        +
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
