import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";

import Box from "./Box.js";
import Summary from "./Summary.js";
import Jumbotron from "./Jumbotron";
import AuthService from "../services/auth.service";
import userService from "../services/user.service.js";


class BudgetTest extends Component {

  static defaultProps = {

    incomeData: {
      categories: [
        {
          categoryId: 1,
          subtotal: 0,
          title: 'Net Monthly Pay',
          fields: [
            {title: 'Your Net Monthly Pay', description: 'Also known as "take-home pay," this is the final amount on your paycheck - your wages, minus federal taxes, state taxes, Social Security, health insurance, etc.', value: 0, id: 1},
            {title: 'Spouse\'s Net Monthly Pay', description: 'Same as above, but for your partner (if applicable)', value: 0, id: 2}
          ]
        },
        {
          categoryId: 2,
          subtotal: 0,
          title: 'Other Monthly Income',
          fields: [
            {title: 'Other Monthly Income', description: 'Enter additional sources of income here, such as Social Security, child support, alimony, investments, pensions, etc.', value: 0, id: 3}, 
          ]
        },
      ]
    },
    expenseData: {               
      categories: [
        {
          categoryId: 1,
          subtotal: 0,      
          title: 'housing and utilities',
          fields: [
            {title: 'Rent or Mortgage', description: 'Monthly amount due.  Add in Home or Renters Insurance if not already included', value: 0, id: 1}, 
            {title: 'Property Tax', description: 'If not already included in mortgage payment', value: 0, id: 2},
            {title: 'Homeowner Association (HOA) Fees', description: 'Only enter if applicable', value: 0, id: 3},
            {title: 'Home Repair and Maintenance', description: 'Even if it\'s not a monthly expense, add what you estimate this costs per month', value: 0, id: 4},
            {title: 'Utilities', description: 'Include electricity, gas, water, sewer, trash, etc.', value: 0, id: 5},
            {title: 'Electronics', description: 'Include cable, internet, cell phone, etc.', value: 0, id: 6},
          ]
        },
        {
          categoryId: 2,
          subtotal: 0,
          title: 'transportation',
          fields: [
            {title: 'Car Payment', description: 'Include any additional car payments, if you have more than one', value: 0, id: 7}, 
            {title: 'Car Insurance', description: 'Check your billing, and be sure to divide this into a monthly amount', value: 0, id: 8},
            {title: 'Gas', description: 'Average monthly cost of gas', value: 0, id: 9},
            {title: 'Car Maintenance', description: 'Average monthly cost of car repairs - you can assume oil changes, with a little extra just in case of additional repairs', value: 0, id: 10},
            {title: 'Parking and Tolls', description: 'If applicable', value: 0, id: 11},
          ]
        },



        // {
        //   title: 'groceries and food',
        //   id: uuidv4(),
        //   subtotal: 0,
        //   fields: [
        //     {title: 'Groceries', id: uuidv4(), description: 'Average the monthly cost of your groceries.  It may be helpful to tally up a few months\' worth to get a better average', value: 0}, 
        //     {title: 'Meals at Restaurants', id: uuidv4(), description: 'Again, it may be helpful to take the average of a few months', value: 0}
        //   ]
        // },
        // {
        //   title: 'health and beauty',
        //   id: uuidv4(),
        //   subtotal: 0,
        //   fields: [
        //     {title: 'Insurance', id: uuidv4(), description: 'If not already deducted from your paycheck, include your Health Insurance and Life Insurance', value: 0}, 
        //     {title: 'Prescriptions and Doctor Visits', id: uuidv4(), description: 'Include your monthly prescription costs and any regular co-pays for doctor visits', value: 0}, 
        //     {title: 'Gym Membership', id: uuidv4(), description: 'Include monthly dues, if applicable', value: 0},
        //     {title: 'Clothes', id: uuidv4(), description: 'Average monthly amount.  Also include dry cleaning and laundry, if applicable', value: 0},
        //     {title: 'General Beauty Haircut and Color', id: uuidv4(), description: 'Include, haircut, color, and beauty supplies', value: 0},
        //   ]
        // },
        // {
        //   title: 'children',
        //   id: uuidv4(),
        //   subtotal: 0,
        //   fields: [
        //     {title: 'Child Care', id: uuidv4(), description: 'If not already deducted from your paycheck', value: 0}, 
        //     {title: 'Child Support', id: uuidv4(), description: 'Include monthly child support amounts, if applicable', value: 0}, 
        //     {title: 'Tuition and Supplies', id: uuidv4(), description: 'Include any additional tuition or other school suppies', value: 0},
        //   ]
        // },
        // {
        //   title: 'debts and loans',
        //   id: uuidv4(),
        //   subtotal: 0,
        //   fields: [
        //     {title: 'Credit Cards', id: uuidv4(), description: 'Total minimum monthly payment due', value: 0}, 
        //     {title: 'Student Loans', id: uuidv4(), description: 'Total minimum monthly payment due', value: 0}, 
        //     {title: 'Medical Debt', id: uuidv4(), description: 'Total minimum monthly payment due', value: 0},
        //   ]
        // },
        // {
        //   title: 'miscellaneous',
        //   id: uuidv4(),
        //   subtotal: 0,
        //   fields: [
        //     {title: 'Hobbies', id: uuidv4(), description: 'Include the average amount you spend on your hobbies. You can add extra fields if you prefer to break it down', value: 0}, 
        //     {title: 'Tobacco & Alcohol', id: uuidv4(), description: 'Average monthly amounts', value: 0}, 
        //     {title: 'Media Subscriptions', id: uuidv4(), description: 'Include newspapers, magazines, and any other media subscriptions (Netflix, etc.)', value: 0},
        //     {title: 'Travel and Vacation', id: uuidv4(), description: 'Average amount you save toward vacations', value: 0},
        //     {title: 'Donations', id: uuidv4(), description: 'Add your regular donations, if applicable', value: 0},
        //     {title: 'Pet Care', id: uuidv4(), description: 'If you have pets, average your pet foot, insurance, toys, etc.', value: 0},
        //   ]
        // },
      ]
    }
  }

