import React, { useEffect } from "react";


const ClassificationReport = ({
  tableData,
}) => {
  console.log(tableData)
  return (
    <>
      {tableData.map((item, index) => (
        <tr key={item.id}>
          <td>
            <span>{item.id}</span>
          </td>
          <td>
            <div className="products">
              <div>
                <h6>
                  {item.firstName} {item.lastName}
                </h6>
                <span>{item.employeeDesignation}</span>
              </div>
            </div>
          </td>
          <td>
            <span>{item.activeTrips}</span>
          </td>
          <td>
            <span>{item.plannedTrips}</span>
          </td>
          <td>
            <span>{item.completedTrips}</span>
          </td>
          <td>
            <span>{item.totalTrips}</span>
          </td>
          <td>
            <span>{item.totalDuration}hr</span>
          </td>
          <td>
            <span>{item.totalDistance}km</span>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ClassificationReport;
