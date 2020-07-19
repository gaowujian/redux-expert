import React from "react";
import ReduxContext from "./context";
import bindActionCreators from "../redux/bindActionCreators";
// 关联仓库和组件
function connect(mapStateToProps, actions) {
  return function (WrappedComponent) {
    return class extends React.Component {
      static contextType = ReduxContext;
      constructor(props, context) {
        super(props);
        // 过滤对象，只获取组件需要的state
        this.state = mapStateToProps(context.store.getState());
        console.log(this.state);
      }
      componentDidMount() {
        this.unsubscribe = this.context.store.subscribe(() => {
          // 订阅修改一旦store中的状态修改，就通过setState修改被装饰后组件的状态
          this.setState(mapStateToProps(this.context.store.getState()));
        });
      }
      // 注意是willUnmount 而不是willmount
      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const boundActions = bindActionCreators(
          actions,
          this.context.store.dispatch
        );
        return <WrappedComponent {...this.state} {...boundActions} />;
      }
    };
  };
}

export default connect;
