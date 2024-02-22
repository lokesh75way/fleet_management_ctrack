import React from 'react'
import MainPagetitle from '../../../layouts/MainPagetitle'
import ShowMap from '../../../components/maps/ShowMap'

const SubCompanyTracking = () => {
  const data = [{lat:30.7099475,lng:76.6900474},{lat:30.7333,lng:76.7794}]
  return (
    <>
      <MainPagetitle mainTitle="Sub Company Tracking" pageTitle={'Sub Company Tracking'} parentTitle={'Tracking'} />
      <div className='p-2'>
        <ShowMap data={data}/>
      </div>
    </>
  )
}
export default SubCompanyTracking