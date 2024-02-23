import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle';
import Tabs from '../../../components/Tabs';
import { IoAlertSharp } from "react-icons/io5";
import ChartComponent from '../../../components/company/charts/ChartComponent';



const Alert = () => {
  const data = [
    {
      title: "Alerts",
      component: <ChartComponent/>,
      icon:<IoAlertSharp />
      
    },
  ]
  return (
    <>
      <MainPagetitle mainTitle="Alert" pageTitle={'Alert'} parentTitle={'Charts'} />
        <Tabs tabs={data} />
    </>
  )
}

export default Alert