import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarChart5 extends Component {
  render() {
    const {
      labels,
      data,
      backgroundColor,
      hoverBackgroundColor,
      barThickness,
      indexAxis,
    } = this.props;

    const chartData = {
      defaultFontFamily: "Poppins",
      labels: labels,
      datasets: [
        {
          label: "My First dataset",
          data: data,
          borderColor: "rgba(44, 44, 44, 1)",
          borderWidth: "0",
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
          barThickness: barThickness,
        },
      ],
    };

    const options = {
      plugins: {
        legend: false,
      },
      scales: {
        x: {
          ticks: {
            beginAtZero: true,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        y: {
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    };

    const horizontalOptions = {
      ...options,
      indexAxis: indexAxis, // This makes the chart horizontal
    };

    return (
      <div>
        <Bar data={chartData} height={150} options={horizontalOptions} />
      </div>
    );
  }
}

export default BarChart5;
