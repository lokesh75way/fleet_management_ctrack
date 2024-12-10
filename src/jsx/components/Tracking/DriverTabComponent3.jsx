import React, { useState, useEffect } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import "@/assets/scss/pages/_driver-tracking.scss";
import { Button } from "react-bootstrap";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const GeoFenceItem = ({ geoFences, handleToggleCardPositionHandler }) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const data = Object.entries(geoFences).map(([company, fences]) => {
      const childNodes = fences.map((fence) => ({
        label: fence.name,
        value: fence.id,
      }));
      return { value: company, label: company, children: childNodes };
    });
    setNodes(data);
  }, [geoFences]);

  const handleCheck = (checked) => {
    setChecked(checked);
  };

  const handleExpand = (expanded) => {
    setExpanded(expanded);
  };

  const handleSubmit = () => {
    const selectedObject = checked.map((data) => JSON.parse(data));
    handleToggleCardPositionHandler();
  };

  return (
    <>
      <div className="checkboxTree">
        <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={handleCheck}
          onExpand={handleExpand}
          showNodeIcon={false}
          icons={{
            expandOpen: <i className="fa-solid fa-minus"></i>,
            expandClose: <i className="fa-solid fa-plus"></i>,
            uncheck: (
              <i
                className="fa-regular fa-square"
                style={{
                  fontSize: "16px",
                }}
              ></i>
            ),
            check: (
              <i
                className="fa-solid fa-square-check"
                style={{
                  fontSize: "16px",
                }}
              ></i>
            ),
            halfCheck: (
              <i
                className="fa-regular fa-square-minus"
                style={{
                  fontSize: "16px",
                }}
              ></i>
            ),
          }}
        />
      </div>
      <div className="text-center  pt-2 ">
        <Button
          className=" mb-5"
          variant="primary btn-md "
          type="submit"
          onClick={handleSubmit}
        >
          Save Selection
        </Button>
      </div>
    </>
  );
};
export default GeoFenceItem;
