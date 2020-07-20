import { all, takeEvery, take, put, call, cps } from "redux-saga/effects";
import * as types from "../action-types";
import Api from "./api";
function* login(username, password) {
  try {
    const token = yield call(Api.login, username, password);
    console.log(token);
    return token;
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
    let token = yield call(login, username, password);
    // 如果成功了就拿到了token
    if (token) {
      yield put({ type: types.LOGIN_SUCCESS, payload: token });
      //一旦登录成功了就可以开始监听退出的动作
      const logoutAction = yield take(types.LOGOUT_REQUEST);
      yield put({ type: types.LOGOUT_SUCCESS });
    }
  }
}
