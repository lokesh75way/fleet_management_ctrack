import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from '../Modal/DeleteModal';
import { IMAGES } from "../../constant/theme";

const SubUserTable = ({tableData, onConfirmDelete, editDrawerOpen}) => {
  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{item._id}</span>
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
          <td>
            <span className="d-flex justify-content-center">
              <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item._id)}
              >
                <FaEdit
                  style={{
                    color: "green",
                    fontSize: "1.2rem",
                  }}
                />
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

export default SubUserTable;
