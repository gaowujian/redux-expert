import routerMiddleware from "./routerMiddleware";
import ConnectedRouter from "./ConnectedRouter";
import push from "./push";
import connectRouter from "./connectRouter";
export {
  routerMiddleware, // 创建一个路由中间件，传入history对象
  connectRouter, //创建router reducer，接受一个history对象
  ConnectedRouter, //创建一个路由容器
  push, //跳转方法
};
