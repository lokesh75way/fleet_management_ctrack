import React, { useEffect, useState } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import "../../../scss/pages/_driver-tracking.scss";
import { Button } from "react-bootstrap";

const DriverItem = (props) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [nodes, setNodes] = useState([]);
  useEffect(() => {
    const data = Object.entries(props.drivers).map((data) => {
      const childNode = data[1].map((data) => {
        return { label: data.firstName, value: data.id };
      });

      return { value: data[0], label: data[0], children: childNode };
    });
    setNodes([...data]);
  }, [props.drivers]);
  const handleCheck = (checked) => {
    setChecked(checked);
  };
  const handleExpand = (expanded) => {
    setExpanded(expanded);
  };
  const handleSubmit = () => {
    const selectedObject = checked.map((data) => JSON.parse(data));
    console.log(selectedObject, "selctedObject");
    props.handleToggleCardPositionHandler();
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
            expandOpen: <i class="fa-solid fa-minus"></i>,
            expandClose: <i class="fa-solid fa-plus"></i>,
            uncheck: (
              <i
                class="fa-regular fa-square"
                style={{
                  fontSize: "16px",
                }}
              ></i>
            ),
            check: (
              <i
                class="fa-solid fa-square-check"
                style={{
                  fontSize: "16px",
                }}
              ></i>
            ),
            halfCheck: (
              <i
                class="fa-regular fa-square-minus"
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
export default DriverItem;
