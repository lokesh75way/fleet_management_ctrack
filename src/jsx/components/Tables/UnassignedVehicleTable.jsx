import usePermissions from "@/hooks/usePermissions";
import React from "react";
import { FaEdit } from "react-icons/fa";

const UnassignedVehicleTable = ({ tableData, editDrawerOpen, currentPage }) => {
  const { can } = usePermissions();
  const editPermission = can("vehicle", "modify");
  if (tableData.length === 0) {
    return;
  }

  const startIndex = (currentPage - 1) * 10 + 1;

  const getVehicleStatus = (status) => {
    if (status === true) {
      return "ASSIGNED";
    }
    return "UNASSIGNED";
  };

  return tableData?.map((item, index) => (
    <tr key={item.id}>
      <td>
        <span>{startIndex + index}</span>
      </td>
      <td>
        <div className="products">
          <div>
            <h6>{item.Vehicle_Name}</h6>
          </div>
        </div>
      </td>
      <td>
        <span>{item.DeviceModel}</span>
      </td>
      <td>
        <span>{item.Vehicletype}</span>
      </td>
      <td>
        <span className="text-primary">{item?.imeiNumber}</span>
      </td>
      <td>
        <span>{item.Vehicle_No}</span>
      </td>
      <td>
        <span
          className={`badge light border-0 ${
            item?.isVehicleAssigned ? "badge-success" : "badge-danger"
          } d-inline-block text-center`}
          style={{ width: "7rem" }}
        >
          {getVehicleStatus(item?.isVehicleAssigned)}
        </span>
      </td>

      {editPermission && (
        <td>
          <span className="d-flex justify-content-center">
            {editPermission && item?.isVehicleAssigned === false && (
              <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item)}
              >
                <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
              </span>
            )}
          </span>
        </td>
      )}
    </tr>
  ));
};

export default UnassignedVehicleTable;
