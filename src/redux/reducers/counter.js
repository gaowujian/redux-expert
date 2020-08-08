import * as types from "../actionType";
const initialState = {
  number: 0,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.ADD: {
      return { ...state, number: state.number + 1 };
    }
    case types.MINUS: {
      return { ...state, number: state.number - 1 };
    }
    default:
      return state;
  }
};
