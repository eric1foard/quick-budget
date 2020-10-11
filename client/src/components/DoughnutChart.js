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

    const colors = (this.props.type === "income" ? incomeColors : expenseColors)



    console.log(this.props.labels)
    console.log(this.props.data)
    console.log(this.props.colors)
    

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
      }
    });
  }

  render() {
    return (
      <div>
        <canvas
          style={{ width: 300, height: 100 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default DoughnutChart;