function createStore(reducer, preloadedState) {
  let state = preloadedState;
  const listeners = [];
  function getState() {
    return state;
  }
  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners.filter((item) => item !== listener);
    };
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }
  // 这个是为了初始化所有reducer内的默认 initialState
  // 因为这个action 的type一般不会匹配，会走每个reducer最后的default
  dispatch({ type: "@@REDUX/INIT" });
  return {
    getState,
    subscribe,
    dispatch,
  };
}

export default createStore;
