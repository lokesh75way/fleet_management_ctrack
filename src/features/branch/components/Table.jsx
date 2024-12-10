import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import DeleteModal from "@/components/Modal/DeleteModal";
import { usePermissions } from "@/context/PermissionContext";

const SubCompanyTable = ({
  onConfirmDelete,
  currentPage,
  itemsPerPage,
  tableData,
}) => {
  const { can } = usePermissions();
  const editPermission = can("branch", "modify");
  const deletePermission = can("branch", "delete");
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  return (
    <>
      {tableData?.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{startIndex + index}</span>
          </td>
          <td>
            <span className="text-primary">{item.branchName}</span>
          </td>
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

          {(editPermission || deletePermission) && (
            <td>
              <span className="d-flex justify-content-center">
                {editPermission && (
                  <Link to={`/branch/edit/${item?._id}`}>
                    <span className="cursor-pointer">
                      <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
                    </span>
                  </Link>
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
