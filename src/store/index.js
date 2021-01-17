import { createStore, applyMiddleware } from "../redux";

import rootReducer from "./reducers";

function logger({ dispatch, getState }) {
  return function loggerNext(next) {
    console.log("装载logger");
    return function loggerDispatch(action) {
      console.log("logger接收到action", action);
      console.log("prevState", getState());
      next(action);
      console.log("afterState", getState());
    };
  };
}

// 让组件内获得的dispatch支持function作为参数
function thunk({ dispatch, getState }) {
  return function thunkNext(next) {
    console.log("装载thunk");
    return function thunkDispatch(action) {
      console.log("thunk接收到action", action);
      if (typeof action === "function") {
        action(dispatch, getState);
      } else {
        next(action);
      }
    };
  };
}
//  让组件内获得的dispatch支持promise作为参数

function promise({ dispatch }) {
  return function promiseNext(next) {
    console.log("装载promise");
    return function promiseDispatch(action) {
      console.log("promise接收到action", action);
      //   console.log("dispatch:", dispatch);
      if (typeof action.then === "function") {
        return action.then((data) => {
          dispatch(data);
        });
      } else {
        next(action);
      }
    };
  };
}
const store = applyMiddleware(promise, thunk, logger)(createStore)(rootReducer);
export default store;
