import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import usePermissions from "@/hooks/usePermissions";
import { Link } from "react-router-dom";
import DeleteModal from "@/components/Modal/DeleteModal";

const TechnicianTable = ({
  tableData,
  currentPage,
  itemsPerPage,
  onConfirmDelete,
}) => {
  const { can } = usePermissions();
  const editPermission = can("technician", "modify");
  const deletePermission = can("technician", "delete");
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{startIndex + index}</span>
          </td>
          <td>
            <div className="products">
              <div>
                <h6>{item.firstName + item.lastName}</h6>
              </div>
            </div>
          </td>

          <td>
            <span className="text-primary">{item.email}</span>
          </td>
          <td>
            <span>{item.mobileNumber}</span>
          </td>

          <td>
            <span>{item.address.country}</span>
          </td>
          <td>
            <span>{item.technicianNo}</span>
          </td>
          {(editPermission || deletePermission) && (
            <td>
              <span className="d-flex justify-content-center">
                {editPermission && (
                  <Link to={`/technician/edit/${item?._id}`}>
                    <span className="cursor-pointer">
                      <FaEdit
                        style={{
                          color: "green",
                          fontSize: "1.2rem",
                        }}
                      />
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

export default TechnicianTable;
