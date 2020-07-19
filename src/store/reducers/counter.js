import * as types from "../action-types";

const initialState = { number: 0 };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.INCREAMENT: {
      return { ...state, number: state.number + 1 };
    }
    default:
      return state;
  }
};
