// ***********************************************************************************************
// DoughnutChart.js - User's budget information visualized as doughnut chart, using chart.js package
// ***********************************************************************************************

// Dependencies
import React, { Component }   from "react";
import Chart                  from "chart.js"; // Important!  This package is used to create the charts.

class DoughnutChart extends Component {

  
  componentDidMount() {
    const node = this.node;

    // Contains three colors that look nice together
    // TODO (CB 10/12) - if user is allowed to add Types in income, will need to find a way to "generate" colors based on array length
    const incomeColors = [
      "rgba(76, 214, 110, 0.3)",
      "rgba(76, 214, 182, 0.3)",
      "rgba(76, 200, 214, 0.3)"
    ]
    
    // Note - since expenses are based on Category and not Type, there's no need to generate colors, we only need these 7
    const expenseColors = [
      "rgba(214, 76, 147, 0.3)",
      "rgba(214, 76, 78, 0.3)",
      "rgba(214, 212, 76, 0.3)",
      "rgba(76, 147, 214, 0.3)",
      "rgba(147, 214, 76, 0.3)",
      "rgba(145, 145, 145, 0.3)",
      "rgba(143, 76, 214, 0.3)"
    ]

    // Assigns the colors array based on this.props.type
    const colors = (this.props.type === "income" ? incomeColors : expenseColors);

    // Here is the logic fed into chart.js
    new Chart(node, {
      type: "doughnut",
      data: {
        labels: this.props.labels,
        datasets: [
          {
            data: this.props.data,
            backgroundColor: colors
          }
        ]
      },
      options: {
        legend: { 
          display: true,
          position: 'left'
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 10,
            bottom: 20
          }
        },
        title: {
          display: true,
          fontSize: 20,
          text: `Categories Visualized as a Proportion of Total ${this.props.name}`
        }
      }
    });
  }

  render() {
    return (
      <div>
        <canvas
          style={{ width: 300, height: 140 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default DoughnutChart;
