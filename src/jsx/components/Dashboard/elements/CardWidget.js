import React, { useEffect, useState } from "react";
import DepositlineChart from "./DepositlineChart";
import AllProjectDonutChart from "./AllProjectDonutChart";
import { SVGICON } from "../../../../constants/theme";
import { PiChartBar } from "react-icons/pi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaRegBuilding, FaTools } from "react-icons/fa";
import { GrUserPolice } from "react-icons/gr";

import { useTranslation } from "react-i18next";
import { getAllGroups } from "@/features/businessGroup/api";
import { getCompany } from "../../../../services/api/CompanyServices";
import { getAllUser } from "@/features/user/api";
import { getAllBranch } from "../../../../services/api/BranchServices";
import { getTechnicians } from "../../../../services/api/TechnicianService";
import { getDrivers } from "../../../../services/api/driverService";

const CardWidget = ({ usageData }) => {
  const { t } = useTranslation();
  const loggedUser = JSON.parse(localStorage.getItem("userDetails"));
  const role = loggedUser?.user?.role;
  const [vehicleData, setVehicleData] = React.useState([0, 0, 0]);
  // Define the order for each role
  const roleOrders = {
    SUPER_ADMIN: ["allvehicles", "businessgroup", "company", "users"],
    BUSINESS_GROUP: ["allvehicles", "company", "branches", "technician"],
    COMPANY: ["allvehicles", "branches", "technician", "driver"],
  };

  // Get the order for the current role or use the default order
  const order = roleOrders[role] || roleOrders.SUPER_ADMIN;

  const [businessUserCount, setBusinessUserCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [branchCount, setBranchCount] = useState(0);
  const [technicianCount, setTechnicianCount] = useState(0);
  const [driverCount, setDriverCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, totalCount } = await getAllGroups();
        setBusinessUserCount(totalCount);

        const { data: companies } = await getCompany();
        const { totalCount: companyCount } = companies.data;
        setCompanyCount(companyCount);

        const { count: userCount } = await getAllUser();
        setUserCount(userCount);

        const { data: branch } = await getAllBranch();
        const { totalCount: branchCount } = branch;
        setBranchCount(branchCount);

        const { count: technicianCount } = await getTechnicians();
        setTechnicianCount(technicianCount);

        const { data: drivers, totalLength: driverCount } = await getDrivers();
        setDriverCount(driverCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const parseVehicleData = usageData?.vehicle
      ? [
          usageData.vehicle.running || 0,
          usageData.vehicle.idle || 0,
          usageData.vehicle.stopped || 0,
        ]
      : [0, 0, 0];
    console.log("parseVehicleData", parseVehicleData);
    setVehicleData(parseVehicleData);
  }, [usageData?.vehicle?.running]);

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
                        <h6>{t("totalBusinessUser")}</h6>
                        <h3>{businessUserCount}</h3>
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
                      key={vehicleData}
                      colors={["#3AC977", "var(--primary)", "var(--secondary)"]}
                      labels={["Running", "Idle", "Stopped"]}
                      width={160}
                      data={vehicleData}
                      completeLabel={t("total")}
                    />
                    <ul className="project-list">
                      {" "}
                      <li>
                        {" "}
                        <h6>{t("allVehicles")}</h6>{" "}
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
                        {t("running")}
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
                        {t("idle")}
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
                        {t("stopped")}
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
                        <h6>{t("totalCompanies")}</h6>
                        <h3>{companyCount}</h3>
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
                  <div className="card-body depostit-card p-0 z-0">
                    <div className="depostit-card-media d-flex justify-content-between pb-0">
                      <div>
                        <h6>{t("totalUsers")}</h6>
                        <h3>{userCount}</h3>
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
                        <h6>{t("totalBranches")}</h6>
                        <h3>{branchCount}</h3>
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
                        <h6>{t("totalTechnician")}</h6>
                        <h3>{technicianCount}</h3>
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
                  <div className="card-body depostit-card p-0 z-0">
                    <div className="depostit-card-media d-flex justify-content-between pb-0">
                      <div>
                        <h6>{t("totalDriver")}</h6>
                        <h3>{driverCount}</h3>
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
