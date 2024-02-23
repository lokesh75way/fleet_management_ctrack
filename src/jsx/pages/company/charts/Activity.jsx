import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle';
import Tabs from '../../../components/Tabs';
import { GiPathDistance, GiDuration } from "react-icons/gi";
import { SiSpeedtest } from "react-icons/si";
import { FaCarBattery } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import ChartComponent from '../../../components/company/charts/ChartComponent';



const Activity = () => {
  const data = [
    {
      title: "Distance",
      component: <ChartComponent  />,
      icon:<GiPathDistance />
      
    },
    {
      title: "Duration",
      component: <ChartComponent />,
      icon:<GiDuration />
    },
    {
      title: "Speed Vs Time",
      component: <ChartComponent />,
      icon:<SiSpeedtest />
    
    },
    {
      title: "Battery Voltage",
      component: <ChartComponent />,
      icon:<FaCarBattery />
      
    },
    {
      title: "Object Work Hour",
      component:  <ChartComponent />,
      icon: <MdWork />
     
    },
  ]

  return (
    <>
      <MainPagetitle mainTitle="Activity" pageTitle={'Activity'} parentTitle={'Charts'} />
      <Tabs tabs={data} />

    </>
  )
}

export default Activity