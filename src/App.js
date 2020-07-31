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
        categories: [
          {
            title: 'Net Monthly Pay', 
            subtotal: 0, 
            fields: [
              {title: 'Your Net Monthly Pay', description: 'Also known as "take-home pay," this is the final amount on your paycheck - your wages, minus federal taxes, state taxes, Social Security, health insurance, etc.', value: 0}, 
              {title: 'Spouse\'s Net Monthly Pay', description: 'Same as above, but for your partner (if applicable)', value: 0}
            ]
          },
          {
            title: 'more things here', 
            subtotal: 0, 
            fields: [
              {title: 'alimony', description: 'Example Example Example Example', value: 0}, 
              {title: 'child support', description: 'Example Example Example Example', value: 0}
            ]
          },
          {
            title: 'perhaps we try this', 
            subtotal: 0, 
            fields: [
              {title: 'alimony', description: 'Example Example Example Example', value: 0}, 
              {title: 'child support', description: 'Example Example Example Example', value: 0}
            ]
          },
        ]
      },
      expensesData: {               
        title: 'expenses', 
        total: 0,
        categories: [
          {
            title: 'food',
            subtotal: 0,
            fields: [
              {title: 'Groceries', description: 'Food from the grocery store', value: 0}, 
              {title: 'Restaurants', description: 'Meals purchased at restaurants', value: 0}
            ]
          },
          {
            title: 'utilities and such',
            subtotal: 0,
            fields: [
              {title: 'Gas', description: 'Gas bill', value: 0}, 
              {title: 'Electric', description: 'Electricity', value: 0}
            ]
          },
          {
            title: 'utilities and blah',
            subtotal: 0,
            fields: [
              {title: 'Gas', description: 'Gas bill', value: 0}, 
              {title: 'Electric', description: 'Electricity', value: 0}
            ]
          }
        ]
      }
    }
    this.updateValue            = this.updateValue.bind(this);
    this.updateCategoryTotal    = this.updateCategoryTotal.bind(this);
    this.updateFullTotal        = this.updateFullTotal.bind(this);
    this.updateIncomeHelper     = this.updateIncomeHelper.bind(this);
    this.updateExpensesHelper   = this.updateExpensesHelper.bind(this);
    this.saveNewIncomeHelper    = this.saveNewIncomeHelper.bind(this);
    this.saveNewExpensesHelper  = this.saveNewExpensesHelper.bind(this);
    this.saveNewField           = this.saveNewField.bind(this);
  }

  // **********************************************
  // UPDATING VALUES & TOTALS *********************
  // **********************************************
  updateValue(incOrExp, category, name, num) {
    // Makes new copy of state...
    let newState = this.state[incOrExp];

    // ...in that copy, finds the field that needs to be updated...
    const categoryToUpdate = newState.categories.find(elem => elem.title === category);

    const fieldToUpdate = categoryToUpdate.fields.find(elem => elem.title === name);

    // ...and sets that field's value to the variable "num".
    fieldToUpdate.value = num;

    // Sets relevant state with updated numbers, starts callback to update totals
    this.setState({[incOrExp]: newState}, () => {
      this.updateCategoryTotal(incOrExp, category);
    })
  }

  updateCategoryTotal(incOrExp, category) {
    let newState = this.state[incOrExp];
    const categoryToUpdate = newState.categories.find(elem => elem.title === category);

    let newSubTotal = categoryToUpdate.fields.reduce(
      (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.value)
      , 0
    );
    categoryToUpdate.subtotal = newSubTotal;
    this.setState({[incOrExp]: newState}, () => {
      this.updateFullTotal(incOrExp);
    });
  }

  updateFullTotal(incOrExp) {
    // Makes new copy of state
    let dataCopy = this.state[incOrExp];

    // Reduces array of fields to find total of values
    let newTotal = dataCopy.categories.reduce(
      (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.subtotal)
      , 0
    );
    // Sets this reduced number as the total
    dataCopy.total = newTotal;
    // ...and sets state with that updated object.
    this.setState({[incOrExp]: dataCopy});
  }

  // For changes to income fields, sends relevant info to updateTotal
  updateIncomeHelper(name, num, category) {
    this.updateValue("incomeData", category, name, num);
  }

  // For changes to expenses fields, sends relevant info to updateTotal
  updateExpensesHelper(name, num, category) {
    this.updateValue("expensesData", category, name, num);
  }


  // **********************************************
  // SAVING NEW FIELDS ****************************
  // **********************************************
  // Appends the new field object to the end of the correct part of state
  saveNewField(obj, type, category) {
    let newState = this.state[type]
    const categoryToSaveIn = newState.categories.find(elem => elem.title === category);

    categoryToSaveIn.fields = [...categoryToSaveIn.fields, obj];
    this.setState({[type]: newState}, () => {
      this.updateCategoryTotal(type, category);
    });
  }

  saveNewIncomeHelper(obj, category) {
    this.saveNewField(obj, "incomeData", category);
  }

  saveNewExpensesHelper(obj, category) {
    this.saveNewField(obj, "expensesData", category);
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
            handleSaveNew={this.saveNewIncomeHelper}
            total={this.state.incomeData.total}
          />

          {/* Box with expenses information */}
          <Box 
            boxData={this.state.expensesData} 
            handleUpdate={this.updateExpensesHelper}
            handleSaveNew={this.saveNewExpensesHelper} 
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
