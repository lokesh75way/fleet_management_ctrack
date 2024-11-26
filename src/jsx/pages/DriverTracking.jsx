import React, { useContext, useEffect, useState } from "react";
import MainPagetitle from "../layouts/MainPagetitle";
import ShowMap from "../components/maps/ShowMap";
import { ThemeContext } from "../../context/ThemeContext";
import DriverTab from "../components/maps/DriverTab";
import { TbLocationFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdFence } from "react-icons/md";
import "../../scss/pages/_driver-tracking.scss";

import { useTranslation } from "react-i18next";
import { getVehiclesTraking } from "../../services/api/VehicleService";
import { notifyError } from "../../utils/toast";
const DriverTracking = () => {
  const { t } = useTranslation();
  const { currentPosition, setCurrentPosition } = useContext(ThemeContext);
  const data = [
    { lat: 30.7099475, lng: 76.6900474 },
    { lat: 30.7333, lng: 76.7794 },
  ];
  const [isOutside, setIsOutside] = useState(true);
  const tabData = [
    { name: "Object", icon: TbLocationFilled },
    { name: "Driver", icon: FaUser },
    { name: "Geofence", icon: MdFence },
  ];
  const handleToggleCardPosition = () => {
    setIsOutside(!isOutside);
  };

  const [vehicleIds, setVehicleIds] = useState([]);
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [trackingData, setTrackingData] = useState([]);
  const [vehicleCounts, setVehicleCounts] = useState({});
  const [centerCoordinate, setCenterCoordinate] = useState({});

  const getVehiclesStatus = async (ids) => {
    try {
      const data = await getVehiclesTraking(ids ?? "", vehicleStatus);
      setTrackingData(data?.data ?? []);
      setVehicleCounts(data?.data?.count);
      setCenterCoordinate(data?.data?.centerCoordinate);
      return;
    } catch (error) {
      notifyError("Some Error occured");
    }
  };

  const getVehiclesByIds = () => {
    const queryString = vehicleIds.map((id) => `id=${id}&`).join("");
    getVehiclesStatus(queryString);
  };

  useEffect(() => {
    let intervalId;
    if (vehicleIds.length) {
      getVehiclesByIds();

      intervalId = setInterval(() => {
        getVehiclesByIds();
      }, 120000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [vehicleIds]);

  // const getCurrentPosition = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setCurrentPosition({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     });
  //   });
  // };
  // const [locationData, setLocationData] = useState([{lat:30.7099475,lng:76.6900474}])
  // useEffect(() => {
  //   getCurrentPosition()
  // }, []);
  return (
    <>
      <MainPagetitle
        mainTitle={t("vehicleTracking")}
        pageTitle={t("vehicleTracking")}
        parentTitle={t("tracking")}
      />
      <div
        className={`backdrop ${isOutside ? "d-none" : "d-block"}`}
        onClick={() => setIsOutside(true)}
      />
      <div className="p-2">
        <ShowMap
          data={data}
          trackingData={trackingData}
          centerCoordinate={centerCoordinate}
        />
      </div>
      {/* <div style={{zIndex : 20}}> */}
      <DriverTab
        tabData={tabData}
        setVehicleIds={setVehicleIds}
        getVehiclesByIds={getVehiclesByIds}
        vehicleIds={vehicleIds}
        setVehicleStatus={setVehicleStatus}
        vehicleCounts={vehicleCounts}
        handleToggleCardPosition={handleToggleCardPosition}
        isOutside={isOutside}
      />
      {/* </div> */}
    </>
  );
};
export default DriverTracking;
