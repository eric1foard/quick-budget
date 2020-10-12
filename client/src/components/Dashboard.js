// ************************************************************
// Dashboard.js - Displays information on the user's account
// ************************************************************

// Dependencies
import React, { Component } from "react";

// Project Components
import Jumbotron              from "./Jumbotron";
import DashboardChart         from "./DashboardChartContainer";
import DashboardProjections   from "./DashboardProjections"
import Loading                from "./Loading";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),

      // Obtained from API call
      incomeData: null,
      expenseData: null,
      incomeTotal: 0,
      expenseTotal: 0,
      cashFlowTotalMonthly: 0,

      // Until ComponentDidMount is ready, displays loading spinner
      isLoaded: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // Button at bottom of page, lets user navigate to their Budget
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
          const cashFlowTotalMonthly = Number(income.data.total - expense.data.total).toFixed(2);


          // Arrays that will hold data for Income-related charts
          let incomeChartLabels = [];
          let incomeChartData = [];

          // (TODO CB 10/11 - When users are able to add their own types, switch to this code)
          // jsonParsedIncomeObject.categories.forEach((elem) => {
          //   incomeChartLabels.push(elem.title);
          //   incomeChartData.push(elem.subtotal);
          // });
          
          // (TODO CB 10/11 - For now, using this so that the income data is more interesting (only 3 total possible sources at the moment))
          jsonParsedIncomeObject.categories.forEach((elem) => {
            elem.types.forEach(type => {
              // Push each Type's title and value into the arrays to be used for making charts
              incomeChartLabels.push(type.title);
              incomeChartData.push(type.value);
            })
          });

          // Arrays that will hold data for Expense-related charts
          let expenseChartLabels = [];
          let expenseChartData = [];

          // Push each Category's title and value into the arrays to be used for making charts
          jsonParsedExpenseObject.categories.forEach((elem) => {
            expenseChartLabels.push(elem.title);
            expenseChartData.push(elem.subtotal);
          });


          // Now that we have all the information we need, set state accordingly
          this.setState({
            incomeData: jsonParsedIncomeObject,
            expenseData: jsonParsedExpenseObject,

            incomeTotal: income.data.total,
            expenseTotal: expense.data.total,
            cashFlowTotalMonthly: cashFlowTotalMonthly,
            
            incomeChartLabels: incomeChartLabels,
            incomeChartData: incomeChartData,
            expenseChartLabels: expenseChartLabels,
            expenseChartData: expenseChartData,

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

        {/* Has our ComponentDidMount has finished loading data? */}
        {this.state.isLoaded 
          ?
            // If yes, display the following.
            <div>

              <Jumbotron
                largeTitle="Welcome "
                smallTitle={currentUser.username}
                subtitle="This is your dashboard. Here, you'll find insights into what we have on file for you."
              >
                
                {/* Colored bars with icons in Jumbotron, displaying user's monthly income, expense, and cashflow */}
                <div className="dashboard-list">
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
                        Monthly Cashflow: ${this.state.cashFlowTotalMonthly}
                      </span>
                    </span>
                  </div>
                </div>

              </Jumbotron>

              {/* After the Jumbotron, we show the user a series of charts using data from their budget. */}
              <div>
                {/* TODO (CB 10/11) - what else can I add for income? */}
                {/* Income currently shows a doughnut/pie chart with their income sources broken down */}
                <DashboardChart
                  chartHeader="Income Analysis"
                  labels={this.state.incomeChartLabels}
                  data={this.state.incomeChartData}
                  name="Income"
                  type="income"
                />

                {/* Expenses currently has 2 charts - 1) doughnut/pie chart with expenses broken down, and 2) a bar/line graph
                  ... showing what % of their expenses each category composes, compared to the ideal %'s they would spend in each category */}
                <DashboardChart 
                  chartHeader="Expenses Analysis"
                  labels={this.state.expenseChartLabels}
                  data={this.state.expenseChartData}
                  name="Expenses"
                  type="expenses"
                />

                {/* This section lets the user enter how much money they already have, and makes projections from how that relates to their monthly cashflow */}
                <DashboardProjections
                  chartHeader="Future Projections"
                  type="summary"
                  expenseTotalMonthly={this.state.expenseTotal}
                  incomeTotalMonthly={this.state.incomeTotal}
                  cashFlowTotalMonthly={this.state.cashFlowTotalMonthly}
                />

              </div>

              {/* Simple navigational button to end the page, goes to their Budget */}
              <div>
                <button onClick={this.handleClick} className="btn btn-dashboard">
                   Go to Budget
                </button>
              </div>

            </div>
          :
            // Otherwise, if ComponentDidMount has not finished, only displays Jumbotron with loading spinner
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
