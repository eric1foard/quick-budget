import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import Swal from 'sweetalert2'

import '../App.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    if (!this.state.username && !this.state.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please enter a username and password.',
      });
    } else if (!this.state.username) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please enter a username.',
      });
    } else  if (!this.state.password) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please enter a password.',
      });
    } else {
      this.setState({
        message: "",
        loading: true
      });
  
      this.form.validateAll();
  
      if (this.checkBtn.context._errors.length === 0) {
        
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'You are now logged in.  Redirecting you to your dashboard.',
          showConfirmButton: false,
          timer: 1500
        }).then( () => {
          AuthService.login(this.state.username, this.state.password).then(
            () => {
              this.props.history.push("/profile");
              window.location.reload();
            },
            error => {
              const resMessage =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();
  
                console.log(resMessage);
                
                this.setState({
                  loading: false,
                  // message: resMessage
                });
                
                Swal.fire({
                  icon: 'warning',
                  title: 'Oops!',
                  text: resMessage,
                })
            }
          );

        });

      } else {
        this.setState({
          loading: false
        });
      }
    }
  }

  render() {
    // ...Also, it would be nice to have a "successful" message from sweetAlert.
    return (
      <div>
        <div className="App">
          <div className="container">
            <div className="jumbotron jumbo">
              <div className="row">
                <div className="col-sm-12 logo">
                  <span className="welcome-to">Sign In </span>Quick Budget
                </div>
                <div className="col-sm-12 welcome-subtitle">
                  <div className="subtitle">
                    If you already have an account, enter your username and password below.
                  </div>

                  <div className="col-md-12">
                    <div className="">
                      <Form
                        onSubmit={this.handleLogin}
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
                            // validations={[this.required]}
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
                            // validations={[this.required]}
                          />
                        </div>



                        <div className="form-group">
                          <button
                            className="btn btn-register"
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
    );
  }
}