import React, { useContext, useEffect, useState } from "react";

import { ThemeContext } from "../../../context/ThemeContext";
import MainPagetitle from "../../layouts/MainPagetitle";
import CardWidget from "./elements/CardWidget";
import ProjectOverviewTab from "./elements/ProjectOverviewTab";
import ToDoList from "./elements/ToDoList";
import EarningBlog from "./elements/EarningBlog";
import ActiveProjects from "./elements/ActiveProjects";
import BestSellerTable from "./elements/BestSellerTable";
import ProjectStatusBlog from "./elements/ProjectStatusBlog";
import ChatElementBlog from "./elements/ChatElementBlog";
import EmployeesTableList from "./elements/EmployeesTableList";
import ActiveUserMap from "./elements/ActiveUserMap";
import UpcomingBlog from "./elements/UpcomingBlog";
import AllProjectDonutChart from "./elements/AllProjectDonutChart";
// import GradientArea from "../charts/Chartjs/gradinetArea";
import { FaCar, FaCog } from "react-icons/fa";
import { BsFuelPumpFill } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { LuSiren } from "react-icons/lu";
import { SlSpeedometer } from "react-icons/sl";
import { GrLocation } from "react-icons/gr";
import { TbAirConditioning } from "react-icons/tb";
import { PiGraph } from "react-icons/pi";
import { FaThermometerHalf } from "react-icons/fa";
import { SiGraphql } from "react-icons/si";
import Select from "./Select";
import UiModal from "../bootstrap/Modal";
import CardModal from "./Model";
import Model from "./Model";
import BasicDatatable from "../table/BasicDatatable";
import SimpleDataTable from "../table/SimpleDataTable";
import OverspeedTable from "../table/OverspeedTable";
import FenceOverstayTable from "../table/FenceOverstayTable";
import ACMisuseTable from "../table/ACMisuseTable";
import StayAwayTable from "../table/StayAwayTable";
import StayInZoneTable from "../table/StayInZoneTable";
import TemperatureTable from "../table/TemperatureTable";
import FleetIdleTable from "../table/FleetIdleTable";
import MaintenanceReminderTable from "../table/MaintenanceReminderTable";
import ApexBar3 from "../charts/apexcharts/Bar3";
import LineChart1 from "../charts/Chartjs/line1";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the styles for the DatePicker
import ChartPie from "../charts/Chartjs/pie";
import DualLine from "../charts/Chartjs/dualLine";
import { Controller } from "react-hook-form";
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";
import BarChart5 from "../charts/Chartjs/bar5";
import { SVGICON } from "../../constant/theme";
import Setting from "../../layouts/Setting";
import CompSetting from "../../layouts/CompSetting";
import BarChart1 from "../charts/Chartjs/bar1";
import BarChart6 from "../charts/Chartjs/bar6";
import ApexBar2 from "../charts/apexcharts/Bar2";
import ApexLine3 from "../charts/apexcharts/Line3";
import ApexLine5 from "../charts/apexcharts/Line5";
import ApexLine4 from "../charts/apexcharts/Line4";
import PolarChart from "../charts/Chartjs/polar";
import Notification from "./Notification";

import { useTranslation } from "react-i18next";

const speed = {
  data: [
    64, 24, 40, 76, 19, 0, 2, 46, 65, 12, 10, 6, 15, 57, 35, 81, 86, 12, 12, 21,
    53, 44, 2, 1, 58, 9, 61, 64, 42, 92, 58, 9, 34, 47, 89, 52, 3, 69, 33, 2,
    60, 71, 71, 22, 65, 70, 31, 81, 36, 89,
  ],
  overSpeed: 20,
};

const temp = {
  data: [
    64, 24, 40, 76, 19, 0, 2, 46, 65, 12, 10, 6, 15, 57, 35, 81, 86, 12, 12, 21,
    53, 44, 2, 1, 58, 9, 61, 64, 42, 92, 58, 9, 34, 47, 89, 52, 3, 69, 33, 2,
    60, 71, 71, 22, 65, 70, 31, 81, 36, 89,
  ],
  min: 20,
  max: 50,
};

const zone = {
  data: [
    64, 24, 40, 76, 19, 0, 2, 46, 65, 12, 10, 6, 15, 57, 35, 81, 86, 12, 12, 21,
    53, 44, 2, 1, 58, 9, 61, 64, 42, 92, 58, 9, 34, 47, 89, 52, 3, 69, 33, 2,
    60, 71, 71, 22, 65, 70, 31, 81, 36, 89,
  ],
  stayInZone: 20,
};

