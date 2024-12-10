import React from "react";
import MainPagetitle from "../../../../components/MainPagetitle";
import Tabs from "../../../components/Tabs";
import DepositlineChart from "../../../components/Dashboard/elements/DepositlineChart";
import { SVGICON } from "../../../../constants/theme";
import { FaCarAlt, FaUser, FaBuilding } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import Expense from "../../../components/Master/Expense";
import ObjectGroup from "../../../components/Master/ObjectGroup";
import SendCommand from "../../../components/Master/SendCommand";
import Annoucement from "../../../components/Master/Anoucement";
import Address from "../../../components/Master/Address";
import GeoFence from "../../../components/Master/GeoFence";
import ClassifyTrips from "../../../components/Master/ClassifyTrips";
import EcoDriving from "../../../components/Master/EcoDriving";

const General = () => {
  const data = [
    {
      title: "Expense",
      component: <Expense />,
      icon: <FaBuilding />,
    },
    {
      title: "Object Group",

      component: <ObjectGroup />,
      icon: <FaUser />,
    },
    {
      title: "Send Command",
      component: <SendCommand />,
      icon: <FaCarAlt />,
    },
    {
      title: "Annoucement",
      component: <Annoucement />,
      icon: <FaUser />,
    },
    {
      title: "Address",
      component: <Address />,
      icon: <BiSolidBellRing />,
    },
    {
      title: "Geofence",
      component: <GeoFence />,
      icon: <HiClipboardDocumentList />,
    },
    {
      title: "Classify Things",
      component: <ClassifyTrips />,
      icon: <HiClipboardDocumentList />,
    },
    {
      title: "Eco Driving",
      component: <EcoDriving />,
      icon: <HiClipboardDocumentList />,
    },
  ];
  return (
    <>
      <MainPagetitle
        mainTitle="General"
        pageTitle={"General"}
        parentTitle={"Settings"}
      />
      <Tabs tabs={data} />
    </>
  );
};

export default General;
