import { CALL_HISTORY_METHOD } from "./constant";

export default function (path) {
  // 表示该动作需要调用history对象的方法
  // payload就是参数，调用push方法，把path传进去
  return {
    type: CALL_HISTORY_METHOD,
    payload: {
      method: "push",
      path,
    },
  };
}
