import {
  all,
  takeEvery,
  take,
  put,
  call,
  cps,
  fork,
  cancel,
  cancelled,
} from "redux-saga/effects";
import * as types from "../action-types";
import Api from "./api";
function* login(username, password) {
  try {
    localStorage.setItem("isloading", true);
    const token = yield call(Api.login, username, password);
    yield put({ type: types.LOGIN_SUCCESS, payload: token });
    localStorage.setItem("isloading", false);
  } catch (error) {
    alert(error);
    yield put({ type: types.LOGIN_FAIL, error });
    localStorage.setItem("isloading", false);
  } finally {
    if (yield cancelled()) {
      localStorage.setItem("isloading", false);
    }
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
    // 在没有登录的时候，去发送退出登录的请求，虽然能派发动作，但是不会被saga中间键处理，因为需要先要take到login request之后，才可能去准备take logout的
    // redux-logger是记录所有的action的，所以他是会一直去打印的
    const action = yield take(types.LOGOUT_REQUEST);
    // 发送了登录请求之后，如果立马去点击退出，会先拿到action的类型，判断，通过cancel方法，可以取消之前的task
    if (action.type === types.LOGOUT_REQUEST) {
      yield cancel(task);
    }
    yield put({ type: types.LOGOUT_SUCCESS });
  }
}
