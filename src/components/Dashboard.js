import React, { Component } from "react";
import AuthService from "../services/auth.service";
import userService from "../services/user.service";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),

      incomeData: null,
      expenseData: null,

      incomeTotal: 0,
      expenseTotal: 0,

      isLoaded: false
    };
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
    
          this.setState({
            incomeData: jsonParsedIncomeObject,
            expenseData: jsonParsedExpenseObject,
            incomeTotal: income.data.total,
            expenseTotal: expense.data.total,
            isLoaded: true,
          });
        })
        .catch(error => {
          console.error(error.message)
        });
    }
  }

  render() {
    const { currentUser } = this.state;

    return (

      <div className="App">
        <div className="container">
          <div className="jumbotron jumbo">
            <div className="row">
              <div className="col-sm-12 logo">
                <span className="welcome-to">Welcome </span>{currentUser.username}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12 welcome-subtitle">
                <div className="subtitle">
                  Here's a quick summary of what we have on file for you:
                </div>
              </div>
            </div>
            
            <div>
              Total Income: {this.state.incomeTotal}
            </div>

            <div>
              Total Expense: {this.state.expenseTotal}
            </div>

            <div>
              Go to your Budget
            </div>

          </div>
        </div>
      </div>


      // <div className="container">
      //   <header className="jumbotron">
      //     <h3>
      //       <strong>{currentUser.username}</strong> Dashboard
      //     </h3>
      //   </header>
      //   <p>
      //     <strong>Token:</strong>{" "}
      //     {currentUser.accessToken.substring(0, 20)} ...{" "}
      //     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      //   </p>
      //   <p>
      //     <strong>Id:</strong>{" "}
      //     {currentUser.id}
      //   </p>
      //   <p>
      //     <strong>Email:</strong>{" "}
      //     {currentUser.email}
      //   </p>
      //   <strong>Authorities:</strong>
      //   <ul>
      //     {currentUser.roles &&
      //       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      //   </ul>
      // </div>
    );
  }
}

export default Dashboard;