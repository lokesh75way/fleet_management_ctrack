import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import usePermissions from "@/hooks/usePermissions";
import DeleteModal from "@/components/Modal/DeleteModal";

const TemplateTable = ({
  onConfirmDelete,
  currentPage,
  itemsPerPage,
  tableData,
}) => {
  const { can } = usePermissions();
  const editPermission = can("groups", "modify");
  const deletePermission = can("groups", "delete");

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <div className="products d-flex justify-content-center">
              <h6>{startIndex + index}</h6>
            </div>
          </td>
          <td>
            <div className="products d-flex justify-content-center">
              <h6>{item.name}</h6>
            </div>
          </td>
          {(editPermission || deletePermission) && (
            <td>
              <span className="d-flex justify-content-center">
                {editPermission && (
                  <Link to={`/groups/edit/${item?._id}`}>
                    <span className="cursor-pointer">
                      <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
                    </span>
                  </Link>
                )}
                {deletePermission && (
                  <DeleteModal
                    className="cursor-pointer "
                    onConfirmDelete={onConfirmDelete}
                    id={item?._id}
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

export default TemplateTable;
