import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Budget from './Budget';
import SignUp from './SignUp'
import Nav from './Nav';

import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={SignUp} />
            <Route exact path="/budget" component={Budget} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
