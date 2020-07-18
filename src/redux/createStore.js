function createStore(reducer) {
  let state;
  let listeners = [];
  function getState() {
    // 原生redux库是没有进行深拷贝的，所以可以通过修改getState的结果来修改内部state
    return JSON.parse(JSON.stringify(state));
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((fn) => fn());
  }
  function subscribe(fn) {
    listeners.push(fn);
    return function () {
      listeners = listeners.filter((listener) => listener !== fn);
    };
  }
  // 用于初始化 store的内部状态
  dispatch("@@REDUX_INIT");
  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore;
