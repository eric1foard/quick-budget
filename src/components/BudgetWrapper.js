import React, { Component } from "react";

import AuthService from "../services/auth.service";
import userService from "../services/user.service.js";
import BudgetTest from "./BudgetTest";

class BudgetWrapper extends Component {

  
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
  
    componentDidMount() {
      if (!this.state.currentUser) {
        // TODO: Figure out how to handle user who has not logged in yet
        this.setState({ content: 'No user' })
      } else {
        Promise.all([userService.getUserIncome(), userService.getUserExpense()])
          .then(values =>{
            const [income, expense] = [values[0], values[1]];
  
            const jsonParsedIncomeObject = JSON.parse(income.data.jsonStringResponse);
            const jsonParsedExpenseObject = JSON.parse(expense.data.jsonStringResponse);
      
            console.log("componentDidMount API call INCOME response: ", jsonParsedIncomeObject);
            console.log("componentDidMount API call EXPENSE response: ", jsonParsedExpenseObject);

            console.log("jsonParsedIncomeObject.categories.length: ", jsonParsedIncomeObject.categories.length);
            console.log("jsonParsedExpenseObject.categories.length: ", jsonParsedExpenseObject.categories.length);
            
            if (jsonParsedIncomeObject.categories.length === 0 && jsonParsedExpenseObject.categories.length === 0) {
              console.log("New user!")
              this.setState({
                newUser: true,
                isLoaded: true,
              });

            } else {
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
    console.log("this.state.isLoaded: ", this.state.isLoaded);
    console.log("this.state.newUser: ", this.state.newUser);
    console.log("this.state.incomeData: ", this.state.incomeData)
    console.log("this.state.expenseData: ", this.state.expenseData)

    return(
      <div>
        {this.state.newUser 
          ?
            <BudgetTest 
              isLoaded={this.state.isLoaded}
            />

          :
            <BudgetTest 
              isLoaded={this.state.isLoaded}
              incomeData={this.state.incomeData}
              expenseData={this.state.expenseData}
            />
        }

      </div>
    )
  }
}

export default BudgetWrapper;