import React from "react";
import MainPagetitle from "../../../layouts/MainPagetitle";
import ShowMap from "../../../components/maps/ShowMap";

const BranchTracking = () => {
  const data = [
    { lat: 30.7099475, lng: 76.6900474 },
    { lat: 30.7333, lng: 76.7794 },
  ];
  return (
    <>
      <MainPagetitle
        mainTitle="Branch Tracking"
        pageTitle={"Branch Tracking"}
        parentTitle={"Tracking"}
      />
      <div className="p-2">
        <ShowMap data={data} />
      </div>
    </>
  );
};
export default BranchTracking;
