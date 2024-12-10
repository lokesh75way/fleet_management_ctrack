import React, { useState } from "react";
import { FaChartPie } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { IoAnalyticsOutline, IoBarChartSharp } from "react-icons/io5";
import { MdBarChart } from "react-icons/md";
import { PiChartPieSlice } from "react-icons/pi";

const GraphComp = () => {
  const [selectedGraph, setSelectedGraph] = useState(currentGraph);

  const handleGraphChange = (graphName) => {
    setCurrentGraph(graphName);
    setSelectedGraph(graphName);
  };

  return (
    <>
      <div style={{ position: "absolute", right: 0 }}>
        <div className="d-flex flex-column align-items-center gap-3">
          <button
            onClick={() => handleGraphChange("graph1")}
            style={{ backgroundColor: "transparent" }}
          >
            <MdBarChart
              size={30}
              color={selectedGraph === "graph1" ? "blue" : ""}
            />
          </button>
          <button
            onClick={() => handleGraphChange("graph2")}
            style={{ backgroundColor: "transparent" }}
          >
            <FaChartPie
              size={30}
              color={selectedGraph === "graph2" && "blue"}
            />
          </button>
          <button
            onClick={() => handleGraphChange("graph3")}
            style={{ backgroundColor: "transparent" }}
          >
            <IoAnalyticsOutline
              size={30}
              color={selectedGraph === "graph3" && "blue"}
            />
          </button>
          <button
            onClick={() => handleGraphChange("graph4")}
            style={{ backgroundColor: "transparent" }}
          >
            <IoBarChartSharp
              size={30}
              color={selectedGraph === "graph4" && "blue"}
            />
          </button>
          <button
            onClick={() => handleGraphChange("graph5")}
            style={{ backgroundColor: "transparent" }}
          >
            <PiChartPieSlice
              size={30}
              color={selectedGraph === "graph5" && "blue"}
            />
          </button>
          <button style={{ backgroundColor: "transparent", marginTop: "1rem" }}>
            <IoMdDownload size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default GraphComp;
