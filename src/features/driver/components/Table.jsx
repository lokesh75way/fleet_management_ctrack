import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import DeleteModal from "@/components/Modal/DeleteModal";
import usePermissions from "@/hooks/usePermissions";

const DriverTable = ({
  tableData,
  currentPage,
  itemsPerPage,
  onConfirmDelete,
}) => {
  const { can } = usePermissions();
  const editPermission = can("driver", "modify");
  const deletePermission = can("driver", "delete");
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  return (
    <>
      {tableData.map((item, index) => (
        <tr key={item.id}>
          <td>
            <span>{startIndex + index}</span>
          </td>
          <td>
            <div className="products">
              <div>
                <h6>
                  {item.firstName} {item.lastName}
                </h6>
                <span>{item.employeeDesignation}</span>
              </div>
            </div>
          </td>
          <td>
            <span>{item.age}</span>
          </td>
          <td>
            <span>{item.contact1}</span>
          </td>
          <td>
            <span className="text-primary ">{item.drivingExperience}</span>
          </td>
          <td>
            <span>{item.city}</span>
          </td>
          <td>
            <span
              className={`badge light border-0 ${
                item.active ? "badge-success" : "badge-danger"
              } d-inline-block text-center`}
              style={{ width: "5rem" }}
            >
              {item.active ? "Active" : "InActive"}
            </span>
          </td>
          {(deletePermission || editPermission) && (
            <td>
              <span className="d-flex justify-content-center">
                {editPermission && (
                  <Link to={`/driver/edit/${item?._id}`}>
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
      ))}
    </>
  );
};

export default DriverTable;
