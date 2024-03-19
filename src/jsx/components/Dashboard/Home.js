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


  const {
    showCardWidget,
    showAllProjectDonutChart,
    showEarningBlog,
    showActiveUserMap,
    showProjectOverviewTab
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
        mainTitle="Dashboard"
        pageTitle="Dashboard"
        parentTitle="Home"
      >
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2 z-3">
          <label className="mr-2 mt-2 justify-content-between align-items-center">
            Date:
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
            {showEarningBlog && (
              <div className="col-xl-7 col-sm-12">
                <div className="card same-card p-2">
                  <div className="d-flex justify-content-between">
                    <h4 className="text-black text-md p-3">Fleet Usage</h4>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    ></div>
                  </div>
                  <EarningBlog />
                </div>
              </div>
            )}

            {showAllProjectDonutChart && (
              <div className="col-xl-5 col-sm-12">
                <div className="card same-card p-2">
                  <div className="d-flex justify-content-between">
                    <h4 className="text-black text-md p-3">Fleet Status</h4>
                  </div>

                  <div
                    className="card-body d-flex align-items-center justify-content-center  py-2 "
                    style={{ flexWrap: "wrap" }}
                  >
                    <AllProjectDonutChart
                      colors={[
                        "#FF5E5E",
                        "var(--primary)",
                        "#3AC977",
                        "#FF9F00",
                      ]}
                      labels={[
                        "Cancelled",
                        "Yet To Start",
                        "Complete",
                        "Progress",
                      ]}
                      width={300}
                      data={[18, 19, 25, 23]}
                      completeLabel="Total"
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
                        Completed
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
                        Progress
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
                        Yet To Start
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
                        Cancelled
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        

        <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
          <div className="col-xl-6" style={{ paddingLeft: 0 }}>
            <div
              className="card same-card mb-3 p-2"
              style={{ cursor: "pointer" }}
              onClick={() => openModal(<FleetIdleTable />, "Fleet Idle")}
            >
              <div className="d-flex justify-content-between">
                <h4 className="text-black text-md p-3">Fleet Idle</h4>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {/* <Select /> */}
                </div>
              </div>
              <ApexBar3
                series={[
                  {
                    name: "Total Fleet Idle",
                    data: [420, 550, 850, 220, 650],
                  },
                  {
                    name: "Approx Fuel Waste",
                    data: [170, 850, 101, 90, 250],
                  },
                ]}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div
              className="card same-card mb-3 p-2"
              style={{ cursor: "pointer" }}
              onClick={() => openModal(<FleetIdleTable />, "Fleet Idle")}
            >
              <div className="d-flex justify-content-between">
                <h4 className="text-black text-md p-3">Fleet Fuel</h4>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {/* <Select /> */}
                </div>
              </div>
              <ApexBar3
                series={[
                  {
                    name: "Total Fuel Refill",
                    data: [420, 550, 850, 220, 650],
                  },
                  {
                    name: "Approx Fuel Drain",
                    data: [170, 850, 101, 90, 250],
                  },
                ]}
              />
            </div>
          </div>
        </div>

        <div className="row" style={{ marginLeft: "0.2rem" }}>
          {/* Temperature */}

          {showProjectOverviewTab && (
            <div className="col-xl-7" style={{ paddingLeft: 0 }}>
              <div
                className="card same-card mb-3 p-2"
                style={{
                  // backgroundColor: "rgb(0 255 255 / 14%)",
                  cursor: "pointer",
                }}
                onClick={() => openModal(<TemperatureTable />, "Temperature")}
              >
                <div className="d-flex align-items-center justify-content-between">
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
                  Maintenance
                </h4>
              </div>
              <div
                className="card-body d-flex justify-content-center align-items-center py-2"
                style={{ flexWrap: "wrap" }}
               >
                <div>
                  <ChartPie />
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
                      Renewal Due
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
                      Renewal Over-Due
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
                      Maintenance Due
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
                      Maintenance Over-Due
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row "
          style={{ marginLeft: "0.2rem", justifyContent: "space-between" }}
        >
          {/* Overspeed */}
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
                    marginBottom: "4rem",
                    whiteSpace: "nowrap", // Added: prevent text from wrapping
                    overflow: "hidden", // Added: hide overflow
                    textOverflow: "ellipsis", // Added: show ellipsis for overflow
                  }}
                >
                  Overspeed
                </h4>
              </div>

              <DualLine />
            </div>
          </div>

          {/* Stay In Zone */}
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
                    marginBottom: "4rem",
                    whiteSpace: "nowrap", // Added: prevent text from wrapping
                    overflow: "hidden", // Added: hide overflow
                    textOverflow: "ellipsis", // Added: show ellipsis for overflow
                  }}
                >
                  Stay In Zone
                </h4>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                ></div>
              </div>

              <BarChart5 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
