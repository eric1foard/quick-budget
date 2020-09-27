import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class Navbar extends Component {
  


  render() {
    return(
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Quick Budget
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {this.props.currentUser && (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/dashboard"} className="nav-link">
                  {this.props.currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/budget"} className="nav-link">
                  Budget
                </Link>
              </li>
            </div>
          )}
        </div>

        {this.props.currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={this.props.logOut}>
                Log Out
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Log In
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    )
  }
}

export default Navbar;
