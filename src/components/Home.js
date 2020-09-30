import React, { Component } from "react";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";

import Jumbotron from "./Jumbotron";

// For Routes
import Budget from "./Budget";
import Login from "./Login";
import SignUp from "./SignUp";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (

      <Jumbotron
        largeTitle="Welcome to "
        smallTitle="Quick Budget"
        subtitle="Create a snapshot of your monthly finances."
        >

          <div className="welcome-list">
            <div className="welcome-list-text">
              <i className="fas fa-check-circle welcome-list-icon"></i>   Quick Budget guides you through entering your monthly income and expenses
            </div>
            <div className="welcome-list-text">
              <i className="fas fa-chart-bar welcome-list-icon"></i> We'll crunch the numbers and let you know your monthly surplus or shortfall
            </div>
            <div className="welcome-list-text">
              <i className="far fa-clock welcome-list-icon"></i> Your budget is stored here, so you can return and adjust whenever needed
            </div>
          </div>

          <div className="row home-buttons">
            <div className="col-sm-12">
              <Link to={"/budget"}>
                <button type="button" className="btn btn-start-now">Start Now</button>
              </Link>
              <br />
              <Link to={"/login"}>
                <button type="button" className="btn btn-login">Sign In</button>
              </Link>
              <br />
              <Link to={"/signup"}>
                <button type="button" className="btn btn-signup">Sign Up</button>
              </Link>
            </div>
            <Switch>
              <Route exact path="/budget" component={Budget} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
            </Switch>
          </div>

        </Jumbotron>

    );
  }
}