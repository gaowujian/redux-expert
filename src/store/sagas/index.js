import { put, take } from "redux-saga/effects";
import * as types from "../action-types";

export default function* () {
  for (let i = 0; i < 3; i++) {
    //   监听一次 asyncIncreament动作，如果有人向仓库派发了动作，向下继续执行
    // take函数的参数就是一个动作类型
    console.log("开始执行counter saga");
    const action = yield take(types.ASYNCINCREAMENT);
    console.log(action);
    yield put({ type: types.INCREAMENT });
  }
  alert("最多执行三次");
}
