function bindActionCreator(actionCreator, dispatch) {
  return function (...args) {
    return dispatch(actionCreator.apply(this, args));
  };
}
function bindActionCreators(actionCreators, dispatch) {
  const bindActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    bindActionCreators[key] = bindActionCreator(actionCreator, dispatch);
  }
  return bindActionCreators;
}
export default bindActionCreators;
