import React, { Component } from 'react';

import Box from './Box.js';
import Summary from './Summary.js';
import './App.css';

class App extends Component {
  static defaultProps = {
    // Old version: incomeData: {title: 'income', fields: ['salary', 'savings', 'other']},
    incomeData: {
      title: 'income', 
      fields: [
        {fieldTitle: 'salary', fieldDescription: 'Salary description here'},
        {fieldTitle: 'savings', fieldDescription: 'Savings description here'},
        {fieldTitle: 'other', fieldDescription: 'Other description here'},
      ]
    },

    // Old version: expensesData: {title: 'expenses', fields: ['food', 'electricity', 'groceries']},
    expensesData: {               
      title: 'expenses', 
      fields: [
        {fieldTitle: 'food', fieldDescription: 'Food description here'},
        {fieldTitle: 'electricity', fieldDescription: 'Electricity description here'},
        {fieldTitle: 'groceries', fieldDescription: 'Groceries description here'},
      ]
    },
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
    // console.log("updateTotals triggered");
    // console.log('name: ', name, 'num: ', num)

    this.setState({[name]: +num}, () => {

      let incomeTotal = 0;
      this.props.incomeData.fields.forEach(elem => {
        incomeTotal += this.state[elem.fieldTitle];
      });
      // console.log('incomeTotal: ', incomeTotal);
      this.setState({incomeTotal: incomeTotal});

      let expensesTotal = 0;
      this.props.expensesData.fields.forEach(elem => {
        expensesTotal += this.state[elem.fieldTitle];
      });
      // console.log('expensesTotal: ', expensesTotal);
      this.setState({expensesTotal: expensesTotal});
      
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="App-title">
            Quick Budget
          </div>
          <div className="App-subtitle">
            A quick and easy reference tool to calculate your basic monthly budget.
          </div>
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
