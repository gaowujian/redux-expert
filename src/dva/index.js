import React from "react";

import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers } from "redux";
export { connect };
export default function (opts = {}) {
  const history = opts.history || createHashHistory();
  let app = {
    model,
    _models: [],
    router,
    _router: null,
    start,
  };
  function model(model) {
    app._models.push(model);
  }
  function router(routerConfig) {
    app._router = routerConfig;
  }
  function start(containerId) {
    const reducers = getReducers(app);
    app._store = createStore(reducers);
    ReactDOM.render(
      <Provider store={app._store}>{app._router()}</Provider>,
      document.querySelector(containerId)
    );
  }
  return app;
}

function getReducers(app) {
  // 此对象会被用来做合并
  // 目标reducers是 {counter:function reducer(){},counter2:function reducer(){}}
  const reducers = {};
  const models = app._models;
  //   models  [{namespace:counter,reducers:{},effects:{}}]
  for (const model of models) {
    reducers[model.namespace] = function (state = model.state, action) {
      // 先获取模型的所有reducers
      const model_reducers = model.reducers;
      // 获取指定的reducer 等价于原来的一条switch case分支
      let reducer = model_reducers[action.type];
      if (reducer) {
        return reducer(state, action);
      }
      return state;
    };
  }

  return combineReducers(reducers);
}
