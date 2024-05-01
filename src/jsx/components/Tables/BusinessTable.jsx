import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../Modal/DeleteModal";
import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../../constant/theme";
import useStorage from "../../../hooks/useStorage";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { usePermissions } from "../../../context/PermissionContext";
import { getCompany } from "../../../services/api/CompanyServices";

const BusinessTable = ({
  tableData,
  currentPage,
  itemsPerPage,
  onConfirmDelete,
  editDrawerOpen,
}) => {
  const { can } = usePermissions();
  const [companyCount, setCompanyCount] = useState([]);
  const editPermission = can("business", "modify");
  const deletePermission = can("business", "delete");
  const { isRtl } = useContext(ThemeContext);


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
                <h6>{item.businessGroupId?.groupName}</h6>
              </div>
            </div>
          </td>

          <td>
            <span>{item.userInfo[0]?.mobileNumber}</span>
          </td>
          <td>
            <span>{item.email}</span>
          </td>
          <td>
            <span>{item.country}</span>
          </td>
          <td>
            <Link
              to={`/company/${item._id}`}
              className="text-primary badge light border-0 badge-count"
            >
              {item.companyCount}
            </Link>
          </td>

          {(deletePermission || editPermission) && (
            <td>
              <span className="d-flex justify-content-center">
                {editPermission && (
                  <span
                    className="cursor-pointer"
                    onClick={() => editDrawerOpen(item._id)}
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

export default BusinessTable;
