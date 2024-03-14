import React,{useContext, useEffect, useState} from 'react'
import MainPagetitle from '../layouts/MainPagetitle'
import ShowMap from '../components/maps/ShowMap'
import { ThemeContext } from '../../context/ThemeContext'
import DriverTab from '../components/maps/DriverTab'
import { TbLocationFilled } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdFence } from "react-icons/md";

const DriverTracking = () => {
  const {currentPosition, setCurrentPosition} = useContext(ThemeContext)
  const data = [{lat:30.7099475,lng:76.6900474},{lat:30.7333,lng:76.7794}]
  const [isOutside, setIsOutside] = useState(false);
  const tabData = [{name:"Object", icon:TbLocationFilled},{name:"Driver", icon:FaUser},
    {name:"Address", icon:FaMapLocationDot},{name:"Geofence", icon:MdFence},]


  const handleToggleCardPosition = () => {
    setIsOutside(!isOutside);
  };

  // const getCurrentPosition = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setCurrentPosition({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     });
  //   });
  // };
  // const [locationData, setLocationData] = useState([{lat:30.7099475,lng:76.6900474}])
  // useEffect(() => {
  //   getCurrentPosition()
  // }, []);
  return (
    <>
      <MainPagetitle mainTitle="Vehicle Tracking" pageTitle={'Vehicle Tracking'} parentTitle={'Tracking'} />
      <div className='p-2'>
        <ShowMap data={data}/>
      </div>
      <div  >
        <DriverTab tabData={tabData} handleToggleCardPosition={handleToggleCardPosition} isOutside={isOutside} />
      </div>
    </>
  )
}

export default DriverTracking