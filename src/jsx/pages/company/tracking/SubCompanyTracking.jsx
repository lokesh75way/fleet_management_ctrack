import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle'
import MapModes from '../../../components/maps/MapModes'
import ShowMap from '../../../components/maps/ShowMap'

const SubCompanyTracking = () => {
  const data = [{lat:30.7099475,lng:76.6900474}]
  return (
    <>
      <MainPagetitle mainTitle="Sub Company Tracking" pageTitle={'Sub Company Tracking'} parentTitle={'Tracking'} />
      <div className='p-2'>
        <ShowMap data={data}/>
      </div>
      <MapModes/> 
    </>
  )
}

export default SubCompanyTracking