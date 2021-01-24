import { take, put, call } from "redux-saga/effects";
import { ADD, ASYNC_ADD, GET_USERS } from "../action-types";
import { counterRoutine } from "../routines";

function* worker_add() {}

function getUsers(url) {
  return fetch(url).then((res) => res.json());
}

function* watcher_add(params) {
  yield take(counterRoutine.TRIGGER);
  const users = yield call(getUsers, "http://localhost:8080/api/users");
  //写法1
  yield put({ type: counterRoutine.SUCCESS, payload: users });
  //  写法2
  yield put(counterRoutine.success(users));
  for (let i = 0; i < 3; i++) {
    // 发布一个指令给saga中间件，你需要等待一个ASYNC_ADD的类型
    yield take(ASYNC_ADD);
    // 发布一个指令给saga中间件，你需要派发一个{type:ADD}的动作
    yield put({ type: ADD });
  }
}

export default watcher_add;
