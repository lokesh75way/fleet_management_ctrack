import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../Modal/DeleteModal";

const BillingTable = ({ tableData, onConfirmDelete, editDrawerOpen }) => {
  return (
    <>
      {tableData?.map((item, index) => (
        <tr key={item.id}>
          <td>
            <span>{item.id}</span>
          </td>
          <td>
            <div className="products">
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
            <span>{item.billAmount}</span>
          </td>

          <td>
            <span>{item.paidAmount}</span>
          </td>
          <td>
            <span>{item.createdDate}</span>
          </td>
        </tr>
      ))}
    </>
  );
};

export default BillingTable;
