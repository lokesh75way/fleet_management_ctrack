import React from "react";
import { FaEdit } from "react-icons/fa";
import { usePermissions } from "../../../context/PermissionContext";

const UnassignedVehicleTable = ({ tableData, editDrawerOpen, currentPage }) => {
  const {can} = usePermissions()
  const editPermission = can('vehicle','modify')
  if(tableData.length ===0){
    return;
  }

  const startIndex = (currentPage - 1) * 10 + 1;

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

      {editPermission && <td>
        <span className="d-flex justify-content-center">
          {editPermission && <span
            className="cursor-pointer"
            onClick={() => editDrawerOpen(item)}
          >
            <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
          </span>}
        </span>
      </td>}
    </tr>
  ));
};

export default UnassignedVehicleTable;
