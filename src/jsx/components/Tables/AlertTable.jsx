import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../../../components/Modal/DeleteModal";

const AlertTable = ({ tableData, onConfirmDelete, editDrawerOpen }) => {
  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{item.basedOn}</span>
          </td>
          <td>
            <div className="products">
              <h6>{item.alertName}</h6>
            </div>
          </td>
          <td>
            <span>{item.alertType}</span>
          </td>
          <td>
            <span>
              {new Date(item.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </td>
          <td>
            <span>{item.notification}</span>
          </td>
          <td>
            <span>{item.reason}</span>
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
export default AlertTable;
