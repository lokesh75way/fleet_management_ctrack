import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle';
import Tabs from '../../../components/Tabs';
import { FaFillDrip } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import FillDrain from '../../../components/company/charts/fuel/FillDrain';
import FuelEconomy from '../../../components/company/charts/fuel/FuelEconomy';


const Fuel = () => {
  const data = [
    {
      title: "Fill-Drain",
      component: <FillDrain/>,
      icon:<FaFillDrip />
      
    },
    {
      title: "Fuel Economy",
      component: <FuelEconomy/>,
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