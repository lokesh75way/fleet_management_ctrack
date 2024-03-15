import React, { useState } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import "../../../scss/pages/_driver-tracking.scss";

const CompanyItem = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const nodes = [
    {
      value: "company1@example.com",
      label: "Company 1",
      children: [
        { value: "driver1@example.com", label: "driver 1" },
        { value: "driver2@example.com", label: "driver 2" },
      ],
    },
    {
      value: "company2@example.com",
      label: "Company 2",
      children: [
        { value: "driver3@example.com", label: "driver 1" },
        { value: "driver4@example.com", label: "driver 2" },
      ],
    },
  ];

  const handleCheck = (checked) => {
    setChecked(checked);
  };

  const handleExpand = (expanded) => {
    setExpanded(expanded);
  };

  const customClass = {
    leaf: "custom-leaf-node",
  };

  const handleSubmit = () => {
    // Retrieve the selected values from the checked state
    console.log("Selected values:", checked);
    // You can perform any further processing or submit the selected values as needed
  };

  return (
    <>
      <CheckboxTree
        nodes={nodes}
        checked={checked}
        expanded={expanded}
        onCheck={handleCheck}
        onExpand={handleExpand}
        showNodeIcon={false}
        
        icons={{
          // uncheck: (
          //   <i class="fa-thin fa-square-check"></i>
          // ),
        }}
      />

      {/* <button onClick={handleSubmit}>Submit</button> */}
    </>
  );
};

export default CompanyItem;
