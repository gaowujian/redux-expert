import React from "react";
class PureComponent extends React.Component {
  static isPureComponent = true;

  //   询问组件是否刷新
  shouldComponentUpdate(nextProps, nextState) {
    //   判断前后是否都是object且都不为空
    let oldProps = this.props;

    // debugger;
    // 属性值为空或者属性值为null
    // debugger;
    if (
      oldProps === null ||
      typeof oldProps !== "object" ||
      nextProps === null ||
      typeof nextProps !== "object"
    ) {
      return true;
    }
    // 属性长度不一致
    if (Object.keys(oldProps).length !== Object.keys(nextProps).length) {
      return true;
    }
    // 如果新接收到props中，没有老属性中的某个属性，或者相同属性名，没有指向同一个引用
    for (const key in oldProps) {
      if (!nextProps.hasOwnProperty(key) || nextProps[key] !== oldProps[key]) {
        return true;
      }
    }
    return false;
  }
}

export default PureComponent;
