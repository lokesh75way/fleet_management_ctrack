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
  const checkUserName = ()=>{
    const user = localStorage.getItem('loginDetails-name')
    return user;
  }
  const getBranch = (name)=>{
    const data = JSON.parse(localStorage.getItem('userJsonData'))
    var count =0;
    data.map((item)=>item.role === "branch" && item.parentCompany === name && ++count)
    return count
  }
  const getCompany = (name)=>{
    const data = JSON.parse(localStorage.getItem('userJsonData'))
    var count =0;
    data.map((item)=>item.role === "company" && item.parent === name && ++count)
    return count
  }
  const getAllCompany = ()=>{
    const data = JSON.parse(localStorage.getItem('userJsonData'))
    const companyData =  data.filter((item)=> item.role === 'company')
    console.log(companyData)
  }

  return {
    getCompany,
    saveData,
    getData,
    checkRole,
    checkUser,
    checkUserName,
    getBranch,
    getAllCompany,
  }
}

export default useStorage