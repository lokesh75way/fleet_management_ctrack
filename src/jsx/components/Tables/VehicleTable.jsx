import React from "react";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import { usePermissions } from "../../../context/PermissionContext";

const VehicleTable = ({ tableData, onConfirmDelete, editDrawerOpen }) => {
  const { can } = usePermissions();
  const editPermission = can("vehicle", "modify");
  const deletePermission = can("vehicle", "delete");
  if (tableData.length === 0) {
    return;
  }
  return tableData?.map((item, index) => (
    <tr key={item.id}>
      <td>
        <div className="products">
          <div>
            <h6>{item.vehicleName}</h6>
          </div>
        </div>
      </td>
      <td>
        <span>{item.registrationNumber}</span>
      </td>
      <td>
        <span className="text-primary">{item?.branchId?.branchName}</span>
      </td>

      <td>
        <span>{item.simNumber}</span>
      </td>
      <td>
        <span>{item.imeiNumber}</span>
      </td>
      <td>
        <span className="text-primary">{item.registrationNumber}</span>
      </td>
      {(deletePermission || editPermission) && (
        <td>
          <span className="d-flex justify-content-center">
            {editPermission && (
              <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item._id)}
              >
                <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
              </span>
            )}
            {deletePermission && (
              <DeleteModal
                className="cursor-pointer "
                onConfirmDelete={onConfirmDelete}
                id={item._id}
              >
                <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
              </DeleteModal>
            )}
          </span>
        </td>
      )}
    </tr>
  ));
};

export default VehicleTable;
