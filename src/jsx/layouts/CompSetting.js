import React, { useState, useContext } from "react";
import { Nav, Tab } from "react-bootstrap";
//import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ThemeContext } from "../../context/ThemeContext";

const CompSetting = () => {
  const [settingToggle, setSettingToggle] = useState(false);
  const [demoToggle, setDemoToggle] = useState(false);
  const {
    body,
    sideBarOption,
    layoutOption,
    backgroundOption,
    sidebarposition,
    headerPositions,
    // containerPosition,
    fontFamily,
    changePrimaryColor,
    // changeSecondaryColor,
    changeNavigationHader,
    sideBarStyle,
    changeSideBarStyle,
    changeSideBarPostion,
    sidebarpositions,
    changeHeaderPostion,
    headerposition,
    changeSideBarLayout,
    sidebarLayout,
    colors,
    chnageHaderColor,
    chnageSidebarColor,
    changeBackground,
    background,
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
  } = useContext(ThemeContext);

  // Function to toggle component visibility
  const toggleComponent = (component, value) => {
    switch (component) {
      case "CardWidget":
        setShowCardWidget(value);
        break;
      case "ProjectOverviewTab":
        setShowProjectOverviewTab(value);
        break;
      case "EarningBlog":
        setShowEarningBlog(value);
        break;
      case "ActiveUserMap":
        setShowActiveUserMap(value);
        break;
      case "AllProjectDonutChart":
        setShowAllProjectDonutChart(value);
        break;
      // Add cases for other components
      default:
        break;
    }
  };

  //   Function to render checkboxes and handle visibility toggle
  const renderComponentCheckbox = (componentName) => {
    return (
	<div key={componentName} className="form-check custom-checkbox mb-3">
	<input
	  type="checkbox"
	  className="form-check-input"
	  id="customCheckBox1"
	  checked={eval(`show${componentName}`)}
	  onChange={(e) => toggleComponent(componentName, e.target.checked)}
	/>
	<label
	  className="form-check-label fs-18"
	  htmlFor="customCheckBox1"
	>
	  {componentName}
	</label>
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
            <Tab.Content className="">
              <Tab.Pane className="tab-pane fade " eventKey="Theme">
                {[
                  "CardWidget",
                  "ProjectOverviewTab",
                  "EarningBlog",
                  "ActiveUserMap",
                  "AllProjectDonutChart",
                ].map((componentName) =>
                  renderComponentCheckbox(componentName)
                )}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};

export default CompSetting;
