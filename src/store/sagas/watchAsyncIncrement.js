import { all, takeEvery, put, call } from "redux-saga/effects";
import * as types from "../action-types";
import { delay } from "./utils";
function* incrementAsync() {
  const obj = { name: "tony" };
  const msg = yield call([obj, delay], 1000);
  console.log(msg);
  yield put({ type: types.INCREAMENT });
}

export default function* watchAsyncIncrement() {
  // 监听每一次的async increment动作，每当有用户向仓库派发这个动作，就会有worker saga去执行任务
  // 每当yield一个值，也被称作effect,就相当于是告诉中间件进行某些处理
  yield takeEvery(types.ASYNCINCREAMENT, incrementAsync);
}
