import React, { useState } from 'react'
import MainPagetitle from '../layouts/MainPagetitle';
import Tabs from '../components/Tabs';
import {FaUser,FaBuilding } from "react-icons/fa";
import PermissionRules from '../components/Permission/PermissionRules';
import { useLocation } from 'react-router-dom';


const Permission = () => {
  const location = useLocation();
  const {isEditTrue, setIsEditTrue} = JSON.parse(location.state)
  console.log(isEditTrue, setIsEditTrue)
  const data = [
    {
      title: "Permission",
      component: <PermissionRules isEditTrue={isEditTrue} setIsEditTrue={setIsEditTrue} />,
      icon:<FaUser /> 
    }
  ]
  return (
    <>
      <MainPagetitle mainTitle="Permission" pageTitle={'Permission'} parentTitle={'Feature Templates'} />
        <Tabs  tabs={data} />
    </>
  )
}

export default Permission