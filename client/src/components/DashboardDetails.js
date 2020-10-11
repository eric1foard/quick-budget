import React, { Component } from "react";

import DoughnutChart from "./DoughnutChart"

class DashboardDetails extends Component {
  render() {

    const cardHeaderClasses = `card-header card-header-${this.props.type}`
    // const cardFooterClasses = `card-footer card-footer-${boxType}`

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
              labels={this.props.labels}
              data={this.props.data}
              type={this.props.type}
            />
          </div>

        </div>

      </div>
    )
  }
}

export default DashboardDetails;