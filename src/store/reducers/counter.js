import { ADD, GET_USERS } from "../action-types";
import { counterRoutine } from "../routines";

const initialState = {
  number: 10,
  users: [],
};

// reducer只需要处理ADD 而不需要处理 ASYNC_ADD
// 异步的Action交给中间件去处理
export default (state = initialState, { type, payload }) => {
  // console.log(type);  COUNTER/TRIGGER
  // console.log(payload);
  switch (type) {
    case ADD:
      return { ...state, number: state.number + 1 };
    case counterRoutine.SUCCESS:
      return { ...state, users: payload };
    default:
      return state;
  }
};
