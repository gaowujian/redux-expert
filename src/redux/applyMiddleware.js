function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer) {
      const store = createStore(reducer);
      let dispatch;
      let middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => {
          dispatch(action);
        },
      };

      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      const [promise, thunk, logger] = chain;

      const loggerDispatch = logger(store.dispatch);
      const thunkDispatch = thunk(loggerDispatch);
      const promiseDispatch = promise(thunkDispatch);

      // 固定了store中的dispatch
      dispatch = promiseDispatch;

      store.dispatch = dispatch;
      console.log("store.dispatch:", store.dispatch); // promiseDispatch()
      return store;
    };
  };
}

export default applyMiddleware;
