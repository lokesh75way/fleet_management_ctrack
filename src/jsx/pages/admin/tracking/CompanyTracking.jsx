import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle'
import MapModes from '../../../components/maps/MapModes'
import ShowMap from '../../../components/maps/ShowMap'

const CompanyTracking = () => {
  return (
    <>
      <MainPagetitle mainTitle="Company Tracking" pageTitle={'Company Tracking'} parentTitle={'Tracking'} />
      <div className='p-2'>
        <ShowMap data={[{lat:30.7099475,lng:76.6900474},{lat:30.7099482,lng:76.6900467}]}/>
      </div>
      <MapModes/> 
    </>
  )
}

export default CompanyTracking