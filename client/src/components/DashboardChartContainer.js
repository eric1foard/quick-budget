// ***************************************************************
// DashboardChart.js - Displays charts using user's Budget data
// ***************************************************************

// Dependencies
import React, { Component } from "react";

// Project Components
import DoughnutChart  from "./DoughnutChart";
import BarChart       from "./BarChart";

class DashboardChart extends Component {
  render() {

    // Used in order to style the card header like the Budget component, for consistency
    const cardHeaderClasses = `card-header card-header-${this.props.type}`

    return(
      <div>

        <div className="card w-75">
          <div className={cardHeaderClasses}>
            <div className="btn-link-heading">
              {this.props.chartHeader}
            </div>
          </div>

          {/* Both Income and Expenses are visualized via the DoughnutChart */}
          {(this.props.type === "income" || this.props.type === "expenses") 
            &&
            <div className="chart-wrapper">
              <DoughnutChart 
                title={this.props.chartHeader}
                labels={this.props.labels}
                data={this.props.data}
                name={this.props.name}
                type={this.props.type}
              />
            </div>
          }

          {/* Only Expenses gets the additional BarChart */}
          {this.props.type === "expenses" 
            &&
            <div>
              <hr />
              <div className="chart-wrapper">
                <BarChart 
                  labels={this.props.labels}
                  data={this.props.data}
                  type={this.props.type}
                />
              </div>
            </div>
          }

        </div>

      </div>
    )
  }
}

export default DashboardChart;
