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

  constructor(props) {
    super(props);
    this.state = {
      salary: 0,
      savings: 0,
      other: 0,
      totalIncome: 0,
      food: 0,
      electricity: 0,
      groceries: 0,
      totalExpenses: 0,
    }
    this.updateTotals = this.updateTotals.bind(this);
  }

  updateTotals(name, num) {
    console.log('name: ', name, 'num: ', num)

    this.setState({[name]: +num}, () => {
      let incomeTotal = 0;
      this.props.boxData[0].fields.forEach(elem => {
        incomeTotal += this.state[elem]
      });
      console.log('incomeTotal: ', incomeTotal);
      this.setState({totalIncome: incomeTotal})

      let expensesTotal = 0;
      this.props.boxData[1].fields.forEach(elem => {
        expensesTotal += this.state[elem]
      });
      console.log('expenseTotal: ', expensesTotal);
      this.setState({totalExpense: expensesTotal});
      
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1>Budget App</h1>
          <Box 
            boxData={this.props.boxData} 
            updateTotals={this.updateTotals} 
          />
        </div>
      </div>
    );
  }
}

export default App;
