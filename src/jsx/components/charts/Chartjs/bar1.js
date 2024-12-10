import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
//import { Bar } from 'react-chartjs-2';
//import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class BarChart1 extends Component {
  render() {
    const data = {
      defaultFontFamily: "Poppins",
      labels: ["0", "3", "5", "7", "9", "11", "13"],
      datasets: [
        {
          label: "My First dataset",
          data: [3, 1, 2, 3, 4, 5, 6],
          borderColor: "rgba(194, 100, 24, 1)",
          borderWidth: "0",
          backgroundColor: "rgba(194, 100, 24, 1)",
          barThickness: 20,
        },
      ],
    };

    const options = {
      plugins: {
        legend: false,
      },
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },

        x: {
          // Change here
          barPercentage: 0.5,
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    };

    return (
      <>
        <div className="m-3">
          <Bar data={data} height={150} options={options} />
        </div>
      </>
    );
  }
}

export default BarChart1;
