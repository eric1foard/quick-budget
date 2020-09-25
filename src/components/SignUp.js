import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import Swal from 'sweetalert2'

import AuthService from "../services/auth.service";

// TODO:
// 1) error handling
// 2) Have it also log the person in
// 3) Have it redirect them to dashboard

const required = value => {
  if (!value) {
    return (
      false
    );
  }
};

const validateEmail = value => {
  if (!isEmail(value)) {
    return (
      false
    );
  }
};

const validateUsername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      false
    );
  }
};

const validatePassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      false
    );
  }
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSignUp(e) {
    e.preventDefault();

    if (required(this.state.username) || required(this.state.email) || required(this.state.password) === false) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please fill out all forms.',
      });
    } else if (validateEmail(this.state.email) === false) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please enter a valid email address.',
      });
    } else  if (validateUsername(this.state.username) === false) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Username must be between 3 and 20 characters long.',
      });
    } else if (validatePassword(this.state.password) === false) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Password must be between 6 and 40 characters long.',
      });
    } else {
      this.setState({
        message: "",
        successful: false
      });
    

      // this.form.validateAll();
    

      if (this.checkBtn.context._errors.length === 0) {
        AuthService.signup(
          this.state.username,
          this.state.email,
          this.state.password
        ).then(
          response => {
            this.setState({
              // message: response.data.message,
              successful: true
            });
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMessage
            });
          }
        );
      }
    }
  }

  render() {
    return (


      <div>
        <div className="App">
          <div className="container">
            <div className="jumbotron jumbo">
              <div className="row">
                <div className="col-sm-12 logo">
                  <span className="welcome-to">Sign Up </span>Quick Budget
                </div>
                <div className="col-sm-12 welcome-subtitle">
                  <div className="subtitle">
                    To create an account, please fill out the fields below.
                  </div>

                  <div className="col-md-12">
                    <div className="">
                      <Form
                        onSubmit={this.handleSignUp}
                        ref={c => {
                          this.form = c;
                        }}
                      >

                        <div className="form-group login-label">
                          <label htmlFor="username">Username</label>
                          <Input
                            type="text"
                            className="form-control login-form"
                            name="username"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required, validateUsername]}
                          />
                        </div>

                        <div className="form-group login-label">
                          <label htmlFor="email">Email</label>
                          <Input
                            type="text"
                            className="form-control login-form"
                            name="email"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            validations={[required, validateEmail]}
                          />
                        </div>


                        <div className="form-group login-label">
                          <label htmlFor="password">Password</label>
                          <Input
                            type="password"
                            className="form-control login-form"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required, validatePassword]}
                          />
                        </div>



                        <div className="form-group">
                          <button
                            className="btn btn-signup"
                            disabled={this.state.loading}
                          >
                            {this.state.loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                          </button>
                        </div>

                        {this.state.message && (
                          <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                              {this.state.message}
                            </div>
                          </div>
                        )}
                        <CheckButton
                          style={{ display: "none" }}
                          ref={c => {
                            this.checkBtn = c;
                          }}
                        />
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>











          // <Form
          //   onSubmit={this.handleSignUp}
          //   ref={c => {
          //     this.form = c;
          //   }}
          // >
          //   {!this.state.successful && (
          //     <div>
          //       <div className="form-group">
          //         <label htmlFor="username">Username</label>
          //         <Input
          //           type="text"
          //           className="form-control"
          //           name="username"
          //           value={this.state.username}
          //           onChange={this.onChangeUsername}
          //           validations={[required, vusername]}
          //         />
          //       </div>

          //       <div className="form-group">
          //         <label htmlFor="email">Email</label>
          //         <Input
          //           type="text"
          //           className="form-control"
          //           name="email"
          //           value={this.state.email}
          //           onChange={this.onChangeEmail}
          //           validations={[required, email]}
          //         />
          //       </div>

          //       <div className="form-group">
          //         <label htmlFor="password">Password</label>
          //         <Input
          //           type="password"
          //           className="form-control"
          //           name="password"
          //           value={this.state.password}
          //           onChange={this.onChangePassword}
          //           validations={[required, vpassword]}
          //         />
          //       </div>

          //       <div className="form-group">
          //         <button className="btn btn-primary btn-block">Sign Up</button>
          //       </div>
          //     </div>
          //   )}

          //   {this.state.message && (
          //     <div className="form-group">
          //       <div
          //         className={
          //           this.state.successful
          //             ? "alert alert-success"
          //             : "alert alert-danger"
          //         }
          //         role="alert"
          //       >
          //         {this.state.message}
          //       </div>
          //     </div>
          //   )}
          //   <CheckButton
          //     style={{ display: "none" }}
          //     ref={c => {
          //       this.checkBtn = c;
          //     }}
          //   />
          // </Form>

    );
  }
}