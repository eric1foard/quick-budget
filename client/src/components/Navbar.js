// ********************************************************************************************
// Navbar.js - Component appearing on all pages.  Provides links to different pages in site.
// ********************************************************************************************

// Dependencies
import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom"; // Although Router is not used in this component, it has to be here because removing it affects the styling of Navbar.


// Navbar is placed above the rest of the App.  It uses react-router-dom to direct the user.
// Depending on whether someon is signed in, it will display different options.
class Navbar extends Component {
  
  render() {
    return(
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {/* LEFT SIDE of Navbar */}
        <Link to={"/"} className="navbar-brand">
          Quick Budget
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {/* Is a user signed in? */}
          {this.props.currentUser 
          ? 
            // If yes, then display 1) their username as a link to their Dashboard, and 2) a link to Budget.
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
          :
            // If no user, then display a "Start Now" link that takes them to Budget page.
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/budget"} className="nav-link">
                  Start Now
                </Link>
              </li>
            </div>
          }
        </div>
        {/* End left side of Navbar */}

        
        {/* RIGHT SIDE of Navbar */}
        {/* Is a user signed in? */}
        {this.props.currentUser 
        ? 
          // If yes, then display Log Out
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={this.props.logOut}>
                Log Out
              </a>
            </li>
          </div>
        : 
          // If no, then display 1) Log In, and 2) Sign Up
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
        }
        {/* End right side of Navbar */}
      </nav>
    )
  }
}

export default Navbar;
