import React, { Component } from "react";
import Chart from "chart.js";

class DoughnutChart extends Component {
  constructor(props) {
    super(props);
  }
  

  componentDidMount() {
    const node = this.node;

    const incomeColors = [
      "rgba(76, 214, 110, 0.3)",
      "rgba(76, 214, 182, 0.3)",
      "rgba(76, 200, 214, 0.3)"
    ]
    
    const expenseColors = [
      "rgba(214, 76, 147, 0.3)",
      "rgba(214, 76, 78, 0.3)",
      "rgba(214, 212, 76, 0.3)",
      "rgba(76, 147, 214, 0.3)",
      "rgba(147, 214, 76, 0.3)",
      "rgba(214, 76, 78, 0.3)",
      "rgba(143, 76, 214, 0.3)"
    ]

    const colors = (this.props.type === "income" ? incomeColors : expenseColors);
    

    var myChart = new Chart(node, {
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