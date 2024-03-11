import React, { Component } from "react";
import { Line } from "react-chartjs-2";

import "chart.js/auto";

class LineChart1 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["1", "2", "3", "4", "5", "6", "7"],
      datasets: [
        {
          label: "Distance",
          data: [95, 20, 12 , 24 , 24 , 12],
          borderColor: "rgba(44, 44, 44, ,1)",
          borderWidth: this.props.borderWidth ? this.props.borderWidth : "2",
          //pointBackgroundColor: "rgba(64, 24, 157, 1)",
          backgroundColor: "rgba(44, 44, 44, , 0)",
          tension: 0.4,
        },
      ],
    };

    const options = {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
      
        y: {
          min: 0,
          max: 100,
          ticks: {
            beginAtZero: true,
            padding: 0,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          title: {
            display: true,
            text: 'Distance', // Label for the y-axis
            color: 'rgba(255, 255, 255, 0.7)', // Text color
            font: {
              size: 12, // Font size
              weight: 'bold' // Font weight
            }
          }
        },

        x: {
          ticks: {
            padding: 0,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          title: {
            display: true,
            text: 'Duration', // Label for the x-axis
            color: 'rgba(255, 255, 255, 0.7)', // Text color
            font: {
              size: 12, // Font size
              weight: 'bold' // Font weight
            }
          }
        },
      },
    };
    return (
      <>
        <Line
          data={data}

          options={options}
          height={this.props.height ? this.props.height : 150}
        />
      </>
    );
  }
}

export default LineChart1;
