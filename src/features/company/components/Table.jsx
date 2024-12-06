import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

import DeleteModal from "@/components/Modal/DeleteModal";
import usePermissions from "@/hooks/usePermissions";

const CompanyTable = ({
  tableData,
  currentPage,
  itemsPerPage,
  onConfirmDelete,
}) => {
  const { can } = usePermissions();
  const editPermission = can("company", "modify");
  const deletePermission = can("company", "delete");

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  return (
    <>
      {tableData?.map((item, index) => {
        return (
          <tr key={index}>
            <td>
              <span>{startIndex + index}</span>
            </td>
            <td className="text-center">
              <span className="text-primary">
                {item?.companyId?.companyName}
              </span>
            </td>
            <td>
              <div className="products d-flex justify-content-center">
                <div>
                  <h6>{item?.companyId?.businessGroupId?.groupName}</h6>
                </div>
              </div>
            </td>

            <td className="text-center">
              <span>{item.country}</span>
            </td>
            <td className="text-center">
              <span>{item?.email}</span>
            </td>
            <td className="text-center">
              <Link
                to={`/branch/cid/${item?.companyId?._id}`}
                className="text-primary badge light border-0 badge-count"
              >
                {item?.branchIds?.length}
              </Link>
            </td>
            {/* <td className="text-center">
            <span>{item?.companyId?.zipCode ? item?.companyId?.zipCode : <span className='ps-4'>-</span> }</span>
          </td> */}
            {(editPermission || deletePermission) && (
              <td>
                <span className="d-flex justify-content-center">
                  {editPermission && (
                    <Link to={`/company/edit/${item?.companyId?._id}`}>
                      <span className="cursor-pointer">
                        <FaEdit
                          style={{ color: "green", fontSize: "1.2rem" }}
                        />
                      </span>
                    </Link>
                  )}
                  {deletePermission && (
                    <DeleteModal
                      className="cursor-pointer "
                      onConfirmDelete={onConfirmDelete}
                      id={item?.companyId?._id}
                    >
                      <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
                    </DeleteModal>
                  )}
                </span>
              </td>
            )}
          </tr>
        );
      })}
    </>
  );
};

export default CompanyTable;
