import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../../../components/Modal/DeleteModal";

const TechnicianTaskTable = ({
  tableData,
  onConfirmDelete,
  editDrawerOpen,
  currentPage,
  itemsPerPage,
}) => {
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
          <td>
            <span className="d-flex justify-content-center">
              <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item?._id)}
              >
                <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
              </span>
              <DeleteModal
                className="cursor-pointer "
                onConfirmDelete={onConfirmDelete}
                id={item._id}
              >
                <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
              </DeleteModal>
            </span>
          </td>
        </tr>
      ))}
    </>
  );
};
// onClick={() => editDrawerOpen(item.id)}
export default TechnicianTaskTable;
