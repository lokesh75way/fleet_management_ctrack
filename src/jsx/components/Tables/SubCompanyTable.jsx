import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { Link } from "react-router-dom";
import { IMAGES, SVGICON } from "../../constant/theme";
import useStorage from "../../../hooks/useStorage";
import { usePermissions } from "../../../context/PermissionContext";

const SubCompanyTable = ({
  onConfirmDelete,
  params,
  currentPage,
  itemsPerPage,
  tempValue,
  tempValue2,
  tableData,
  editDrawerOpen,
  setDataLength,
}) => {
  let filterData = tableData;
  const { can } = usePermissions();
  const editPermission = can("branch", "modify");
  const deletePermission = can("branch", "delete");
  if (tempValue !== "All Companies") {
    filterData = tableData.filter(
      (item) => item.role === "branch" && item.parentCompany === tempValue
    );
  }
  if (tempValue2 !== "All Branches") {
    filterData = tableData.filter(
      (item) => item.role === "branch" && item.parentBranch === tempValue2
    );
  }
  var branchCount = [];
  for (var i = 0; i < filterData.length; i++) {
    const branchId = filterData[i]._id;
    branchCount[i] = filterData.filter(
      (item) => item?.parentBranchId?._id === branchId
    ).length;
  }
  // setDataLength(filterData.length)
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  return (
    <>
      {filterData.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{startIndex + index}</span>
          </td>
          <td>
            <span className="text-primary">{item.branchName}</span>
          </td>
          {/* <td>
              <span >{item.parentBranchId?.branchName ? item.parentBranchId?.branchName :<span className='ps-4'>-</span> }</span>
            </td> */}
          <td>
            <span>
              {item.companyId?.companyName ? (
                item.companyId?.companyName
              ) : (
                <span className="ps-4">-</span>
              )}
            </span>
          </td>
          <td>
            <span>
              {item.businessGroupId?.groupName ? (
                item.businessGroupId?.groupName
              ) : (
                <span className="ps-4">-</span>
              )}
            </span>
          </td>
          {/* <td>
              <span>{item.mobileNumber}</span>
            </td> */}
          <td>
            <span>{item.city}</span>
          </td>

          <td>
            <Link
              to={`/branch/bid/${item.id}`}
              className="text-primary badge light border-0 badge-count"
            >
              {branchCount[index]}
            </Link>
          </td>
          {(editPermission || deletePermission) && (
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

export default SubCompanyTable;
