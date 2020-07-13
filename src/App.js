import React, { Component } from 'react';

import Box from './Box.js';
import Summary from './Summary.js';
import './App.css';

class App extends Component {
  static defaultProps = {
    incomeData: {title: 'income', fields: ['salary', 'savings', 'other']},
    expensesData: {title: 'expenses', fields: ['food', 'electricity', 'groceries']}
  }

  constructor(props) {
    super(props);
    this.state = {
      salary: 0,
      savings: 0,
      other: 0,
      incomeTotal: 0,
      food: 0,
      electricity: 0,
      groceries: 0,
      expensesTotal: 0,
    }
    this.updateTotals = this.updateTotals.bind(this);
  }

  updateTotals(name, num) {
    console.log('name: ', name, 'num: ', num)

    this.setState({[name]: +num}, () => {
      let incomeTotal = 0;
      this.props.incomeData.fields.forEach(elem => {
        incomeTotal += this.state[elem]
      });
      console.log('incomeTotal: ', incomeTotal);
      this.setState({incomeTotal: incomeTotal})

      let expensesTotal = 0;
      this.props.expensesData.fields.forEach(elem => {
        expensesTotal += this.state[elem]
      });
      console.log('expensesTotal: ', expensesTotal);
      this.setState({expensesTotal: expensesTotal});
      
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Budget App</h1>
          <Box 
            boxData={this.props.incomeData} 
            updateTotals={this.updateTotals}
            total={this.state.incomeTotal}
          />
          <Box 
            boxData={this.props.expensesData} 
            updateTotals={this.updateTotals} 
            total={this.state.expensesTotal}
          />
          <Summary 
            totalIncome={this.state.incomeTotal}
            totalExpenses={this.state.expensesTotal}
          />
        </div>
      </div>
    );
  }
}

export default App;
