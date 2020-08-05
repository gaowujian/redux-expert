import React from "react";

import ReactDOM from "react-dom";
import { createHashHistory } from "history";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import * as sagaEffects from "redux-saga/effects";

export { connect };

const NAMESPACE_SEP = "/";
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
    console.log(prefixedModel);
    app._models.push(prefixedModel);
    console.log(app._models);
  }
  function router(routerConfig) {
    app._router = routerConfig;
  }
  function start(containerId) {
    const reducers = getReducers(app);

    const sagaMiddleware = createSagaMiddleware();
    app._store = createStore(reducers, applyMiddleware(sagaMiddleware));
    const sagas = getSagas(app);
    sagas.forEach((saga) => {
      // run就是启动saga执行
      sagaMiddleware.run(saga);
    });
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

// add 变成counter/add  还需要让
function prefix(obj, namespace) {
  return Object.keys(obj).reduce((memo, key) => {
    const newKey = `${namespace}${NAMESPACE_SEP}${key}`;
    // console.log(newKey);
    memo[newKey] = obj[key];
    return memo;
  }, {});
}

function prefixedNamespace(model) {
  // 支持reducers
  if (model.reducers) {
    model.reducers = prefix(model.reducers, model.namespace);
  }
  // 支持effects
  if (model.effects) {
    model.effects = prefix(model.effects, model.namespace);
  }
  return model;
}

function getSagas(app) {
  const sagas = [];
  for (const model of app._models) {
    //需要把effects对象变成一个saga，注意是一个
    // 这一个大的里面，每一个effects方法又有一个watcher的小saga方法
    sagas.push(function* () {
      for (const key in model.effects) {
        // key: counter/asyncAdd     watcher也是一个saga，然后用fork使得这个saga单独执行
        const watcher = getWatcher(key, model.effects[key], model);
        // fork可以单独开一个进程，而不会阻塞当前saga
        yield sagaEffects.fork(watcher);
      }
    });
  }
  return sagas;
}

//
function getWatcher(key, effect, model) {
  // 这边是去重写put方法 使得 effects中可以用 put({type:add})去触发 reducer中的 counter/add
  function put(action) {
    return sagaEffects.put({ ...action, type: prefixType(action.type, model) });
  }

  return function* () {
    // args就是action, { call, put }
    //key counter/asyncAdd
    yield sagaEffects.takeEvery(key, function* (...args) {
      // 这边是去重写put方法 使得 effects中可以用 put({type:add})去触发 reducer中的 counter/add
      yield effect(...args, { ...sagaEffects, put: put });
    });
  };
}

function prefixType(type, model) {
  // 这边是做了一个简单的判断，如果没有命名空间，就需要加上，如果有了就不需要加
  if (type.indexOf(NAMESPACE_SEP) === -1) {
    return `${model.namespace}${NAMESPACE_SEP}${type}`;
  } else {
    // 添加一个警告，在put的时候不需要加namespace，但是不会去阻止动作
    console.error(
      `Warning: [sagaEffects.put] ${type} should not be prefixed with namespace ${model.namespace}`
    );
  }
  return type;
}
