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
      showNegativeMonths: 0
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
    const newTotal = (Number(this.state.checkingAcct) + Number(this.state.savingsAcct) + Number(this.state.liquidAcct));
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
    const savingsGoalMonths = ((this.state.savingsGoal - this.state.total) / this.props.incomeTotalMonthly).toFixed(2);

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
            
            <form>

              <ProjectionsInput 
                title="Your Total Checking Account Balance"
                value={this.state.checkingAcct}
                handleChange={this.handleChange}
                id="checkingAcct"
              />

              <ProjectionsInput 
                title="Your Total Savings Account Balance"
                value={this.state.checkingAcct}
                handleChange={this.handleChange}
                id="savingsAcct"
              />

              <ProjectionsInput 
                title="Total of Other Liquid Assets"
                value={this.state.checkingAcct}
                handleChange={this.handleChange}
                id="liquidAcct"
              />

            </form>

            Total: {this.state.total}

            <div className="card">
              <div className="card-header">
                Emergency Fund
              </div>
              <div className="card-body">
                <div>
                  An emergency fund is an amount you set aside in your checking or savings account that you keep in case of an emergency. 
                  It is recommended that an emergency fund contain 3 - 6 months' worth of your expenses.  
                  That way, if something unexpected happens (i.e. loss of job, urgent travel, unforeseen large expense),
                  you can cover the costs with your emergency fund instead of accumulating debt.
                </div>
                <br />
                <div>
                  {this.state.showEmergency
                  &&
                    <div>
                      You currently have {this.state.emergencyMonths} months' worth of emergency funds.
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
                <div className="card-header">
                  Savings Goal
                </div>
                <div className="card-body">
                  <div>
                    Since you have a net positive in your monthly cashflow, you are able to save up extra income each month.
                    Here is a tool to calculate how many months it will take to reach a target savings goal.
                  </div>
                  <br/>
                  <div>            
                    <ProjectionsInput 
                      title="Your Target Savings Goal"
                      value={this.state.savingsGoal}
                      handleChange={this.handleChange}
                      id="savingsGoal"
                    />
                  </div>
                  <div>
                    <button className="btn btn-info" onClick={this.handleClickSavingsGoal}>
                      Calculate
                    </button>
                  </div>
                  <div>
                    You will reach your goal in {this.state.savingsGoalMonths} months
                  </div>
                </div>
              </div>
            :
              <div className="card">
                <div className="card-header">
                  How Long Your Money Will Last
                </div>
                <div className="card-body">
                  <div>
                    Since you have a net negative for your monthly cashflow, you are spending more than your monthly income.
                    Here is a tool to calculate how long your accounts will last at your current spending rate.
                  </div>
                  <br/>
                  <div>
                    <button className="btn btn-info" onClick={this.handleClickNegativeMonths}>
                      Calculate
                    </button>
                  </div>
                  <div>
                    Your accounts will last {this.state.negativeMonths} months
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