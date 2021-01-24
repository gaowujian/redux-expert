import counter from "./counter";
function* rootSaga() {
  // for (let i = 0; i < 3; i++) {
  //   // 发布一个指令给saga中间件，你需要等待一个ASYNC_ADD的类型
  //   yield take(ASYNC_ADD);
  //   // 发布一个指令给saga中间件，你需要派发一个{type:ADD}的动作
  //   yield put({ type: ADD });
  // }
  yield counter();
}
export default rootSaga;
