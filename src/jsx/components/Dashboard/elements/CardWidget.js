import React from "react";
import DepositlineChart from "./DepositlineChart";
import AllProjectDonutChart from "./AllProjectDonutChart";
import { SVGICON } from "../../../constant/theme";
import { PiChartBar } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaRegBuilding, FaTools } from "react-icons/fa";
import { GrUserPolice } from "react-icons/gr";

const CardWidget = () => {
  const role = localStorage.getItem("role");
  // Define the order for each role
  const roleOrders = {
    admin: ["businessgroup", "allvehicles", "company", "users"],
    businessgroup: ["company", "allvehicles", "branches", "technician"],
    company: ["branches", "allvehicles", "technician", "driver"],
  };

  // Get the order for the current role or use the default order
  const order = roleOrders[role] || roleOrders.admin;

  const userData = JSON.parse(localStorage.getItem("userJsonData"));
  const getCount = (key) => {
    const count = userData?.filter((item) => {
      if (item.role) {
        return item.role === key;
      } else {
        return item.Designation === key;
      }
    })?.length;
    return count || 0;
  };

  return (
    <>
      {order.map((cardType, index) => {
        switch (cardType) {
          case "businessgroup":
            return (
              <div key={index} className="col-xl-3 col-sm-6">
                <div className="card chart-grd same-card">
                  <div className="card-body depostit-card p-0 z-0">
                    <div className="depostit-card-media d-flex justify-content-between pb-0">
                      <div>
                        <h6>Total Business User</h6>
                        <h3>{getCount("businessgroup")}</h3>
                      </div>
                      <div className="icon-box bg-primary-light">
                        {SVGICON.BusinessGroup}
                      </div>
                    </div>
                    <DepositlineChart chartcolor="var(--primary)" />
                  </div>
                </div>
              </div>
            );

          case "allvehicles":
            return (
              <div key={index} className="col-xl-3 col-sm-6">
                <div className="card same-card">
                  <div className="card-body d-flex justify-content-center align-items-center  py-2">
                    <AllProjectDonutChart
                      colors={["#3AC977", "var(--primary)", "var(--secondary)"]}
                      labels={["Running", "Idle", "Stopped"]}
                      width={160}
                      data={[12, 10, 15]}
                      completeLabel="Total"
                    />
                    <ul className="project-list">
                      {" "}
                      <li>
                        {" "}
                        <h6>All Vehicles</h6>{" "}
                      </li>
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
            );

          case "company":
            return (
              <div key={index} className="col-xl-3 col-sm-6">
                <div className="card chart-grd same-card">
                  <div className="card-body depostit-card p-0 z-0">
                    <div className="depostit-card-media d-flex justify-content-between pb-0">
                      <div>
                        <h6>Total Companies</h6>
                        <h3>{getCount("company")}</h3>
                      </div>
                      <div className="icon-box bg-danger-light">
                        <HiOutlineBuildingOffice2
                          style={{
                            width: "22px",
                            height: "22px",
                            stroke: "#888888",
                            color: "#888888",
                            strokeWidth: "1.5",
                            clipRule: "evenodd",
                            fillRule: "evenodd",
                          }}
                        />
                      </div>
                    </div>
                    <DepositlineChart chartcolor="#FF5E5E" />
                  </div>
                </div>
              </div>
            );
          case "users":
            return (
              <div key={index} className="col-xl-3 col-sm-6">
                <div className="card chart-grd same-card">
                  <div className="card-body depostit-card p-0 z-0" >
                    <div className="depostit-card-media d-flex justify-content-between pb-0">
                      <div>
                        <h6>Total Users</h6>
                        <h3>10</h3>
                      </div>
                      <div className="icon-box bg-danger-ligh">
                        {SVGICON.Employe}
                      </div>
                    </div>
                    <DepositlineChart chartcolor="#FF5E5E" />
                  </div>
                </div>
              </div>
            );
          case "branches":
            return (
              <div key={index} className="col-xl-3 col-sm-6">
                <div className="card chart-grd same-card">
                  <div className="card-body depostit-card p-0 z-0">
                    <div className="depostit-card-media d-flex justify-content-between pb-0">
                      <div>
                        <h6>Total Branches</h6>
                        <h3>{getCount("branch")}</h3>
                      </div>
                      <div className="icon-box bg-danger-light">
                        <FaRegBuilding
                          style={{
                            width: "20px",
                            height: "20px",
                            stroke: "#888888",
                            color: "#888888",
                            strokeWidth: "1",
                            clipRule: "evenodd",
                            fillRule: "evenodd",
                          }}
                        />
                      </div>
                    </div>
                    <DepositlineChart chartcolor="var(--primary)" />
                  </div>
                </div>
              </div>
            );
          case "technician":
            return (
              <div key={index} className="col-xl-3 col-sm-6">
                <div className="card chart-grd same-card">
                  <div className="card-body depostit-card p-0 z-0">
                    <div className="depostit-card-media d-flex justify-content-between pb-0">
                      <div>
                        <h6>Total Technician</h6>
                        <h3>{getCount("Technician")}</h3>
                      </div>
                      <div className="icon-box bg-danger-light">
                        <FaTools
                          style={{
                            width: "20px",
                            height: "20px",
                            stroke: "#888888",
                            color: "#888888",
                            strokeWidth: "1",
                            clipRule: "evenodd",
                            fillRule: "evenodd",
                          }}
                        />
                      </div>
                    </div>
                    <DepositlineChart chartcolor="#FF5E5E" />
                  </div>
                </div>
              </div>
            );
          case "driver":
            return (
              <div key={index} className="col-xl-3 col-sm-6">
                <div className="card chart-grd same-card">
                  <div className="card-body depostit-card p-0 z-0" >
                    <div className="depostit-card-media d-flex justify-content-between pb-0">
                      <div>
                        <h6>Total Driver</h6>
                        <h3>{getCount("Driver")}</h3>
                      </div>
                      <div className="icon-box bg-danger-light">
                        <GrUserPolice
                          style={{
                            width: "20px",
                            height: "20px",
                            stroke: "#888888",
                            color: "#888888",
                            strokeWidth: "1",
                            clipRule: "evenodd",
                            fillRule: "evenodd",
                          }}
                        />
                      </div>
                    </div>
                    <DepositlineChart chartcolor="var(--primary)" />
                  </div>
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default CardWidget;
