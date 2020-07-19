import React from "react";
import { connect } from "../react-redux";
import { store } from "../index";
// import { boundCounter1Actions } from "../index";
import * as counter1Actions from "../redux/actions/counter1";
class Counter1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.counter1;
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      console.log(this.props);
      console.log(nextProps);
      return true;
    } else {
      return false;
    }
  }
  render() {
    return (
      <div>
        <h1>Counter案例</h1>
        <p>number:{this.props.number}</p>
        <button onClick={this.props.add}>+</button>
        <button onClick={this.props.minus}>-</button>
      </div>
    );
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState().counter1);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

const mapStateToProps = (state) => state.counter1;
export default connect(mapStateToProps, counter1Actions)(Counter1);
