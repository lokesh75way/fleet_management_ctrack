import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../Modal/DeleteModal";
import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../../constant/theme";
import useStorage from "../../../hooks/useStorage";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

const BusinessTable = ({ tableData, onConfirmDelete, editDrawerOpen }) => {
  const {isRtl} = useContext(ThemeContext)
  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index} >
          <td>
            <span>{index+1}</span>
          </td>
          <td>
            <div className="products">
             
              <div>
                <h6>{item.businessGroupId?.groupName}</h6>
              </div>
            </div>
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
            <Link
              to={`/company/${item.id}`}
              className="text-primary badge light border-0 badge-count"
            >

            </Link>
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

export default BusinessTable;
