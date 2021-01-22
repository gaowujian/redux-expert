import runSaga from "./runSaga";
import createChannel from "./createChannel";
function createSagaMiddleware() {
  const channel = createChannel();
  let boundRunSaga;
  const sagaMiddleware = function ({ getState, dispatch }) {
    // 绑定runSaga函数的第一个参数为 { getState, dispatch }
    boundRunSaga = runSaga.bind(null, { getState, dispatch, channel });
    return function (next) {
      return function (action) {
        // 把action交给store.dispatch处理,
        // 可以处理 {type:ADD}, 因为在reducer中没有声明其他动作的处理动作
        next(action);
        // 把action交给channel处理，去触发监听，
        // 可以处理 {type:ASYNC_ADD},因为之前注册了监听
        channel.channelPut(action);
      };
    };
  };

  // 这是一个类似co库的函数
  sagaMiddleware.run = function (saga) {
    boundRunSaga(saga);
  };
  return sagaMiddleware;
}

export default createSagaMiddleware;
