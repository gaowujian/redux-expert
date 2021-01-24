import { createRoutine } from "redux-saga-routines";
// 有了routines，就不需要去分开管理actions和action_types
export const counterRoutine = createRoutine("COUNTER");

console.log(counterRoutine());
// // 返回动作的const
// console.log(counterRoutine.SUCCESS); //COUNTER/SUCCESS
// // 返回action 形如 {type:xx}
// console.log(counterRoutine.success()); // {type: "COUNTER/SUCCESS"}
