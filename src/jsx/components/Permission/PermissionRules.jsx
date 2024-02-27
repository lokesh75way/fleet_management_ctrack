import { useState } from "react";
import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import Select from "react-select";
import { options } from "./Options";

const Permission = () => {
  

  const [subModuleIndexArray, setSubModuleIndexArray] = useState([]);
  const [data,setData] = useState(options)


  const handleCheckboxChange = (isChecked, index) => {
    if (isChecked) {
      setSubModuleIndexArray([...subModuleIndexArray, index]);
    } else {
      setSubModuleIndexArray(subModuleIndexArray.filter((item) => item !== index));
    };
  };



  const handleSubModulePermisssionChange = (isChecked,name, moduleIndex,subModuleIndex) => {

    let updatedData = [...data];
    
    if (isChecked) {

        updatedData[moduleIndex].submodules[subModuleIndex].permissions[name] = true;
        setData(updatedData);
        
      } else {
        updatedData[moduleIndex].submodules[subModuleIndex].permissions[name] = false;
        setData(updatedData);
    };
  };


  const handleModulePermisssionChange = (isChecked,name, moduleIndex) => {

    let updatedData = [...data];
    
    if (isChecked) {

        updatedData[moduleIndex].permissions[name] = true;
        setData(updatedData);
        
      } else {
        updatedData[moduleIndex].permissions[name] = false;
        setData(updatedData);
    };
  };



  
  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title>Permissions</Card.Title>
        </Card.Header>

          <div className="d-flex justify-content-start m-2 mt-4">
            <input type="text" className="p-2" style={{marginRight:"1rem", border:"#D3D3D3 1px solid", borderRadius:"0.3rem" }}  placeholder="Group Name" />
            <Select> Template Clone </Select>
            <button className="p-2 btn btn-primary " style={{marginLeft:"1rem", border:"#D3D3D3 1px solid", borderRadius:"0.3rem" }}   > Save </button>
          </div>

        <Card.Body className="d-flex">


        <div style={{ flex: 0.4}} >
          <Table  bordered>
            <thead>
              <tr>
                <th scope="col">Module</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((element,i)=>{

                  return <tr key={i} >         
                    <td> <input type="checkbox" className="form-check-input " style={{marginRight:"0.2rem"}} name="create" checked={subModuleIndexArray.includes(i)} onChange={(e) => handleCheckboxChange(e.target.checked, i)} /> {element.name}</td>
                  </tr>  

                })
              }
            </tbody>
          </Table>
          </div>

          <div style={{ flex: 1 }} >
          <Table bordered>
            <thead>
              <tr>
                <th scope="col" className="col-4">SubModules</th>
                <th scope="col">Add</th>
                <th scope="col">View</th>
                <th scope="col">Modify</th>
                <th scope="col">Delete</th>
                <th scope="col">Export</th>
              </tr>
            </thead>
            <tbody>

                { subModuleIndexArray.map((mindex,index)=>{

                  if(data[mindex].submodules.length == 0){
                    return <tr key={index} >         
                    <td  className="col-2"> {data[mindex].name}</td>
                    <td>
                        <input type="checkbox" checked = {data[mindex].permissions.add} onChange={(e)=> handleModulePermisssionChange(e.target.checked,e.target.name,mindex)} className="form-check-input" name="add" />
                    </td>
                    <td>
                        <input type="checkbox" checked = {data[mindex].permissions.view} className="form-check-input" onChange={(e)=> handleModulePermisssionChange(e.target.checked,e.target.name,mindex)}  name="view" />
                    </td>
                    <td>
                        <input type="checkbox" checked = {data[mindex].permissions.modify} className="form-check-input" onChange={(e)=> handleModulePermisssionChange(e.target.checked,e.target.name,mindex)}  name="modify" />
                    </td>
                    <td>
                        <input type="checkbox" checked = {data[mindex].permissions.delete} className="form-check-input" onChange={(e)=> handleModulePermisssionChange(e.target.checked,e.target.name,mindex)}  name="delete" />
                    </td>
                    <td>
                        <input type="checkbox" checked = {data[mindex].permissions.export} className="form-check-input" onChange={(e)=> handleModulePermisssionChange(e.target.checked,e.target.name,mindex)}  name="export" />
                    </td>
                  </tr>  
                  }

                 return data[mindex].submodules.map((element,i)=>{
                return <tr key={i} >         
                  <td  className="col-2">  {element.name}</td>
                  <td>
                      <input type="checkbox" checked = {element.permissions.add} onChange={(e)=> handleSubModulePermisssionChange(e.target.checked,e.target.name,mindex,i)}   className="form-check-input" name="add" />
                  </td>
                  <td>
                      <input type="checkbox" checked = {element.permissions.view} onChange={(e)=> handleSubModulePermisssionChange(e.target.checked,e.target.name,mindex,i)} className="form-check-input" name="view" />
                  </td>
                  <td>
                      <input type="checkbox" checked = {element.permissions.modify} onChange={(e)=> handleSubModulePermisssionChange(e.target.checked,e.target.name,mindex,i)}  className="form-check-input" name="modify" />
                  </td>
                  <td>
                      <input type="checkbox" checked = {element.permissions.delete} onChange={(e)=> handleSubModulePermisssionChange(e.target.checked,e.target.name,mindex,i)} className="form-check-input" name="delete" />
                  </td>
                  <td>
                      <input type="checkbox" checked = {element.permissions.export} onChange={(e)=> handleSubModulePermisssionChange(e.target.checked,e.target.name,mindex,i)} className="form-check-input" name="export" />
                  </td>
                </tr>  


                })

                })
              }
 
            </tbody>
            
          </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Permission;