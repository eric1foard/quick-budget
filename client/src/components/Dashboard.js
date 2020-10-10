// ************************************************************
// Dashboard.js - Displays information on the user's account
// ************************************************************

// Dependencies
import React, { Component } from "react";

// Project Components
import Jumbotron from "./Jumbotron";
import Loading from "./Loading";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),

      incomeData: null,
      expenseData: null,
      incomeTotal: 0,
      expenseTotal: 0,
      total: 0,

      isLoaded: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    evt.preventDefault();
    this.props.history.push("/budget");
  }


  componentDidMount() {
    if (!this.state.currentUser) {
      // TODO: Figure out how to handle user who has not logged in yet
      this.setState({ content: 'No user' })
    } else {
      // TODO (CB 10/5) - turn this into async/await?
      Promise.all([UserService.getUserIncome(), UserService.getUserExpense()])
        .then(values =>{
          const [income, expense] = [values[0], values[1]];

          const jsonParsedIncomeObject = JSON.parse(income.data.jsonStringResponse);
          const jsonParsedExpenseObject = JSON.parse(expense.data.jsonStringResponse);
    
          // console.log("componentDidMount API call INCOME response: ", jsonParsedIncomeObject);
          // console.log("componentDidMount API call EXPENSE response: ", jsonParsedExpenseObject);
    
          const total = Number(income.data.total - expense.data.total).toFixed(2);

          this.setState({
            incomeData: jsonParsedIncomeObject,
            expenseData: jsonParsedExpenseObject,
            incomeTotal: income.data.total,
            expenseTotal: expense.data.total,
            total: total,
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
          // TODO (CB 10/5) - make the Dashboard more interesting!  Add more here
            <div>
              <div>
                Total Income: ${this.state.incomeTotal}
              </div>

              <div>
                Total Expenses: ${this.state.expenseTotal}
              </div>

              <div>
                Monthly Cashflow: ${this.state.total}
              </div>

              <div>
                <button onClick={this.handleClick} className="btn btn-dashboard">
                   Go to Budget
                </button>
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
