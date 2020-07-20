import { all, takeEvery, take, put, call, cps, fork } from "redux-saga/effects";
import * as types from "../action-types";
import Api from "./api";
function* login(username, password) {
  try {
    const token = yield call(Api.login, username, password);
    console.log(token);
    yield put({ type: types.LOGIN_SUCCESS, payload: token });
  } catch (error) {
    alert(error);
    yield put({ type: types.LOGIN_FAIL, error });
  }
}
export default function* () {
  //   登录注册一直监听
  while (true) {
    const {
      payload: { username, password },
    } = yield take(types.LOGIN_REQUEST);

    // 使用fork相当于是开启了一个子进程，并不会阻塞主要进程，登录之后，直接点击退出登录就可以执行退出操作
    const task = yield fork(login, username, password);
    console.log(task);
    yield take(types.LOGOUT_REQUEST);

    yield put({ type: types.LOGOUT_SUCCESS });
  }
}
