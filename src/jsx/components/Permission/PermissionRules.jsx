import { useContext, useState, useEffect } from "react";
import React from "react";
import { Card, Table } from "react-bootstrap";
import Select from "react-select";
import { staticoptions } from "./Options";
import { ThemeContext } from "../../../context/ThemeContext";
// import { reset } from "./Options";
import _ from "lodash";
import TemplateServices from "../../../services/api/TemplateServices";
import {useTranslation} from 'react-i18next'

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

  const { t } = useTranslation();

  const handleCheckboxChange = (isChecked, index) => {
    if (isChecked) {
      setSubModuleIndexArray((prevArray) => [...prevArray, index]);
    } else {
      setSubModuleIndexArray((prevArray) =>
        prevArray.filter((item) => item !== index)
      );
    }
  };

  const handleSubModulePermisssionChange = (
    isChecked,
    name,
    moduleIndex,
    subModuleIndex
  ) => {
    if (data && data[moduleIndex] && data[moduleIndex].subModules) {
      const updatedData = [...data];
      const subModules = updatedData[moduleIndex].subModules;

      if (
        subModules &&
        subModules[subModuleIndex] &&
        subModules[subModuleIndex].permission
      ) {
        const subModulePermissions = subModules[subModuleIndex].permission;

        if (subModulePermissions) {
          const updatedSubModulePermissions = { ...subModulePermissions };
          updatedSubModulePermissions[name] = isChecked;
          updatedData[moduleIndex].subModules[subModuleIndex].permission =
            updatedSubModulePermissions;
          setData(updatedData);
        }
      }
    }
  };

  const handleModulePermisssionChange = (isChecked, name, moduleIndex) => {
    let updatedData = [...data];
    const modulePermissions = { ...updatedData[moduleIndex].permission };

    if (isChecked) {
      modulePermissions[name] = true;
    } else {
      modulePermissions[name] = false;
    }

    updatedData[moduleIndex].permission = modulePermissions;
    setData(updatedData);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setNewGroupData((prev) => ({
      ...prev,
      name: value,
    }));
  };

  const handleSave = async () => {
    if (!newGroupData.name) return;

    try {
      const flattenedPermissions = data.reduce((acc, module) => {
        const mainModulePermissions = {
          moduleId: module._id,
          add: module.permission.add,
          view: module.permission.view,
          modify: module.permission.modify,
          delete: module.permission.delete,
        };

        acc.push(mainModulePermissions);

        if (module.subModules && module.subModules.length > 0) {
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

      await TemplateServices.createTemplate(tempGroupData);
      console.log("this is the temoGrioyp data name", tempGroupData);
      // setGroupsDataState((prevState) => [...prevState, tempGroupData]);
      setSubModuleIndexArray([]);

      console.log("Data saved successfully");
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
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const templateData = await TemplateServices.getTemplates();
        console.log("Received template data:", templateData);
        setGroupsDataState(templateData.data);
        setSelectOptions(
          templateData.data.map((template) => ({
            value: template._id,
            label: template.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title>{t('permission')}</Card.Title>
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
            placeholder={t('featureTemplateName')}
          />
          <div
            className="d-flex justify-content-center"
            style={{ width: "25rem" }}
          >
            <Select
              options={selectOptions}
              placeholder={t('selectFeatureTemplate')}
              styles={{ control: (base) => ({ ...base, width: "18rem" }) }}
            >
              {" "}
            </Select>{" "}
            <button
              className="btn btn-primary"
              style={{ marginLeft: "1rem",marginRight:"1rem", padding: "7px 16px" }}
            >
              {t('copy')}
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
                  <th scope="col">{t('module')}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, i) => {
                  return (
                    <React.Fragment key={i}>
                      <tr>
                        <td >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            style={{ marginRight: "0.2rem" }}
                            name="create"
                            checked={subModuleIndexArray.includes(i)}
                            onChange={(e) =>
                              handleCheckboxChange(e.target.checked, i)
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
                    return (
                      <>
                        <tr key={index}>
                          <td className="col-2" style={{ width: "130px" }}>
                            {" "}
                            {t(data[mindex].title)}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={data[mindex]?.permission.add}
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
                              checked={data[mindex].permission.view}
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
                              checked={data[mindex].permission.modify}
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
                              checked={data[mindex].permission.delete}
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
                        {data[mindex].subModules.map((element, i) => (
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
                      </>
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
            {t('save')}{" "}
          </button>
        </div>
      </Card>
    </div>
  );
};
export default Permission;
