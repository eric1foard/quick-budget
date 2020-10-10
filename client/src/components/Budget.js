// *************************************************************************************************************
// Budget.js - Holds logic for users interacting with their budgets. 
// - Can be used by registered users (makes API call for their corresponding budget), or as a "demo" for unregistered users.
// - App is parent, Box are children.
// *************************************************************************************************************


// Dependencies
import React, { Component } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';

// Project Components
import Box from "./Box.js";
import Summary from "./Summary.js";
import Jumbotron from "./Jumbotron";
import Loading from "./Loading";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service.js";
import UnsavedChangesAlert from "./UnsavedChangesAlert.js"; // Alerts user when navigating away from the page without saving changes

// Objects containing the default income and expense data, used in the event a new user
import { incomeData } from "./shared/newUserSeed";
import { expenseData } from "./shared/newUserSeed";

// Helper methods used for validating new users' sign up information
import { verifySignUp, errorAlert, successfulSaveAlert } from "./shared/helpers"

class Budget extends Component {

  constructor(props) {
    super(props);
    this.state = {

      // Budget information
      incomeData: null,  // Object containing the user's income information.  Obtained from API call getting user's info, or from default values for new users.
      expenseData: null, // Object containing the user's expense information.  Obtained from API call getting user's info, or from default values for new users.
      incomeTotal: 0, // Number appearing at bottom of income section, showing user's total income.
      expenseTotal: 0, // Number appearing at bottom of expense section, showing user's total expense.
      total: 0, // Number showing in bottommost card, showing user's total income minus total expense.  While it could be inferred, keeping this explicitly in state makes sure it is always rendered with current info.
      
      // User information
      currentUser: AuthService.getCurrentUser(), // Returns user's jwt accessToken, email, id, and username.
      unregisteredUser: null, // Boolean determined in componenentDidMount. Used when user clicks save.  If true, prompts them to sign up in order to save.
      newUser: null, // Boolean determined in componenentDidMount. If true, pulls default information from newUserSeed to populate budget.

      // Page status information
      error: null,
      isLoaded: false,
      unsavedChanges: false,
      
      // If true, displays modal for user to register
      alert: false,

      // Used for logging in unregistered users
      username: undefined,
      email: undefined,
      password: undefined,
    }
    this.updateValue              = this.updateValue.bind(this);
    this.updateCategorySubtotal   = this.updateCategorySubtotal.bind(this);
    this.updateFullTotal          = this.updateFullTotal.bind(this);
    this.updateIncomeHelper       = this.updateIncomeHelper.bind(this);
    this.updateExpensesHelper     = this.updateExpensesHelper.bind(this);
    // this.saveNewIncomeHelper    = this.saveNewIncomeHelper.bind(this); - used to add new items.  Currently disabled.
    // this.saveNewExpensesHelper  = this.saveNewExpensesHelper.bind(this); - used to add new items.  Currently disabled.
    // this.saveNewField           = this.saveNewField.bind(this); - used to add new items.  Currently disabled.
    this.handleSave               = this.handleSave.bind(this);

    this.handleChange             = this.handleChange.bind(this);
    this.handleSignUp             = this.handleSignUp.bind(this);
    this.hideAlert                = this.hideAlert.bind(this);

  }

  // **********************************************
  // UPDATING VALUES & TOTALS *********************
  // **********************************************

  // Updates individual Type's values in state, then triggers updating category subtotals
  updateValue(incOrExp, category, name, num) {

    // If user navigates away from page without saving, they will be alerted
    this.setState({ unsavedChanges: true });

    // Makes new copy of state...
    let newState = this.state[incOrExp];

    // ...in that copy, finds the field that needs to be updated...
    const categoryToUpdate = newState.categories.find(elem => elem.title === category);
    const fieldToUpdate = categoryToUpdate.types.find(elem => elem.title === name);

    // ...and sets that field's value to the updated variable "num".
    fieldToUpdate.value = num;

    // Sets relevant state with updated numbers, starts callback to update totals
    this.setState({[incOrExp]: newState}, () => {
      this.updateCategorySubtotal(incOrExp, category);
    })

  }

  // Updates the category subtotal, then triggers the income/expense total to update
  updateCategorySubtotal(incOrExp, category) {

    // Makes new copy of state
    let newState = this.state[incOrExp];

    // Determines which category needs to be updated
    const categoryToUpdate = newState.categories.find(elem => elem.title === category);

    // Reduces the types' values to find the category's subtotal
    let newSubtotal = categoryToUpdate.types.reduce(
      (accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue.value)
      , 0
    );
    categoryToUpdate.subtotal = newSubtotal;

    // Updates state, then triggers the income/expense total to update
    this.setState({[incOrExp]: newState}, () => {
      this.updateFullTotal(incOrExp);
    });
  }

