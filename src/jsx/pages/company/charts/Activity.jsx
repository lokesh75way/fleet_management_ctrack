import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle';
import Tabs from '../../../components/Tabs';
import { GiPathDistance, GiDuration } from "react-icons/gi";
import { SiSpeedtest } from "react-icons/si";
import { FaCarBattery } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import Distance from '../../../components/company/charts/activity/Distance';
import Duration from '../../../components/company/charts/activity/Duration';
import SpeedVsTime from '../../../components/company/charts/activity/SpeedVsTime';
import BatteryVoltage from '../../../components/company/charts/activity/BatteryVoltage';
import ObjectWorkHour from '../../../components/company/charts/activity/ObjectWorkHour';



const Activity = () => {
  const data = [
    {
      title: "Distance",
      component: <Distance/>,
      icon:<GiPathDistance />
      
    },
    {
      title: "Duration",
      component: <Duration/>,
      icon:<GiDuration />
    },
    {
      title: "Speed Vs Time",
      component: <SpeedVsTime/>,
      icon:<SiSpeedtest />
    
    },
    {
      title: "Battery Voltage",
      component: <BatteryVoltage/>,
      icon:<FaCarBattery />
      
    },
    {
      title: "Object Work Hour",
      component:  <ObjectWorkHour/>,
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