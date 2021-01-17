import { ADD2, MINUS2 } from "../action-types";
const initialState = {
  number: 20,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD2:
      return { ...state, number: state.number + 1 };
    case MINUS2:
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
};
