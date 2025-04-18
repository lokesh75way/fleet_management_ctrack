import React from "react";
import MainPagetitle from "../../../../components/MainPagetitle";
import Tabs from "../../../components/Tabs";
import DepositlineChart from "../../../components/Dashboard/elements/DepositlineChart";
import { SVGICON } from "../../../../constants/theme";
import Company from "../../../components/General/Company";
import SubUser from "../../../components/General/SubUser";
import Vehicle from "../../../components/General/Vehicle";
import Driver from "../../../components/General/Driver";
import Alert from "../../../components/General/Alert";
import ReminderRules from "../../../components/General/ReminderRules";
import { FaCarAlt, FaUser, FaBuilding } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import { HiClipboardDocumentList } from "react-icons/hi2";

const General = () => {
  const data = [
    {
      title: "Company",
      component: <Company />,
      icon: <FaBuilding />,
    },
    {
      title: "Sub User",
      component: <SubUser />,
      icon: <FaUser />,
    },
    {
      title: "Vehicle",
      component: <Vehicle />,
      icon: <FaCarAlt />,
    },
    {
      title: "Driver",
      component: <Driver />,
      icon: <FaUser />,
    },
    {
      title: "Alert",
      component: <Alert />,
      icon: <BiSolidBellRing />,
    },
    {
      title: "Reminder Rules",
      component: <ReminderRules />,
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
