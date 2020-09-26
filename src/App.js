import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "./components/Layout";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import BoardUser from "./components/BoardUser";
import Budget from"./components/Budget"

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <Router>
          <div>

            <Layout 
              currentUser={currentUser}
              logOut={this.logOut}
            >

              <div className="container mt-3">
                <Switch>
                  <Route exact path={["/", "/home"]} component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/budget" component={Budget} />
                  <Route path="/user" component={BoardUser} />
                </Switch>
              </div>

            </Layout>

          </div>
        </Router>
      </div>
    );
  }
}

export default App;