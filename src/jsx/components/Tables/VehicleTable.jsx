import React from "react";
import DeleteModal from "../Modal/DeleteModal";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCar } from "react-icons/fa6";
import useStorage from "../../../hooks/useStorage"; 

const VehicleTable = ({ tableData, onConfirmDelete, editDrawerOpen }) => {
  const {getData} = useStorage()
    const filteredItems = getData(tableData);
  return filteredItems.map((item, index) => (
    <tr key={item.id}>
      <td>
        <span className="text-primary">{item.branch}</span>
      </td>
      <td>
        <span>{item.plateNumber}</span>
      </td>
      <td>
        <div className="products">
          {/* <img  className="avatar avatar-md" alt="" /> */}
          <FaCar className="avatar avatar-md p-2" style={{marginRight:".4rem"}}  />
          <div>
            <h6>{item.vehicleName}</h6>
            <span>Car</span>
          </div>
        </div>
      </td>
      <td>
        <span>{item.simNumber}</span>
      </td>
      <td>
        <span>{item.IMEINumber}</span>
      </td>
      <td>
        <span className="text-primary">{item.registrationNumber}</span>
      </td>
      <td>
        <span>{item.DVIRTemplate}</span>
      </td>
      {/* <td>
                <span className={`badge light border-0 ${item.status==="Active" ? 'badge-success' : 'badge-danger'} `}style={{width:"45%"}}>{item.status}</span>
            </td> */}
      <td>
        <span className="d-flex justify-content-center">
          <span
            className="cursor-pointer"
            onClick={() => editDrawerOpen(item.id)}
          >
            <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
          </span>
          <DeleteModal
            className="cursor-pointer "
            onConfirmDelete={onConfirmDelete}
            id={item.id}
          >
            <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
          </DeleteModal>
        </span>
      </td>
    </tr>
  ));
};

export default VehicleTable;
