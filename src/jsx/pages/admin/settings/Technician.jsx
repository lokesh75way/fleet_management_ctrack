import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle';
import Tabs from '../../../components/Tabs';
import DepositlineChart from '../../../components/Dashboard/elements/DepositlineChart';
import { SVGICON } from '../../../constant/theme';
import { FaCarAlt,FaUser,FaBuilding } from "react-icons/fa";
import { BiSolidBellRing } from "react-icons/bi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import Technician from "../../../components/Technician/Technician";
import TechnicianTask from "../../../components/Technician/TechnicianTask";


const General = () => {
  const data = [
    {
      title: "Technician",
      component: <Technician/>,
      icon:<FaBuilding />
      
    },
    {
      title: "Technician Task",

      component: <TechnicianTask/>,
      icon:<FaUser />
    },
  ]
  return (
    <>
      <MainPagetitle mainTitle="General" pageTitle={'General'} parentTitle={'Settings'} />
        <Tabs  tabs={data} />




    </>
  )
}

export default General