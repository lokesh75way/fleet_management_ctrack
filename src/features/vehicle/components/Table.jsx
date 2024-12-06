import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import DeleteModal from "@/components/Modal/DeleteModal";
import usePermissions from "@/hooks/usePermissions";

const VehicleTable = ({ tableData, onConfirmDelete }) => {
  const { can } = usePermissions();
  const editPermission = can("vehicle", "modify");
  const deletePermission = can("vehicle", "delete");

  return tableData?.map((item) => (
    <tr key={item.id}>
      <td>
        <div className="products">
          <div>
            <h6>{item.vehicleName}</h6>
          </div>
        </div>
      </td>
      <td>
        <span>{item.plateNumber}</span>
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
      <td>
        <span>{item.weightCapacity}</span>
      </td>
      {(deletePermission || editPermission) && (
        <td>
          <span className="d-flex justify-content-center">
            {editPermission && (
              <Link to={`/vehicle/edit/${item?._id}`}>
                <span className="cursor-pointer">
                  <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
                </span>
              </Link>
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
