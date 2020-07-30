import React, { Component } from 'react';

import Box from './Box.js';
import Summary from './Summary.js';
import './App.css';

class App extends Component {

  // defaultProps contains the information for various fields used by other components, 
  //  ...split into income and expenses.
  static defaultProps = {
    incomeData: {
      title: 'income', 
      fields: [
        {fieldTitle: 'salary', fieldDescription: 'Salary description here'},
        {fieldTitle: 'savings', fieldDescription: 'Savings description here'},
        {fieldTitle: 'other', fieldDescription: 'Other description here'},
      ]
    },

    expensesData: {               
      title: 'expenses', 
      fields: [
        {fieldTitle: 'food', fieldDescription: 'Food description here'},
        {fieldTitle: 'electricity', fieldDescription: 'Electricity description here'},
        {fieldTitle: 'groceries', fieldDescription: 'Groceries description here'},
      ]
    },
  }

  // State is used to store the amounts the user enters, and to calculate inferences.
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

  // updateTotals is triggered every time a field is changed.
  //  ...It calculates the total income and expenses.
  updateTotals(name, num) {
    this.setState({[name]: +num}, () => {

      // Calculate total income
      let incomeTotal = 0;
      this.props.incomeData.fields.forEach(elem => {
        incomeTotal += this.state[elem.fieldTitle];
      });
      this.setState({incomeTotal: incomeTotal});

      // Calculate total expenses
      let expensesTotal = 0;
      this.props.expensesData.fields.forEach(elem => {
        expensesTotal += this.state[elem.fieldTitle];
      });
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

          {/* Box with income information */}
          <Box 
            boxData={this.props.incomeData} 
            updateTotals={this.updateTotals}
            total={this.state.incomeTotal}
          />

          {/* Box with expenses information */}
          <Box 
            boxData={this.props.expensesData} 
            updateTotals={this.updateTotals} 
            total={this.state.expensesTotal}
          />

          {/* Summary displays the final total monthly amount */}
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