  // Updates the income/expense total, then triggers the overall monthly total to update
  updateFullTotal(incOrExp) {
    // Based on incOrExp, determines which total to update
    let totalToUpdate = (incOrExp === "incomeData" ? "incomeTotal" : "expenseTotal")
    
    // Makes new copy of state
    let dataCopy = this.state[incOrExp];

    // Reduces array of category subtotals to find total of values
    let newTotal = dataCopy.categories.reduce(
      (accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue.subtotal)
      , 0
    );

    // ...and sets state with that updated value.
    this.setState({[totalToUpdate]: newTotal});
  }

  // For changes to income types, sends relevant info to updateTotal
  updateIncomeHelper(name, num, category) {
    this.updateValue("incomeData", category, name, num);
  }

  // For changes to expenses types, sends relevant info to updateTotal
  updateExpensesHelper(name, num, category) {
    this.updateValue("expenseData", category, name, num);
  }


  // This section will be added back in later, once the app is ready to have users add their own Types
  // **********************************************
  // SAVING NEW types ****************************
  // **********************************************
  // Appends the new field object to the end of the correct part of state
  // saveNewField(obj, type, category) {
  //   let newState = this.state[type]
  //   const categoryToSaveIn = newState.categories.find(elem => elem.title === category);

  //   categoryToSaveIn.types = [...categoryToSaveIn.types, obj];
  //   this.setState({[type]: newState}, () => {
  //     this.updateCategorySubtotal(type, category);
  //   });
  // }

  // Used to add new items.  Currently disabled.
  // saveNewIncomeHelper(obj, category) {
  //   this.saveNewField(obj, "incomeData", category);
  // }

  // Used to add new items.  Currently disabled.
  // saveNewExpensesHelper(obj, category) {
  //   this.saveNewField(obj, "expensesData", category);
  // }


