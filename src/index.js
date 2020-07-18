import React from "react";
import ReactDOM from "react-dom";
import { createContext } from "./React";
const ThemeContext = createContext(null);
class Home extends React.Component {
  state = {
    color: "red",
  };

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        <Header></Header>
        <Body></Body>
        <button
          onClick={() => {
            this.setState({ color: "red" });
          }}
        >
          红色
        </button>
        <button
          onClick={() => {
            this.setState({ color: "green" });
          }}
        >
          绿色
        </button>
      </ThemeContext.Provider>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => {
          return (
            <div
              style={{ border: `2px solid ${value.color}`, padding: "10px" }}
            >
              我是头部
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

class Body extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => {
          return (
            <div
              style={{ border: `2px solid ${value.color}`, padding: "10px" }}
            >
              我是主体
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById("root"));
