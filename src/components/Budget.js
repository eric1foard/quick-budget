import React, { Component } from "react";
// import { v4 as uuidv4 } from "uuid";

import Box from "./Box.js";
import Summary from "./Summary.js";
import Jumbotron from "./Jumbotron";
import AuthService from "../services/auth.service";
import userService from "../services/user.service.js";

// Objects containing the default income and expense data, in the event a new user
import { incomeData } from "./shared/newUserSeed";
import { expenseData } from "./shared/newUserSeed";


class Budget extends Component {

  // State is used to store the relevant information regarding the user's income and expenses fields,
  // ...and is used by other components to calculate inferences.
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      incomeData: null,
      expenseData: null,
      newUser: null,

      // Seems this is already being called from App...
      currentUser: AuthService.getCurrentUser(),

      error: null,
      isLoaded: false,

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

  handleSave(evt) {    
    evt.preventDefault();

    if (this.state.newUser) {
      console.log("handleSave has been called with a new user")
      Promise.all([userService.saveIncomeNew(this.state.incomeData), userService.saveExpenseNew(this.state.expenseData)])
      .then(res =>{
        this.setState({ newUser: false });
        console.log(res);
      })
      .catch(error => {
        console.error(error.message)
      });
    } else {
      Promise.all([userService.saveIncome(this.state.incomeData), userService.saveExpense(this.state.expenseData)])
        .then(res =>{
          console.log(res);
        })
        .catch(error => {
          console.error(error.message)
        });
    }
  }

  componentDidMount() {
    if (!this.state.currentUser) {
      // TODO: Figure out how to handle user who has not logged in yet - send to demo version? (CB 9/28)
      this.setState({ content: 'No user' })
    } else {
      Promise.all([userService.getUserIncome(), userService.getUserExpense()])
        .then(values =>{
          const [income, expense] = [values[0], values[1]];

          const jsonParsedIncomeObject = JSON.parse(income.data.jsonStringResponse);
          const jsonParsedExpenseObject = JSON.parse(expense.data.jsonStringResponse);
    
          // console.log("componentDidMount API call INCOME response: ", jsonParsedIncomeObject);
          // console.log("componentDidMount API call EXPENSE response: ", jsonParsedExpenseObject);
    
          if (jsonParsedIncomeObject.categories.length === 0 && jsonParsedExpenseObject.categories.length === 0) {
            // console.log("New user!")
            this.setState({
              incomeData: incomeData,
              expenseData: expenseData,
              newUser: true,
              isLoaded: true,
            });
          } else {
            // console.log("Existing user!")
            this.setState({
              incomeData: jsonParsedIncomeObject,
              expenseData: jsonParsedExpenseObject,
              incomeTotal: income.data.total,
              expenseTotal: expense.data.total,
              newUser: false,
              isLoaded: true,
            });
          }

        })
        .catch(error => {
          console.error(error.message)
        });
    }
  }

  render() {
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

        
        {this.state.isLoaded 
          ?
            <div>
              {/* Box with income information */}
              <Box 
                title="Income"
                boxType="income"

                boxData={this.state.incomeData}
                handleUpdate={this.updateIncomeHelper}
                // handleSaveNew={this.saveNewIncomeHelper}
                total={this.state.incomeTotal}
                // key={this.props.incomeData.id}
              />

              {/* Box with expenses information */}
              <Box
                title="Expenses"
                boxType="expenses"

                boxData={this.state.expenseData} 
                handleUpdate={this.updateExpensesHelper}
                // handleSaveNew={this.saveNewExpensesHelper} 
                total={this.state.expenseTotal}
                // key={this.props.expensesData.id}
              />

              {/* Summary displays the final total monthly amount */}
              <Summary 
                totalIncome={this.state.incomeTotal}
                totalExpenses={this.state.expenseTotal}
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

export default Budget;
