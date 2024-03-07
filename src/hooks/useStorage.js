import React from 'react'

const useStorage = () => {
  function generateRandomId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36 string
    const randomStr = Math.random().toString(36).substr(2, 5); // Generate random string
    return timestamp + '-' + randomStr; // Combine timestamp and random string
  }
  
  const saveData = (data, name)=>{
    const existingData = JSON.parse(localStorage.getItem(name));
      data.id  = generateRandomId()
      existingData.push(data)
      localStorage.setItem(name,JSON.stringify(existingData))
  }
  const getData = (tableData)=>{
    const role = localStorage.getItem('role')
    const email = localStorage.getItem('loginDetails-email')
    var filteredItems = tableData;
    if(role === 'businessgroup'){
        if(filteredItems[0].parent){
          filteredItems = filteredItems.filter(item => item.parent === email);
        }
    }
    if(role === 'company'){
        filteredItems = filteredItems.filter(item => item.company === email);
    }
    return filteredItems;
  }
  const checkRole = ()=>{
    const role = localStorage.getItem('role')
    return role;
  }
  const checkUser = ()=>{
    const user = localStorage.getItem('loginDetails-email')
    return user;
  }

  return {
    saveData,
    getData,
    checkRole,
    checkUser,
  }
}

export default useStorage