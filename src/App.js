import React, { Component } from 'react';

import Box from './Box.js';
import Summary from './Summary.js';
import './App.css';

class App extends Component {

  // State is used to store the relevant information regarding the user's income and expenses fields,
  // ...and is used by other components to calculate inferences.
  constructor(props) {
    super(props);
    this.state = {
      incomeData: {
        title: 'income',
        total: 0,
        fields: [
          {fieldTitle: 'salary', fieldDescription: 'Salary description here', value: 0},
          {fieldTitle: 'savings', fieldDescription: 'Savings description here', value: 0},
          {fieldTitle: 'other', fieldDescription: 'Other description here', value: 0},
        ]
      },
      expensesData: {               
        title: 'expenses', 
        total: 0,
        fields: [
          {fieldTitle: 'food', fieldDescription: 'Food description here', value: 0},
          {fieldTitle: 'electricity', fieldDescription: 'Electricity description here', value: 0},
          {fieldTitle: 'groceries', fieldDescription: 'Groceries description here', value: 0},
        ]
      },
    }
    this.updateIncomeHelper = this.updateIncomeHelper.bind(this);
    this.updateExpensesHelper = this.updateExpensesHelper.bind(this);
  }

  updateTotal(name, num, type) {
    // Makes new copy of state...
    let dataCopy1 = this.state[type];
    // ...in that copy, finds the field that needs to be updated...
    const fieldToUpdate = dataCopy1.fields.find(elem => elem.fieldTitle === name);
    // ...and sets that field's value to the variable "num".
    fieldToUpdate.value = num;

    // Sets relevant state with updated numbers, starts callback to update totals
    this.setState({[type]: dataCopy1}, () => {
      // Makes new copy of state
      let dataCopy2 = this.state[type];
      // Reduces array of fields to find total of values
      let newTotal = dataCopy2.fields.reduce(
        (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.value)
        , 0
      );
      // Sets this reduced number as the total
      dataCopy2.total = newTotal;
      // ...and sets state with that updated object.
      this.setState({[type]: dataCopy2});
    })
  }

  // For changes to income fields, sends relevant info to updateTotal
  updateIncomeHelper(name, num) {
    this.updateTotal(name, num, "incomeData");
  }

  // For changes to expenses fields, sends relevant info to updateTotal
  updateExpensesHelper(name, num) {
    this.updateTotal(name, num, "expensesData");
  }


  render() {
    return (
      <div className="App">
        <div className="container">

          {/* Title and subtitle */}
          <div className="App-title">
            Quick Budget
          </div>
          <div className="App-subtitle">
            A quick and easy reference tool to calculate your basic monthly budget.
          </div>

          {/* Box with income information */}
          <Box 
            boxData={this.state.incomeData} 
            handleUpdate={this.updateIncomeHelper}
            total={this.state.incomeData.total}
          />

          {/* Box with expenses information */}
          <Box 
            boxData={this.state.expensesData} 
            handleUpdate={this.updateExpensesHelper} 
            total={this.state.expensesData.total}
          />

          {/* Summary displays the final total monthly amount */}
          <Summary 
            totalIncome={this.state.incomeData.total}
            totalExpenses={this.state.expensesData.total}
          />

        </div>
      </div>
    );
  }
}

export default App;
