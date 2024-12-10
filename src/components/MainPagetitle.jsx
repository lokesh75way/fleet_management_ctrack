import React from "react";
import { Link } from "react-router-dom";

import { SVGICON } from "../jsx/constant/theme";

const MainPagetitle = ({ pageTitle, parentTitle, mainTitle, children }) => {
  const redirectTo = {
    Home: "/dashboard",
    User: "/user",
    Company: "/company",
    "Business Group": "/business",
    Branch: "/branch",
    "Sub User": "/user",
    "Feature Templates": "/groups",
    Driver: "/driver",
    Technician: "/technician/details",
    Dashboard: "/dashboard",
    Expense: "/settings/expense",
  };

  return (
    <>
      <div className="page-titles d-flex justify-content-between align-items-center">
        <div>
          <ol className="breadcrumb">
            <li>
              <h5 className="bc-title">{mainTitle}</h5>
            </li>
            <li className="breadcrumb-item">
              <Link to={redirectTo[parentTitle] ? redirectTo[parentTitle] : ""}>
                {SVGICON.HomeSvg} {parentTitle}
              </Link>
            </li>
            <li className="breadcrumb-item active">
              <Link to={"#"}>/ {pageTitle}</Link>
            </li>
          </ol>
        </div>
        <div className="d-flex align-items-center">{children}</div>
      </div>
    </>
  );
};

export default MainPagetitle;
