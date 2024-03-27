import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../Modal/DeleteModal";
import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../../constant/theme";
import useStorage from "../../../hooks/useStorage";
import { usePermissions } from "../../../context/PermissionContext";

const CompanyTable = ({
  tableData,
  tempValue,
  onConfirmDelete,
  editDrawerOpen,
  setDataLength
}) => {
  const { getBranch } = useStorage();
  const { can } = usePermissions()
  var filterData = tableData;
  if (tempValue !== "All") {
    filterData = tableData.filter(
      (item) => item.role === "company" && item.parent === tempValue
    );
  }
  setDataLength(filterData.length)
  return (
    <>
      {filterData.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{item.id}</span>
          </td>
          <td>
            <span className="text-primary">{item.userName}</span>
          </td>
          <td>
            <div className="products">
              <div>
                <h6>{item.parent}</h6>
              </div>
            </div>
          </td>
          <td>
            <span>{item.mobileNumber}</span>
          </td>
          <td>
            <span>{item.country}</span>
          </td>
          <td>
            <span>{item.email}</span>
          </td>
          <td>
            <Link
              to={`/branch/cid/${item.id}`}
              className="text-primary badge light border-0 badge-count"
            >
              {getBranch(item.userName)}
            </Link>
          </td>
          <td>
            <span>{item.zipCode}</span>
          </td>
          {can('comapny', 'edit') && can('comapny', 'delete') && <td>
            <span className="d-flex justify-content-center">
              {can('comapny', 'edit') && <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item.id)}
              >
                <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
              </span>}
              {can('company','delete') && <DeleteModal
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

export default CompanyTable;
