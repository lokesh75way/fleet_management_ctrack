import React from 'react'
import MainPagetitle from '../layouts/MainPagetitle';
import Tabs from '../components/Tabs';
import {FaUser,FaBuilding } from "react-icons/fa";
import PermissionRules from '../components/Permission/PermissionRules';


const Permission = () => {
  const data = [
    {
      title: "Permission",
      component: <PermissionRules/>,
      icon:<FaUser /> 
    }
  ]
  return (
    <>
      <MainPagetitle mainTitle="Permission" pageTitle={'Permission'} parentTitle={'Home'} />
        <Tabs  tabs={data} />
    </>
  )
}

export default Permission