import React, { useState } from "react";
import ApexBar3 from "../../../charts/apexcharts/Bar3";
import { IoBarChartSharp } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import { FaChartPie } from "react-icons/fa";
import { IoAnalyticsOutline } from "react-icons/io5";
import ApexPie4 from "../../../charts/apexcharts/Pie4";
import ApexLine3 from "../../../charts/apexcharts/Line3";
import ApexBar2 from "../../../charts/apexcharts/Bar2";
import ChartPie from "../../../charts/Chartjs/pie";
import { PiChartPieSlice } from "react-icons/pi";
import { IoMdDownload } from "react-icons/io";
import { FaCar } from "react-icons/fa";

const Duration = () => {
  const [currentGraph, setCurrentGraph] = useState("graph1");
  const [selectedGraph, setSelectedGraph] = useState(currentGraph);

  const handleGraphChange = (graphName) => {
    setCurrentGraph(graphName);
    setSelectedGraph(graphName);
  };

  return (
    <div
      className="d-flex justify-content-between align-items-center"
      style={{ marginTop: "3rem", position: "relative" }}
    >
      <div className="" style={{ width: "90%" }}>
        {currentGraph === "graph1" && <ApexBar2 />}
        {currentGraph === "graph2" && <ApexPie4 />}
        {currentGraph === "graph3" && <ApexLine3 />}
        {currentGraph === "graph4" && <ApexBar3 />}
        {currentGraph === "graph5" && <ChartPie height={315} />}
      </div>
      <div style={{position: "absolute", right: 0}}>
        <div className="d-flex flex-column align-items-center gap-3">
          <button onClick={() => handleGraphChange("graph1")} style={{backgroundColor: "transparent"}}>
            <MdBarChart
              size={30}
              color={selectedGraph === "graph1" && "blue"}
            />
          </button>
          <button onClick={() => handleGraphChange("graph2")} style={{backgroundColor: "transparent"}}>
            <FaChartPie
              size={30}
              color={selectedGraph === "graph2" && "blue"}
            />
          </button>
          <button onClick={() => handleGraphChange("graph3")} style={{backgroundColor: "transparent"}}>
            <IoAnalyticsOutline
              size={30}
              color={selectedGraph === "graph3" && "blue"}
            />
          </button>
          <button onClick={() => handleGraphChange("graph4")} style={{backgroundColor: "transparent"}}>
            <IoBarChartSharp
              size={30}
              color={selectedGraph === "graph4" && "blue"}
            />
          </button>
          <button onClick={() => handleGraphChange("graph5")} style={{backgroundColor: "transparent"}}>
            <PiChartPieSlice
              size={30}
              color={selectedGraph === "graph5" && "blue"}
            />
          </button>
          <button style={{backgroundColor: "transparent", marginTop: "1rem"}}>
            <IoMdDownload size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Duration;
