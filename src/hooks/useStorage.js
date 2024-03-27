import React from 'react'

const useStorage = () => {
  const data = JSON.parse(localStorage.getItem('userDetails'))
  const allData = JSON.parse(localStorage.getItem('userJsonData'))
  const role = data?.user?.role
  const email = data?.user?.email
  const userName = data?.user?.userName
  const type = data?.user?.type

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
    return role;
  }
  const checkType = ()=>{
    return type;
  }
  const checkUser = ()=>{
    return email;
  }
  const checkUserName = ()=>{
    return userName;
  }
  const getBranch = (name)=>{
    var count =0;
    allData.map((item)=>item.role === "branch" && item.parentCompany === name && ++count)
    return count
  }
  const getCompany = (name)=>{
    var count =0;
    allData.map((item)=>item.role === "company" && item.parent === name && ++count)
    return count
  }
  const getAllCompany = ()=>{
    const companyData =  allData.filter((item)=> item.role === 'company')
    return companyData
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
    checkType,
  }
}

export default useStorage