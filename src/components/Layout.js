import React, { Component } from 'react';

import Navbar from './Navbar';
import Footer from './Footer';
import "../App.css";

class Layout extends Component {
  render() {
    return(
      <div className="layout">

        <div>
          <Navbar 
            currentUser={this.props.currentUser}
          />
        </div>

        <div>
          {this.props.children}
        </div>

        {/* <div>
          <Footer />
        </div> */}

      </div>
    )
  }
}

export default Layout;