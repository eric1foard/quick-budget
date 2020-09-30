import React, { Component } from "react";
import AuthService from "../services/auth.service";
import userService from "../services/user.service";

import Jumbotron from "./Jumbotron";
import Loading from "./Loading";

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

      <Jumbotron
        largeTitle="Welcome "
        smallTitle={currentUser.username}
        subtitle="Here's a quick summary of what we have on file for you:"
      >

        {this.state.isLoaded 
          ?
            <div>
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
          :
            <Loading />
        }

      </Jumbotron>
        
    );
  }
}

export default Dashboard;