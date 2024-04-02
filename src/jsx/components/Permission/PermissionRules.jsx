import { useContext, useState, useEffect } from "react";
import React from "react";
import { Card, Table } from "react-bootstrap";
import Select from "react-select";
import { staticoptions } from "./Options";
import { ThemeContext } from "../../../context/ThemeContext";
// import { reset } from "./Options";
import _ from "lodash";
import TemplateServices from "../../../services/api/TemplateServices";
import { useNavigate, useParams } from "react-router-dom";
import {useTranslation} from 'react-i18next'
import Error from "../Error/Error";


const Permission = ({ isEditTrue, setIsEditTrue }) => {

  const {t} = useTranslation();
  // const { groupsDataState, setGroupsDataState } = useContext(ThemeContext);
  // const templateData =  JSON.parse(localStorage.getItem("templateData")) || []
  // const [show, setShow] = useState(false);
  const [groupsDataState, setGroupsDataState] = useState([]);
  const [subModuleIndexArray, setSubModuleIndexArray] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    permission: {},
  });
  const [selectOptions, setSelectOptions] = useState([]);

  const [selectedTemplate, setSelectedTemplate] = useState(null); // Step 1: State to hold selected template data

  const handleCopy = () => {
    // setShow((prev) => !prev);
    if (!selectedTemplate) return;

    // // Copy name
    // setNewGroupData({
    //   ...newGroupData,
    //   name: selectedTemplate.name,
    // });

    // Update permissions for modules directly
    const updatedData = data.map((module) => {
      const permission = selectedTemplate.permission.find(
        (perm) => perm.moduleId === module._id
      );
      if (permission) {
        module.permission = {
          add: permission.add,
          view: permission.view,
          modify: permission.modify,
          delete: permission.delete,
        };
      }

      
      return module;
    });

    setData(updatedData);

    // Clear subModuleIndexArray
    setSubModuleIndexArray(updatedData.filter(d => {
      return !(!d.permission.delete && !d.permission.view && !d.permission.modify && !d.permission.add)
    }).map(d => d._id));

    console.log("Data copied successfully");
  };



  const handleCheckboxChange = (isChecked, id) => {
    if (isChecked) {
        setSubModuleIndexArray((prevArray) => [...prevArray, id]);
    } else {
        setSubModuleIndexArray((prevArray) =>
            prevArray.filter((item) => item !== id)
        );
    }
};
const handleModulePermisssionChange = (isChecked, name, id) => {
  let updatedData = [...data];
  const modulePermissions = { ...updatedData.find(element => element._id === id).permission };

  if (isChecked) {
      modulePermissions[name] = true;
  } else {
      modulePermissions[name] = false;
  }

  const moduleIndex = updatedData.findIndex(element => element._id === id);
  updatedData[moduleIndex].permission = modulePermissions;
  setData(updatedData);
};
const handleSubModulePermisssionChange = (
  isChecked,
  name,
  moduleId,
  subModuleId
) => {
  const updatedData = data.map((module) => {
      if (module._id === moduleId) {
          const subModules = module.subModules.map((subModule) => {
              if (subModule.id === subModuleId) {
                  const updatedSubModulePermissions = { ...subModule.permission };
                  updatedSubModulePermissions[name] = isChecked;
                  return {
                      ...subModule,
                      permission: updatedSubModulePermissions,
                  };
              }
              return subModule;
          });
          return { ...module, subModules };
      }
      return module;
  });
  setData(updatedData);
};


  const handleInputChange = (e) => {

    setIsErrror(false);
    const { value } = e.target;
    setNewGroupData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const [isError, setIsErrror] = useState(false);

  const handleSave = async () => {
    if (!newGroupData.name) {
      setIsErrror(true);
      return ;
    }

    try {

      setIsErrror(false);
      console.log(data, 'data-;;')
      const flattenedPermissions = data.reduce((acc, module) => {
        const mainModulePermissions = {
          moduleId: module._id,
          add: module.permission.add,
          view: module.permission.view,
          modify: module.permission.modify,
          delete: module.permission.delete,
        };

        acc.push(mainModulePermissions);

        if (module.subModules && module.subModules.length > 0 && !id) {
          module.subModules.forEach((subModule) => {
            const subModulePermissions = {
              moduleId: subModule.id,
              add: subModule.permission.add,
              view: subModule.permission.view,
              modify: subModule.permission.modify,
              delete: subModule.permission.delete,
            };
            acc.push(subModulePermissions);
          });
        }

        return acc;
      }, []);

      const tempGroupData = {
        ...newGroupData,
        permission: flattenedPermissions,
      };

      setNewGroupData((prev) => ({
        ...prev,
        permission: flattenedPermissions,
      }));

      const method = id ? TemplateServices.udpateTemplate : TemplateServices.createTemplate; 
      await method(tempGroupData);
      // console.log("this is the temoGrioyp data name", tempGroupData);
      // setGroupsDataState((prevState) => [...prevState, tempGroupData]);
      setSubModuleIndexArray([]);

      console.log("Data saved successfully");
      navigate('/groups')
    } catch (error) {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moduleData = await TemplateServices.listModule();
        const permission = {
          add: false,
          view: false,
          modify: false,
          delete: false,
        };
        const newData = [...moduleData.data].map((obj) => {
          const subModules = [...obj.subModules].map((submodule) => {
            return { ...submodule, permission };
          });
          return {
            ...obj,
            permission,
            subModules,
          };
        });
        setData(newData);
        console.log({newData})
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };

    fetchData();
  }, []);

  const fetchTemplates = async () => {
    try {
      const templateData = await TemplateServices.getTemplates();
      if (id) {
        const moduleData = await TemplateServices.listModule();
        // setCurrentTemplate();
        const filteredData = templateData.data.data.find(d => d._id === id);
        setNewGroupData(filteredData);
        const updatedData = moduleData.data.map((module) => {
          const permission = filteredData.permission.find(
            (perm) => perm.moduleId === module._id
          );
          if (permission) {
            module.permission = {
              add: permission.add,
              view: permission.view,
              modify: permission.modify,
              delete: permission.delete,
            };
          }
          return module;
        });
    
        setData(updatedData);
        setSubModuleIndexArray(filteredData.permission.filter(d => {
          return !(!d.delete && !d.view && !d.modify && !d.add)
        }).map(d => d.moduleId));
      }
      setGroupsDataState(templateData.data.data);


      setSelectOptions(
        templateData.data.data.map((template) => ({
          value: template._id,
          label: template.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching template data:", error);
    }
  };

  
  const groupNames = groupsDataState.map(e=>e.name);
  console.log("this is group data state ",groupNames);

  useEffect(() => {
    fetchTemplates();
  }, []);

  console.log('is error : ',isError);

  return (
    <div >
      <Card>
        <Card.Header>
          <Card.Title>{t('permission')}</Card.Title>
        </Card.Header>

        <div className="d-flex justify-content-between m-2 mt-4 p-3" >

          <div>

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
            placeholder={t('featureTemplateName')}
            />

          </div>
          
          <div
            className="d-flex justify-content-center"
            style={{ width: "25rem" }}
            >
            <Select
              options={selectOptions}
              placeholder={t('selectFeatureTemplate')}
              styles={{ control: (base) => ({ ...base, width: "18rem" }) }}
              onChange={(selectedOption) => {
                const selectedTemplateData = groupsDataState.find(
                  (template) => template._id === selectedOption.value
                );
                setSelectedTemplate(selectedTemplateData);
              }}
            >
              {" "}
            </Select>{" "}
            <button
              className="btn btn-primary"
              style={{ marginLeft: "1rem", padding: "7px 16px",marginRight:"1rem" }}
              onClick={handleCopy}
            >
              {t('copy')}
            </button>
          </div>
        </div>
        <div className="ms-4 pt-0 mt-0">
          {isError && <span className="text-danger text-sm pt-0 mt-0" style={{marginBottom:"1rem"}}>feature template name is required</span>  }
        </div>


        <Card.Body className="d-flex"  >
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
                  <th scope="col">{t('module')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, i) => {
                  // const anyPermissionTrue = Object.values(
                  //   element.permission
                  // ).some((perm) => perm === true);
                  if (!element || !element.title) return null;
                  return (
                    <React.Fragment key={element._id}>
                      <tr>
                        <td >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            style={{ marginRight: "0.2rem" }}
                            name="create"
                            checked={subModuleIndexArray.includes(element._id)}
                            onChange={(e) =>
                              handleCheckboxChange(e.target.checked, element._id)
                            }
                          />
                          <span style={{marginRight:"1.7rem"}}>{t(element.title)}</span>
                          
                        </td>
                      </tr>
                    </React.Fragment>
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
                  {t('subModules')}
                  </th>
                  <th scope="col">{t('add')}</th>
                  <th scope="col">{t('view')}</th>
                  <th scope="col">{t('modify')}</th>
                  <th scope="col">{t('delete')}</th>
                </tr>
              </thead>
              <tbody className="feature_template_table">
                  {subModuleIndexArray.length > 0 &&
  subModuleIndexArray.map((mindex, index) => {
    const moduleData = data.find(module => module._id === mindex);
    if (!moduleData) return null; // Check if moduleData is undefined

    return (
      <React.Fragment key={index}>
        <tr>
          <td className="col-2" style={{ width: "130px" }}>
            {" "}
            {moduleData.title}
          </td>
          <td>
            <input
              type="checkbox"
              checked={moduleData.permission?.add} // Use optional chaining to avoid errors if permission is undefined
              onChange={(e) =>
                handleModulePermisssionChange(
                  e.target.checked,
                  e.target.name,
                  mindex
                )
              }
              className="form-check-input"
              name="add"
            />
          </td>
          <td>
            <input
              type="checkbox"
              checked={moduleData.permission?.view}
              className="form-check-input"
              onChange={(e) =>
                handleModulePermisssionChange(
                  e.target.checked,
                  e.target.name,
                  mindex
                )
              }
              name="view"
            />
          </td>
          <td>
            <input
              type="checkbox"
              checked={moduleData.permission?.modify}
              className="form-check-input"
              onChange={(e) =>
                handleModulePermisssionChange(
                  e.target.checked,
                  e.target.name,
                  mindex
                )
              }
              name="modify"
            />
          </td>
          <td>
            <input
              type="checkbox"
              checked={moduleData.permission?.delete}
              className="form-check-input"
              onChange={(e) =>
                handleModulePermisssionChange(
                  e.target.checked,
                  e.target.name,
                  mindex
                )
              }
              name="delete"
            />
          </td>
        </tr>
        {moduleData.subModules.map((element, i) => (
          <tr key={i}>
            <td className="col-2"> {element.title}</td>
            <td>
              <input
                type="checkbox"
                checked={element.permission.add}
                onChange={(e) =>
                  handleSubModulePermisssionChange(
                    e.target.checked,
                    e.target.name,
                    mindex,
                    i
                  )
                }
                className="form-check-input"
                name="add"
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={element.permission.view}
                onChange={(e) =>
                  handleSubModulePermisssionChange(
                    e.target.checked,
                    e.target.name,
                    mindex,
                    i
                  )
                }
                className="form-check-input"
                name="view"
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={element.permission.modify}
                onChange={(e) =>
                  handleSubModulePermisssionChange(
                    e.target.checked,
                    e.target.name,
                    mindex,
                    i
                  )
                }
                className="form-check-input"
                name="modify"
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={element.permission.delete}
                onChange={(e) =>
                  handleSubModulePermisssionChange(
                    e.target.checked,
                    e.target.name,
                    mindex,
                    i
                  )
                }
                className="form-check-input"
                name="delete"
              />
            </td>
          </tr>
        ))}
      </React.Fragment>
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
            {id ? 'Update' : 'Save'}{" "}
          </button>
        </div>
      </Card>
    </div>
  );
};
export default Permission;
