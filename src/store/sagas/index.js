import { take, put } from "../../redux-saga/effects";
import { ADD, ASYNC_ADD } from "../action-types";

function* add() {
  for (let i = 0; i < 3; i++) {
    // 发布一个指令给saga中间件，你需要等待一个ASYNC_ADD的类型
    yield take(ASYNC_ADD);
    // 发布一个指令给saga中间件，你需要派发一个{type:ADD}的动作
    yield put({ type: ADD });
  }
}

function* rootSaga() {
  yield add();
}
export default rootSaga;
