import React, { useContext, useEffect } from "react";
//import loadable from "@loadable/component";
//import pMinDelay from "p-min-delay";

//Import Components
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
import { FaCar } from "react-icons/fa";
import { BsFuelPumpFill } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { LuSiren } from "react-icons/lu";
import { SlSpeedometer } from "react-icons/sl";
import { GrLocation } from "react-icons/gr";
import { TbAirConditioning } from "react-icons/tb";
import { PiGraph } from "react-icons/pi";
import { FaThermometerHalf } from "react-icons/fa";
import { SiGraphql } from "react-icons/si";

// const DashboardComboChart = loadable(() =>
// 	pMinDelay(import("./Dashboard/DashboardComboChart"), 1000)
// );

const Select = () => {
  return (
    <select style={{ width: "3.5rem", fontSize: "8px", marginRight: "0.2rem" }}>
      <option>Today</option>
      <option>Yesterday</option>
      <option>Tomorrow</option>
    </select>
  );
};

const Home = () => {
  const { changeBackground } = useContext(ThemeContext);
  useEffect(() => {
    changeBackground({ value: "light", label: "Light" });
  }, []);

  return (
    <>
      <MainPagetitle
        mainTitle="Dashboard"
        pageTitle="Dashboard"
        parentTitle="Home"
      />
      <div className="fluid container mt-3 mw-100">
        <div className="row" style={{ marginRight: "0.0rem" }}>
          <div className="col-xl-4 col-sm-12">
            <div
              className="card same-card pt-2"
              style={{ paddingLeft: "1rem" }}
            >
              <div className="d-flex justify-content-between">
                <p className="text-black text-md">Fleet Status</p>
              </div>
              <div className="card-body d-flex align-items-center  py-2">
                <AllProjectDonutChart width={300} data={[12, 10, 15]} />
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
                    Running
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
                    Idle
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
                        fill="var(--secondary)"
                      />
                    </svg>{" "}
                    Stopped
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-12">
            <div
              className="card same-card pt-2"
              style={{ paddingLeft: "1rem" }}
            >
              <div className="d-flex justify-content-between">
                <p className="text-black text-md">Fleet Usage</p>
                <Select />
              </div>
              <div className="mt-5">
                <p>
                  Total Fleet Usage:{" "}
                  <span className="text-black">72.97 km</span>
                </p>
                <p>
                  Avg. Distance / Object:{" "}
                  <span className="text-black">72.97 km</span>
                </p>
              </div>
              <div className="mt-3">
                {/* <GradientArea /> */}
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-12">
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              <div
                className="card same-card mb-3 pt-2"
                style={{ paddingLeft: "1rem" }}
              >
                <div className="d-flex justify-content-between">
                  <p className="text-black text-md">Fleet Idle</p>
                  <Select />
                </div>
                <div className="d-flex justify-content-evenly">
                  <div className="">
                    <p>Total Fleet Idle</p>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <FaCar color="#b3b300" />
                      <p style={{ color: "#b3b300" }}>O hr</p>
                    </div>
                  </div>
                  <div className="">
                    <p>Approx Fuel Waste</p>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <BsFuelPumpFill color="#ffcccb" />
                      <p style={{ color: "red" }}>O ltr</p>
                    </div>
                  </div>
                </div>
                <div className="fs-6 text-align-center d-flex justify-content-between gap-1 mb-2">
                  <div>
                    <strong>Note:</strong>
                  </div>
                  <div className="fw-lighter">
                    Generally an idling car uses between 1.89 to 2.64 liter of
                    fuel per hour. Object with Movable category are considered
                    in Analytics.
                  </div>
                </div>
              </div>
              <div
                className="fluid container"
                style={{ marginTop: 0, padding: 0 }}
              >
                <div
                  className="row pe-0 ps-0 mx-0 justify-content-between gap-2"
                  style={{ flexWrap: "nowrap" }}
                >
                  <div
                    className="card same-card p-2 col-6"
                    style={{ backgroundColor: "#90EE90" }}
                  >
                    <div className="d-flex justify-content-between">
                      <p
                        className="text-black fs-4"
                        style={{ marginLeft: "0.3rem" }}
                      >
                        Stay In Zone
                      </p>
                      <Select />
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                      <div
                        className="d-flex align-items-end mb-2"
                        style={{ height: "100%" }}
                      >
                        <SiGraphql color="white" size={50} />
                      </div>
                      <div>
                        <div
                          className="fs-2 text-white d-flex justify-content-end"
                          style={{ marginTop: "2.5rem" }}
                        >
                          0
                        </div>
                        <div className="text-black d-flex justify-content-end">
                          Alerts
                        </div>
                        <p
                          className="d-flex justify-content-end"
                          style={{
                            color: "#808080",
                            backgroundColor: "#4ee44e",
                            borderRadius: "5px",
                            outline: "none",
                            paddingLeft: "3px",
                            paddingRight: "3px",
                          }}
                        >
                          0% Object
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="card same-card p-2 col-6"
                    style={{ backgroundColor: "#00FFFF" }}
                  >
                    <div className="d-flex justify-content-between">
                      <p
                        className="text-black fs-4"
                        style={{ marginLeft: "0.3rem" }}
                      >
                        Temperature
                      </p>
                      <Select />
                    </div>
                    <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                      <div
                        className="d-flex align-items-end mb-2"
                        style={{ height: "100%" }}
                      >
                        <FaThermometerHalf color="white" size={50} />
                      </div>
                      <div>
                        <div className="text-red fs-6 d-flex justify-content-end">
                          Min Temp. 0.0 C
                        </div>
                        <div className="text-red fs-6 d-flex justify-content-end">
                          Max Temp. 0.0 C
                        </div>
                        <div className="fs-2 text-white d-flex justify-content-end">
                          0
                        </div>
                        <div className="text-black d-flex justify-content-end">
                          Alerts
                        </div>
                        <p
                          className="d-flex justify-content-end"
                          style={{
                            backgroundColor: "#00e6e6",
                            color: "#ffb09c",
                            borderRadius: "5px",
                            outline: "none",
                            paddingLeft: "3px",
                            paddingRight: "3px",
                          }}
                        >
                          0% Object
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginRight: "0.2rem" }}>
          <div className="col-xl-2 col-sm-12">
            <div
              className="card same-card p-2"
              style={{ backgroundColor: "#ffb09c" }}
            >
              <div className="d-flex justify-content-between">
                <p className="text-black fs-4" style={{ marginLeft: "0.3rem" }}>
                  Overspeed
                </p>
                <Select />
              </div>
              <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                <div
                  className="d-flex align-items-end mb-2"
                  style={{ height: "100%" }}
                >
                  <SlSpeedometer color="white" size={50} />
                </div>
                <div>
                  <div className="text-red fs-6 d-flex justify-content-end">
                    Max Speed
                  </div>
                  <div className="text-red fs-6 d-flex justify-content-end">
                    0 km/hr
                  </div>
                  <div className="fs-2 text-white d-flex justify-content-end">
                    0
                  </div>
                  <div className="text-black d-flex justify-content-end">
                    Alerts
                  </div>
                  <p
                    className="bg-danger d-flex justify-content-end"
                    style={{
                      color: "#ffb09c",
                      borderRadius: "5px",
                      outline: "none",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    0% Object
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-sm-12">
            <div
              className="card same-card p-2"
              style={{ backgroundColor: "#CBC3E3" }}
            >
              <p className="text-black fs-4" style={{ marginLeft: "0.3rem" }}>
                Fence Overstay
              </p>
              <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                <div
                  className="d-flex align-items-end mb-2"
                  style={{ height: "100%" }}
                >
                  <GrLocation color="white" size={50} />
                </div>
                <div>
                  <div className="text-red fs-6 d-flex justify-content-end">
                    Max Overstay
                  </div>
                  <div className="text-red fs-6 d-flex justify-content-end">
                    ---
                  </div>
                  <div className="fs-2 text-white d-flex justify-content-end">
                    0
                  </div>
                  <div className="text-black d-flex justify-content-end">
                    Alerts
                  </div>
                  <p
                    className="d-flex justify-content-end"
                    style={{
                      color: "#CBC3E3",
                      backgroundColor: "#9e8fcb",
                      borderRadius: "5px",
                      outline: "none",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    0% Object
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-sm-12">
            <div
              className="card same-card p-2"
              style={{ backgroundColor: "#ADD8E6" }}
            >
              <div className="d-flex justify-content-between">
                <p className="text-black fs-4" style={{ marginLeft: "0.3rem" }}>
                  AC Misuse
                </p>
                <Select />
              </div>
              <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                <div
                  className="d-flex align-items-end mb-2"
                  style={{ height: "100%" }}
                >
                  <TbAirConditioning color="white" size={50} />
                </div>
                <div>
                  <div className="text-red fs-6 d-flex justify-content-end">
                    Fuel Waste
                  </div>
                  <div className="text-red fs-6 d-flex justify-content-end">
                    0 ltr
                  </div>
                  <div className="fs-2 text-white d-flex justify-content-end">
                    0
                  </div>
                  <div className="text-black d-flex justify-content-end">
                    Hours
                  </div>
                  <p
                    className="d-flex justify-content-end"
                    style={{
                      color: "#808080",
                      backgroundColor: "#72bcd4",
                      borderRadius: "5px",
                      outline: "none",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    0% Object
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-sm-12">
            <div
              className="card same-card p-2"
              style={{ backgroundColor: "#FFE36E" }}
            >
              <p className="text-black fs-4" style={{ marginLeft: "0.3rem" }}>
                Stay Away From
              </p>
              <div className="d-flex justify-content-between align-items-center p-1 mb-2">
                <div
                  className="d-flex align-items-end mb-2"
                  style={{ height: "100%" }}
                >
                  <PiGraph color="white" size={50} />
                </div>
                <div>
                  <div
                    className="fs-2 text-white d-flex justify-content-end"
                    style={{ marginTop: "2.5rem" }}
                  >
                    0
                  </div>
                  <div className="text-black d-flex justify-content-end">
                    Alerts
                  </div>
                  <p
                    className="d-flex justify-content-end"
                    style={{
                      color: "#808080",
                      backgroundColor: "#ffd422",
                      borderRadius: "5px",
                      outline: "none",
                      paddingLeft: "3px",
                      paddingRight: "3px",
                    }}
                  >
                    0% Object
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-12">
            <div className="card same-card p-2">
              <p className="text-black fs-4" style={{ marginLeft: "0.3rem" }}>
                Fleet Fuel
              </p>
            </div>
          </div>
        </div>

        <div className="row" style={{ marginRight: "0.2rem" }}>
          <div className="col-xl-2 col-sm-12">
            <div className="card same-card p-2" style={{ height: "20vh" }}>
              <p className="text-black fs-4" style={{ marginLeft: "0.3rem" }}>
                Maintenance
              </p>
              <div
                className="text-center"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div>
                  <div className="mb-3">
                    <SlCalender color="blue" size={20} />
                  </div>
                  <div style={{ color: "blue" }}>0</div>
                </div>
                <div>
                  <div className="mb-3">
                    <LuSiren color="blue" size={20} />
                  </div>
                  <div style={{ color: "blue" }}>0</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-sm-12">
            <div className="card same-card p-2" style={{ height: "20vh" }}>
              <p className="text-black fs-4" style={{ marginLeft: "0.3rem" }}>
                Renewal Reminder
              </p>
              <div
                className="text-center"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <div>
                  <div className="mb-3">
                    <SlCalender color="blue" size={20} />
                  </div>
                  <div style={{ color: "blue" }}>0</div>
                </div>
                <div>
                  <div className="mb-3">
                    <LuSiren color="blue" size={20} />
                  </div>
                  <div style={{ color: "blue" }}>0</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-sm-12">
            <div className="card same-card p-2" style={{ height: "20vh" }}>
              <p className="text-black fs-4" style={{ marginLeft: "0.3rem" }}>
                Distance Classification
              </p>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                No Record Found
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;