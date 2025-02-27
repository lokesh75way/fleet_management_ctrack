import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Nav, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ProjectOverviewChart = () => {
  const { t } = useTranslation();
  const [series, setSeries] = useState([
    {
      name: t("avgFreq"),
      type: "column",
      data: [27, 26, 28, 30, 26, 29, 30, 28, 26, 30, 27, 28],
    },
    {
      name: t("maxFreq"),
      type: "area",
      data: [32, 31, 34, 35, 30, 31, 35, 32, 31, 33, 32, 35],
    },
    {
      name: t("minFreq"),
      type: "line",
      data: [20, 22, 24, 21, 23, 25, 21, 23, 22, 24, 25, 20],
    },
  ]);

  const chartHeaderData = [
    { title: t("week"), type: "week" },
    { title: t("month"), type: "month" },
    { title: t("year"), type: "year" },
    { title: t("all"), type: "all" },
  ];

  const options = {
    chart: {
      height: 300,
      type: "line",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      dashArray: [0, 0, 5],
      width: [0, 1, 1],
      curve: "straight",
    },
    legend: {
      fontSize: "13px",
      fontFamily: "poppins",
      labels: {
        colors: "#888888",
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "18%",
        borderRadius: 6,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        colorStops: [
          [
            { offset: 0, color: "var(--primary)", opacity: 1 },
            { offset: 100, color: "var(--primary)", opacity: 1 },
          ],
          [
            { offset: 0, color: "#FF5E5E", opacity: 1 },
            { offset: 0.4, color: "#FF5E5E", opacity: 0.15 },
            { offset: 100, color: "#FF5E5E", opacity: 0 },
          ],
          [
            { offset: 0, color: "#3AC977", opacity: 1 },
            { offset: 100, color: "#3AC977", opacity: 1 },
          ],
        ],
        stops: [0, 100, 100, 100],
      },
    },
    colors: ["var(--primary)", "#FF5E5E", "#3AC977"],
    labels: ["0", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    markers: {
      size: 0,
    },
    xaxis: {
      type: "month",
      labels: {
        style: {
          fontSize: "13px",
          colors: "#888888",
        },
      },
    },
    yaxis: {
      min: 0,
      tickAmount: 4,
      labels: {
        style: {
          fontSize: "13px",
          colors: "#888888",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          return typeof y !== "undefined" ? `${y.toFixed(0)} points` : y;
        },
      },
    },
  };

  const dataSeries = (seriesType) => {
    let columnData = [];
    let areaData = [];
    let lineData = [];

    switch (seriesType) {
      case "week":
        columnData = [75, 85, 72, 100, 50, 100, 80, 75, 95, 35, 75, 100];
        areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50, 42];
        lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 20, 35, 20];
        break;
      case "month":
        columnData = [20, 50, 80, 52, 10, 80, 50, 30, 90, 10, 60, 85];
        areaData = [40, 25, 85, 45, 85, 25, 95, 65, 45, 45, 20, 12];
        lineData = [65, 45, 25, 65, 45, 25, 75, 35, 65, 75, 15, 65];
        break;
      case "year":
        columnData = [30, 20, 80, 52, 10, 90, 50, 30, 75, 20, 60, 85];
        areaData = [40, 25, 40, 45, 85, 25, 50, 65, 45, 60, 20, 12];
        lineData = [65, 45, 30, 65, 45, 25, 75, 40, 65, 50, 15, 65];
        break;
      case "all":
        columnData = [20, 50, 80, 60, 10, 80, 50, 40, 85, 20, 60, 85];
        areaData = [40, 25, 30, 45, 85, 25, 95, 65, 50, 45, 20, 12];
        lineData = [65, 45, 25, 65, 45, 25, 30, 35, 65, 75, 15, 65];
        break;
      default:
        columnData = [75, 80, 72, 100, 50, 100, 80, 30, 95, 35, 75, 100];
        areaData = [44, 65, 55, 75, 45, 55, 40, 60, 75, 45, 50, 42];
        lineData = [30, 25, 45, 30, 25, 35, 20, 45, 35, 30, 35, 20];
    }

    setSeries([
      {
        name: t("avgFreq"),
        type: "column",
        data: columnData,
      },
      {
        name: t("maxFreq"),
        type: "area",
        data: areaData,
      },
      {
        name: t("minFreq"),
        type: "line",
        data: lineData,
      },
    ]);
  };

  return (
    <Tab.Container defaultActiveKey="Week">
      <div className="card-header border-0 pb-0 flex-wrap">
        <h4 className="heading mb-0">{t("dataFrequency")}</h4>
        <Nav as="ul" className="nav nav-pills mix-chart-tab">
          {chartHeaderData.map((item, index) => (
            <Nav.Item as="li" className="nav-item" key={index}>
              <Nav.Link
                eventKey={item.title}
                onClick={() => dataSeries(item.type)}
              >
                {item.title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <div className="card-body p-0">
        <div id="overiewChart">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={300}
          />
        </div>
      </div>
    </Tab.Container>
  );
};

export default ProjectOverviewChart;