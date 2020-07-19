const initialState = {
  number: 0,
};

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case "add":
      return { ...state, number: state.number + 1 };
    case "minus":
      return { ...state, number: state.number - 1 };
    default:
      return state;
  }
};
export default reducer;
