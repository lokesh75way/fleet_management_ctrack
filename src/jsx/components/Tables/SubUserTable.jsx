import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from '../Modal/DeleteModal';
import { IMAGES } from "../../constant/theme";
import { usePermissions } from "../../../context/PermissionContext";

const SubUserTable = ({tableData, onConfirmDelete, editDrawerOpen}) => {
  const {can} = usePermissions()
  const editPermission = can('subUser','modify')
  const deletePermission = can('subUser','delete')
  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{item.id}</span>
          </td>
          <td>
            <span className="text-primary">{item.userName}</span>
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
          {(editPermission || deletePermission) &&<td>
            <span className="d-flex justify-content-center">
              { editPermission&&<span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item.id)}
              >
                <FaEdit
                  style={{
                    color: "green",
                    fontSize: "1.2rem",
                  }}
                />
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

export default SubUserTable;
