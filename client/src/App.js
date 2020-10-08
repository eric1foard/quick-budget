// *************************************************************************************************************
// App.js - Main component, holding all others.
// *************************************************************************************************************

// Dependencies
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Project Components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Budget from"./components/Budget"

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import AuthService from "./services/auth.service";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    AuthService.logout();
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) this.setState({ currentUser: user });
  }


  render() {
    const { currentUser } = this.state;

    return (
      <Router>
          
        <Navbar currentUser={currentUser} logOut={this.logOut} />

        <div className="App">
          <div className="container">

            <div className="mt-3">
              <Switch>
                <Route exact path={["/", "/home"]} component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/budget" component={Budget} />
              </Switch>
            </div>

          </div>
        </div>

        <Footer />

      </Router>
    );
  }
}

export default App;
