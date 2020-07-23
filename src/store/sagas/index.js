import { put, take } from "../../redux-saga/effects";
import * as types from "../action-types";

function* increment() {
  yield put({ type: types.INCREAMENT });
}
export default function* () {
  for (let i = 0; i < 3; i++) {
    //   监听一次 asyncIncreament动作，如果有人向仓库派发了动作，向下继续执行
    // take函数的参数就是一个动作类型
    debugger;
    const action = yield take(types.ASYNCINCREAMENT);
    console.log("动作派发后saga接受到it.next()返回值" + JSON.stringify(action));
    const action2 = yield increment();
    console.log(
      "动作派发后saga接受到it.next()返回值" + JSON.stringify(action2)
    );

    console.log("完成一次循环");
  }
  alert("最多执行三次");
}
