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

  const editPermission = true
  const deletePermission = true
  var filterData = tableData;
  console.log(tableData)
 
  // setDataLength(filterData?.length)
  return (
    <>
      {filterData.map((item, index) => {
        return <tr key={index}>
          {/* <td>
            <span>{item.id}</span>
          </td> */}
          <td>
            <span className="text-primary">{item?.companyId?.companyName}</span>
          </td>
          <td>
            <div className="products">
              <div>
                <h6>{item?.companyId?.businessGroupId?.groupName}</h6>
              </div>
            </div>
          </td>
          {/* <td>
            <span>{item.mobileNumber}</span>
          </td> */}
          <td>
            <span>{item.country}</span>
          </td>
          <td>
            <span>{item?.email}</span>
          </td>
          <td>
            <Link
              to={`/branch/cid/${item?.companyId?.id}`}
              className="text-primary badge light border-0 badge-count"
            >
              {getBranch(item?.companyId?.userName)}
            </Link>
          </td>
          <td>
            <span>{item?.companyId?.zipCode}</span>
          </td>
          {(editPermission || deletePermission) && <td>
            <span className="d-flex justify-content-center">
              {editPermission && <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item?._id)}
              >
                <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
              </span>}
              {deletePermission && <DeleteModal
                className="cursor-pointer "
                onConfirmDelete={onConfirmDelete}
                id={item?._id}
              >
                <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
              </DeleteModal>}
            </span>
          </td>}
        </tr>
      })}
    </>
  );
};

export default CompanyTable;
