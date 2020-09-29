import React, { Component } from "react";
import Swal from 'sweetalert2'

import AuthService from "../services/auth.service";
import Jumbotron from "./Jumbotron";
import { validateUsername, validateEmail, validatePassword } from "./shared/helpers";
// import userService from "../services/user.service";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  // TODO: There's too much logic here.  Should abstract this away from the component and make async. (CB 9/25)
  handleSignUp(e) {
    e.preventDefault();

    if (!this.state.username || !this.state.email || !this.state.password) {
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
    
      AuthService.signup(
        this.state.username,
        this.state.email,
        this.state.password
      )
        .then( () => {
          this.setState({
            successful: true
          });
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            html: 'You are now registered!<br><br>Redirecting you to your dashboard...',
            showConfirmButton: false,
            timer: 1500
          })
            .then( () => {
              AuthService.login(this.state.username, this.state.password)
              // .then( () => {
              //   userService.createNewUserItems()
              // })
                .then( () => {
                  this.props.history.push("/dashboard");
                  window.location.reload();
                }).catch(error => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                    
                  this.setState({ loading: false });
                  Swal.fire({
                    icon: 'warning',
                    title: 'Oops!',
                    text: `${resMessage} Please try again.`, 
                    footer: 'Or, if you have not yet signed up, please do so.'
                  })
                });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({ successful: false });

          Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: `${resMessage} Please try again.`, 
            footer: 'Or, if you have already signed up, please go to the Log In page.'
          });
        }
      );
    })
  }
}

  render() {
    return (


      <Jumbotron
        largeTitle="Sign Up "
        smallTitle="Quick Budget"
        subtitle="To create an account, please fill out the fields below."
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
                  <label htmlFor="email">Email</label>
                  <input 
                    type="text" 
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange} 
                    className="form-control login-form" 
                    placeholder="youremail@gmail.com" 
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
                  onClick={this.handleSignUp}
                  >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                    )}
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </form>

      </Jumbotron>



    );
  }
}