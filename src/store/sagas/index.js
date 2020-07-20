import { all, takeEvery, put, call, cps } from "redux-saga/effects";
import helloSaga from "./helloSaga";
import watchAsyncIncrement from "./watchAsyncIncrement";
import { readFile } from "./utils";
import loginSaga from "./LoginSaga";

// saga分三种 (餐厅大门是rootsaga 服务员是watcher saga 厨师是worker saga)
// 1. root saga 用来组织和调用别的saga, (generator)
// 2. watcher saga 监听向仓库派发动作，如果监听到某些动作的话，会通知我们的worker saga去干活
// 3. worker saga 真正执行任务的saga

const readFiles = function* () {
  const msg = yield cps(readFile, "filename");
  console.log(msg);
};

export default function* rootSaga() {
  // 类似promise all,执行完所有才会next
  // all的返回值很简单
  yield all([loginSaga()]);
}
