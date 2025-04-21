import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const AllProjectDonutChart = ({
  colors,
  labels,
  width,
  data,
  completeLabel,
  size,
}) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "donut",
      width: 140,
    },
    colors,
    labels,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: size || "80%",
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
              label: completeLabel || "Complete",
              color: "var(--primary)",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },
  });

  useEffect(() => {
    setChartOptions((prev) => ({
      ...prev,
      labels,
      plotOptions: {
        ...prev.plotOptions,
        pie: {
          ...prev.plotOptions.pie,
          donut: {
            ...prev.plotOptions.pie.donut,
            labels: {
              ...prev.plotOptions.pie.donut.labels,
              total: {
                ...prev.plotOptions.pie.donut.labels.total,
                label: completeLabel || "Complete",
              },
            },
          },
        },
      },
    }));
  }, [labels, completeLabel]);

  return (
    <div id="AllProject">
      <ReactApexChart
        options={chartOptions}
        series={data}
        type="donut"
        width={width}
      />
    </div>
  );
};

export default AllProjectDonutChart;
