import React, { Component } from 'react';

import Navbar from './Navbar';
import "../App.css";

class Layout extends Component {
  render() {
    return(
      <div className="layout">

        <div>
          <Navbar 
            currentUser={this.props.currentUser}
            logOut={this.props.logOut}
          />
        </div>

        <div>
          {this.props.children}
        </div>

        {/* TODO: Add a footer in.  Tried extensively, but had issues with it rendering
        ... in the middle of the Budget component.  (CLB 9/24/20) */}
        {/* <div>
          <Footer />
        </div> */}

      </div>
    )
  }
}

export default Layout;