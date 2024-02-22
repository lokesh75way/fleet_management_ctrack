import React,{useContext, useEffect, useState} from 'react'
import MainPagetitle from '../layouts/MainPagetitle'
import ShowMap from '../components/maps/ShowMap'
import { ThemeContext } from '../../context/ThemeContext'
import DriverTab from '../components/maps/DriverTab'

const DriverTracking = () => {
  const {currentPosition, setCurrentPosition} = useContext(ThemeContext)
  const data = [{lat:30.7099475,lng:76.6900474},{lat:30.7333,lng:76.7794}]
  const tabData = [{name:"Object", icon:"location"},{name:"Driver", icon:"location"},
    {name:"Address", icon:"location"},{name:"Geofence", icon:"location"},]

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
      <MainPagetitle mainTitle="Driver Tracking" pageTitle={'Driver Tracking'} parentTitle={'Tracking'} />
      <div className='p-2'>
        <ShowMap data={data}/>
      </div>
      <DriverTab tabData={tabData}/>  
    </>
  )
}

export default DriverTracking