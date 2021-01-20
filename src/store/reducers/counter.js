import { ADD } from "../action-types";

const initialState = {
  number: 10,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD:
      return { ...state, number: state.number + 1 };

    default:
      return state;
  }
};
