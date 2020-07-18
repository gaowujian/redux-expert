const initialState = {
  number: 0,
};

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case "add1":
      return { ...state, number: state.number + 1 };
    case "minus1":
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
};
export default reducer;