const Home = () => {
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [selectedDataTable, setSelectedDataTable] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const { t } = useTranslation();

  const {
    showCardWidget,
    showAllProjectDonutChart,
    showEarningBlog,
    showActiveUserMap,
    showProjectOverviewTab,
    showDataFrequency,
    showFleetStatus,
    showFleetIdle,
    showFaultyDevices,
    showDevicesVsProject,
    showCategoryWiseStatus,
    showWebVsMobileUser,
    showApplicationUsage,
    showModelWiseDevices,
    showObjectType,
    showNumberOfTasks,
    showInactiveDevices,
    showCategoryWiseTask,
    showTop5Technician,
  } = useContext(ThemeContext);

  const customStyles = {
    control: (base) => ({
      ...base,
      zIndex: "3",
      padding: "20rem 0 ", // Adjust the height as needed,
      width: "130%",
    }),
  };
  const openModalSetting = () => {
    setIsSettingModalOpen(true);
  };
  // Function to close modal
  const closeSettingModal = () => {
    setIsSettingModalOpen(false);
  };

  const openModal = (dataTableComponent, title) => {
    setSelectedDataTable(dataTableComponent);
    setData({ title }); // Set the title in the data object
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const dateRangeText =
    startDate && endDate
      ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
      : "Select Date Range";

  const role = localStorage.getItem("role");

  return (
    <>
      {/* Modal component */}
      {isModalOpen && (
        <Model onClose={closeModal}>
          {selectedDataTable && React.cloneElement(selectedDataTable, { data })}
        </Model>
      )}

      <MainPagetitle
        mainTitle={t("dashboard")}
        pageTitle={t("dashboard")}
        parentTitle={t("home")}
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 z-3">
          <label className="mr-2 mt-2 justify-content-between align-items-center">
            {t("date")}
          </label>
          <DatePicker
            width="280px"
            className="form-control"
            startDate={startDate}
            endDate={endDate}
            selectsRange
            onChange={(dates) => {
              const [start, end] = dates;
              setStartDate(start);
              setEndDate(end);
            }}
            calendarIconClassName="datePickerZindex"
            style={customStyles}
            dateFormat="dd/MM/yy"
            placeholderText={dateRangeText}
          />
        </div>

        <CompSetting />
      </MainPagetitle>

      <div className="fluid container mt-3 mw-100">
        <div className="row " style={{ marginRight: "0.0rem" }}>
          {showCardWidget && (
            <div className="col-xl-12 wid-100">
              <div
                className="row"
                style={{ padding: "1px", marginTop: "1rem" }}
              >
                <CardWidget />
              </div>
            </div>
          )}
        </div>

        <div className="row " style={{ marginRight: "0.0rem" }}>
          {showActiveUserMap && (
            <div className="col-xl-12 wid-100">
              <div
                className="row"
                style={{
                  padding: "1px",
                  marginRight: ".1rem",
                  marginLeft: ".2rem",
                }}
              >
                <ActiveUserMap />
              </div>
            </div>
          )}
        </div>

        <div className="row " style={{ marginRight: "0.0rem" }}>
          {showDataFrequency && (
            <div className="col-xl-7 col-sm-12">
              <div className="card same-card">
                <div className="d-flex justify-content-between">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></div>
                </div>
                <ProjectOverviewTab />
              </div>
            </div>
          )}

          {showFleetStatus && (
            <div className="col-xl-5 col-sm-12">
              <div className="card same-card p-2">
                <div className="d-flex justify-content-between">
                  <h4 className="text-black text-md p-3">{t("fleetStatus")}</h4>
                </div>

                <div
                  className="card-body d-flex align-items-center justify-content-center  py-2 "
                  style={{ flexWrap: "wrap" }}
                >
                  <AllProjectDonutChart
                    colors={["#FF5E5E", "var(--primary)", "#3AC977", "#FF9F00"]}
                    labels={[
                      "Cancelled",
                      "Yet To Start",
                      "Complete",
                      "Progress",
                    ]}
                    width={300}
                    data={[18, 19, 25, 23]}
                    completeLabel={t("total")}
                  />
                  <ul className="project-list">
                    <li>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="10" height="10" rx="3" fill="#3AC977" />
                      </svg>{" "}
                      {t("complete")}
                    </li>

                    <li>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="10" height="10" rx="3" fill="#FF9F00" />
                      </svg>{" "}
                      {t("progress")}
                    </li>

                    <li>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          width="10"
                          height="10"
                          rx="3"
                          fill="var(--primary)"
                        />
                      </svg>{" "}
                      {t("yetToStart")}
                    </li>
                    <li>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width="10" height="10" rx="3" fill="#FF5E5E" />
                      </svg>{" "}
                      {t("cancelled")}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
          {showFaultyDevices && (
            <div className="col-xl-6" style={{ paddingLeft: 0 }}>
              <div
                className="card same-card mb-3 p-2"
                style={{ cursor: "pointer" }}
                onClick={() => openModal(<FleetIdleTable />, "Fleet Idle")}
              >
                <div className="d-flex justify-content-between">
                  <h4 className="text-black text-md p-3">
                    {t("faultyDevices")}
                  </h4>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {/* <Select /> */}
                  </div>
                </div>
                <BarChart1 />
              </div>
            </div>
          )}

          {showDevicesVsProject && (
            <div className="col-xl-6">
              <div
                className="card same-card mb-3 p-2"
                style={{ cursor: "pointer" }}
                onClick={() => openModal(<FleetIdleTable />, "Fleet Idle")}
              >
                <div className="d-flex justify-content-between">
                  <h4 className="text-black text-md p-3">
                    {/* {t("deviceVsProject")} */}
                    Device Distribution Across Project
                  </h4>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></div>
                </div>
                <BarChart5
                  labels={["Type A", "Type B", "Type C", "Type D"]}
                  data={[65, 59, 23, 53]}
                  backgroundColor="#0d99ff"
                  hoverBackgroundColor="rgba(44, 44, 44, 0.5)"
                  barThickness={40}
                  indexAxis={"y"}
                />
              </div>
            </div>
          )}
        </div>

        <div className="row" style={{ marginLeft: "0.2rem" }}>
          {/* Temperature */}

          {showCategoryWiseStatus && (
            <div className="col-xl-7" style={{ paddingLeft: 0 }}>
              <div
                className="card same-card mb-3 p-2"
                style={{
                  // backgroundColor: "rgb(0 255 255 / 14%)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(<TemperatureTable />, "Temperature")}
              >
                <h4 className="text-black text-md p-3">
                  {t("categoryWiseStatus")}
                </h4>

                <div className="d-flex align-items-center justify-content-between">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></div>
                </div>

                <ApexBar3
                  series={[
                    {
                      name: t("maintenance"),
                      data: [1, 3, 9, 2],
                    },
                    {
                      name: t("installation"),
                      data: [2, 6, 8, 5],
                    },
                  ]}
                />
              </div>
            </div>
          )}

          {showWebVsMobileUser && (
            <div className="col-xl-5 col-md-12">
              <div
                className="card same-card mb-3 p-2"
                style={{
                  cursor: "pointer",
                }}
              >
                <div className="d-flex align-items-center">
                  <h4
                    className="text-black fs-4 p-3"
                    style={{
                      // marginBottom: "4rem",
                      whiteSpace: "nowrap", // Added: prevent text from wrapping
                      overflow: "hidden", // Added: hide overflow
                      textOverflow: "ellipsis", // Added: show ellipsis for overflow
                    }}
                  >
                    {t("webVsMobileUser")}
                  </h4>
                </div>
                <div
                  className="card-body d-flex justify-content-center align-items-center py-2"
                  style={{ flexWrap: "wrap" }}
                >
                  <div>
                    <ChartPie
                      color1={"#49be25"}
                      color2={"#5179cf"}
                      Chartdata={[45, 55]}
                      labels={["Web User", "Mobile User"]}
                    />
                  </div>
                  <div>
                    <ul className="project-list p-3">
                      <li>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="10" height="10" rx="3" fill="#3AC977" />
                        </svg>{" "}
                        {t("webUser")}
                      </li>

                      <li>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="10" height="10" rx="3" fill="#FF9F00" />
                        </svg>{" "}
                        {t("mobileUser")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className="row "
          style={{ marginLeft: "0.2rem", justifyContent: "" }}
        >
          {showApplicationUsage && (
            <div className="col-xl-4 col-md-12" style={{ paddingLeft: 0 }}>
              <div
                className="card same-card p-2"
                style={{
                  // backgroundColor: "rgb(241 156 135 / 56%)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(<OverspeedTable />, "Overspeed")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <h4
                    className="text-black fs-4 p-3"
                    style={{
                      marginBottom: "4rem",
                      whiteSpace: "nowrap", // Added: prevent text from wrapping
                      overflow: "hidden", // Added: hide overflow
                      textOverflow: "ellipsis", // Added: show ellipsis for overflow
                    }}
                  >
                    {t("applicationUsage")}
                  </h4>
                </div>

                <div
                  className="card-body d-flex justify-content-center align-items-center py-2"
                  style={{ flexWrap: "wrap" }}
                >
                  <div>
                    <ChartPie
                      color1={"#f58505"}
                      color2={"#1ef6ea"}
                      Chartdata={[80, 20]}
                    />
                  </div>
                  <div>
                    <ul className="project-list p-3">
                      <li>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="10" height="10" rx="3" fill="#3AC977" />
                        </svg>{" "}
                        {t("webUser")}
                      </li>

                      <li>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="10" height="10" rx="3" fill="#FF9F00" />
                        </svg>{" "}
                        {t("mobileUser")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showModelWiseDevices && (
            <div className="col-xl-4 col-md-12">
              <div
                className="card same-card p-2"
                style={{
                  // backgroundColor: "rgb(144 238 144 / 56%)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(<StayInZoneTable />, "Stay In Zone")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <h4
                    className="text-black fs-4 p-3"
                    style={{
                      marginBottom: "4rem",
                      whiteSpace: "nowrap", // Added: prevent text from wrapping
                      overflow: "hidden", // Added: hide overflow
                      textOverflow: "ellipsis", // Added: show ellipsis for overflow
                    }}
                  >
                    {t("modelWiseDevices")}
                  </h4>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></div>
                </div>
                <div className="d-flex justify-content-center align-item-center">
                  <AllProjectDonutChart
                    colors={["#ea0d0d", "var(--primary)", "#3AC977", "#FF9F00"]}
                    labels={[
                      "Cancelled",
                      "Yet To Start",
                      "Complete",
                      "Progress",
                    ]}
                    width={300}
                    data={[1000, 290, 50, 30]}
                    completeLabel={t("total")}
                    size="60%"
                  />
                </div>
              </div>
            </div>
          )}

          {showObjectType && (
            <div className="col-xl-4 col-md-12">
              <div
                className="card same-card p-2"
                style={{
                  // backgroundColor: "rgb(144 238 144 / 56%)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(<StayInZoneTable />, "Stay In Zone")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <h4
                    className="text-black fs-4 p-3"
                    style={{
                      marginBottom: "4rem",
                      whiteSpace: "nowrap", // Added: prevent text from wrapping
                      overflow: "hidden", // Added: hide overflow
                      textOverflow: "ellipsis", // Added: show ellipsis for overflow
                    }}
                  >
                    {t("objectType")}
                  </h4>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></div>
                </div>

                <div className="d-flex justify-content-center align-item-center">
                  <AllProjectDonutChart
                    colors={[
                      "#ea0d0d",
                      "#FF5733",
                      "#FFBD33",
                      "#FFDD33",
                      "#E0FF33",
                      "#9FFF33",
                      "#33FF4C",
                      "#33FFBD",
                      "#33FFE9",
                      "#33E6FF",
                      "#33A1FF",
                      "#336DFF",
                      "#3333FF",
                      "#7E33FF",
                      "#C633FF",
                      "#FF33F5",
                      "#FF33A8",
                      "#FF3376",
                      "#FF336B",
                      "#FF554A",
                      "#FF8533",
                      "#FFA833",
                      "#FFD133",
                      "#FFFF33",
                      "#D5FF33",
                    ]}
                    labels={[
                      "Cancelled",
                      "Yet To Start",
                      "Complete",
                      "Progress",
                    ]}
                    width={300}
                    data={[
                      1000, 290, 50, 30, 10, 28, 2, 4, 6, 8, 12, 12, 34, 23, 12,
                      34, 56, 34, 12, 6, 78, 8, 81,
                    ]}
                    completeLabel={t("total")}
                    size="60%"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className="row "
          style={{ marginLeft: "0.2rem", justifyContent: "" }}
        >
          {showNumberOfTasks && (
            <div className="col-xl-7 col-md-12" style={{ paddingLeft: 0 }}>
              <div
                className="card same-card p-2"
                style={{
                  // backgroundColor: "rgb(241 156 135 / 56%)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(<OverspeedTable />, "Overspeed")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <h4
                    className="text-black fs-4 p-3"
                    style={{
                      marginBottom: "2rem",
                      whiteSpace: "nowrap", // Added: prevent text from wrapping
                      overflow: "hidden", // Added: hide overflow
                      textOverflow: "ellipsis", // Added: show ellipsis for overflow
                    }}
                  >
                    {t("numberOfTasks")}
                  </h4>
                </div>

                <div
                  className="justify-content-center align-items-center"
                  // style={{ flexWrap: "wrap" }}
                >
                  <ApexLine4
                    height={300}
                    categories={[
                      "05-08-17",
                      "09-11-23",
                      "03-06-29",
                      "10-04-18",
                      "07-12-31",
                      "01-10-22",
                      "06-09-25",
                      "02-01-14",
                      "08-03-10",
                      "11-05-27",
                      "04-07-12",
                      "12-02-24",
                    ]}
                    series={[
                      {
                        name: "Upcoming Tasks",
                        data: [
                          65, 65, 65, 120, 120, 80, 120, 100, 100, 120, 120,
                          120,
                        ],
                      },
                      {
                        name: "Missed Tasks",
                        data: [50, 100, 35, 35, 0, 0, 80, 20, 40, 40, 40, 40],
                      },
                      {
                        name: "Incomplete Tasks",
                        data: [20, 40, 20, 80, 40, 40, 20, 60, 60, 20, 110, 60],
                      },
                      {
                        name: "Completed tasks",
                        data: [10, 20, 10, 40, 60, 30, 80, 20, 50, 90, 10, 110],
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {showInactiveDevices && (
            <div className="col-xl-5 col-md-12">
              <div
                className="card same-card p-2"
                style={{
                  // backgroundColor: "rgb(144 238 144 / 56%)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(<StayInZoneTable />, "Stay In Zone")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <h4
                    className="text-black fs-4 p-3"
                    style={{
                      marginBottom: "2rem",
                      whiteSpace: "nowrap", // Added: prevent text from wrapping
                      overflow: "hidden", // Added: hide overflow
                      textOverflow: "ellipsis", // Added: show ellipsis for overflow
                    }}
                  >
                    {t("inactiveDevices")}
                  </h4>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></div>
                </div>

                <BarChart5
                  labels={["90", "60", "30", "15", "7", "1"]}
                  data={[77, 31, 34, 46, 22, 68]}
                  backgroundColor="#0d99ff"
                  hoverBackgroundColor="rgba(44, 44, 44, 0.5)"
                  barThickness={15}
                />
              </div>
            </div>
          )}
        </div>

        <div
          className="row "
          style={{ marginLeft: "0.2rem", justifyContent: "" }}
        >
          {showCategoryWiseTask && (
            <div className="col-xl-6 col-md-12" style={{ paddingLeft: 0 }}>
              <div
                className="card same-card p-2"
                style={{
                  // backgroundColor: "rgb(241 156 135 / 56%)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(<OverspeedTable />, "Overspeed")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <h4
                    className="text-black fs-4 p-3"
                    style={{
                      marginBottom: "2rem",
                      whiteSpace: "nowrap", // Added: prevent text from wrapping
                      overflow: "hidden", // Added: hide overflow
                      textOverflow: "ellipsis", // Added: show ellipsis for overflow
                    }}
                  >
                    {t("categoryWiseTasks")}
                  </h4>
                </div>

                <div className="card-body d-flex justify-content-center align-items-center py-2">
                  <div>
                    <ChartPie
                      color1={"#f58505"}
                      color2={"#1ef6ea"}
                      Chartdata={[80, 20]}
                    />
                  </div>
                  <div>
                    <ul className="project-list p-3">
                      <li>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="10" height="10" rx="3" fill="#f58505" />
                        </svg>{" "}
                        Maintenance
                        {/* {t("webUser")} */}
                      </li>

                      <li>
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="10" height="10" rx="3" fill="#1ef6ea" />
                        </svg>{" "}
                        {/* {t("mobileUser")} */}
                        Installed
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showTop5Technician && (
            <div className="col-xl-6 col-md-12">
              <div
                className="card same-card p-2"
                style={{
                  // backgroundColor: "rgb(144 238 144 / 56%)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(<StayInZoneTable />, "Stay In Zone")}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <h4
                    className="text-black fs-4 p-3"
                    style={{
                      whiteSpace: "nowrap", // Added: prevent text from wrapping
                      overflow: "hidden", // Added: hide overflow
                      textOverflow: "ellipsis", // Added: show ellipsis for overflow
                    }}
                  >
                    {t("topFiveTechnician")}
                  </h4>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  ></div>
                </div>

                <Notification />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
