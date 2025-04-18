import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import DeleteModal from "@/components/Modal/DeleteModal";
import usePermissions from "@/hooks/usePermissions";

const BusinessTable = ({
  tableData,
  currentPage,
  itemsPerPage,
  onConfirmDelete,
}) => {
  const { can } = usePermissions();
  const editPermission = can("business", "modify");
  const deletePermission = can("business", "delete");

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
              to={`/company/gid/${item.businessGroupId?._id}`}
              className="text-primary badge light border-0 badge-count"
            >
              {item.companyCount}
            </Link>
          </td>

          {(deletePermission || editPermission) && (
            <td>
              <span className="d-flex justify-content-center">
                {editPermission && (
                  <Link to={`/business/edit/${item.businessGroupId?._id}`}>
                    <span className="cursor-pointer">
                      <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
                    </span>
                  </Link>
                )}

                {deletePermission && (
                  <DeleteModal
                    className="cursor-pointer "
                    onConfirmDelete={onConfirmDelete}
                    id={item?.businessGroupId?._id}
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
