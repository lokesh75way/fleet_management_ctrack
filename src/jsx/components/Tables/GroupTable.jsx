import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { useNavigate } from "react-router-dom";
import usePermissions from "@/hooks/usePermissions";

const GroupTable = ({
  onConfirmDelete,
  currentPage,
  itemsPerPage,
  tableData,
  setIsEditTrue,
  isEditTrue,
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { can } = usePermissions();
  const canModify = can("groups", "modify");
  const canDelete = can("groups", "delete");
  const handleClick = (index, id) => {
    setIsEditTrue(index);
    const props = {
      isEditTrue: isEditTrue,
      setIsEditTrue: setIsEditTrue,
    };
    // console.log(props)
    navigate(`permission/${id}`, { state: JSON.stringify(props) });
  };

  useEffect(() => {
    setData(tableData.reverse());
  }, [tableData]);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  return (
    <>
      {data.map((item, index) => (
        <tr key={index}>
          <td>
            <div className="products d-flex justify-content-center">
              <h6>{startIndex + index}</h6>
            </div>
          </td>
          <td>
            <div className="products d-flex justify-content-center">
              <h6>{item.name}</h6>
            </div>
          </td>
          {(canModify || canDelete) && (
            <td>
              <span className="d-flex justify-content-center">
                {canModify && (
                  <span
                    className="cursor-pointer"
                    onClick={() => handleClick(index, item._id)}
                  >
                    <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
                  </span>
                )}
                {canDelete && (
                  <DeleteModal
                    className="cursor-pointer "
                    onConfirmDelete={() => onConfirmDelete(index, item._id)}
                    id={item.id}
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

export default GroupTable;
