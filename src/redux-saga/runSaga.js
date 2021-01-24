import * as effectTypes from "./effectTypes";

// 1. 可能需要去获取状态，也可能去派发动作 getState, dispatch,
// 2. 还可能需要去监听一些动作 channel
function runSaga(env, saga) {
  const { dispatch, channel } = env;

  const it = typeof saga === "function" ? saga() : saga;
  function next(value) {
    const { value: effect, done } = it.next(value);

    if (!done) {
      if (typeof effect[Symbol.iterator] === "function") {
        runSaga(env, effect); //就可以把它传给runSaga去单独执行
        next(); //不会阻塞当前的saga继续next执行
      } else {
        switch (effect.type) {
          case effectTypes.TAKE:
            // 如果是take在最开始的时候注册监听
            channel.take(effect.actionType, next);
            break;
          case effectTypes.PUT:
            // 如果是put说明要想仓库派发动作了
            dispatch(effect.action);
            //   channel.put(effect.action);
            next();
            break;
          default:
            break;
        }
      }
    }
  }
  next();
}

export default runSaga;
