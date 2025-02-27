import React, { useState, useContext, useEffect } from "react";
import { Nav, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import useStorage from "../../hooks/useStorage";

const WIDGETS = [
  "Card-Widget",
  "Active-User-Map",
  "Data-Frequency",
  "Fleet-Status",
  "Faulty-Devices",
  "Devices-Vs-Project",
  "Category-Wise-Status",
  "Web-Vs-Mobile-User",
  "Application-Usage",
  "Model-Wise-Devices",
  "Object-Type",
  "Number-Of-Tasks",
  "Inactive-Devices",
  "Category-Wise-Task",
  "Top-5-Technician",
  "Fleet-Usage",
  "Fleet-Fuel",
  "Fleet-Idle",
  "Maintenance",
  "OverSpeed",
  "Stay-In-Zone",
];

const CompSetting = () => {
  const { checkRole } = useStorage();
  const [settingToggle, setSettingToggle] = useState(false);
  const role = checkRole();

  const {
    setShowCardWidget,
    setShowActiveUserMap,
    setShowDataFrequency,
    setShowFleetStatus,
    setShowFaultyDevices,
    setDevicesVsProject,
    setCategoryWiseStatus,
    setWebVsMobileUser,
    setApplicationUsage,
    setModelWiseDevices,
    setObjectType,
    setNumberOfTasks,
    setInactiveDevices,
    setCategoryWiseTask,
    setTop5Technician,
    setFleetUsage,
    setShowFleetFuel,
    setShowFleetIdle,
    setMaintenance,
    setOverSpeed,
    setStayInZone,
  } = useContext(ThemeContext);

  // Initialize widget states from local storage
  useEffect(() => {
    const storedPreferences = JSON.parse(localStorage.getItem("widgetPreferences")) || {};
    WIDGETS.forEach((widget) => {
      const stateSetter = getStateSetter(widget);
      stateSetter(storedPreferences[widget] !== undefined ? storedPreferences[widget] : true);
    });
  }, []);

  // Helper function to get the correct state setter
  const getStateSetter = (widget) => {
    switch (widget) {
      case "Card-Widget":
        return setShowCardWidget;
      case "Active-User-Map":
        return setShowActiveUserMap;
      case "Data-Frequency":
        return setShowDataFrequency;
      case "Fleet-Status":
        return setShowFleetStatus;
      case "Faulty-Devices":
        return setShowFaultyDevices;
      case "Devices-Vs-Project":
        return setDevicesVsProject;
      case "Category-Wise-Status":
        return setCategoryWiseStatus;
      case "Web-Vs-Mobile-User":
        return setWebVsMobileUser;
      case "Application-Usage":
        return setApplicationUsage;
      case "Model-Wise-Devices":
        return setModelWiseDevices;
      case "Object-Type":
        return setObjectType;
      case "Number-Of-Tasks":
        return setNumberOfTasks;
      case "Inactive-Devices":
        return setInactiveDevices;
      case "Category-Wise-Task":
        return setCategoryWiseTask;
      case "Top-5-Technician":
        return setTop5Technician;
      case "Fleet-Usage":
        return setFleetUsage;
      case "Fleet-Fuel":
        return setShowFleetFuel;
      case "Fleet-Idle":
        return setShowFleetIdle;
      case "Maintenance":
        return setMaintenance;
      case "OverSpeed":
        return setOverSpeed;
      case "Stay-In-Zone":
        return setStayInZone;
      default:
        return () => {};
    }
  };

  // Function to toggle widget visibility and store in local storage
  const toggleComponent = (widget, value) => {
    const stateSetter = getStateSetter(widget);
    stateSetter(value);

    const storedPreferences = JSON.parse(localStorage.getItem("widgetPreferences")) || {};
    storedPreferences[widget] = value;
    localStorage.setItem("widgetPreferences", JSON.stringify(storedPreferences));
  };

  // Function to render checkboxes for widgets
  const renderComponentCheckbox = (widget) => {
    return (
      <div
        key={widget}
        className="form-check custom-checkbox mb-2"
        onClick={() =>
          toggleComponent(
            widget,
            !(JSON.parse(localStorage.getItem("widgetPreferences"))?.[widget] ?? true)
          )
        } 
      >
        <input
          type="checkbox"
          className="form-check-input"
          id={widget}
          checked={JSON.parse(localStorage.getItem("widgetPreferences"))?.[widget] ?? true}
          onChange={(e) => e.stopPropagation()}
        />
        <label className="form-check-label fs-18">{widget.replaceAll("-", " ")}</label>
      </div>
    );
  };
  

  return (
    <>
      <div className={`sidebar-right ${settingToggle ? "show" : ""}`}>
        <div
          className="bg-overlay"
          onClick={() => setSettingToggle(!settingToggle)}
        ></div>
        <Link
          to="#"
          className="sidebar-right-trigger wave-effect wave-effect-x"
          onClick={() => setSettingToggle(!settingToggle)}
        >
          <span>
            <i className="fa fa-cog fa-spin" />
          </span>
        </Link>
        <Link
          to="#"
          className="sidebar-close-trigger"
          onClick={() => setSettingToggle(!settingToggle)}
        >
          <span>
            <i className="la-times las"></i>
          </span>
        </Link>
        <div className="sidebar-right-inner">
          <h4>Pick your Charts</h4>
          <Tab.Container defaultActiveKey="Theme">
            <div className="card-tabs">
              <Nav as="ul" className="nav nav-tabs" role="tablist">
                <Nav.Item as="li" className="nav-item">
                  <Nav.Link
                    as="a"
                    className="nav-link c-pointer"
                    data-toggle="tab"
                    eventKey="Theme"
                    role="tab"
                  >
                    Dashboard Pick
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div style={{ backgroundColor: "white", position: "relative", overflow: "scroll" }}>
              <Tab.Content className="">
                <Tab.Pane className="tab-pane fade" eventKey="Theme" style={{ position: "absolute" }}>
                  {WIDGETS.map((widget) => renderComponentCheckbox(widget))}
                </Tab.Pane>
              </Tab.Content>
            </div>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};

export default CompSetting;
