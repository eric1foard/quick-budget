// Packages
import React, { Component } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import Swal from 'sweetalert2';
// import { v4 as uuidv4 } from "uuid"; - TODO Need to add in to give ID's (CB 9/30)

// Project Components
import Box from "./Box.js";
import Summary from "./Summary.js";
import Jumbotron from "./Jumbotron";
import Loading from "./Loading";
import AuthService from "../services/auth.service";
import userService from "../services/user.service.js";
import HelloWorld from "./ModalSignUp.js";

// Objects containing the default income and expense data, in the event a new user
import { incomeData } from "./shared/newUserSeed";
import { expenseData } from "./shared/newUserSeed";

// Helper methods used for validating new users' sign up information
import { validateUsername, validateEmail, validatePassword } from "./shared/helpers"


class Budget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // Budget state information
      incomeData: null,  // Object containing the user's income information.  Obtained from API call getting user's info, or from default values for new users.
      expenseData: null, // Object containing the user's expense information.  Obtained from API call getting user's info, or from default values for new users.
      incomeTotal: 0, // Number appearing at bottom of income section, showing user's total income.
      expenseTotal: 0, // Number appearing at bottom of expense section, showing user's total expense.
      total: 0, // Number showing in bottommost card, showing user's total income minus total expense.  While it could be inferred, keeping this explicitly in state makes sure it is always rendered with current info.
      
      // User state information
      currentUser: AuthService.getCurrentUser(), // Returns user's jwt accessToken, email, id, and username.
      unregisteredUser: null, // Boolean determined in componenentDidMount. Used when user clicks save.  If true, prompts them to sign up in order to save.
      newUser: null, // Boolean determined in componenentDidMount. If true, pulls default information from newUserSeed to populate budget.

      // Page status information
      error: null,
      isLoaded: false,


      username: undefined,
      email: undefined,
      password: undefined,
      alert: false,
    }
    this.updateValue            = this.updateValue.bind(this);
    this.updateCategoryTotal    = this.updateCategoryTotal.bind(this);
    this.updateFullTotal        = this.updateFullTotal.bind(this);
    this.updateIncomeHelper     = this.updateIncomeHelper.bind(this);
    this.updateExpensesHelper   = this.updateExpensesHelper.bind(this);
    // this.saveNewIncomeHelper    = this.saveNewIncomeHelper.bind(this); - used to add new items.  Currently disabled.
    // this.saveNewExpensesHelper  = this.saveNewExpensesHelper.bind(this); - used to add new items.  Currently disabled.
    // this.saveNewField           = this.saveNewField.bind(this); - used to add new items.  Currently disabled.
    this.handleSave             = this.handleSave.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);

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
  // saveNewField(obj, type, category) {
  //   let newState = this.state[type]
  //   const categoryToSaveIn = newState.categories.find(elem => elem.title === category);

  //   categoryToSaveIn.fields = [...categoryToSaveIn.fields, obj];
  //   this.setState({[type]: newState}, () => {
  //     this.updateCategoryTotal(type, category);
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
  // TO REFACTOR - repetition from SignUp component.

  handleSignUp(e) {
    // e.preventDefault();

    if (!this.state.username || !this.state.email || !this.state.password) {
      this.setState({alert: false, username: undefined, email: undefined, password: undefined});
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please fill out all forms.',
      }).then(() => this.toggleSignUp());
    } else if (validateEmail(this.state.email) === false) {
      this.setState({alert: false, username: undefined, email: undefined, password: undefined});
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please enter a valid email address.',
      }).then(() => this.toggleSignUp());
    } else if (validateUsername(this.state.username) === false) {
      this.setState({alert: false, username: undefined, email: undefined, password: undefined});
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Username must be between 3 and 20 characters long.',
      }).then(() => this.toggleSignUp());
    } else if (validatePassword(this.state.password) === false) {
      this.setState({alert: false, username: undefined, email: undefined, password: undefined});
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Password must be between 6 and 40 characters long.',
      }).then(() => this.toggleSignUp());
    } else {
      this.setState({
        alert: false,
        message: "",
        successful: false
      });
    
      AuthService.signup(
        this.state.username,
        this.state.email,
        this.state.password
      )
        .then( () => {
          this.setState({
            successful: true,
            unregisteredUser: false,
          });
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            html: 'You are now registered!<br><br>Redirecting you to your dashboard...',
            showConfirmButton: false,
            timer: 1500
          })
            .then( () => {
              AuthService.login(this.state.username, this.state.password)
              .then( () => {
                this.saveNewUserBudget();
              })
                .then( () => {
                  this.props.history.push("/dashboard");
                  window.location.reload();
                }).catch(error => {
                  const resMessage =
                    (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                    error.message ||
                    error.toString();
                    
                  this.setState({ loading: false });
                  Swal.fire({
                    icon: 'warning',
                    title: 'Oops!',
                    text: `${resMessage} Please try again.`, 
                    footer: 'Or, if you have not yet signed up, please do so.'
                  })
                });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({ successful: false });

          Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: `${resMessage} Please try again.`, 
            footer: 'Or, if you have already signed up, please go to the Log In page.'
          });
        }
      );
    })
  }
}


  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value});
  }

  toggleSignUp() {
    let btnStyle = {
      padding: "7px 65px",
      borderRadius: "20px",
      backgroundColor: "rgba(13, 97, 72, 0.842)",
      color: "rgb(255, 255, 255)"
    }

    console.log("this.state.username: ", this.state.username)
    console.log("this.state.email: ", this.state.email)
    console.log("this.state.password: ", this.state.password)

    const getAlert = () => (

      <SweetAlert
        title="Hello there!"
        onConfirm={this.handleSignUp}
        confirmBtnStyle={btnStyle}
        onCancel={this.onCancel}
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
  // TO REFACTOR - repetition from SignUp component.
  // ***********************************************

  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }


  saveNewUserBudget() {
    console.log("handleSave has been called with a new user")
    Promise.all([userService.saveIncomeNew(this.state.incomeData), userService.saveExpenseNew(this.state.expenseData)])
      .then(res =>{
        this.setState({ newUser: false });
        console.log(res);
      })
      .catch(error => {
        console.error(error.message)
      });
  }

  saveExistingUserBudget() {
    Promise.all([userService.saveIncome(this.state.incomeData), userService.saveExpense(this.state.expenseData)])
      .then(res =>{
        console.log(res);
      })
      .catch(error => {
        console.error(error.message)
      });
  }



  handleSave(evt) {    
    evt.preventDefault();

    if (this.state.unregisteredUser) {
      console.log("handleSave has been called with an unregistered user");
      this.toggleSignUp();
    } else if (this.state.newUser) {
      console.log("handleSave has been called with a new user")
      this.saveNewUserBudget();
    } else {
      console.log("handleSave has been called with an existing user")
      this.saveExistingUserBudget();
    }
  }

  componentDidMount() {
    if (!this.state.currentUser) {
      console.log("Unregistered User!")
      this.setState({ 
        unregisteredUser: true,
        incomeData: incomeData,
        expenseData: expenseData,
        isLoaded: true,
      });

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
                // handleSaveNew={this.saveNewIncomeHelper} - used to add new items.  Currently disabled.
                total={this.state.incomeTotal}
                // key={this.props.incomeData.id}
              />

              {/* Box with expenses information */}
              <Box
                title="Expenses"
                boxType="expenses"

                boxData={this.state.expenseData} 
                handleUpdate={this.updateExpensesHelper}
                // handleSaveNew={this.saveNewExpensesHelper} - used to add new items.  Currently disabled.
                total={this.state.expenseTotal}
                // key={this.props.expensesData.id}
              />

              {/* Summary displays the final total monthly amount */}
              <Summary 
                totalIncome={this.state.incomeTotal}
                totalExpenses={this.state.expenseTotal}
              />


              <button onClick={this.handleSave} type="button" className="btn btn-save">Save</button>
            </div>
          :
            // While API call is loading, puts a spinning loading image
            <Loading />
        }
        
      {/* This is the location for the SweetAlert modal that appears when an unregistered user clicks save */}
      {this.state.alert}

      </div>
    );
  }
}

export default Budget;
