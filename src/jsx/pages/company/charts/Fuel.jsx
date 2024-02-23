import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle';
import Tabs from '../../../components/Tabs';
import { FaFillDrip } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import ChartComponent from '../../../components/company/charts/ChartComponent';


const Fuel = () => {
  const data = [
    {
      title: "Fill-Drain",
      component: <ChartComponent/>,
      icon:<FaFillDrip />
      
    },
    {
      title: "Fuel Economy",
      component: <ChartComponent/>,
      icon:<BsFillFuelPumpFill />
      
    },
  ]
  return (
    <>
      <MainPagetitle mainTitle="Fuel" pageTitle={'Fuel'} parentTitle={'Charts'} />
        <Tabs tabs={data} />
    </>
  )
}

export default Fuel