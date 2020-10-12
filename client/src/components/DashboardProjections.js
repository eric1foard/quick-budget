import React, { Component } from "react";
import ProjectionsInput from "./ProjectionsInput";


class DashboardProjections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
      // Values from the DashboardProjection section, passed up what the user enters in the ProjectionsInput fields
      checkingAcct: 0,
      savingsAcct: 0,
      liquidAcct: 0,
      totalCurrentAccts: 0, // The sum of checkingAcct, savingsAcct, and liquidAcct

      
      // For the Emergency Fund section
      showEmergencyMonths: false, // Displays instructions until user clicks "Calculate" button
      emergencyMonths: null, // The number of months' worth of emergency funds the user has.  Calculated by this component.

      // For the Savings Goal section
      showSavingsGoalMonths: false, // Displays instructions until user clicks "Calculate" button
      savingsGoal: 0, // Value from the user's input, passed up what the user enters in the ProjectionsInput field
      savingsGoalMonths: 0, // The number of months until the user reaches savingsGoal.  Calculated by this component.
      
      // For the How Long Your Money Will Last section
      showNegativeMonths: false, // Displays instructions until user clicks "Calculate" button
      negativeMonths: 0, // The number of months until the user's funds reach 0.  Calculated by this component.
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateTotalCurrentAccts = this.updateTotalCurrentAccts.bind(this);
    this.handleClickEmergency = this.handleClickEmergency.bind(this);
    this.handleClickSavingsGoal = this.handleClickSavingsGoal.bind(this);
    this.handleClickNegativeMonths = this.handleClickNegativeMonths.bind(this);
  }

  // General handler for when ProjectionsInput value changes.  Sets state here in this parent component so we can make calculations.
  handleChange(name, value) {    
    this.setState({[name]: value}, () => {
      this.updateTotalCurrentAccts();
    });
  }

  // Updates the totalCurrentAccts value in state
  updateTotalCurrentAccts() {
    const newTotal = (Number(this.state.checkingAcct) + Number(this.state.savingsAcct) + Number(this.state.liquidAcct)).toFixed(2);
    this.setState({ totalCurrentAccts: newTotal });
  }

  // Click handler in the Emergency Fund section.  Calculates the number of months of Emergency Funds the user has saved.
  handleClickEmergency(evt) {
    evt.preventDefault();

    // We find the number of months by dividing the user's total accounts by their monthly expenses.  Their monthly income is not a part of this calculation.
    const emergencyMonths = (this.state.totalCurrentAccts / this.props.expenseTotalMonthly).toFixed(2);
    this.setState({ emergencyMonths: emergencyMonths}, () => {
      this.setState({ showEmergencyMonths: true })
    });
  }

  // Click handler in the Emergency Fund section.  Calculates the number of months until user reaches their savings goal.
  handleClickSavingsGoal(evt) {
    evt.preventDefault();

    let savingsGoalMonths = 0;

    console.log("this.state.savingsGoal: ", this.state.savingsGoal);
    console.log("this.state.totalCurrentAccts: ", this.state.totalCurrentAccts);
    console.log("this.props.cashFlowTotalMonthly: ", this.props.cashFlowTotalMonthly);


    if (this.state.savingsGoal <= this.state.totalCurrentAccts) {
      console.log("goal is less than current accounts");
      savingsGoalMonths = "You Already Did It!"
    } else {
      let number = ((this.state.savingsGoal - this.state.totalCurrentAccts) / this.props.cashFlowTotalMonthly).toFixed(2);
      savingsGoalMonths = `${number} Months`
    }

    this.setState({ savingsGoalMonths: savingsGoalMonths}, () => {
      this.setState({ showSavingsGoalMonths: true })
    });
  }

  handleClickNegativeMonths(evt) {
    evt.preventDefault();

    const negativeMonths = (this.state.totalCurrentAccts / (this.props.expenseTotalMonthly - this.props.incomeTotalMonthly)).toFixed(2);

    this.setState({ negativeMonths: negativeMonths}, () => {
      this.setState({ showNegativeMonths: true });
    });
  }

  render() {

    console.log("this.props.cashFlowTotalMonthly: ", this.props.cashFlowTotalMonthly)

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
                  ${this.state.totalCurrentAccts}
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
                  {this.state.showEmergencyMonths
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

            {this.props.cashFlowTotalMonthly > 0
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