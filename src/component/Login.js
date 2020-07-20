import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/login";
class Login extends Component {
  constructor() {
    super();
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  login = (e) => {
    e.preventDefault();
    let username = this.usernameRef.current.value;
    let password = this.passwordRef.current.value;
    console.dir(this.usernameRef.current);
    this.props.login(username, password);
  };

  logout = () => {
    this.props.logout();
  };
  render() {
    let loginForm = (
      <form action="">
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" ref={this.usernameRef} />
        <label htmlFor="password">密码</label>
        <input type="text" id="password" ref={this.passwordRef} />
        <button onClick={this.login}>登录</button>
      </form>
    );
    let logoutForm = (
      <form action="">
        <label htmlFor="username">用户名{this.props.token}</label>
        <button onClick={this.logout}>退出</button>
      </form>
    );
    return <>{this.props.token ? logoutForm : loginForm}</>;
  }
}
// {username:tony}
export default connect((state) => state.user, actions)(Login);
