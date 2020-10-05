// *************************************************************************************************************
// Login.js - Component with forms for user to login.  Validates user input, makes API call to log user in.
// *************************************************************************************************************

// Dependencies
import React, { Component } from "react";
import AuthService from "../services/auth.service";

// Project Components
import Jumbotron from "./Jumbotron";
import { verifyLogin, errorAlert } from "./shared/helpers";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  async handleLogIn(e) {
    e.preventDefault();
    this.setState({ loading: true });

    let [alert, result] = verifyLogin(this.state.username, this.state.password);

    if (result === false) {
      await alert;
      this.setState({ loading: false });
    } else {

      try {
        await AuthService.login(this.state.username, this.state.password)
        await alert;
        this.props.history.push("/dashboard");
        window.location.reload();
      } catch (error) {
        console.log(error);
        errorAlert(error);
        this.setState({ loading: false });
      }

    }
  }

  render() {
    return (

      <Jumbotron
        largeTitle="Log In "
        smallTitle="Quick Budget"
        subtitle="If you already have an account, enter your information below."
      >

        <form>
          <div className="form-group">

            <div className="row">
              <div className="col-sm-12">
                <div className="card login-label">

                  <label htmlFor="username">Username</label>
                  <input 
                    type="text" 
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange} 
                    className="form-control login-form" 
                    placeholder="Enter Username Here" 
                  />

                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card login-label">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange} 
                    className="form-control login-form" 
                    placeholder="Enter Password Here"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <button
                  className="btn btn-signup"
                  disabled={this.state.loading}
                  onClick={this.handleLogIn}
                  >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                    )}
                  <span>Log In</span>
                </button>
              </div>
            </div>

          </div>
        </form>

      </Jumbotron>

    );
  }
}
