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
            <span>{item.id}</span>
          </td>
          <td>
            <div className="products">
              <img
                src={item.image || IMAGES.contact1}
                className="avatar avatar-md"
                alt=""
              />
              <div>
                <h6>{item.userName}</h6>
                <span>Web Designer</span>
              </div>
            </div>
          </td>

          <td>
            <span>{item.mobileNumber}</span>
          </td>
          <td>
            <span className="text-primary">{item.email}</span>
          </td>
          <td>
            <span>{item.country}</span>
          </td>
          <td>
            <span className="d-flex justify-content-center">
              <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item.id)}
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
                id={item.id}
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