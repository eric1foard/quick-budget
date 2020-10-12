import React, { Component } from "react";

import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";

class DashboardDetails extends Component {
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

          <div className="chart-wrapper">
            <DoughnutChart 
              title={this.props.chartHeader}
              labels={this.props.labels}
              data={this.props.data}
              type={this.props.type}
            />
          </div>

          {this.props.type === "expenses" 
            &&
              <div className="chart-wrapper">
                <BarChart 
                  labels={this.props.labels}
                  data={this.props.data}
                  type={this.props.type}
                />
              </div>
          }

        </div>

      </div>
    )
  }
}

export default DashboardDetails;