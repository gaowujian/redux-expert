import { all, takeEvery, put, call } from "redux-saga/effects";
import * as types from "./action-types";
// saga分三种 (餐厅大门是rootsaga 服务员是watcher saga 厨师是worker saga)
// 1. root saga 用来组织和调用别的saga, (generator)
// 2. watcher saga 监听向仓库派发动作，如果监听到某些动作的话，会通知我们的worker saga去干活
// 3. worker saga 真正执行任务的saga

export function* helloSaga() {
  yield console.log("hello");
}

function delay(ms) {
  return new Promise((res) => {
    setTimeout(() => {
      res("ok");
      console.log(this.name);
    }, ms);
  });
}

function* incrementAsync() {
  const obj = { name: "tony" };
  const msg = yield call([obj, delay], 1000);
  console.log(msg);
  yield put({ type: types.INCREAMENT });
}

export function* watchAsyncIncrement() {
  // 监听每一次的async increment动作，每当有用户向仓库派发这个动作，就会有worker saga去执行任务
  // 每当yield一个值，也被称作effect,就相当于是告诉中间件进行某些处理
  yield takeEvery(types.ASYNCINCREAMENT, incrementAsync);
}

export default function* rootSaga() {
  // 类似promise all,执行完所有才会next
  // all的返回值很简单
  console.log(all([helloSaga(), watchAsyncIncrement()]));
  yield all([helloSaga(), watchAsyncIncrement()]);
  console.log("next");
}
