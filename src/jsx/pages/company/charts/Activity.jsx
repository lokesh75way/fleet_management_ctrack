import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle';
import Tabs from '../../../components/Tabs';
import { GiPathDistance, GiDuration } from "react-icons/gi";
import { SiSpeedtest } from "react-icons/si";
import { FaCarBattery } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import ChartComponent from '../../../components/company/charts/ChartComponent';
import DistanceChart from '../../../components/company/charts/DistanceChart';
import DurationChart from '../../../components/company/charts/DurationChart';
import SpeedTimeChart from '../../../components/company/charts/SpeedTimeChart';
import BatteryChart from '../../../components/company/charts/BatteryChart';
import ObjectWork from '../../../components/company/charts/ObjectWork';



const Activity = () => {
  const data = [
    {
      title: "Distance",
      component: <DistanceChart  />,
      icon:<GiPathDistance />
      
    },
    {
      title: "Duration",
      component: <DurationChart />,
      icon:<GiDuration />
    },
    {
      title: "Speed Vs Time",
      component: <SpeedTimeChart />,
      icon:<SiSpeedtest />
    
    },
    {
      title: "Battery Voltage",
      component: <BatteryChart />,
      icon:<FaCarBattery />
      
    },
    {
      title: "Object Work Hour",
      component:  <ObjectWork />,
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