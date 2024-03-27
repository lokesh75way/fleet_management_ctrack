import { useContext, useState, useEffect } from "react";
import React from "react";
import { Card, Table } from "react-bootstrap";
import Select from "react-select";
import { staticoptions } from "./Options";
import { ThemeContext } from "../../../context/ThemeContext";
// import { reset } from "./Options";
import _ from "lodash";
import TemplateServices from "../../../services/api/TemplateServices";

const Permission = ({ isEditTrue, setIsEditTrue }) => {
  // const { groupsDataState, setGroupsDataState } = useContext(ThemeContext);
  // const templateData =  JSON.parse(localStorage.getItem("templateData")) || []
  const [groupsDataState, setGroupsDataState] = useState([]);
  const [subModuleIndexArray, setSubModuleIndexArray] = useState([]);
  const [data, setData] = useState([]);
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    permission: {},
  });
  const [selectOptions, setSelectOptions] = useState([]);

  // const handleCheckboxChange = (isChecked, index) => {
  //   if (isChecked) {
  //     if (index === 11) {
  //       for (let i = 0; i < data[index].submodules.length; i++) {
  //         data[index].submodules[i].permissions.add = true;
  //         data[index].submodules[i].permissions.delete = true;
  //         data[index].submodules[i].permissions.view = true;
  //         data[index].submodules[i].permissions.modify = true;
  //       }
  //     } else {
  //       data[index].permissions.add = true;
  //       data[index].permissions.delete = true;
  //       data[index].permissions.view = true;
  //       data[index].permissions.modify = true;
  //     }
  //     setSubModuleIndexArray([...subModuleIndexArray, index]);
  //   } else {
  //     if (index === 11) {
  //       for (let i = 0; i < data[index].submodules.length; i++) {
  //         data[index].submodules[i].permissions.add = false;
  //         data[index].submodules[i].permissions.delete = false;
  //         data[index].submodules[i].permissions.view = false;
  //         data[index].submodules[i].permissions.modify = false;
  //       }
  //     } else {
  //       data[index].permissions.add = false;
  //       data[index].permissions.delete = false;
  //       data[index].permissions.view = false;
  //       data[index].permissions.modify = false;
  //     }
  //     setSubModuleIndexArray(
  //       subModuleIndexArray.filter((item) => item !== index)
  //     );
  //   }
  // };

  const handleCheckboxChange = (isChecked, index) => {
    if (isChecked) {
      // Add the module index to the subModuleIndexArray
      setSubModuleIndexArray((prevArray) => [...prevArray, index]);
    } else {
      // Remove the module index from the subModuleIndexArray
      setSubModuleIndexArray((prevArray) =>
        prevArray.filter((item) => item !== index)
      );
    }
  };

  // const handleSubModulePermisssionChange = (
  //   isChecked,
  //   name,
  //   moduleIndex,
  //   subModuleIndex
  // ) => {
  //   let updatedData = [...data];

  //   if (isChecked) {
  //     updatedData[moduleIndex].submodules[subModuleIndex].permissions[
  //       name
  //     ] = true;
  //     setData(updatedData);
  //   } else {
  //     updatedData[moduleIndex].submodules[subModuleIndex].permissions[
  //       name
  //     ] = false;
  //     setData(updatedData);
  //   }
  // };

  const handleSubModulePermisssionChange = (
    isChecked,
    name,
    moduleIndex,
    subModuleIndex
  ) => {
    
    if (data && data[moduleIndex] && data[moduleIndex].permission) {
      const updatedData = [...data];
      const permissions = updatedData[moduleIndex].permission;
  
      if (permissions[subModuleIndex]) {
        // Update the specific permission based on the checkbox name
        permissions[subModuleIndex][name] = isChecked;
        // Update the state with the modified data
        setData(updatedData);
      }
    }
  };
  
  const handleModulePermisssionChange = (isChecked, name, moduleIndex) => {
    let updatedData = [...data];

    if (isChecked) {
      updatedData[moduleIndex].permissions[name] = true;
      setData(updatedData);
    } else {
      updatedData[moduleIndex].permissions[name] = false;
      setData(updatedData);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewGroupData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  // const handleSave = () => {
  //   // if (_.isEqual(data, JSON.parse(JSON.stringify(reset)))) return;
  //   if (!newGroupData.name) return;

  //   const tempGroupData = newGroupData;
  //   tempGroupData.permission = data;
  //   console.log("helo data", data);
  //   setNewGroupData((prev) => ({
  //     ...prev,
  //     permission: data,
  //   }));
  //   setGroupsDataState((prevState) => [...prevState, tempGroupData]);
  //   setSubModuleIndexArray([]);
  // };

  const handleSave = async () => {
    // Check if name is empty
    if (!newGroupData.name) return;

    try { 
         const tempGroupData = newGroupData;
        tempGroupData.permission = data;
        console.log("helo data", tempGroupData);
        setNewGroupData((prev) => ({
          ...prev,
          permission: data,
        }));
        // Make API call to save the data
        await TemplateServices.createTemplate(tempGroupData);

        // If the API call is successful, update states and reset subModuleIndexArray
        setGroupsDataState((prevState) => [...prevState, newGroupData]);
        setSubModuleIndexArray([]);
        
        // Optionally, you can show a success message to the user
        console.log("Data saved successfully");
    } catch (error) {
        // If there's an error, handle it or show an error message to the user
        console.error("Error saving data:", error);
    }
};


  useEffect(() => {
    if (isEditTrue !== -1) {
      const editData = groupsDataState.filter(
        (item, index) => index === isEditTrue
      );
      setNewGroupData({
        name: editData.name,
        permission: editData.permission,
      });
      console.log(editData);
    }
  }, []);

  //   useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const moduleData = await TemplateServices.listModule();
  //       console.log("Received template data:", moduleData);
  //       setData(moduleData.data); // Assuming 'data' property contains template data array
  //     } catch (error) {
  //       console.error("Error fetching template data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if(isEditTrue !== -1){
  //     const newdata = groupsDataState.filter((e,i)=>{
  //       if(isEditTrue !== i) return e;
  //   })
  //     localStorage.setItem('templateData', JSON.stringify(newdata))
  //   }
  //   setSelectOptions(
  //     groupsDataState.map((e) => ({ value: e.index, label: e.name }))
  //   );
  //   localStorage.setItem('templateData', JSON.stringify(groupsDataState))
  //   setNewGroupData({ name: "", groupPermissions: {} });

  // }, [groupsDataState]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moduleData = await TemplateServices.getModules();
        console.log("Received template data:", moduleData);
        setData(moduleData.data); // Assuming 'data' property contains template data array
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectOptions(
      groupsDataState.map((template) => ({
        value: template._id, // Assuming '_id' is the unique identifier for each template
        label: template.name, // Assuming 'name' is the property containing the template name
      }))
    );
    // setData(JSON.parse(JSON.stringify(reset)));
  }, [groupsDataState]);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title>Permissions</Card.Title>
        </Card.Header>

        <div className="d-flex justify-content-between m-2 mt-4 p-3">
          <input
            value={newGroupData.name}
            name="groupname"
            type="text"
            className="p-2"
            onChange={(e) => handleInputChange(e)}
            style={{
              marginRight: "1rem",
              border: "#D3D3D3 1px solid",
              borderRadius: "0.3rem",
              width: "15rem",
            }}
            placeholder="Feature Template Name"
          />
          <div
            className="d-flex justify-content-center"
            style={{ width: "25rem" }}
          >
            <Select
              options={selectOptions}
              placeholder="Select a Feature Template"
              styles={{ control: (base) => ({ ...base, width: "18rem" }) }}
            >
              {" "}
            </Select>{" "}
            <button
              className="btn btn-primary"
              style={{ marginLeft: "1rem", padding: "7px 16px" }}
            >
              Copy
            </button>
          </div>
        </div>

        <Card.Body className="d-flex">
          <div
            style={{
              flex: 0.4,
              maxHeight: "50vh",
              overflow: "auto",
              border: "1px solid #D3D3D3  ",
              borderRadius: "0.5rem",
            }}
          >
            <Table>
              <thead
                style={{ position: "sticky", top: 0, background: "white" }}
              >
                <tr>
                  <th scope="col">Module</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        {" "}
                        <input
                          type="checkbox"
                          className="form-check-input "
                          style={{ marginRight: "0.2rem" }}
                          name="create"
                          checked={subModuleIndexArray.includes(i)}
                          onChange={(e) =>
                            handleCheckboxChange(e.target.checked, i)
                          }
                        />{" "}
                        {element.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <div
            style={{
              flex: 1,
              maxHeight: "50vh",
              overflow: "auto",
              border: "1px solid #D3D3D3",
              borderRadius: "0.5rem",
              marginLeft: "0.2rem",
            }}
          >
            <Table>
              <thead
                id="feature_template"
                style={{ position: "sticky", top: 0, background: "white" }}
              >
                <tr>
                  <th scope="col" className="col-4" style={{ width: "150px" }}>
                    SubModules
                  </th>
                  <th scope="col">Add</th>
                  <th scope="col">View</th>
                  <th scope="col">Modify</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody className="feature_template_table">
                {subModuleIndexArray.map((mindex, index) => {
                  return data[mindex].permission.map(
                    (permission, permissionIndex) => (
                      <tr key={permissionIndex}>
                        <td className="col-2">{permission.moduleId.title}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={permission.add}
                            onChange={(e) =>
                              handleSubModulePermisssionChange(
                                e.target.checked,
                                e.target.name,
                                mindex,
                                permissionIndex
                              )
                            }
                            className="form-check-input"
                            name="add"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={permission.view}
                            onChange={(e) =>
                              handleSubModulePermisssionChange(
                                e.target.checked,
                                e.target.name,
                                mindex,
                                permissionIndex
                              )
                            }
                            className="form-check-input"
                            name="view"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={permission.modify}
                            onChange={(e) =>
                              handleSubModulePermisssionChange(
                                e.target.checked,
                                e.target.name,
                                mindex,
                                permissionIndex
                              )
                            }
                            className="form-check-input"
                            name="modify"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={permission.delete}
                            onChange={(e) =>
                              handleSubModulePermisssionChange(
                                e.target.checked,
                                e.target.name,
                                mindex,
                                permissionIndex
                              )
                            }
                            className="form-check-input"
                            name="delete"
                          />
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Card.Body>
        <div className="d-flex justify-content-end  p-3">
          <button
            className="btn btn-primary"
            style={{ marginLeft: "1rem", padding: "7px 16px" }}
            onClick={handleSave}
          >
            {" "}
            Save{" "}
          </button>
        </div>
      </Card>
    </div>
  );
};
export default Permission;
