import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import DeleteModal from "@/components/Modal/DeleteModal";
import usePermissions from "@/hooks/usePermissions";

const UserTable = ({
  tableData,
  currentPage,
  itemsPerPage,
  onConfirmDelete,
}) => {
  const { can } = usePermissions();
  const editPermission = can("subUser", "modify");
  const deletePermission = can("subUser", "delete");
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{startIndex + index}</span>
          </td>
          <td>
            <span className="text-primary">{item.userName}</span>
          </td>

          <td>
            <span>{item.mobileNumber}</span>
          </td>
          <td>
            <span>{item.email}</span>
          </td>
          <td>
            <span>{item.country}</span>
          </td>
          {(editPermission || deletePermission) && (
            <td>
              <span className="d-flex justify-content-center">
                {editPermission && (
                  <Link to={`/user/edit/${item?._id}`}>
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

export default UserTable;
