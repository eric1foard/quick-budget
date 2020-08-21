import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/js/all.js';

import Login from "./Login";
import Register from "./Register";
import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          
          <div className="jumbotron jumbo-welcome">
          <div className="row">
            <div className="col-sm-12 welcome-logo">
              <span className="welcome-to">Welcome to </span>Quick Budget
            </div>
            <div className="col-sm-12 welcome-subtitle">
              <div className="subtitle">
                Create a snapshot of your monthly finances.
              </div>
              <div className="welcome-list">
                <div className="welcome-list-text">
                  <i class="fas fa-check-circle welcome-list-icon"></i>   Quick Budget guides you through entering your monthly income and expenses
                </div>
                <div className="welcome-list-text">
                  <i class="fas fa-chart-bar welcome-list-icon"></i> We'll crunch the numbers and let you know your monthly surplus or shortfall
                </div>
                <div className="welcome-list-text">
                  <i class="far fa-clock welcome-list-icon"></i> Your budget is stored here, so you can return and adjust whenever needed
                </div>
              </div>
            </div>
          </div>
        
          <div className="row home-buttons">
            <div className="col-sm-12">
              <Link to={"/login"} className="">
                <button type="button" class="btn btn-login">Sign In</button>
              </Link>
              <br />
              <Link to={"/register"} className="">
                <button type="button" class="btn btn-register">Register</button>
              </Link>
            </div>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
          </div>
          </div>


          <div className="row">
            <div className="col-sm-12">
              <h3>{this.state.content}</h3>
            </div>
          </div>

        </div>
      </div>
    );
  }
}