import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import dayjs from "dayjs";


const CustomTooltip = ({ children, tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className="custom-tooltip-container" 
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {showTooltip && (
        <div 
          className="custom-tooltip" 
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '280%',
            transform: 'translateX(-50%)',
            backgroundColor: 'white',
            color: '#333',
            padding: '5px 10px',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            zIndex: 10000,
            whiteSpace: 'nowrap',
            fontSize: '12px',
            border: '1px solid #ddd',
            marginBottom: '3px'
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};


const TruncatedId = ({ id }) => {
  const truncatedId = id.length > 5 ? `${id.substring(0, 5)}...` : id;
  
  return (
    <CustomTooltip tooltipText={id}>
      <span>{truncatedId}</span>
    </CustomTooltip>
  );
};

const ClassifyTripTable = ({
  tableData,
  onConfirmDelete,
  editDrawerOpen,
  active,
  currentPage,
  itemsPerPage,
}) => {
  const formatDate = (dateTimeString) => {
    return dayjs(dateTimeString).format("YYYY-MM-DD HH:MM");
  };
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <TruncatedId id={item._id} />
          </td>
          <td>
            <span>{formatDate(item.startTime)}</span>
          </td>
          <td>
            <span>{item.startLocation}</span>
          </td>
          <td>
            <span>{formatDate(item.reachTime)}</span>
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
            <span>{item.driverName}</span>
          </td>

          <td>
            <span className="d-flex justify-content-center">
              {active && (
                <span className="cursor-pointer" title="tracking">
                  <Link to={`/vehicle/tracking/${item.tripId}`}>
                    <FaLocationDot
                      style={{ color: "#ff9f00", fontSize: "18px" }}
                    />
                  </Link>
                </span>
              )}
              <span
                className="cursor-pointer"
                style={{ marginRight: "3px", marginLeft: "7px" }}
                onClick={() => editDrawerOpen(item._id)}
              >
                <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
              </span>
              <DeleteModal
                className="cursor-pointer "
                onConfirmDelete={onConfirmDelete}
                id={item._id}
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
