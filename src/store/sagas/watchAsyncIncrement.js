import { all, takeEvery, put, call, take, select } from "redux-saga/effects";
import * as types from "../action-types";
import { delay } from "./utils";
function* incrementAsync() {}

function* watchAsyncIncrement() {
  for (let i = 0; i < 3; i++) {
    //   监听一次 asyncIncreament动作，如果有人向仓库派发了动作，向下继续执行
    // take函数的参数就是一个动作类型
    const action = yield take(types.ASYNCINCREAMENT);
    console.log(action);
    yield put({ type: types.INCREAMENT });
  }
  alert("最多执行三次");
}

function* watchAndCLog() {
  while (true) {
    let action = yield take("*");
    console.log(action);
    // 如何在saga中获取最新的状态树
    let state = yield select((state) => state.counter);
    console.log("state", state);
  }
}

export default function* rootSaga() {
  // 监听每个动作，发送之后打印log
  // 监听异步加1的动作
  //   all使用的时候必须是一个数组
  yield all([watchAndCLog(), watchAsyncIncrement()]);
}
