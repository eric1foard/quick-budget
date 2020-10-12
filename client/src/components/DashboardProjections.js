import React, { Component } from "react";
import ProjectionsInput from "./ProjectionsInput";


class DashboardProjections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO (CB 10/11): Is it OK to have value here in state, as well as in Budget component in state?  It works well this way so that
      // ... we can use onBlur to clean the values, and so that not every single keystroke triggers re-renders (only exiting form)
      checkingAcct: 0,
      savingsAcct: 0,
      liquidAcct: 0,
      total: 0,
      emergencyMonths: null,
      savingsGoal: 0,
      showEmergency: false,
      showSavingsGoalMonths: false,
      negativeMonths: 0,
      showNegativeMonths: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
    this.handleClickEmergency = this.handleClickEmergency.bind(this);
    this.handleClickSavingsGoal = this.handleClickSavingsGoal.bind(this);
    this.handleClickNegativeMonths = this.handleClickNegativeMonths.bind(this);
  }

  // Sets the state from ProjectionsInput value
  handleChange(name, value) {    
    this.setState({[name]: value}, () => {
      this.updateTotal();
    });
  }

  updateTotal() {
    const newTotal = (Number(this.state.checkingAcct) + Number(this.state.savingsAcct) + Number(this.state.liquidAcct)).toFixed(2);
    this.setState({ total: newTotal });
  }

  handleClickEmergency(evt) {
    evt.preventDefault();
    const emergencyMonths = (this.state.total / this.props.expenseTotalMonthly).toFixed(2);
    this.setState({ emergencyMonths: emergencyMonths}, () => {
      this.setState({ showEmergency: true })
    });
  }

  handleClickSavingsGoal(evt) {
    evt.preventDefault();
    let savingsGoalMonths = 0;

    console.log("this.state.savingsGoal: ", this.state.savingsGoal);
    console.log("this.state.total: ", this.state.total)

    if (this.state.savingsGoal <= this.state.total) {
      savingsGoalMonths = "You Already Did It!"
    } else {
      let number = ((this.state.savingsGoal - this.state.total) / this.props.incomeTotalMonthly).toFixed(2);
      savingsGoalMonths = `${number} Months`
    }

    this.setState({ savingsGoalMonths: savingsGoalMonths}, () => {
      this.setState({ showSavingsGoalMonths: true })
    });
  }

  handleClickNegativeMonths(evt) {
    evt.preventDefault();

    const negativeMonths = (this.state.total / (this.props.expenseTotalMonthly - this.props.incomeTotalMonthly)).toFixed(2);

    this.setState({ negativeMonths: negativeMonths}, () => {
      this.setState({ showNegativeMonths: true });
    });
  }

  render() {

    const cardHeaderClasses = `card-header card-header-${this.props.type}`

    return(
      <div>

        <div className="card w-75">
          <div className={cardHeaderClasses}>
            <div className="btn-link-heading">
              {this.props.chartHeader}
            </div>
          </div>


          <div className="card-body">

            <div className="card">
              <div className="card-header card-header-projections">
                Your Accounts
              </div>
              <div className="card-body">
                <div>
                  <form>

                    <ProjectionsInput 
                      title="Checking Account"
                      description="Enter the total balance of your checking account(s)"
                      value={this.state.checkingAcct}
                      handleChange={this.handleChange}
                      id="checkingAcct"
                    />

                    <hr/>

                    <ProjectionsInput 
                      title="Savings Account"
                      description="Enter the total balance of your savings account(s)"
                      value={this.state.checkingAcct}
                      handleChange={this.handleChange}
                      id="savingsAcct"
                    />

                    <hr/>

                    <ProjectionsInput 
                      title="Total of Other Liquid Assets"
                      description="Enter the total balance of any other liquid assets (excluding any accounts which cannot immediately be used)"
                      value={this.state.checkingAcct}
                      handleChange={this.handleChange}
                      id="liquidAcct"
                    />

                    <hr/>

                  </form>
                </div>
                <div className="label-title">
                  <u>Total Balance of Your Liquid Accounts</u>
                </div>
                <div className="projection-number">
                  ${this.state.total}
                </div>

              </div>
            </div>
            


            <div className="card">
              <div className="card-header card-header-projections">
                Emergency Fund
              </div>
              <div className="card-body">
                <div>
                  An emergency fund is an amount you set aside in your checking or savings account that you keep in case of an emergency.
                </div>
                <br/>
                <div>
                  It is recommended that an emergency fund contain 3 - 6 months' worth of your expenses.  
                  That way, if something unexpected happens (i.e. loss of job, urgent travel, unforeseen large expense),
                  you can cover your costs with your emergency fund instead of accumulating debt.
                </div>
                <br />
                <div className="label-title">
                  <u>Months of Emergency Funds Currently Saved</u>
                </div>
                <div>
                  {this.state.showEmergency
                  ?
                    <div className="projection-number">
                      {this.state.emergencyMonths} Months
                    </div>
                  :
                    <div>
                      <br/>
                      <div>
                        <em>1. Enter your account balances above.  2. Click the Calculate button below.</em>
                      </div>
                      <br/>
                    </div>
                  }

                  <button className="btn btn-info" onClick={this.handleClickEmergency}>
                    Calculate
                  </button>

                </div>
              </div>
            </div>

            {this.props.monthlyTotal > 0
            ?
              <div className="card">
                <div className="card-header card-header-projections">
                  Savings Goal
                </div>
                <div className="card-body">
                  <div>
                    Since you have a net positive in your monthly cashflow, you are able to save up extra income each month.
                    Here is a tool to calculate how many months it will take to reach a target savings goal.
                  </div>
                  <br/>
                  <div>    
                    <hr/>        
                    <ProjectionsInput 
                      title="Target Savings Goal"
                      description="Enter the amount you would like to save up - whether it be for a house, a car, or whatever you are saving for"
                      value={this.state.savingsGoal}
                      handleChange={this.handleChange}
                      id="savingsGoal"
                    />
                    <hr/>
                  </div>
                  <div className="label-title">
                    Time Until You Reach Your Goal 
                  </div>
                  {this.state.showSavingsGoalMonths
                  ?
                    <div className="projection-number">
                      {this.state.savingsGoalMonths}
                    </div>
                  :
                    <div>
                      <br/>
                      <div>
                        <em>1. Enter your account balances above.  2. Click the Calculate button below.</em>
                      </div>
                      <br/>
                    </div>
                  }
                  <div>
                    <button className="btn btn-info" onClick={this.handleClickSavingsGoal}>
                      Calculate
                    </button>
                  </div>
                </div>
              </div>
            :
              <div className="card">
                <div className="card-header card-header-projections">
                  How Long Your Money Will Last
                </div>
                <div className="card-body">
                  <div>
                    Since you have a net negative for your monthly cashflow, you are spending more than your monthly income.
                    Here is a tool to calculate how long your accounts will last at your current spending rate.
                  </div>
                  <br/>
                  <div className="label-title">
                    With Current Monthly Budget, Your Accounts Will Last 
                  </div>
                  {this.state.showNegativeMonths 
                  ?
                    <div className="projection-number">
                      {this.state.negativeMonths} Months
                    </div>
                  :
                    <div>
                      <br/>
                      <div>
                        <em>1. Enter your account balances above.  2. Click the Calculate button below.</em>
                      </div>
                      <br/>
                    </div>
                  }
                  <div>
                    <button className="btn btn-info" onClick={this.handleClickNegativeMonths}>
                      Calculate
                    </button>
                  </div>
                </div>
              </div>
            }




          </div>

        </div>

      </div>
    )
  }
}

export default DashboardProjections;