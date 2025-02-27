import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../../../components/Modal/DeleteModal";

const GeofenceTable = ({
  tableData,
  currentPage,
  itemsPerPage,
  onConfirmDelete,
  editDrawerOpen,
  page,
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
            <h6>{item.name}</h6>
          </td>
          <td>
            <span>{item.category}</span>
          </td>
          <td>
            <span>{item.contactNumber}</span>
          </td>
          <td>
            <span>{item.address}</span>
          </td>
          <td>
            <span>{item.description}</span>
          </td>
          <td>
            <span>{item.geofenceAccess}</span>
          </td>
          <td>
            <span className="d-flex justify-content-center">
              <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item._id)}
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

export default GeofenceTable;
