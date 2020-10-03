import React, { Component } from "react";
import Swal from 'sweetalert2'

import AuthService from "../services/auth.service";
import Jumbotron from "./Jumbotron";
import { verifySignUp, errorAlert, successfulSignUpAlert } from "./shared/helpers";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      loading: false
    };
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  // TODO: There's too much logic here.  Should abstract this away from the component and make async. (CB 9/25)
  async handleSignUp(e) {
    e.preventDefault();

    let [alert, result] = verifySignUp(this.state.username, this.state.email, this.state.password);
    this.setState({ loading: true });
    
    if (result === false) {
      await alert;
    } else {
      try {
        await AuthService.signup(this.state.username, this.state.email, this.state.password)
        await successfulSignUpAlert();

        try {
          await AuthService.login(this.state.username, this.state.password);
          this.props.history.push("/dashboard");
          window.location.reload();
        } catch (error) {
          // TODO - MDN docs imply nested catch statements are unnecessary.  Ask someone if that's OK (CB 10/3)
          console.log(error);
          errorAlert(error);
          this.setState({ loading: false });
        }

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