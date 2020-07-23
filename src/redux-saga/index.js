export default function createSagaMiddleware() {
  // 创建管道，本质是发布订阅，实现take的功能
  function createChannel() {
    let observer = {};
    function subscribe(actionType, callback) {
      // {ASYNCINCREMENT:callback}  callback是一个next方法，可以用来调用it.next用于
      // generator的自执行
      observer[actionType] = callback;
    }
    function publish(action) {
      // action=> {type:ASYNCINCREMENT}
      if (observer[action.type]) {
        //   为了实现take只能监听一次的效果，先保存方法，然后删除，再去调用
        let next = observer[action.type];
        delete observer[action.type];
        // 然后又把action传回给了下边的next方法，然后当调用  let { value: effect, done } = it.next(action);的时候，代码会从yield向下执行
        // 这个时候，传递给 it.next()的action值，会被作为yield表达式的返回值传给外面
        // console.log(action);
        next(action);
      }
    }
    return { publish, subscribe };
  }

  let channel = createChannel();

  // redux saga的中心思想就是先去执行一遍rootSaga，遇到take相关指令就去注册事件订阅，然后每当有动作派发，saga执行的操作就是去直接
  // 发布事件订阅，看有没有事件在之前订阅过，若果有的话就直接把这个动作传给 saga中间件内部的generator执行逻辑去判断
  // 首先是先要去执行一次it.next() 让生成器函数向下执行，可以把action传给it.next（）作为上一个yield左边变量的值
  // 所以 总有 const action = yield take()  因为take监听的动作被触发了，内部拿到了action，又通过it.next(action)传了回来

  // 初始化阶段：
  // redux-saga先创建了一个内部有发布订阅机制的中间件，然后放到中间键数组中去，之后传入root saga并执行run方法，
  // 内部相当于是对这个root saga执行了一次 next的调用， const it = rootSaga()  it.next()
  // 初始化的时候，传入的 action是 undefined   it.next(undefined) 的返回结果 effect是 {type: "TAKE", actionType: "ASYNCINCREAMENT"}
  // 然后判断类型是什么？  如果是 TAKE 则创建了一个事件订阅，等待被发布

  // 派发阶段
  // 当点击了按钮之后，会dispatch一个动作，这个中间件接受到的参数action是 {type: "ASYNCINCREAMENT"}
  // 然后调用it.next( {type: "ASYNCINCREAMENT"})方法，所以generator得意继续向下执行，同时yiled左边的表达式拿到  {type: "ASYNCINCREAMENT"}
  // it.next( {type: "ASYNCINCREAMENT"})的返回结果是  effect= {type: "PUT", action: {type: "INCREAMENT"} }
  // 然后去switch中判断effects对象是哪一种类型，如果类型是put，那么直接派发动作去修改仓库，并执行next方法，向下执行
  function sagaMiddleware({ getState, dispatch }) {
    //   把整个run方法放进sagaMiddleware中，所以内部代码可以拿到dispatch
    // 参数是一个generator函数
    function run(generator) {
      //   自动执行generator
      console.log("开始自动执行这个generator");
      // 支持传入迭代器，如果是传入的是生成器要执行再赋值，如果是迭代器直接赋值
      let it =
        typeof generator[Symbol.iterator] === "function"
          ? generator
          : generator();
      // 第一次执行，next没有传参
      // 第一次执行的时候，会去调用it.next，相当于用户点击已经是第二次it.next()了，
      // 所以这个时候给it.next()传值，值会被赋给第一个yield左边的表达式
      next();
      function next(action) {
        //  it.next()返回的值是yield 后面表达式的值
        //  第一次执行的时候系统自动执行，action是undefined
        //  第一次 effect是 yield表达式的返回值 就是 {type: "TAKE", actionType: "ASYNCINCREAMENT"}
        // type是effect类型，actionType是动作类型
        // 当点击按钮之后, 会派发一个动作，然后发布事件，然后从观察者对象中拿到对应类型注册的方法去执行，进入next方法
        // action传进来的是 {type: "ASYNCINCREAMENT"}
        // 第二次effect是 第二个yield表达式的返回值 就是{type: "PUT", action: {type: "INCREAMENT"} }
        let { value: effect, done } = it.next(action);

        if (!done) {
          if (typeof effect[Symbol.iterator] === "function") {
            run(effect);
            next();
          } else {
            switch (effect.type) {
              //  take是用来监听动作，如果动作执行了，向下继续执行
              // 需要去等待事件的发生，先注册订阅
              // 当点击按钮的时候，会触发这个订阅，在下面中使用channel.publish方法
              //  如果触发这个ASYNC_INCREMENT的时候，会去执行相应的回调
              case "TAKE":
                // 注册的时候把next方法，当做callback放进了观察者对象中
                // 当发布事件的时候，再把对象穿回来这个next方法，然后调用it.next实现了当监听动作发生后，generator会向下执行的功能
                channel.subscribe(effect.actionType, next);
                break;
              // 如果是put，直接去派发动作
              case "PUT":
                dispatch(effect.action);
                // put是同步的操作，所以执行完之后直接调用一次next方法进去，然后next方法里会调用it.next(), 函数会自动向下执行
                next();
              default:
                break;
            }
          }
        }
      }
    }
    sagaMiddleware.run = run;

    return function (next) {
      return function (action) {
        //   通过管道派发一个动作, 然后执行去看publish方法
        // action {type:ASYNCINCREMENT}
        channel.publish(action);
        next(action);
      };
    };
  }

  return sagaMiddleware;
}
