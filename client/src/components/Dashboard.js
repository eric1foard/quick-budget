// ************************************************************
// Dashboard.js - Displays information on the user's account
// ************************************************************

// Dependencies
import React, { Component } from "react";

// Project Components
import Jumbotron from "./Jumbotron";
import Loading from "./Loading";
import DoughnutChart from "./DoughnutChart";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import DashboardDetails from "./DashboardDetails";

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

          let expenseChartLabels = [];
          let expenseChartData = [];

          // console.log(jsonParsedExpenseObject);
          jsonParsedExpenseObject.categories.forEach((elem) => {
            expenseChartLabels.push(elem.title);
            expenseChartData.push(elem.subtotal);
          });


          let incomeChartLabels = [];
          let incomeChartData = [];

          // console.log(jsonParsedincomeObject);
          jsonParsedIncomeObject.categories.forEach((elem) => {
            incomeChartLabels.push(elem.title);
            incomeChartData.push(elem.subtotal);
          });


          

          this.setState({
            incomeData: jsonParsedIncomeObject,
            expenseData: jsonParsedExpenseObject,
            incomeTotal: income.data.total,
            expenseTotal: expense.data.total,
            expenseChartLabels: expenseChartLabels,
            expenseChartData: expenseChartData,
            incomeChartLabels: incomeChartLabels,
            incomeChartData: incomeChartData,
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

      <div>

        {this.state.isLoaded 
          ?
          // TODO (CB 10/5) - make the Dashboard more interesting!  Add more here
            <div>

              <Jumbotron
                largeTitle="Welcome "
                smallTitle={currentUser.username}
                subtitle="This is your dashboard. Here, you'll find insights into what we have on file for you."
              >
                
                <div className="welcome-list">
                  <div className="dashboard-list-line">
                    <span className="dashboard-intro income">
                      <i className="fas fa-plus welcome-list-icon"></i>
                      <span className="welcome-list-text"> 
                        Total Income: ${this.state.incomeTotal}
                      </span>
                    </span>
                  </div>
                  <div className="dashboard-list-line">
                    <span className="dashboard-intro expense">
                      <i className="fas fa-minus welcome-list-icon"></i>
                      <span className="welcome-list-text">
                        Total Expenses: ${this.state.expenseTotal}
                      </span>
                    </span>
                  </div>
                  <div className="dashboard-list-line">
                    <span className="dashboard-intro total">
                      <i className="fas fa-equals welcome-list-icon"></i>
                      <span className="welcome-list-text">
                        Monthly Cashflow: ${this.state.total}
                      </span>
                    </span>
                  </div>
                </div>

              </Jumbotron>

              <div>
                <DashboardDetails
                  chartHeader="Income"
                  labels={this.state.incomeChartLabels}
                  data={this.state.incomeChartData}
                  type="income"
                />

                <DashboardDetails 
                  chartHeader="Expenses"
                  labels={this.state.expenseChartLabels}
                  data={this.state.expenseChartData}
                  type="expenses"
                />
              </div>


              <div>
                <button onClick={this.handleClick} className="btn btn-dashboard">
                   Go to Budget
                </button>
              </div>

            </div>
          :
            <Jumbotron
              largeTitle="Welcome "
              smallTitle={currentUser.username}
              subtitle="Here are some insights into what we have on file for you"
            >

              <Loading />

            </Jumbotron>
            
        }

      </div>
        
    );
  }
}

export default Dashboard;
