import { ADD1, MINUS1 } from "../action-types";
const initialState = {
  number: 10,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD1:
      return { ...state, number: state.number + 1 };
    case MINUS1:
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
};
