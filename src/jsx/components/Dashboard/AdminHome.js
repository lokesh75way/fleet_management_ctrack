import React, { useContext, useEffect, useState } from "react";

import { ThemeContext } from "../../../context/ThemeContext";
import MainPagetitle from "../../../components/MainPagetitle";
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
import { SVGICON } from "../../../constants/theme";
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
import TechnicianSheet from "./TechnicianSheet";
import {
  getDashboardTasks,
  getFleetStatus,
  getFleetUsage,
} from "../../../services/api/DashboardServices";
import {getAllTasks} from "../../../services/api/DashboardServices";

import { useTranslation } from "react-i18next";
import Loader from "../Loader";
import CustomSVG from "../CustomSvg/CustomSvg";

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
  const [vehicleData, setVehicleData] = useState({});
  const [groupData, setGroupData] = useState({});
  const [activeUsers, setActiveUsers] = useState({});
  const [usageData, setUsageData] = useState({});
  const [statusData, setStatusData] = useState([0, 0, 0, 0]);
  const [applicationUsage, setApplicationUsage] = useState([0, 0]);
  const [tasksData, setTasksData] = useState({ xAxis: [], series: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [showTechnicianSheet, setShowTechnicianSheet] = useState(false);
  const [taskDataCount, settaskdatacount] = useState([0, 0]);
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

  useEffect(() => {
    const fetchData = async () => {
      const usageApiData = await getFleetUsage();
      const statusApiData = await getFleetStatus();
      const tasksApiData = await getDashboardTasks();
      const allTaskResponse= await getAllTasks();
      setVehicleData(usageApiData.vehicle);
      setGroupData(usageApiData.groups);
      setActiveUsers(usageApiData.activeUsers);
      setUsageData(usageApiData);
      setStatusData([
        statusApiData.cancelled,
        statusApiData.yetToStart,
        statusApiData.complete,
        statusApiData.progress,
      ]);
      setApplicationUsage([
        usageApiData.applicationUsage?.mobile,
        usageApiData.applicationUsage?.web,
      ]);

      const tasksArray = allTaskResponse.data;
      if (Array.isArray(tasksArray)) {
        const installationCount = tasksArray.filter(
          task => task.taskCategory === "INSTALLATION"
        ).length;
        
        const maintenanceCount = tasksArray.filter(
          task => task.taskCategory === "MAINTAINANCE" 
        ).length;
        
        settaskdatacount([installationCount, maintenanceCount]);
      } else {
        console.error("Tasks data is not an array");
        settaskdatacount([0, 0]);
      }

      setTasksData(tasksApiData);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(taskDataCount);
  if (isLoading) {
    return (
      <div style={{ height: "100vh" }}>
        <Loader />
      </div>
    );
  }
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
                <CardWidget usageData={usageData} />
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
                {/* <ActiveUserMap usageData={usageData} /> */}
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
                    key={statusData}
                    colors={["#FF5E5E", "var(--primary)", "#3AC977", "#FF9F00"]}
                    labels={[
                      "Cancelled",
                      "Yet To Start",
                      "Complete",
                      "Progress",
                    ]}
                    width={300}
                    data={statusData}
                    completeLabel={t("total")}
                  />
                  <ul className="project-list">
                    <li>
                      <CustomSVG fill="#3AC977" /> {t("complete")}
                    </li>

                    <li>
                      <CustomSVG fill="#FF9F00" /> {t("progress")}
                    </li>

                    <li>
                      <CustomSVG fill="var(--primary)" /> {t("yetToStart")}
                    </li>
                    <li>
                      <CustomSVG fill="#FF5E5E" /> {t("cancelled")}
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
                    {t("deviceDistributionAcrossProject")}
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
                      key={applicationUsage}
                      color1={"#49BE25"}
                      color2={"#5179CF"}
                      Chartdata={applicationUsage}
                      labels={["Web User", "Mobile User"]}
                    />
                  </div>
                  <div>
                    <ul className="project-list p-3">
                      <li>
                        <CustomSVG fill="#49BE25" /> {t("webUser")}
                      </li>
                      <li>
                        <CustomSVG fill="#5179CF" /> {t("mobileUser")}
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
          {showNumberOfTasks && (
            <div className="col-xl-7 col-md-12" style={{ paddingLeft: 0 }}>
              <div
                className="card same-card p-2"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => openModal(<OverspeedTable />, "Overspeed")}
              >
                <div
                  className="justify-content-center align-items-center"
                >
                  <ApexLine4
                  height={300}
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
          {showApplicationUsage && (
            <div className="col-xl-5 col-md-12" style={{ paddingLeft: 0 }}>
              <div
                className="card same-card p-2"
                style={{
                  // backgroundColor: "rgb(241 156 135 / 56%)",
                  cursor: "pointer",
                }}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="text-black fs-4 p-3">{t("technicianTask")}</h4>
                </div>
                <div
                  className="card-body d-flex justify-content-center align-items-center py-2"
                  style={{ flexWrap: "wrap" }}
                >
                  <div>
                    <ChartPie
                      key={taskDataCount}
                      color1={"#F58505"}
                      color2={"#1EF6EA"}
                      Chartdata={taskDataCount}
                    />
                  </div>
                  <div>
                    <ul className="project-list p-3">
                      <li>
                        <CustomSVG fill="#F58505" /> {t("installation")}
                      </li>
                      <li>
                        <CustomSVG fill="#1EF6EA" /> {t("maintenance")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showTop5Technician && (
            <div className="col-xl-7 col-md-12">
              <div
                className="card same-card p-2"
                style={{
                  cursor: "pointer",
                }}
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
                  >
                    <button
                      className="btn btn-primary btn-sm me-3"
                      onClick={() => setShowTechnicianSheet(true)}
                    >
                      {t("viewAll")}
                    </button>
                  </div>
                </div>

                <Notification />
              </div>
            </div>
          )}
          <TechnicianSheet
            isOpen={showTechnicianSheet}
            onClose={() => setShowTechnicianSheet(false)}
          />
        </div>
      </div>
    </>
  );
};
export default Home;
