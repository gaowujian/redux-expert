const initialState = {
  number: 0,
};
const reducer = (state = initialState, { type }) => {
  switch (type) {
    case "add2":
      return { ...state, number: state.number + 2 };
    case "minus2":
      return { ...state, number: state.number - 2 };
    default:
      return state;
  }
};

export default reducer;
