import React, { useContext } from "react";
import "@/assets/scss/pages/_driver-tracking.scss";
import { BiTargetLock } from "react-icons/bi";
import { MdAddLocation } from "react-icons/md";
import { IoMapSharp } from "react-icons/io5";
import { FaTrafficLight } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { IoPricetag } from "react-icons/io5";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { GrCluster } from "react-icons/gr";
import { IoLocationOutline } from "react-icons/io5";
import { ThemeContext } from "../../../context/ThemeContext";

const MapModes = () => {
  const { isTrafficClick, setIsTrafficClick } = useContext(ThemeContext);
  const handleTraffic = (e) => {
    e.preventDefault();
    setIsTrafficClick(!isTrafficClick);
  };
  return (
    <div className="panel">
      <span className="modes">
        <IoMapSharp className="modes_icon" />
      </span>
      <span className="modes">
        <GrCluster className="modes_icon" />
      </span>
      <span className="modes" onClick={handleTraffic}>
        <FaTrafficLight className="modes_icon" />
      </span>
      <span className="modes">
        <FaRoute className="modes_icon" />
      </span>
      <span className="modes">
        <IoPricetag className="modes_icon" />
      </span>
      <span className="modes">
        <IoLocationOutline className="modes_icon" />
      </span>
      <span className="modes">
        <BsBoxArrowUpRight className="modes_icon" />
      </span>
      <span className="modes">
        <MdAddLocation className="modes_icon" />
      </span>
      <span className="modes">
        <BiTargetLock className="modes_icon" />
      </span>
    </div>
  );
};

export default MapModes;
