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
      emergencyMonths: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateTotal = this.updateTotal.bind(this);
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

  handleClick(evt) {
    evt.preventDefault();
    console.log("Clicked")
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
                name="Checking Account"
                value={this.state.checkingAcct}
                handleChange={this.handleChange}
                id="checkingAcct"
              />

              <ProjectionsInput 
                name="Savings Account"
                value={this.state.checkingAcct}
                handleChange={this.handleChange}
                id="savingsAcct"
              />

              <ProjectionsInput 
                name="additional liquid"
                value={this.state.checkingAcct}
                handleChange={this.handleChange}
                id="liquidAcct"
              />

            </form>

            Total: {this.state.total}

            <button className="btn btn-info" onClick={this.handleClick}>Click Here</button>


            <div className="card">
              <div className="card-header">
                Emergency Fund
              </div>
              <div>
                It is recommended that you save 3 - 6 months' worth of expenses.  That way, if something unexpected happens 
                (i.e. loss of job, urgent travel to see a family member, unforeseen large expense),
                you can cover the costs with your emergency fund instead of accumulating debt.
              </div>
              <div>
                You currently have: [({this.state.total} / {this.props.expenseTotal})]
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default DashboardProjections;