import React from "react";

import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import * as sagaEffects from "redux-saga/effects";

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
    const prefixedModel = prefixedNamespace(model);
    app._models.push(prefixedModel);
  }
  function router(routerConfig) {
    app._router = routerConfig;
  }
  function start(containerId) {
    const reducers = getReducers(app);

    const sagaMiddleware = createSagaMiddleware();
    app._store = createStore(reducers, applyMiddleware(sagaMiddleware));
    const sagas = getSagas(app);
    sagaMiddleware.run(sagas);
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
  console.log(models);
  //   models  [{namespace:counter,reducers:{},effects:{}}]
  for (const model of models) {
    reducers[model.namespace] = function (state = model.state, action) {
      // 先获取模型的所有reducers
      const model_reducers = model.reducers;

      console.log(model);
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

// add 变成counter/add
function prefixedNamespace(model) {
  let reducers = model.reducers;
  model.reducers = Object.keys(reducers).reduce((memo, key) => {
    const newKey = `${model.namespace}\/${key}`;
    // console.log(newKey);
    memo[newKey] = reducers[key];
    return memo;
  }, {});
  return model;
}

// 需要把每一个effect都转换成一个saga然后让saga中间件去监听
function getSagas(app) {
  const sagas = [];
  for (const model of app.models) {
    sagas.push(function* () {
      for (const key in model.effects) {
        const watcher = getWatcher(key, model.effects[key], model);
        yield sagaEffects.fork(watcher);
      }
    });
  }
  return sagas;
}

function getWatcher(params) {
  return function* (params) {};
}
