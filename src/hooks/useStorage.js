import React from 'react'

const useStorage = () => {
  
  const saveData = (data)=>{
    localStorage.setItem('data',JSON.stringify(data))

  }
  const getData = ()=>{
    const data = localStorage.getItem('data')
    const parsedData = JSON.parse(data)
    console.log("needed data", parsedData)
    return parsedData;
  }

  return {
    saveData,
    getData,
  }
}

export default useStorage