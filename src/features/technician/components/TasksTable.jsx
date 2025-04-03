import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import DeleteModal from "@/components/Modal/DeleteModal";
import usePermissions from "@/hooks/usePermissions";

const TasksTable = ({
  tableData,
  onConfirmDelete,
  editDrawerOpen,
  currentPage,
  itemsPerPage,
}) => {
  const { can } = usePermissions();
  const editPermission = can("technician-tasks", "modify");
  const deletePermission = can("technician-tasks", "delete");
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
                <h6>{item.taskName}</h6>
              </div>
            </div>
          </td>
          <td>
            <span>{item.taskCategory}</span>
          </td>
          <td>
            <span>{`${item.technician?.firstName ?? ""} ${
              item.technician?.lastName ?? ""
            }`}</span>
          </td>
          <td>
            <span>{item.serviceLocation}</span>
          </td>
          <td>
            <span className="text-primary">{item.reportingTime}</span>
          </td>
          {(editPermission || deletePermission) && (
            <td>
              <span className="d-flex justify-content-center">
                {editPermission && (
                  <span
                    className="cursor-pointer"
                    onClick={() => editDrawerOpen(item?._id)}
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
      ))}
    </>
  );
};
// onClick={() => editDrawerOpen(item.id)}
export default TasksTable;
