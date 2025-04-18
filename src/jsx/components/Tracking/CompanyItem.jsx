import React, { useEffect, useState } from "react";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import CheckboxTree from "react-checkbox-tree";
import "@/assets/scss/pages/_driver-tracking.scss";
import { Button } from "react-bootstrap";
const CompanyItem = (props) => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const data = props?.companyVehicle.map((data) => {
      const childNode = data?.vehicles?.map((subItem) => {
        return { label: subItem?.vehicleName, value: subItem?._id };
      });

      return {
        value: data?._id,
        label: data?.companyName,
        children: childNode,
      };
    });
    setNodes([...data]);
  }, [props.companyVehicle]);

  // useEffect(() => {
  //   const data = Object.entries(props.vehicles).map((data) => {
  //     const childNode = data[1].map((data) => {
  //       return { label: data.vehicleName, value: data.id };
  //     });

  //     return { value: data[0], label: data[0], children: childNode };
  //   });
  //   setNodes([...data]);
  // }, [props.vehicles]);

  useEffect(() => {
    let vehicleIds = [];
    const data = nodes?.map((ele) =>
      ele.children?.map((vehicle) => vehicleIds.push(vehicle.value))
    );
    handleCheck(vehicleIds);
  }, [nodes]);

  const handleCheck = (checked) => {
    setChecked(checked);
    props.setVehicleIds(checked);
  };
  const handleExpand = (expanded) => {
    setExpanded(expanded);
  };
  const handleSubmit = () => {
    // TODO Only set vehicleIds here
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
export default CompanyItem;
