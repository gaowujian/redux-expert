import { ADD } from "../action-types";

const initialState = {
  number: 10,
};

// reducer只需要处理ADD 而不需要处理 ASYNC_ADD
// 异步的Action交给中间件去处理
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD:
      return { ...state, number: state.number + 1 };

    default:
      return state;
  }
};
