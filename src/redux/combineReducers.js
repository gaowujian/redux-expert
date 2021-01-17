// 把一个对象 {counter1:reducer1,counter2:reducer2}变成了一个rootReducer

function combineReducers(reducers) {
  return function (state = {}, action) {
    const totalState = {};
    // debugger;
    // 当一个action来了，所有的reducer都会用自己的state，去响应这个action
    for (const key in reducers) {
      const branchReducer = reducers[key];
      const branchState = state[key];
      totalState[key] = branchReducer(branchState, action);
    }
    return totalState;
  };
}
export default combineReducers;
