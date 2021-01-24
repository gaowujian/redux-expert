import React from "react";
import dva, { connect } from "dva";

const app = dva();

// 注册model
app.model({
  namespace: "counter",
  state: { number: 0 },
  reducers: {
    add(state) {
      return { number: state.number + 1 };
    },
  },
  effects: {
    *asyncAdd(action, { call, put, select }) {
      console.log(action);
      yield call(delay, 1000);
      // !定义model的时候，model内部派发动作，默认就是自己namespace里的
      yield put({ type: "add" });
      const newState = yield select((state) => state.counter);
      console.log(newState);
    },
  },
});

function Counter(props) {
  return (
    <div>
      <p>{props.number}</p>
      <button
        onClick={() => {
          // * 在组件内，非model定义阶段，派发动作，需要添加namespace
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
    </div>
  );
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

const ConnectedCounter = connect((state) => state.counter)(Counter);

// router的参数是一个
app.router(() => <ConnectedCounter />);
// 把app.router方法的返回值渲染到 #root的容器里
app.start("#root");
