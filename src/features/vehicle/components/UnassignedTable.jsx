import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import usePermissions from "@/hooks/usePermissions";

const UnassignedTable = ({ tableData, currentPage }) => {
  const { can } = usePermissions();
  const editPermission = can("vehicle", "modify");
  const startIndex = (currentPage - 1) * 10 + 1;

  const getVehicleStatus = (status) => {
    if (status === true) {
      return "ASSIGNED";
    }
    return "UNASSIGNED";
  };

  return tableData?.map((item, index) => (
    <tr key={item._id}>
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
              <Link to={`/vehicle/create?imei=${item.imeiNumber}&vehicle_no=${item.Vehicle_No}`}>
                <span className="cursor-pointer">
                  <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
                </span>
              </Link>
            )}
          </span>
        </td>
      )}
    </tr>
  ));
};

export default UnassignedTable;
