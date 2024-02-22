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
import GradientArea from "../charts/Chartjs/gradinetArea";
import { FaCar } from "react-icons/fa";
import { BsFuelPumpFill } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { LuSiren } from "react-icons/lu";

// const DashboardComboChart = loadable(() =>
// 	pMinDelay(import("./Dashboard/DashboardComboChart"), 1000)
// );

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
      <div className="fluid container">
        <div className="row">
          <div className="col-xl-4 col-sm-12">
            <div className="card same-card p-2">
              <p className="text-black text-md">Fleet Status</p>
              <div className="card-body d-flex align-items-center  py-2">
                <AllProjectDonutChart width={300} />
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
            <div className="card same-card p-2">
              <p className="text-black text-md">Fleet Usage</p>
              <p>
                Total Fleet Usage: <span>72.97 km</span>{" "}
              </p>
              <p>
                Avg. Distance / Object: <span>72.97 km</span>{" "}
              </p>
              <GradientArea />
            </div>
          </div>
          <div className="col-xl-4 col-sm-12">
            <div className="row">
              <div className="card same-card mb-3 p-2">
                <p className="text-black text-md">Fleet Idle</p>
                <div className="d-flex justify-content-evenly">
                  <div className="">
                    <p>Total Fleet Idle</p>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <FaCar />
                      <p>O hr</p>
                    </div>
                  </div>
                  <div className="">
                    <p>Approx Fuel Waste</p>
                    <div className="d-flex justify-content-evenly align-items-center">
                      <BsFuelPumpFill />
                      <p>O ltr</p>
                    </div>
                  </div>
                </div>
                <p className="fs-6 text-align-center">
                  <strong>Note:</strong> Generally an idling car uses somewhere
                  between 1.89 to 2.64 liter of fuel per hour. Object with
                  Movable category are considered in Analytics.
                </p>
                <div className="card-body d-flex align-items-center py-2"></div>
              </div>
              <div
                className="row pe-0 ps-0  mx-0"
                // style={{ marginRight: 0, marginLeft: 0 }}
              >
                <div
                  className="card same-card p-2 col-6"
                  style={{ backgroundColor: "#ffb09c" }}
                >
                  <p className="text-black fs-4">Overspeed</p>
                  <div className="d-flex flex-column justify-content-end p-1">
                    <div className="text-red fs-6">Max Speed</div>
                    <div className="text-red fs-6">0 km/hr</div>
                    <div className="fs-2 text-white">0</div>
                    <div className="text-black">Alerts</div>
                    <p className="">0% Object</p>
                  </div>
                </div>
                <div
                  className="card same-card p-2 col-6"
                  style={{ backgroundColor: "#ffb09c" }}
                >
                  <p className="text-black fs-4">Overspeed</p>
                  <div className="d-flex flex-column justify-content-end p-1">
                    <div className="text-red fs-6">Max Speed</div>
                    <div className="text-red fs-6">0 km/hr</div>
                    <div className="fs-2 text-white">0</div>
                    <div className="text-black">Alerts</div>
                    <p className="">0% Object</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-2 col-sm-12">
            <div
              className="card same-card p-2"
              style={{ backgroundColor: "#ffb09c" }}
            >
              <p className="text-black fs-4">Overspeed</p>
              <div className="d-flex flex-column justify-content-end p-1">
                <div className="text-red fs-6">Max Speed</div>
                <div className="text-red fs-6">0 km/hr</div>
                <div className="fs-2 text-white">0</div>
                <div className="text-black">Alerts</div>
                <p className="">0% Object</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-sm-12">
            <div
              className="card same-card p-2"
              style={{ backgroundColor: "#CBC3E3" }}
            >
              <p className="text-black fs-4">Fence Overstay</p>
              <div className="d-flex flex-column justify-content-end p-1">
                <div className="text-red fs-6">Max Overstay</div>
                <div className="text-red fs-6">---</div>
                <div className="fs-2 text-white">0</div>
                <div className="text-black">Alerts</div>
                <p className="">0% Object</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-sm-12">
            <div
              className="card same-card p-2"
              style={{ backgroundColor: "#ADD8E6" }}
            >
              <p className="text-black fs-4">AC Misuse</p>
              <div className="d-flex flex-column justify-content-end p-1">
                <div className="text-red fs-6">Approx Fuel Waste</div>
                <div className="text-red fs-6">0 ltr</div>
                <div className="fs-2 text-white">0</div>
                <div className="text-black">Hours</div>
                <p className="">0% Object</p>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-sm-12">
            <div
              className="card same-card p-2"
              style={{ backgroundColor: "#FFE36E" }}
            >
              <p className="text-black fs-4">Stay Away Fr...</p>
              <div className="d-flex flex-column justify-content-end p-1">
                <div className="fs-2 text-white mt-4">0</div>
                <div className="text-black">Alerts</div>
                <p className="">0% Object</p>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-12">
            <div className="card same-card p-2">
              <p className="text-black fs-4">Fleet Fuel</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-2 col-sm-12">
            <div className="card same-card p-2" style={{ height: "20vh" }}>
              <p className="text-black fs-4">Maintenance</p>
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
                    <SlCalender size={20} />
                  </div>
                  <div>0</div>
                </div>
                <div>
                  <div className="mb-3">
                    <LuSiren size={20} />
                  </div>
                  <div>0</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-2 col-sm-12">
            <div className="card same-card p-2" style={{ height: "20vh" }}>
              <p className="text-black fs-4">Renewal Reminder</p>
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
                    <SlCalender size={20} />
                  </div>
                  <div>0</div>
                </div>
                <div>
                  <div className="mb-3">
                    <LuSiren size={20} />
                  </div>
                  <div>0</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-sm-12">
            <div className="card same-card p-2" style={{ height: "20vh" }}>
              <p className="text-black fs-4">Distance Classification</p>
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
