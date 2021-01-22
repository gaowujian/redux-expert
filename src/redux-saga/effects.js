import * as effectTypes from "./effectTypes";
// 这两个函数返回的也是类action对象,他们也有type
// 但是这些action会在中间件的处理过程中消耗，而不会最后交由reducer去处理
export function take(actionType) {
  // type是effect的type
  // actionType是我们说的action中的type 例如 {type:ASYNC_ADD}
  return {
    type: effectTypes.TAKE,
    actionType,
  };
}
export function put(action) {
  return {
    type: effectTypes.PUT,
    action,
  };
}
