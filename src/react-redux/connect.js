import React from "react";
import ReduxContext from "./context";
import bindActionCreators from "../redux/bindActionCreators";

// 关联仓库和组件
function connect(mapStateToProps, actions) {
  return function (WrappedComponent) {
    return class extends React.Component {
      // 用于接收Context对象
      static contextType = ReduxContext;
      constructor(props, context) {
        super(props);
        // 过滤对象，只获取组件需要的state
        this.state = mapStateToProps(context.store.getState());
        // 初始化的时候，直接把dispatch包装过的对象绑定到类上，避免在render的时候去绑定
        // 导致每次渲染的时候，action对象会被重新创建，所以PureComponent的浅比较无法拦截对象引用变化
        this.boundActions = bindActionCreators(actions, context.store.dispatch);
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          // 订阅修改一旦store中的状态修改，就通过setState修改被装饰后组件的状态
          // 但是这里不是为了做精细化，只要状态树有一点点变化，就会直接渲染，但是是否渲染
          // 要在shouldComponentUpdate中去进行控制
          this.setState(mapStateToProps(this.context.store.getState()));
        });
      }
      // 注意是willUnmount 而不是willmount
      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        // this.state是处理过的状态
        // this.boundActions是处理过的dispatch方法集合
        return <WrappedComponent {...this.state} {...this.boundActions} />;
      }
    };
  };
}

export default connect;
