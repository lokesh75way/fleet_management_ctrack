import React, { useState, useContext } from "react";
import { Nav, Tab } from "react-bootstrap";
//import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ThemeContext } from "../../context/ThemeContext";
import useStorage from "../../hooks/useStorage";

const CompSetting = () => {
  const { checkRole } = useStorage();
  const [settingToggle, setSettingToggle] = useState(false);
  const [demoToggle, setDemoToggle] = useState(false);
  const role = checkRole();

  const {
    body,
    sideBarOption,
    layoutOption,
    backgroundOption,
    sidebarposition,
    headerPositions,
    // changeContainerPosition,
    // containerPosition_,
    setDemoTheme,
    showCardWidget,
    showProjectOverviewTab,
    showEarningBlog,
    showActiveUserMap,
    showAllProjectDonutChart,
    setShowCardWidget,
    setShowProjectOverviewTab,
    setShowEarningBlog,
    setShowActiveUserMap,
    setShowAllProjectDonutChart,
    showFaultyDevices,
    setShowFaultyDevices,
    showDevicesVsProject,
    setDevicesVsProject,
    showCategoryWiseStatus,
    setCategoryWiseStatus,
    showWebVsMobileUser,
    setWebVsMobileUser,
    showApplicationUsage,
    setApplicationUsage,
    showModelWiseDevices,
    setModelWiseDevices,
    showObjectType,
    setObjectType,
    showNumberOfTasks,
    setNumberOfTasks,
    showInactiveDevices,
    setInactiveDevices,
    showCategoryWiseTask,
    setCategoryWiseTask,
    showTop5Technician,
    setTop5Technician,
    showFleetStatus,
    setShowFleetStatus,
    showFleetFuel,
    setShowFleetFuel,
    showFleetIdle,
    setShowFleetIdle,
    showDataFrequency,
    setShowDataFrequency,
    showMaintenance,
    setMaintenance,
    showOverSpeed,
    setOverSpeed,
    showStayInZone,
    setStayInZone,
    showFleetUsage,
    setFleetUsage,
  } = useContext(ThemeContext);

  // Function to toggle component visibility
  const toggleComponent = (component, value) => {
    switch (component) {
      case "Card-Widget":
        setShowCardWidget(value);
        break;
      case "Active-User-Map":
        setShowActiveUserMap(value);
        break;
      case "Data-Frequency":
        setShowDataFrequency(value);
        break;
      case "Fleet-Status":
        setShowFleetStatus(value);
        break;
      case "Faulty-Devices":
        setShowFaultyDevices(value);
        break;
      case "Devices-Vs-Project":
        setDevicesVsProject(value);
        break;
      case "Category-Wise-Status":
        setCategoryWiseStatus(value);
        break;
      case "Web-Vs-Mobile-User":
        setWebVsMobileUser(value);
        break;
      case "Application-Usage":
        setApplicationUsage(value);
        break;
      case "Model-Wise-Devices":
        setModelWiseDevices(value);
        break;
      case "Object-Type":
        setObjectType(value);
        break;
      case "Number-Of-Tasks":
        setNumberOfTasks(value);
        break;
      case "Inactive-Devices":
        setInactiveDevices(value);
        break;
      case "Category-Wise-Task":
        setCategoryWiseTask(value);
        break;
      case "Top-5-Technician":
        setTop5Technician(value);
        break;
      case "Fleet-Fuel":
        setShowFleetFuel(value);
        break;
      case "Fleet-Usage":
        setFleetUsage(value);
        break;
      case "Fleet-Idle":
        setShowFleetIdle(value);
        break;
      case "Maintenance":
        setMaintenance(value);
        break;
      case "OverSpeed":
        setOverSpeed(value);
        break;
      case "Stay-In-Zone":
        setStayInZone(value);
        break;

      // Add cases for other components
      default:
        break;
    }
  };

  //   Function to render checkboxes and handle visibility toggle
  const renderComponentCheckbox = (componentName) => {
    const label = componentName.replaceAll("-", " ");
    return (
      <div key={componentName} className="form-check custom-checkbox mb-2">
        <input
          type="checkbox"
          className="form-check-input"
          id="customCheckBox1"
          checked={eval(`show${componentName.replaceAll("-", "")}`)}
          onChange={(e) => toggleComponent(componentName, e.target.checked)}
        />
        <label className="form-check-label fs-18">{label}</label>
      </div>
    );
  };

  return (
    <>
      {role === "admin" ? (
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
              <div className="card-tabs ">
                <Nav as="ul" className="nav nav-tabs" role="tablist">
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link
                      as="a"
                      className="nav-link c-pointer"
                      data-toggle="tab"
                      eventKey="Theme"
                      role="tab"
                    >
                      {" "}
                      Dashboard Pick{" "}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  overflow: "scroll",
                }}
              >
                <Tab.Content className="">
                  <Tab.Pane
                    className="tab-pane fade"
                    eventKey="Theme"
                    style={{ position: "absolute" }}
                  >
                    {[
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
                    ].map((componentName) =>
                      renderComponentCheckbox(componentName)
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
      ) : (
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
              <div className="card-tabs ">
                <Nav as="ul" className="nav nav-tabs" role="tablist">
                  <Nav.Item as="li" className="nav-item">
                    <Nav.Link
                      as="a"
                      className="nav-link c-pointer"
                      data-toggle="tab"
                      eventKey="Theme"
                      role="tab"
                    >
                      {" "}
                      Dashboard Pick{" "}
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  position: "relative",
                  overflow: "scroll",
                }}
              >
                <Tab.Content className="">
                  <Tab.Pane
                    className="tab-pane fade"
                    eventKey="Theme"
                    style={{ position: "absolute" }}
                  >
                    {[
                      "Card-Widget",
                      "Fleet-Usage",
                      "Fleet-Status",
                      "Fleet-Fuel",
                      "Fleet-Idle",
                      "Data-Frequency",
                      "Maintenance",
                      "OverSpeed",
                      "Stay-In-Zone",
                    ].map((componentName) =>
                      renderComponentCheckbox(componentName)
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Tab.Container>
          </div>
        </div>
      )}
    </>
  );
};

export default CompSetting;
