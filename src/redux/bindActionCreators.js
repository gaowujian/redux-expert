function bindActionCreator(actionCreator, dispatch) {
  return () => {
    dispatch(actionCreator());
    return;
  };
}
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  //   处理对象类型的 creators
  // actionCreators { add : fn(){}, minus: fn(){} }

  const boundActionCreators = {};
  // const actionCreatorsKeys = Object.keys(actionCreators);

  // actionCreatorsKeys.forEach((key) => {
  //   boundActionCreators[key] = function () {
  //     dispatch(actionCreators[key]());
  //   };
  // });
  for (const key in actionCreators) {
    if (actionCreators.hasOwnProperty(key)) {
      const actionCreator = actionCreators[key];
      // console.log("//actionCreators{add:fn -> actionCreator", actionCreator);

      if (typeof actionCreator === "function") {
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
      }
    }
  }

  return boundActionCreators;
}

export default bindActionCreators;
