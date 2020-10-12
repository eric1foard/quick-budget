// ***********************************************************************************************
// BarChart.js - User's expense information visualized as line/bar chart, using chart.js package
// ***********************************************************************************************

// Dependencies
import React, { Component } from "react";
import Chart                from "chart.js";

// Note: the goal of this chart is to show the user what % each of their Expense categories is (the line), 
// ... with a recommended range highlighted behind it as a "floating" bar graph 
class BarChart extends Component {


  componentDidMount() {
    const node = this.node;

    // Convert from JSON to array of numbers
    const parsedData = [];
    this.props.data.forEach(elem => parsedData.push(Number(elem)));

    // Find total
    const total = parsedData.reduce((acc, curr) => acc += curr);

    // Divide each by the total, to get the the category's % of total expenses
    const dataPercentages = parsedData.map(x => ((x / total) * 100).toFixed(2));

    // Here is the logic fed into chart.js
    new Chart(node, {
      type: 'bar',
      data: {
        labels: this.props.labels,
        datasets: [
          {
            label: "Your Percentage",
            type: "line",
            borderColor: [
              "rgba(214, 76, 147, 0.4)"
            ],
            fill: false,
            data: dataPercentages
          }, {
            label: "Recommended Percentage",
            // Note: These colors match the DoughnutChart expense colors
            backgroundColor: [
              "rgba(214, 76, 147, 0.2)",
              "rgba(214, 76, 78, 0.2)",
              "rgba(214, 212, 76, 0.2)",
              "rgba(76, 147, 214, 0.2)",
              "rgba(147, 214, 76, 0.2)",
              "rgba(145, 145, 145, 0.2)",
              "rgba(143, 76, 214, 0.2)"
            ],
            // Note: these values were loosely researched.  Could be fine-tuned in the future.
            data: [[25, 35], [10, 17], [8,18], [5,20], [10,18], [7,15], [10,20]]
          }
        ]
      },
      options: {
        legend: { 
          display: true,
          position: 'top'
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
          text: 'Expenses as a Percentage of Income, Overlayed With Recommended Ranges'
        }
      }
    });
    
  }

  render() {
    return (
      <div>
        <canvas
          style={{ width: 300, height: 150 }}
          ref={node => (this.node = node)}
        />
      </div>
    );
  }
}

export default BarChart;