  // State is used to store the relevant information regarding the user's income and expenses fields,
  // ...and is used by other components to calculate inferences.
  constructor(props) {
    super(props);
    this.state = {
      // apiResponse: null,
      // incomeData: null,
      // expenseData: null,

      // Seems this is already being called from 
      currentUser: AuthService.getCurrentUser(),
      visible: "Hi there!",

      error: null,
      isLoaded: false,
      userIncome: "",

      total: 0,
      incomeTotal: 0,
      expenseTotal: 0,
    }
    this.updateValue            = this.updateValue.bind(this);
    this.updateCategoryTotal    = this.updateCategoryTotal.bind(this);
    this.updateFullTotal        = this.updateFullTotal.bind(this);
    this.updateIncomeHelper     = this.updateIncomeHelper.bind(this);
    this.updateExpensesHelper   = this.updateExpensesHelper.bind(this);
    this.saveNewIncomeHelper    = this.saveNewIncomeHelper.bind(this);
    this.saveNewExpensesHelper  = this.saveNewExpensesHelper.bind(this);
    this.saveNewField           = this.saveNewField.bind(this);
    this.handleSave             = this.handleSave.bind(this);
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
    // Based on incOrExp, determines which total to update
    let totalToUpdate = (incOrExp === "incomeData" ? "incomeTotal" : "expenseTotal")
    
    // Makes new copy of state
    let dataCopy = this.state[incOrExp];

    // Reduces array of fields to find total of values
    let newTotal = dataCopy.categories.reduce(
      (accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue.subtotal)
      , 0
    );

    // ...and sets state with that updated value.
    this.setState({[totalToUpdate]: newTotal});
  }

  // For changes to income fields, sends relevant info to updateTotal
  updateIncomeHelper(name, num, category) {
    this.updateValue("incomeData", category, name, num);
  }

  // For changes to expenses fields, sends relevant info to updateTotal
  updateExpensesHelper(name, num, category) {
    this.updateValue("expenseData", category, name, num);
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

  // TODO: How to handle users who have not signed up who click save (CB 9/24/20)
  handleSave(evt) {
    // evt.preventDefault();
    // console.log("boop");
    // userService.saveUserBudget(this.state.incomeData, this.state.incomeData)
    //   .then(res =>{
    //     console.log(res)
    //   })
    //   .catch(error => {
    //     console.error(error.message)
    //   });
    
    evt.preventDefault();
    Promise.all([userService.saveIncome(this.state.incomeData), userService.saveExpense(this.state.expenseData)])
      .then(res =>{
        console.log(res);
      })
      .catch(error => {
        console.error(error.message)
      });
  }



  render() {

    // console.log("this.props.isLoaded: ", this.props.isLoaded);
    // console.log("this.props.incomeData: ", this.props.incomeData)
    // console.log("this.props.expenseData: ", this.props.expensesData)


    return (
      <div className="budget">

        {/* Title and subtitle */}
        <Jumbotron
          largeTitle="Calculator "
          smallTitle="Quick Budget"
          subtitle="A quick and easy reference tool to calculate your basic monthly budget."
        >

          <div className="budget-instructions-list">
            <ol className="budget-list-text">
              <li className="budget-list-text income">
                Add your income below
              </li>
              <li className="budget-list-text expenses">
                After that, we'll guide you through your expenses
              </li>
              <li className="budget-list-text save">
                Click save - we'll store your budget and take you to your dashboard with more insights
              </li>
            </ol>
          </div>

        </Jumbotron>

        
        {this.props.isLoaded 
          ?
            <div>
              {/* Box with income information */}
              <Box 
                title="Income"
                boxType="income"

                boxData={this.props.incomeData}
                // handleUpdate={this.updateIncomeHelper}
                // handleSaveNew={this.saveNewIncomeHelper}
                // total={this.state.incomeTotal}
                // key={this.props.incomeData.id}
              />

              {/* Box with expenses information */}
              <Box
                title="Expenses"
                boxType="expenses"

                boxData={this.props.expenseData} 
                // handleUpdate={this.updateExpensesHelper}
                // handleSaveNew={this.saveNewExpensesHelper} 
                // total={this.state.expenseTotal}
                // key={this.props.expensesData.id}
              />

              {/* Summary displays the final total monthly amount */}
              <Summary 
                totalIncome={this.props.incomeTotal}
                totalExpenses={this.props.expenseTotal}
              />


              <button onClick={this.handleSave} type="button" className="btn btn-primary">Save</button>
            </div>
          :
            // TODO: 9/22 - add a loading image
            <div>Loading</div>
        }

      </div>
    );
  }
}

export default BudgetTest;
