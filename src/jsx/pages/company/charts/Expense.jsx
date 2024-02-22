import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle';
import Tabs from '../../../components/Tabs';
import { GiTakeMyMoney } from "react-icons/gi";
import { CiTimer } from "react-icons/ci";
import CostDistribution from '../../../components/company/charts/expense/CostDistribution';
import CostByTime from '../../../components/company/charts/expense/CostByTime';



const Expense = () => {
  const data = [
    {
      title: "Cost Distribution",
      component: <CostDistribution/>,
      icon:<GiTakeMyMoney />
      
    },
    {
      title: "Cost By Time",
      component: <CostByTime/>,
      icon:<CiTimer />
      
    },
  ]
  return (
    <>
      <MainPagetitle mainTitle="Expense" pageTitle={'Expense'} parentTitle={'Charts'} />
        <Tabs tabs={data} />
    </>
  )
}

export default Expense