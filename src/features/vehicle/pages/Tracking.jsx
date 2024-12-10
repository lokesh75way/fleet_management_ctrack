import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdFence } from "react-icons/md";
import { TbLocationFilled } from "react-icons/tb";
import { useTranslation } from "react-i18next";

import { useQuery } from "@tanstack/react-query";
import MainPagetitle from "@/components/MainPagetitle";
import ShowMap from "../../../jsx/components/maps/ShowMap";
import DriverTab from "../../../jsx/components/maps/DriverTab";
import "@/assets/scss/pages/_driver-tracking.scss";
import { notifyError } from "@/utils/toast";
import { getVehiclesTraking } from "../api";

const DriverTracking = () => {
  const { t } = useTranslation();
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
  const { data: trackingData } = useQuery({
    queryKey: ["tracking", vehicleIds.join(","), vehicleStatus],
    queryFn: () => getVehiclesTraking(vehicleIds.join(","), vehicleStatus),
    staleTime: 120000,
    refetchInterval: 120000,
    refetchOnWindowFocus: "always",
  });

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
          trackingData={trackingData?.data}
          centerCoordinate={trackingData?.centerCoordinate}
        />
      </div>

      <DriverTab
        tabData={tabData}
        setVehicleIds={setVehicleIds}
        vehicleIds={vehicleIds}
        setVehicleStatus={setVehicleStatus}
        vehicleCounts={trackingData?.count ?? {}}
        handleToggleCardPosition={handleToggleCardPosition}
        isOutside={isOutside}
      />
      {/* </div> */}
    </>
  );
};
export default DriverTracking;
