import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../Modal/DeleteModal";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

const ClassifyTripTable = ({
  tableData,
  onConfirmDelete,
  editDrawerOpen,
  active,
}) => {
  console.log("Table data ", tableData);
  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{item.tripId}</span>
          </td>
          <td>
            <span>{item.startTime}</span>
          </td>
          <td>
            <span>{item.startLocation}</span>
          </td>
          <td>
            <span>{item.reachTime}</span>
          </td>
          <td>
            <span>{item.reachLocation}</span>
          </td>
          <td>
            <span className="text-primary">{item.distance}</span>
          </td>
          <td>
            <span>{item.fuelConsumption}</span>
          </td>
          <td>
            <span>{item.driver}</span>
          </td>

          <td>
            <span className="d-flex justify-content-center">
              {active && (
                <span className="cursor-pointer" title="tracking">
                  <Link to={`/vehicle-tracking/${item.tripId}`}>
                    <FaLocationDot
                      style={{ color: "#ff9f00", fontSize: "18px" }}
                    />
                  </Link>
                </span>
              )}
              <span
                className="cursor-pointer"
                style={{ marginRight: "3px", marginLeft: "7px" }}
              >
                <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
              </span>
              <DeleteModal
                className="cursor-pointer "
                onConfirmDelete={onConfirmDelete}
                id={item.tripId}
              >
                <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
              </DeleteModal>
            </span>
          </td>
        </tr>
      ))}
    </>
  );
};
// onClick={() => editDrawerOpen(item.id)}
export default ClassifyTripTable;
