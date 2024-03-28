import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../Modal/DeleteModal";
import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../../constant/theme";
import useStorage from "../../../hooks/useStorage";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { usePermissions } from "../../../context/PermissionContext";

const BusinessTable = ({ tableData, onConfirmDelete, editDrawerOpen }) => {
  const {getCompany} = useStorage()
  const {can} = usePermissions()
  const editPermission = can('business', "modify");
  const deletePermission = can('business', "delete");
  const {isRtl} = useContext(ThemeContext)
  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index} >
          <td>
            <span>{item.id}</span>
          </td>
          <td>
            <div className="products">
              {/* <img
                src={item.image || IMAGES.contact1}
                className="avatar avatar-md"
                alt=""
              /> */}
              <div>
                <h6>{item.userName}</h6>
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
              {getCompany(item.userName)}
            </Link>
          </td>

          {(deletePermission || editPermission) &&<td>
            <span className="d-flex justify-content-center">
              {editPermission && <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item)}
              >
                <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
              </span>}

              {deletePermission && <DeleteModal
                className="cursor-pointer "
                onConfirmDelete={onConfirmDelete}
                id={item.id}
              >
                <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
              </DeleteModal>}
            </span>
          </td>}
        </tr>
      ))}
    </>
  );
};

export default BusinessTable;
