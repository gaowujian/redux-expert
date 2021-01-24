import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { combineReducers, createStore } from "redux";
export { connect };
function dva() {
  const app = {
    _models: [],
    model,
    router,
    _router: null,
    start,
  };
  const initialReducers = {};

  function model(model) {
    const prefixedModel = prefixNamespace(model);
    app._models.push(prefixedModel);
  }

  function router(router) {
    app._router = router;
  }

  function start(root) {
    for (let model of app._models) {
      initialReducers[model.namespace] = getReducer(model);
    }

    // !这里传入了之前累计的initialReducers
    const rootReducer = createReducer(initialReducers);
    const store = createStore(rootReducer);
    ReactDOM.render(
      <Provider store={store}>{app._router()}</Provider>,
      document.querySelector(root)
    );
  }

  function createReducer(reducers) {
    return combineReducers(reducers);
  }

  // 根据model信息创建一个reducer
  function getReducer(model) {
    const { state: initialState, reducers } = model;
    const reducer = function (state = initialState, action) {
      // 原来的switch case变成了一个分支reducer处理函数
      // model在注册的时候，reducers方法已经加过了前缀
      // 所以默认传过来的必须是 counter/add才能处理
      let reducer = reducers[action.type];
      if (reducer) {
        return reducer(state, action);
      }
      return state;
    };
    return reducer;
  }

  // 修改model，让reducers的方法，携带namespace
  function prefixNamespace(model) {
    if (model.reducers) {
      model.reducers = prefix(model.reducers, model.namespace);
    }
    if (model.effects) {
      model.effects = prefix(model.effects, model.namespace);
    }
    return model;
  }
  // 通用方法，用来给一个对象的属性添加prefix，并返回下新对象
  function prefix(obj, namespace) {
    return Object.keys(obj).reduce((memo, key) => {
      const newKey = `${namespace}/${key}`;
      // !这里是obj[key]
      memo[newKey] = obj[key];
      return memo;
    }, {});
  }
  return app;
}

export default dva;
