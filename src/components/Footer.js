import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return(

      <footer class="footer-nav navbar navbar-expand navbar-dark bg-dark justify-content-center">

        <div className="navbar-nav spacing-navbar-nav">
          <div className="nav-item">
            © 2020 Cody Brock
          </div>
        </div>

        <div className="navbar-nav spacing-navbar-nav">
          <div className="nav-item nav-link footer-nav-link">
            <a href="https://github.com/cody-brock">Github</a>
          </div>
        </div>

        <div className="navbar-nav spacing-navbar-nav">
          <div className="nav-item nav-link footer-nav-link">
            <a href="https://codybrock.dev/">Portfolio</a>
          </div>
        </div>

        <div className="navbar-nav spacing-navbar-nav">
          <div className="nav-item nav-link footer-nav-link">
            <a href="https://www.linkedin.com/in/cody-brock-dev/">LinkedIn</a>
          </div>
        </div>
      
      </footer>

    )
  }
}

export default Footer;