//  reducers = {counter1:fn(){},counter2:fn(){}}

function combineReducers(reducers) {
  // 获取状态树对象节点的counter1和counter2的列表 [counter1,counter2]

  // 所以rootReducers在进行根操作的时候，可以进行一个遍历操作,闭包
  // 如果是单reducer的时候，直接 state= reducer(state,action)
  // 如果是多reducer 需要遍历状态树的节点数组，用节点对应的reducer方法，处理对应的状态节点，最后返回一个新的状态树
  const reducerKeys = Object.keys(reducers);
  // {}用来初始化数据，这个state指的是总的库
  return function (state = {}, action) {
    const nextState = {};
    let hasChanged = false; //优化性能操作
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i]; //counter1
      const previousStateForKey = state[key]; //{number:0}
      const reducer = reducers[key]; // function counter1
      const nextStateForKey = reducer(previousStateForKey, action); //{type:add1} => {number:1}
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    // 一旦状态有修改，就去更新
    return hasChanged ? nextState : state;
  };
}

export default combineReducers;
