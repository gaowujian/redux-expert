import { compose } from "redux";

export default function applyMiddleware(...middlewares) {
  return (createStore) => (...args) => {
    // 使用args的原因是参数可能多个，包含reducer,preloadstate和 applymiddleware
    const store = createStore(...args);
    let dispatch;

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    const chain = middlewares.map((middleware) => {
      return middleware(middlewareAPI);
    });
    dispatch = compose(...chain)(store.dispatch);

    // 返回来的还是一个store，但是我们发现dispatch是一个被增强过的方法，所以外边调用的dispatch方法，并不是直接可以修改仓库状态的dispatch
    return {
      ...store,
      dispatch,
    };
  };
}

// 每一个中间件通过 middlware(middlewareAPI)拿到 getState和dispatch
// 返回一个函数，接受一个next参数，
// 就好比是 fn1(fn2(fn3(x))) 每次都是把结果传递给了外层的函数再去执行,执行的时候从
const logger = function ({ getState, dispatch }) {
  // chain的数组就是下边函数的一个数组
  return function (next) {
    return function (action) {
      console.log(`老状态:${JSON.stringify(getState())}`);
      next(action);
      console.log(`新状态:${JSON.stringify(getState())}`);
    };
  };
};

const thunk = function ({ getState, dispatch }) {
  // chain的数组就是下边函数的一个数组
  return function (next) {
    return function (action) {
      if (typeof action === "function") {
        return action(dispatch);
      } else {
        next(action);
      }
    };
  };
};
