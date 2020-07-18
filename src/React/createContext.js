import React from "react";
export default function createContext() {
  // context 信息
  let value;
  const Provider = class extends React.Component {
    constructor(props) {
      super(props);
      //   初始化内部value信息
      value = props.value;
    }

    // 当点击事件触发的时候，会修改自身的state，并传递state值给Provider组件，所以会触发这个声明周期函数
    static getDerivedStateFromProps(nextProp, prevState) {
      //   更新context的内部信息
      value = nextProp.value;
      return { value: nextProp.value };
    }

    render() {
      return <>{this.props.children}</>;
    }
  };

  const Consumer = class extends React.Component {
    render() {
      // 传递最新的value值给Consumer包裹的组件
      return <div>{this.props.children(value)}</div>;
    }
  };
  return {
    Provider,
    Consumer,
  };
}
