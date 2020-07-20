export default function createSagaMiddleware() {
  function sagaMiddleware({ getState, dispatch }) {
    return function (next) {
      return function (action) {
        next(action);
      };
    };
  }
  // 参数是一个generator函数
  function run(generator) {
    //   自动执行generator
    console.log("开始自动执行这个generator");
  }
  sagaMiddleware.run = run;
  return sagaMiddleware;
}
