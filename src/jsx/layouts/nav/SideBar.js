/// Menu
import React, { useContext, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Collapse from "react-bootstrap/Collapse";

/// Link
import { Link } from "react-router-dom";

import { AdminMenuList } from "./AdminMenu";
import { CompanyMenuList } from "./CompanyMenu";
import { BusinessGroupMenuList } from "./BusinessGroupMenu";
import { SubCompanyMenuList } from "./SubCompanyMenu";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

import {useTranslation} from 'react-i18next'
import { usePermissions } from "../../../context/PermissionContext";
import { CgChevronDoubleLeftR } from "react-icons/cg";

const useBaseUrl = () => {

  const location = useLocation();
  const { pathname } = location;
  const segments = pathname.split("/");
  const {can} = usePermissions()
  const baseUrl = segments.slice(0, 2).join("/");

  return baseUrl;
};

const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "Dashboard",
  activeSubmenu: "",
};

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);

  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let filteredAdminMenuList = [];
  const role = userDetails?.user?.role;
  const type = userDetails?.user?.type;
  if (userDetails && userDetails.permissions?.[0] && role === 'USER') {
    
    const modulePermissions = userDetails.permissions?.[0].permission;
    const viewableModules = modulePermissions.filter(item => item.view === true).map(item => ({
      moduleId: item.moduleId._id,
      title: item.moduleId.title,
      basePath: item.moduleId.basePath
    }));
    const viewmoduleTitles = viewableModules.map(item => item.title);
    filteredAdminMenuList = AdminMenuList.filter(item => viewmoduleTitles.includes(item.title));
  }
  let MenuList;
  if(userDetails){
    switch (role) {
      case "COMPANY":
        MenuList = CompanyMenuList;
        break;
      case "SUPER_ADMIN":
        MenuList = AdminMenuList;
        break;
      case "BUSINESS_GROUP":
        MenuList = BusinessGroupMenuList;
        break;

      default:
        MenuList = [];
    }
  }

  const [state, setState] = useReducer(reducer, initialState);
  useEffect(() => {}, []);
  //For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true);
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y;
      if (isShow !== hideOnScroll) setHideOnScroll(isShow);
    },
    [hideOnScroll]
  );

  const handleMenuActive = (status) => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  };
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };
  // Menu dropdown list End

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  useEffect(() => {
    filteredAdminMenuList.forEach((data) => {
      data.content?.forEach((item) => {
        if (path === item.to) {
          setState({ active: data.title });
        }
        item.content?.forEach((ele) => {
          if (path === ele.to) {
            setState({ activeSubmenu: item.title, active: data.title });
          }
        });
      });
    });
  }, [path]);

  const handleNonContentMenu = (status) => {
    // setState({active:""});
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }
  };

  const url = useBaseUrl();
  const { pathname: url2 } = useLocation();

  const {t} = useTranslation();
  const menuListToMap = role === 'USER' ? filteredAdminMenuList : MenuList;
  return (
    <div
      className={`deznav  border-right ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? hideOnScroll > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <div className="deznav-scroll" >
        <ul className="metismenu" id="menu" style={{ minHeight: "85vh" }}>
          {menuListToMap.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass !== "menu-title") {
              return (
                <li
                  className={` ${
                    url === data.to || url === "dashboard" + data?.to?.split("/")[0] || data.url === url
                      ? "mm-active text-primary"
                      : ""
                  }`}
                  key={index}
                >
                 
                  {data.content && data.content.length > 0 ? (
                    <>
                      <Link
                        to={data.to}
                        className={`has-arrow  `}
                        onClick={() => {
                          handleMenuActive(data.title);
                        }}
                      >
                        <div className="menu-icon">{data.iconStyle}</div>{" "}
                        <span className="nav-text">
                          {t(data.title)}
                          {data.update && data.update.length > 0 ? (
                            <span className="badge badge-xs badge-danger ms-2">
                              {data.update}
                            </span>
                          ) : (
                            ""
                          )}
                        </span>
                      </Link>
                      <Collapse in={state.active === data.title ? true : false}>
                        <ul
                          className={`${
                            menuClass === "mm-collapse" ? "mm-show" : ""
                          }`}
                        >
                          {data.content &&
                            data.content.map((data, index) => {
                              return (
                                <li
                                  key={index}
                                  className={`${
                                    data.to === url || data.to === url2
                                      ? "mm-active text-primary"
                                      : ""
                                  }`}
                                >
                                  {data.content && data.content.length > 0 ? (
                                    <>
                                      <Link
                                        to={data.to}
                                        className={
                                          data.hasMenu ? "has-arrow" : ""
                                        }
                                        onClick={() => {
                                          handleSubmenuActive(data.title);
                                        }}
                                      >
                                        {t(data.title)}
                                      </Link>
                                      <Collapse
                                        in={
                                          state.activeSubmenu === data.title
                                            ? true
                                            : false
                                        }
                                      >
                                        <ul
                                          className={`${
                                            menuClass === "mm-collapse"
                                              ? "mm-show"
                                              : ""
                                          }`}
                                        >
                                          {data.content &&
                                            data.content.map((data, ind) => {
                                              return (
                                                <li key={ind}>
                                                  <Link
                                                    className={`${
                                                      url === data.to ||
                                                      url2 === data.to
                                                        ? "mm-active"
                                                        : ""
                                                    }`}
                                                    to={data.to}
                                                  >
                                                    {t(data.title)}
                                                  </Link>
                                                </li>
                                              );
                                            })}
                                        </ul>
                                      </Collapse>
                                    </>
                                  ) : (
                                    <Link
                                      to={data.to}
                                      className={`${
                                        data.to === url ||
                                        data.to === url2 ||
                                       url2.substring(
                                          0,
                                         url2.lastIndexOf("/")
                                        ) === data.to
                                          ? "mm-active"
                                          : ""
                                      }`}
                                    >
                                      {t(data.title)}
                                    </Link>
                                  )}
                                </li>
                              );
                            })}
                        </ul>
                      </Collapse>
                    </>
                  ) : (
                    <Link
                      to={data.to}
                      onClick={() => handleNonContentMenu(data.title)}
                    >
                      <div className="menu-icon">{data.iconStyle}</div>{" "}
                      <span className="nav-text">{t(data.title)}</span>
                      {data.update && data.update.length > 0 ? (
                        <span className="badge badge-xs badge-danger ms-2">
                          {data.update}
                        </span>
                      ) : (
                        ""
                      )}
                    </Link>
                  )}
                </li>
              );
            }
          })}
        </ul>
        <div className="help-desk">
          <Link to={"/contactUs"} className="btn btn-primary">
            {t('helpDesk')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
