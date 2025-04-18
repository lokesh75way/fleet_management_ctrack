import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getAllTasks } from "../../../../services/api/DashboardServices";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

const ApexLine4 = ({ height }) => {
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState("week");

  const { data: allTasks, isLoading: isTasksLoading } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: getAllTasks,
    staleTime: Infinity,
  });

  dayjs.extend(isoWeek);
  const now = dayjs();
  const tasks = allTasks?.data || [];

  const combineDateAndTime = (date, time) => {
    if (!date) return null;
    const dateObj = dayjs(date);
    
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      return dateObj.hour(hours).minute(minutes);
    }
    
    return dateObj;
  };

  // Check if task is for today
  const isToday = (date) => dayjs(date).format('YYYY-MM-DD') === now.format('YYYY-MM-DD');


  const isUpcoming = (task) => {
    const taskDateTime = combineDateAndTime(task.plannedReportingDate, task.reportingTime);
    
    // If the task is for today, compare with the time
    if (isToday(task.plannedReportingDate)) {
      return taskDateTime.isAfter(now);
    }
    
    // For future dates
    return dayjs(task.plannedReportingDate).isAfter(now, "day");
  };

  const isMissed = (task) => {
    const taskDateTime = combineDateAndTime(task.plannedReportingDate, task.reportingTime);
    
    // If the task is for today, compare with the time
    if (isToday(task.plannedReportingDate)) {
      return taskDateTime.isBefore(now);
    }
    
    // For past dates
    return dayjs(task.plannedReportingDate).isBefore(now, "day");
  };

  const isSameWeek = (date) => dayjs(date).isoWeek() === now.isoWeek() && dayjs(date).year() === now.year();
  const isSameMonth = (date) => dayjs(date).month() === now.month() && dayjs(date).year() === now.year();
  const isSameYear = (date) => dayjs(date).year() === now.year(); 

  const getTaskCountBy = (filterFn, groupFn, range) => {
    const counts = Array(range).fill(0);
    tasks.filter(filterFn).forEach(task => {
      const index = groupFn(task);
      if (index >= 0 && index < range) counts[index]++;
    });
    return counts;
  };
  
  const categories = {
    week: [t("sunday"), t("monday"), t("tuesday"), t("wednesday"), t("thursday"), t("friday"), t("saturday")],
    month: Array.from({ length: 31 }, (_, i) => (i + 1).toString()),
    year: [t("jan"), t("feb"), t("mar"), t("apr"), t("may"), t("jun"), t("jul"), t("aug"), t("sep"), t("oct"), t("nov"), t("dec")]
  };
  
  const seriesData = {
    week: [
      {
        name: t("upcomingTasks"),
        data: getTaskCountBy(
          (task) => isSameWeek(task.plannedReportingDate) && isUpcoming(task),
          (task) => dayjs(task.plannedReportingDate).day(),
          7
        ),
      },
      {
        name: t("missedTasks"),
        data: getTaskCountBy(
          (task) => isSameWeek(task.plannedReportingDate) && isMissed(task),
          (task) => dayjs(task.plannedReportingDate).day(),
          7
        ),
      },
      {
        name: t("incompleteTasks"),
        data: [5, 3, 4, 2, 6, 4, 3], 
      },
      {
        name: t("completedTasks"),
        data: [10, 8, 9, 11, 7, 10, 12], 
      },
    ],
    month: [
      {
        name: t("upcomingTasks"),
        data: getTaskCountBy(
          (task) => isSameMonth(task.plannedReportingDate) && isUpcoming(task),
          (task) => dayjs(task.plannedReportingDate).date() - 1,
          31
        ),
      },
      {
        name: t("missedTasks"),
        data: getTaskCountBy(
          (task) => isSameMonth(task.plannedReportingDate) && isMissed(task),
          (task) => dayjs(task.plannedReportingDate).date() - 1,
          31
        ),
      },
      {
        name: t("incompleteTasks"),
        data: Array(31).fill(4),
      },
      {
        name: t("completedTasks"),
        data: Array(31).fill(7),
      },
    ],
    year: [
      {
        name: t("upcomingTasks"),
        data: getTaskCountBy(
          (task) => isSameYear(task.plannedReportingDate) && isUpcoming(task),
          (task) => dayjs(task.plannedReportingDate).month(),
          12
        ),
      },
      {
        name: t("missedTasks"),
        data: getTaskCountBy(
          (task) => isSameYear(task.plannedReportingDate) && isMissed(task),
          (task) => dayjs(task.plannedReportingDate).month(),
          12
        ),
      },
      {
        name: t("incompleteTasks"),
        data: Array(12).fill(8), 
      },
      {
        name: t("completedTasks"),
        data: Array(12).fill(15),
      },
    ],
  };
  
  const options = {
    chart: { height, type: "line", toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: {
      width: [4, 4, 4, 4],
      colors: ["var(--primary)", "#d30c0c", "#FF9432", "#9FFF33"],
      curve: "straight",
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "13px",
      fontFamily: "poppins",
      labels: { colors: "#888888" },
    },
    xaxis: {
      type: "category",
      categories: categories[activeView],
      labels: {
        style: { fontSize: "12px", colors: "#888888" },
        rotate: activeView === "month" ? -45 : 0,
        rotateAlways: activeView === "month",
      },
    },
    colors: ["var(--primary)", "#d30c0c", "#FF9432", "#9FFF33"],
    markers: {
      size: [6, 6, 6, 6],
      strokeWidth: [0, 0, 0, 0],
      strokeColors: ["var(--primary)", "#d30c0c", "#FF9432", "#9FFF33"],
      border: 0,
      colors: ["var(--primary)", "#d30c0c", "#FF9432", "#9FFF33"],
      hover: { size: 8 },
    },
    yaxis: {
      title: { text: t("numberOfTasks") },
      labels: {
        style: { fontSize: "13px", colors: "#888888" },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => (typeof y !== "undefined" ? `${y.toFixed(0)} ${t("tasks")}` : y),
      },
    },
  };

  const viewOptions = ["week", "month", "year"];

  return (
    <div>
      <div className="card-header border-0 pb-0 d-flex justify-content-between">
        <h4 className="text-black">{t("numberOfTasks")}</h4>
        <Nav as="ul" className="nav nav-pills mix-chart-tab mb-2">
          {viewOptions.map((period) => (
            <Nav.Item as="li" className="nav-item" key={period}>
              <Nav.Link
                eventKey={period}
                className={activeView === period ? "active" : ""}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveView(period);
                }}
              >
                {t(period)}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <div className="card-body p-0">
        <div id="chart" className="bar-chart">
          <ReactApexChart
            options={options}
            series={seriesData[activeView]}
            type="line"
            height={height}
          />
        </div>
      </div>
    </div>
  );
};

export default ApexLine4;