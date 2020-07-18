function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return function () {
      dispatch(actionCreators());
      return;
    };
  }
  //   处理对象类型的 creators
  // actionCreators { add : fn(){}, minus: fn(){} }

  const boundActionCreators = {};
  const actionCreatorsKeys = Object.keys(actionCreators);
  actionCreatorsKeys.forEach((key) => {
    boundActionCreators[key] = function () {
      dispatch(actionCreators[key]());
    };
  });
  console.log("bound", boundActionCreators);
  return boundActionCreators;
}

export default bindActionCreators;