  // ***********************************************
  // TO REFACTOR 
    // 1) There's lots of repetition from SignUp component.
    // 2) This should live in a separate component
  async handleSignUp(e) {

    let [alert, result] = verifySignUp(this.state.username, this.state.email, this.state.password);
    
    this.hideAlert();
    
    if (result === false) {
      await alert;
      await this.setState({ 
        username: undefined, 
        email: undefined, 
        password: undefined 
      });
      this.toggleSignUp();
    
    } else {
    
      try {
        await AuthService.signup(
          this.state.username, 
          this.state.email, 
          this.state.password
        );

        try {
          await alert;

          await AuthService.login(this.state.username, this.state.password)
          await this.setState({ unregisteredUser: false, unsavedChanges: false });
          await this.saveNewUserBudget();

          await this.props.history.push("/dashboard");
          window.location.reload();
        } catch(error) {
          // TODO - it seems nested catch statements are unnecessary.  Ask someone if that's OK (CB 10/3)
          console.log(error);
          errorAlert(error);
          this.setState({ username: undefined, email: undefined, password: undefined });
        }
      } catch(error) {
        // TODO - it seems nested catch statements are unnecessary.  Ask someone if that's OK (CB 10/3)
        console.log(error);
        errorAlert(error);
        this.setState({ username: undefined, email: undefined, password: undefined });
      }
    }
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  toggleSignUp() {
    let confirmBtnStyle = {
      padding: "7px 65px",
      borderRadius: "20px",
      backgroundColor: "rgba(13, 97, 72, 0.842)",
      color: "rgb(255, 255, 255)",
      width: "210px"
    }

    let cancelBtnStyle = {
      padding: "7px 65px",
      borderRadius: "20px",
      backgroundColor: "rgb(184, 98, 102)",
      color: "rgb(255, 255, 255)",
      width: "210px"
    }

    const getAlert = () => (

      <SweetAlert
        title="Hello there!"
        onConfirm={this.handleSignUp}
        confirmBtnStyle={confirmBtnStyle}
        onCancel={this.hideAlert}
        showCancel={true}
        cancelBtnStyle={cancelBtnStyle}
        type="controlled"
      >
        <form>
          <div className="form-group">
          It seems you have not yet signed up.  In order for us to save your budget, please register below.
          <hr/>
            <div className="row">
              <div className="col-sm-12">
                <div className="card login-label">
                  <label htmlFor="username">Username</label>
                  <input 
                    type="text" 
                    name="username"
                    value={this.state.username}
                    onChange={(e) => this.setState({ username: e.target.value })}
                    className="form-control login-form" 
                    placeholder="Enter Username Here" 
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card login-label">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="text" 
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    className="form-control login-form" 
                    placeholder="youremail@gmail.com" 
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="card login-label">
                  <label htmlFor="password">Password</label>
                  <input 
                    type="password" 
                    name="password"
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    className="form-control login-form" 
                    placeholder="Enter Password Here"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </SweetAlert>

      
    );

    this.setState({
      alert: getAlert()
    });
  }
  // ***********************************************

  hideAlert() {
    this.setState({ alert: false });
  }


  // Used when a new or unregistered user saves their budget.  POST their entries in db.
  saveNewUserBudget() {
    // TODO (CB 10/5) - turn this into async/await?
    Promise.all([UserService.saveIncomeNew(this.state.incomeData), UserService.saveExpenseNew(this.state.expenseData)])
      .then(res =>{
        this.setState({ newUser: false, unsavedChanges: false });
        console.log(res);
        
        // User is prompted to go to dashboard, or to stay
        successfulSaveAlert()
          .then((result) => {
            if (result.isConfirmed) {
              this.props.history.push("/dashboard");
            }
          });
      })
      .catch(error => {
        console.error(error.message)
      });
  }

  // Used when an existing user saves their budget.  PUT their entries updated in db.
  saveExistingUserBudget() {
    // TODO (CB 10/5) - turn this into async/await?
    Promise.all([UserService.saveIncome(this.state.incomeData), UserService.saveExpense(this.state.expenseData)])
      .then(res =>{
        this.setState({ unsavedChanges: false });
        console.log(res);

        // User is prompted to go to dashboard, or to stay
        successfulSaveAlert()
          .then((result) => {
            if (result.isConfirmed) {
              this.props.history.push("/dashboard");
            }
          });
      })
      .catch(error => {
        console.error(error.message)
      });
  }

 // Triggered when user clicks save. Calls the correct method based on user's status. 
  handleSave(evt) {    
    evt.preventDefault();

    if (this.state.unregisteredUser) {
      // console.log("handleSave has been called with an unregistered user");
      this.toggleSignUp();
    } else if (this.state.newUser) {
      // console.log("handleSave has been called with a new user")
      this.saveNewUserBudget();
    } else {
      // console.log("handleSave has been called with an existing user")
      this.saveExistingUserBudget();
    }
  }


  // Based on user's status, makes API call for the user's budget information or seeds default values
  componentDidMount() {
    if (!this.state.currentUser) {
      // console.log("Unregistered User!")
      this.setState({ 
        unregisteredUser: true,
        incomeData: incomeData,
        expenseData: expenseData,
        isLoaded: true,
      });

    } else {
      Promise.all([UserService.getUserIncome(), UserService.getUserExpense()])
        .then(values =>{
          const [income, expense] = [values[0], values[1]];

          const jsonParsedIncomeObject = JSON.parse(income.data.jsonStringResponse);
          const jsonParsedExpenseObject = JSON.parse(expense.data.jsonStringResponse);
    
          // console.log("componentDidMount API call INCOME response: ", jsonParsedIncomeObject);
          // console.log("componentDidMount API call EXPENSE response: ", jsonParsedExpenseObject);
    
          if (jsonParsedIncomeObject.categories.length === 0 && jsonParsedExpenseObject.categories.length === 0) {
            this.setState({
              incomeData: incomeData,
              expenseData: expenseData,
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

    return (

      <div className="budget">

      {/* If user has made changes without saving and tries to leave page, alerts the user */}
      <UnsavedChangesAlert unsavedChanges={this.state.unsavedChanges} />

        {/* Title and subtitle, with instructions for user */}
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

        {/* Renders loading image until API calls finish.  Then, renders the Boxes with budget information */}
        {this.state.isLoaded 
          ?
            <div>
              {/* Box with income information */}
              <Box 
                title="Income"
                boxType="income"
                boxData={this.state.incomeData}
                handleUpdate={this.updateIncomeHelper}
                total={this.state.incomeTotal}
                // handleSaveNew={this.saveNewIncomeHelper} - used to add new items.  Currently disabled.
              />

              {/* Box with expense information */}
              <Box
                title="Expenses"
                boxType="expenses"
                boxData={this.state.expenseData} 
                handleUpdate={this.updateExpensesHelper}
                total={this.state.expenseTotal}
                // handleSaveNew={this.saveNewExpensesHelper} - used to add new items.  Currently disabled.
              />

              {/* Summary displays the final total monthly amount */}
              <Summary 
                totalIncome={this.state.incomeTotal}
                totalExpenses={this.state.expenseTotal}
              />

              {/* Save button */}
              <button onClick={this.handleSave} type="button" className="btn btn-save">Save</button>
            </div>
          :
            // While API call is loading, puts a spinning loading image
            <Loading />
        }
        
      {/* This is the location for the SweetAlert modal that appears when an unregistered user clicks save, prompting them to register */}
      {this.state.alert}

      </div>
    );
  }
}

export default Budget;
