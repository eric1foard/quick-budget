import React, { Component } from 'react';

import Box from './Box.js';
import './App.css';

class App extends Component {
  static defaultProps = {
    boxData: [
      {title: 'income', fields: ['salary', 'savings', 'other']},
      {title: 'expenses', fields: ['food', 'electricity', 'groceries']}
    ]
  }

  render() {
    return (
      <div className="App">
        <h1>Budget App</h1>

        <Box boxData={this.props.boxData} />

      </div>
    );
  }
}

export default App;
