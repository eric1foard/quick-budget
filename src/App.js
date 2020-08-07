import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
        id: uuidv4(),
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
            title: 'Other Monthly Income', 
            subtotal: 0, 
            fields: [
              {title: 'Other Monthly Income', description: 'Enter additional sources of income here, such as Social Security, child support, alimony, investments, pensions, etc.', value: 0}, 
            ]
          },
        ]
      },
      expensesData: {               
        title: 'expenses', 
        total: 0,
        id: uuidv4(),
        categories: [
          {
            title: 'housing and utilities',
            subtotal: 0,
            fields: [
              {title: 'Rent or Mortgage', description: '', value: 0, id: uuidv4()}, 
              {title: 'Home or Renters Insurance', description: 'If not already included in mortgage payment', value: 0},
              {title: 'Property Tax', description: 'If not already included in mortgage payment', value: 0},
              {title: 'Homeowner Association (HOA) Fees', description: '', value: 0},
              {title: 'Home Repair and Maintenance', description: 'Even if it\'s not a monthly expense, add what you estimate this costs per month', value: 0},
              {title: 'Electricity and Gas', description: '', value: 0},
              {title: 'Water and Sewer', description: '', value: 0},
              {title: 'Cable and Internet', description: '', value: 0},
              {title: 'Cell Phone', description: '', value: 0},
            ]
          },
          {
            title: 'transportation',
            subtotal: 0,
            fields: [
              {title: 'Car Payment', description: '', value: 0}, 
              {title: '2nd Car Payment', description: '', value: 0},
              {title: 'Car Insurance', description: 'Be sure to divide this into a monthly cost', value: 0},
              {title: 'Gas', description: '', value: 0},
              {title: 'Car Maintenance', description: '', value: 0},
              {title: 'Parking and Tolls', description: '', value: 0},
            ]
          },
          {
            title: 'groceries and food',
            subtotal: 0,
            fields: [
              {title: 'Groceries', description: '', value: 0}, 
              {title: 'Meals at Restaurants', description: '', value: 0}
            ]
          },
          {
            title: 'health and beauty',
            subtotal: 0,
            fields: [
              {title: 'Health Insurance', description: 'If not already deducted from your paycheck', value: 0}, 
              {title: 'Life Insurance', description: 'If not already deducted from your paycheck', value: 0}, 
              {title: 'Prescriptions', description: '', value: 0}, 
              {title: 'Gym Membership', description: '', value: 0},
              {title: 'Clothes', description: '', value: 0},
              {title: 'Dry Cleaning and Laundry', description: '', value: 0},
              {title: 'Haircut and Color', description: '', value: 0},
              {title: 'Beauty Supplies', description: '', value: 0},
            ]
          },
          {
            title: 'children',
            subtotal: 0,
            fields: [
              {title: 'Child Care', description: 'If not already deducted from your paycheck', value: 0}, 
              {title: 'Child Support', description: '', value: 0}, 
              {title: 'Tuition and Supplies', description: '', value: 0},
            ]
          },
          {
            title: 'children',
            subtotal: 0,
            fields: [
              {title: 'Child Care', description: 'If not already deducted from your paycheck', value: 0}, 
              {title: 'Child Support', description: '', value: 0}, 
              {title: 'Tuition and Supplies', description: '', value: 0},
            ]
          },
          {
            title: 'debts and loans',
            subtotal: 0,
            fields: [
              {title: 'Credit Cards', description: 'total minimum monthly payment due', value: 0}, 
              {title: 'Student Loans', description: 'total minimum monthly payment due', value: 0}, 
              {title: 'Medical Debt', description: 'total minimum monthly payment due', value: 0},
            ]
          },
          {
            title: 'miscellaneous',
            subtotal: 0,
            fields: [
              {title: 'Hobbies', description: '', value: 0}, 
              {title: 'Tobacco & Alcohol', description: '', value: 0}, 
              {title: 'Newspapers and Magazines', description: '', value: 0},
              {title: 'Other Media Subscriptions', description: 'Examples: Netflix, Disney+, etc.', value: 0},
              {title: 'Travel and Vacation', description: '', value: 0},
              {title: 'Donations', description: '', value: 0},
              {title: 'Pet Care', description: '', value: 0},
            ]
          },
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
            key={this.state.incomeData.id}
          />

          {/* Box with expenses information */}
          <Box 
            boxData={this.state.expensesData} 
            handleUpdate={this.updateExpensesHelper}
            handleSaveNew={this.saveNewExpensesHelper} 
            total={this.state.expensesData.total}
            key={this.state.expensesData.id}
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
