import { useContext, useState, useEffect } from "react";
import React from "react";
import { Card, Table } from "react-bootstrap";
import Select from "react-select";
import { staticoptions } from "./Options";
import { ThemeContext } from "../../../context/ThemeContext";
import { reset } from "./Options";
import _ from "lodash";

const Permission = () => {
  const { groupsDataState, setGroupsDataState } = useContext(ThemeContext);
  const [subModuleIndexArray, setSubModuleIndexArray] = useState([]);
  const [data, setData] = useState(staticoptions);
  const [newGroupData, setNewGroupData] = useState({
    groupName: "",
    groupPermissions: {},
  });
  const [selectOptions, setSelectOptions] = useState([]);

  const handleCheckboxChange = (isChecked, index) => {
    if (isChecked) {
      setSubModuleIndexArray([...subModuleIndexArray, index]);
    } else {
      setSubModuleIndexArray(
        subModuleIndexArray.filter((item) => item !== index)
      );
    }
  };

  const handleSubModulePermisssionChange = (
    isChecked,
    name,
    moduleIndex,
    subModuleIndex
  ) => {
    let updatedData = [...data];

    if (isChecked) {
      updatedData[moduleIndex].submodules[subModuleIndex].permissions[
        name
      ] = true;
      setData(updatedData);
    } else {
      updatedData[moduleIndex].submodules[subModuleIndex].permissions[
        name
      ] = false;
      setData(updatedData);
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
      groupName: value,
    }));
  };

  const handleSave = () => {
    if (_.isEqual(data, JSON.parse(JSON.stringify(reset)))) return;
    if (!newGroupData.groupName) return;

    setNewGroupData((prev) => ({
      ...prev,
      groupPermissions: data,
    }));

    setGroupsDataState([...groupsDataState, newGroupData]);
    setNewGroupData({ groupName: "", groupPermissions: {} });
    setData(JSON.parse(JSON.stringify(reset)));
  };

  console.log(newGroupData);
  console.log("data saved", groupsDataState);

  console.log("reset data", reset);

  useEffect(() => {
    setSelectOptions(
      groupsDataState.map((e) => ({ value: e.index, label: e.groupName }))
    );
  }, [groupsDataState]);

  return (
    <div>
      <Card>
        <Card.Header>
          <Card.Title>Permissions</Card.Title>
        </Card.Header>

        <div className="d-flex justify-content-between m-2 mt-4 p-3">
          <input
            value={newGroupData.groupName}
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
                  <th scope="col" className="col-4" style={{ width: "130px" }}>
                    SubModules
                  </th>
                  <th scope="col">Add</th>
                  <th scope="col">View</th>
                  <th scope="col">Modify</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Export</th>
                </tr>
              </thead>
              <tbody className="feature_template_table">
                {subModuleIndexArray.map((mindex, index) => {
                  if (data[mindex].submodules.length == 0) {
                    return (
                      <tr key={index}>
                        <td className="col-2" style={{ width: "130px" }}>
                          {" "}
                          {data[mindex].name}
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={data[mindex].permissions.add}
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
                            checked={data[mindex].permissions.view}
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
                            checked={data[mindex].permissions.modify}
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
                            checked={data[mindex].permissions.delete}
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
                        <td>
                          <input
                            type="checkbox"
                            checked={data[mindex].permissions.export}
                            className="form-check-input"
                            onChange={(e) =>
                              handleModulePermisssionChange(
                                e.target.checked,
                                e.target.name,
                                mindex
                              )
                            }
                            name="export"
                          />
                        </td>
                      </tr>
                    );
                  }

                  return data[mindex].submodules.map((element, i) => {
                    return (
                      <tr key={i}>
                        <td className="col-2"> {element.name}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={element.permissions.add}
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
                            checked={element.permissions.view}
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
                            checked={element.permissions.modify}
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
                            checked={element.permissions.delete}
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
                        <td>
                          <input
                            type="checkbox"
                            checked={element.permissions.export}
                            onChange={(e) =>
                              handleSubModulePermisssionChange(
                                e.target.checked,
                                e.target.name,
                                mindex,
                                i
                              )
                            }
                            className="form-check-input"
                            name="export"
                          />
                        </td>
                      </tr>
                    );
                  });
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
