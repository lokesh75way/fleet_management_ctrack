import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle';
import Tabs from '../../../components/Tabs';
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import ChartComponent from '../../../components/company/charts/ChartComponent';



const TemperatureChart = () => {
  const data = [
    {
      title: "Temperature",
      component: <ChartComponent/>,
      icon:<FaTemperatureThreeQuarters />
      
    },
  ]
  return (
    <>
      <MainPagetitle mainTitle="Temperature Chart" pageTitle={'Temperature Chart'} parentTitle={'Charts'} />
        <Tabs tabs={data} />
    </>
  )
}

export default TemperatureChart