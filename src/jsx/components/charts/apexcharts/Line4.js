import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexLine4 extends React.Component {
  render() {
    const { height, categories, series } = this.props; // Destructure props

    const options = {
      chart: {
        height: height,
        type: "line",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [4, 4, 4, 4],
        colors: ["var(--primary)", "#d30c0c", "#FF9432", "#9FFF33"],
        curve: "straight",
      },
      legend: {
        show: false,
      },
      xaxis: {
        type: "text",
        categories: categories,
      },
      colors: ["var(--primary)", "#d30c0c", "#FF9432", "#9FFF33"],
      markers: {
        size: [8, 8, 6],
        strokeWidth: [0, 0, 4],
        strokeColors: ["var(--primary)", "#d30c0c", "#FF9432", "#9FFF33"],
        border: 0,
        colors: ["var(--primary)", "#d30c0c", "#fff", "#9FFF33"],
        hover: {
          size: 10,
        },
      },
      yaxis: {
        title: {
          text: "",
        },
      },
    };

    return (
      <div id="chart" className="bar-chart">
        <ReactApexChart options={options} series={series} type="line" height={300} />
      </div>
    );
  }
}

export default ApexLine4;
