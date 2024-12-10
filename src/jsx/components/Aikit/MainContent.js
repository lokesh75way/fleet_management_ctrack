import React from "react";
import { SVGICON } from "../../../constants/theme";

const MainContent = (props) => {
  return (
    <>
      <div className="alert alert-dismissible ai-header-alert fade show mb-4">
        {props.detail}
        <button type="button" className="btn-close ms-auto">
          {SVGICON.CrossCricle}
        </button>
      </div>
      {props.subtitle && <p>{props.subtitle}</p>}
    </>
  );
};

export default MainContent;
