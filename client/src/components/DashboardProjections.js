import React, { Component } from "react";


class DashboardProjections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO (CB 10/11): Is it OK to have value here in state, as well as in Budget component in state?  It works well this way so that
      // ... we can use onBlur to clean the values, and so that not every single keystroke triggers re-renders (only exiting form)
      checkingAcct: this.props.checkingAcct,
      savingsAcct: this.props.savingsAcct,
      liquidAcct: this.props.liquidAcct,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }


    // When a user clicks out of the Value form they were editing, this cleans their value to look "financial"
  // ... by removing 0's to the left, and rounding to 2 decimal places. Then, it triggers handleChange, passing values to Budget
  handleOnBlur() {
    let cleanValue = this.state.value;
    if (cleanValue === "") cleanValue = 0;
    cleanValue = Number(this.state.value).toFixed(2);

    this.setState({ value: cleanValue });
    // this.props.handleChange(this.props.title, cleanValue, this.props.categoryTitle)
  }

  // Passes the Type's value up the chain of components, ultimately to Budget where the subtotals and total are also updated
  handleChange(evt) {    
    this.setState({value: evt.target.value});
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

              <div class="form-group row">
                <label for="colFormLabel" class="col-sm-8 col-form-label">
                  The total of your Checking Account balances:
                </label>
                <div class="col-sm-4">
                  <input 
                    type="number"
                    name="checkingAcct"
                    onChange={this.handleChange}
                    className="form-control" 
                    id="checkingAcct"
                    value={this.state.checkingAcct}
                    onBlur={this.handleOnBlur}
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="colFormLabel" class="col-sm-8 col-form-label">
                  The total of your Savings Account balances:
                </label>
                <div class="col-sm-4">
                  <input 
                    type="number"
                    name="savingsAcct"
                    onChange={this.handleChange}
                    className="form-control" 
                    id="savingsAcct"
                    value={this.state.savingsAcct}
                    onBlur={this.handleOnBlur}
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="colFormLabel" class="col-sm-8 col-form-label">
                 Any additional liquid balances:
                </label>
                <div class="col-sm-4">
                  <input 
                    type="number"
                    name="liquidAcct"
                    onChange={this.handleChange}
                    className="form-control" 
                    id="liquidAcct"
                    value={this.state.liquidAcct}
                    onBlur={this.handleOnBlur}
                  />
                </div>
              </div>

            </form>


            <div className="card">
              <div className="card-header">
                Emergency Fund
              </div>
              <div>
                It is recommended that you save 3 - 6 months' worth of expenses.  That way, if something unexpected happens 
                (i.e. loss of job, urgent travel to see a family member, unforeseen large expense),
                you can cover the costs with your emergency fund instead of accumulating debt.
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}

export default DashboardProjections;