import * as effectTypes from "./effectTypes";

// 1. 可能需要去获取状态，也可能去派发动作 getState, dispatch,
// 2. 还可能需要去监听一些动作 channel
function runSaga(env, saga) {
  const { getState, dispatch, channel } = env;

  const it = saga();
  function next(value) {
    const { value: effect, done } = it.next(value);
    // 拿到指令的返回结果，并执行不同的操作
    if (!done) {
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
  next();
}

export default runSaga;
