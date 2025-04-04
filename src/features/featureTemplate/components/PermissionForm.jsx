import React, { useState, useEffect } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { notifyError, notifySuccess } from "@/utils/toast";
import {
  createTemplate,
  getAllModules,
  getAllTemplates,
  updateTemplate,
} from "../api";
import TemplateDropdownList from "./DropdownList";
import { useQueryClient } from "@tanstack/react-query";

const PermissionForm = () => {
  const { t } = useTranslation();
  const [groupsDataState, setGroupsDataState] = useState([]);
  const [subModuleIndexArray, setSubModuleIndexArray] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [newGroupData, setNewGroupData] = useState({
    name: "",
    permission: {},
  });
  const [selectOptions, setSelectOptions] = useState([]);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const handleCopy = () => {
    if (!selectedTemplate) return;

    // Update permissions for modules directly
    const updatedData = data.map((module) => {
      const permission = selectedTemplate.permission.find(
        (perm) => perm.moduleId === module._id
      );
      if (permission) {
        module.permission = {
          add: permission?.add,
          view: permission?.view,
          modify: permission?.modify,
          delete: permission?.delete,
        };
      }

      module.subModules =
        module.subModules?.map((subModule) => {
          const subModulePermission = selectedTemplate.permission.find(
            (perm) => perm.moduleId === subModule.id
          );
          if (subModulePermission) {
            subModule.permission = {
              add: subModulePermission?.add,
              view: subModulePermission?.view,
              modify: subModulePermission?.modify,
              delete: subModulePermission?.delete,
            };
          }
          return subModule;
        }) || [];

      return module;
    });

    setData(updatedData);

    // Clear subModuleIndexArray
    setSubModuleIndexArray(
      selectedTemplate.permission
        .filter((d) => {
          return d.delete || d.view || d.modify || d.add;
        })
        .map((d) => d.moduleId)
    );
  };

  const handleCheckboxChange = (isChecked, id) => {
    if (isChecked) {
      setSubModuleIndexArray((prevArray) => [...prevArray, id]);
    } else {
      setSubModuleIndexArray((prevArray) =>
        prevArray.filter((item) => item !== id)
      );

      setData((prevData) =>
        prevData.map((module) => {
          if (module._id === id) {
            return {
              ...module,
              subModules: module.subModules.map((subModule) => {
                return {
                  ...subModule,
                  permission: {
                    add: false,
                    view: false,
                    modify: false,
                    delete: false,
                  },
                };
              }),
              permission: {
                add: false,
                view: false,
                modify: false,
                delete: false,
              },
            };
          }
          return module;
        })
      );
    }
  };
  const handleModulePermisssionChange = (isChecked, name, id) => {
    let updatedData = [...data];
    const module = updatedData.find((element) => element._id === id);
    const modulePermissions = {
      ...module.permission,
    };

    if (isChecked) {
      modulePermissions[name] = true;
      modulePermissions["view"] = true;
    } else {
      if (
        (name === "view" &&
          Object.entries(modulePermissions).find(
            ([key, val]) => key !== "view" && val
          )) ||
        module.subModules.some((subModule) =>
          Object.entries(subModule.permission).some(([key, val]) => val)
        )
      )
        return;
      modulePermissions[name] = false;
    }

    const moduleIndex = updatedData.findIndex((element) => element._id === id);
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
      if (isChecked) {
        handleModulePermisssionChange(isChecked, "view", moduleId);
      }
      if (module._id === moduleId) {
        const subModules = module.subModules.map((subModule) => {
          if (subModule.id === subModuleId) {
            const updatedSubModulePermissions = { ...subModule.permission };
            if (
              !isChecked &&
              name === "view" &&
              Object.entries(updatedSubModulePermissions).find(
                ([key, val]) => key !== "view" && val
              )
            ) {
              return subModule;
            }
            if (isChecked) updatedSubModulePermissions["view"] = true;
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

  useEffect(() => {
    if (id) {
      const editData = groupsDataState.filter((item, index) => item._id === id);
      setNewGroupData({
        name: editData.name,
        permission: editData.permission,
      });
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moduleData = await getAllModules();
        const permission = {
          add: false,
          view: false,
          modify: false,
          delete: false,
        };
        const newData = [...moduleData].map((obj) => {
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

  const [editGroupName, setEditGroupName] = useState();

  const fetchTemplates = async () => {
    try {
      const templateData = await getAllTemplates();
      if (id) {
        const moduleData = await getAllModules();
        // setCurrentTemplate();
        const filteredData = templateData.data.find((d) => d._id === id);
        setNewGroupData(filteredData);
        setEditGroupName(filteredData.name);

        const updatedData = moduleData.map((module) => {
          // Find the permission for the current module or submodule
          const permission = filteredData.permission.find(
            (perm) => perm.moduleId === (module.id || module._id)
          );
          if (permission) {
            // Assign permissions
            module.permission = {
              add: permission?.add,
              view: permission?.view,
              modify: permission?.modify,
              delete: permission?.delete,
            };

            if (module.subModules && module.subModules.length > 0) {
              module.subModules.forEach((submodule) => {
                const subModulePermissions = filteredData.permission.find(
                  (perm) => perm.moduleId === (submodule.id || submodule._id)
                );
                if (subModulePermissions) {
                  submodule.permission = {
                    add: subModulePermissions.add,
                    view: subModulePermissions.view,
                    modify: subModulePermissions.modify,
                    delete: subModulePermissions.delete,
                  };
                }
              });
            }
          }
          return module;
        });
        setData(updatedData);
        setSubModuleIndexArray(
          filteredData.permission
            .filter((d) => {
              return d.delete || d.view || d.modify || d.add;
            })
            .map((d) => d.moduleId)
        );
      }
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

  const groupNames = groupsDataState.map((e) => e.name);

  const handleSave = async () => {
    if (!newGroupData.name) {
      setIsErrror(true);
      return;
    }

    if (id) {
      if (
        groupNames.includes(newGroupData.name) &&
        newGroupData.name !== editGroupName
      ) {
        notifyError("Feature Template name already exists");
        return;
      }
    } else {
      if (groupNames.includes(newGroupData.name)) {
        notifyError("Feature Template name already exists");
        return;
      }
    }

    try {
      setIsErrror(false);
      const flattenedPermissions = data.reduce((acc, module) => {
        const mainModulePermissions = {
          moduleId: module._id,
          add: module.permission?.add,
          view: module.permission?.view,
          modify: module.permission?.modify,
          delete: module.permission?.delete,
        };

        acc.push(mainModulePermissions);

        if (module.subModules && module.subModules.length > 0) {
          module.subModules.forEach((subModule) => {
            const subModulePermissions = {
              moduleId: subModule.id,
              add: subModule.permission?.add,
              view: subModule.permission?.view,
              modify: subModule.permission?.modify,
              delete: subModule.permission?.delete,
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

      const method = id ? updateTemplate : createTemplate;
      await method(tempGroupData);
      queryClient.invalidateQueries(["groups"]);

      setSubModuleIndexArray([]);

      notifySuccess("saved");
      navigate("/groups");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [id]);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title>{t("permission")}</Card.Title>
        </Card.Header>

        <div className="d-flex justify-content-between m-2 mt-4 p-3 mb-0 pb-0">
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
              placeholder={t("featureTemplateName")}
            />
          </div>

          <div
            className="d-flex justify-content-center"
            style={{ width: "25rem" }}
          >
            <TemplateDropdownList
              placeholder={t("selectFeatureTemplate")}
              customStyles={{
                control: (base) => ({ ...base, width: "18rem" }),
              }}
              value={{
                value: selectedTemplate?._id,
                label: selectedTemplate?.name,
              }}
              onChange={(selectedOption) => {
                const selectedTemplateData = groupsDataState.find(
                  (template) => template._id === selectedOption.value
                );
                setSelectedTemplate(selectedTemplateData);
              }}
            />
            <button
              className="btn btn-primary"
              style={{
                marginLeft: "1rem",
                padding: "7px 16px",
                marginRight: "1rem",
              }}
              onClick={handleCopy}
            >
              {t("copy")}
            </button>
          </div>
        </div>
        <div className="ms-4 pt-0 mt-0">
          {isError && (
            <span
              className="text-danger text-sm pt-0 mt-0"
              style={{ marginBottom: "1rem" }}
            >
              feature template name is required
            </span>
          )}
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
                  <th scope="col">{t("module")}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((element, i) => {
                  if (!element || !element.title) return null;
                  return (
                    <React.Fragment key={element._id}>
                      <tr>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            style={{ marginRight: "0.2rem" }}
                            name="create"
                            checked={
                              subModuleIndexArray.includes(element._id) ||
                              element.subModules.some((submodule) =>
                                subModuleIndexArray.includes(submodule.id)
                              )
                            }
                            onChange={(e) =>
                              handleCheckboxChange(
                                e.target.checked,
                                element._id
                              )
                            }
                          />
                          <span style={{ marginRight: "1.7rem" }}>
                            {t(element.title)}
                          </span>
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
                    {t("subModules")}
                  </th>
                  <th scope="col">{t("add")}</th>
                  <th scope="col">{t("view")}</th>
                  <th scope="col">{t("modify")}</th>
                  <th scope="col">{t("delete")}</th>
                </tr>
              </thead>
              <TBody
                subModuleIndexArray={subModuleIndexArray}
                data={data}
                handleModulePermisssionChange={handleModulePermisssionChange}
                handleSubModulePermisssionChange={
                  handleSubModulePermisssionChange
                }
              />
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
            {id ? "Update" : "Save"}{" "}
          </button>
        </div>
      </Card>
    </div>
  );
};
export default PermissionForm;

export const TBody = ({
  subModuleIndexArray,
  data,
  handleSubModulePermisssionChange,
  handleModulePermisssionChange,
}) => {
  const picked = new Set();

  return (
    <tbody className="feature_template_table">
      {subModuleIndexArray.length > 0 &&
        subModuleIndexArray.map((mindex, index) => {
          const moduleData = data.find(
            (module) =>
              module._id === mindex ||
              module.subModules.some((el) => el.id === mindex)
          );
          if (!moduleData || picked.has(moduleData._id)) return null;
          picked.add(moduleData._id);

          let isDisabled = false;
          if (moduleData.title === "Dashboard") isDisabled = true;

          return (
            <React.Fragment key={mindex}>
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
                        moduleData._id
                      )
                    }
                    className="form-check-input"
                    name="add"
                    disabled={isDisabled || moduleData.subModules.length > 0}
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
                        moduleData._id
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
                        moduleData._id
                      )
                    }
                    disabled={isDisabled || moduleData.subModules.length > 0}
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
                        moduleData._id
                      )
                    }
                    disabled={isDisabled || moduleData.subModules.length > 0}
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
                      checked={element.permission?.add}
                      onChange={(e) =>
                        handleSubModulePermisssionChange(
                          e.target.checked,
                          e.target.name,
                          moduleData._id,
                          element.id
                        )
                      }
                      className="form-check-input"
                      name="add"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={element.permission?.view}
                      onChange={(e) =>
                        handleSubModulePermisssionChange(
                          e.target.checked,
                          e.target.name,
                          moduleData._id,
                          element.id
                        )
                      }
                      className="form-check-input"
                      name="view"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={element.permission?.modify}
                      onChange={(e) =>
                        handleSubModulePermisssionChange(
                          e.target.checked,
                          e.target.name,
                          moduleData._id,
                          element.id
                        )
                      }
                      className="form-check-input"
                      name="modify"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={element.permission?.delete}
                      onChange={(e) =>
                        handleSubModulePermisssionChange(
                          e.target.checked,
                          e.target.name,
                          moduleData._id,
                          element.id
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
  );
};
