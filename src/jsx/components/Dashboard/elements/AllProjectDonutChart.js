import React from "react";
import ReactApexChart from "react-apexcharts";

class AllProjectDonutChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: props.data,

      options: {
        chart: {
          type: "donut",
          width: 150,
        },
        colors: ["#3AC977", "var(--primary)", "var(--secondary)"],
        labels: props.labels,
        dataLabels: {
          enabled: false,
        },

        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "50%",
              labels: {
                show: true,
                name: {
                  show: true,
                  offsetY: 12,
                },
                value: {
                  show: true,
                  fontSize: "22px",
                  fontFamily: "Arial",
                  fontWeight: "500",
                  offsetY: -17,
                },
                total: {
                  show: true,
                  fontSize: "11px",
                  fontWeight: "500",
                  fontFamily: "Arial",
                  label: "Compete",
                  color: "var(--primary)",

                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0);
                  },
                },
              },
            },
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="AllProject">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          width={this.props.width}
        />
      </div>
    );
  }
}

export default AllProjectDonutChart;
