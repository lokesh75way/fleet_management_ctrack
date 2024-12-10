import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../../../components/Modal/DeleteModal";
import dayjs from "dayjs";

const ExpenseTable = ({
  tableData,
  currentPage,
  itemsPerPage,
  onConfirmDelete,
  editDrawerOpen,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  const formatDate = (dateTimeString) => {
    return dayjs(dateTimeString).format("YYYY-MM-DD HH:MM");
  };

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
                <h6>{item.vehicle}</h6>
                <span>Web Designer</span>
              </div>
            </div>
          </td>
          <td>
            <span>{formatDate(item.expenseDate)}</span>
          </td>
          <td>
            <span>{item.amount}</span>
          </td>
          <td>
            <span>{item.description}</span>
          </td>
          <td>
            <span className="d-flex justify-content-center">
              <span
                onClick={() => editDrawerOpen(item._id)}
                className="cursor-pointer"
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
export default ExpenseTable;
