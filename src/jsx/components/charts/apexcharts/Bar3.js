import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexBar3 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },

        legend: {
          show: true,
          fontSize: "12px",
          fontWeight: 300,

          labels: {
            colors: "black",
          },
          position: "bottom",
          horizontalAlign: "center",
          markers: {
            width: 19,
            height: 19,
            strokeWidth: 0,
            radius: 19,
            strokeColor: "#fff",
            fillColors: ["#b261dc", "#9a979a"],
            offsetX: 0,
            offsetY: 0,
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#3e4954",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
          },
         
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["Type A", "Type B", "Type C", "Type D"],
        },
        fill: {
          colors: ["#b261dc", "#9a979a"],
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "" + val + " liter";
            },
          },
        },
      },
    };
  }

  render() {
    console.log(this.props)
    return (
      <div id="chart" className="line-chart-style bar-chart">
        <ReactApexChart
          options={this.state.options}
          series={this.props.series}
          type="bar"
          height={250}
        />
      </div>
    );
  }
}

export default ApexBar3;
