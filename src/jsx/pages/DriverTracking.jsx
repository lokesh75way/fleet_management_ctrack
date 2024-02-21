import React,{useContext, useEffect, useState} from 'react'
import MainPagetitle from '../layouts/MainPagetitle'
import ShowMap from '../components/maps/ShowMap'
import MapModes from '../components/maps/MapModes'
import { ThemeContext } from '../../context/ThemeContext'

const DriverTracking = () => {
  const {currentPosition, setCurrentPosition} = useContext(ThemeContext)

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
        <ShowMap data={[{lat:30.7099475,lng:76.6900474},{lat:30.7099482,lng:76.6900467}]}/>
      </div>
      <MapModes/>  
    </>
  )
}

export default DriverTracking