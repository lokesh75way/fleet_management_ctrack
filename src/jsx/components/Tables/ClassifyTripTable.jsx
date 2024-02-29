import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from '../Modal/DeleteModal';

const ClassifyTripTable = ({tableData, onConfirmDelete, editDrawerOpen}) => {
    return (
        <>
            {tableData.map((item, index) => (
                <tr key={index}>
                    <td><span>{item.tripId}</span></td>
                    <td>
                        <span>{item.startTime}</span>                           
                    </td>
                    <td><span>{item.startLocation}</span></td>
                    <td>
                        <span>{item.reachTime}</span>
                    </td>
                    <td>
                        <span>{item.reachLocation}</span>
                    </td>
                    <td><span className="text-primary">{item.distance}</span></td>
                    <td>
                        <span>{item.fuelConsumption}</span>
                    </td>
                    <td>
                        <span>{item.driver}</span>
                    </td>
                   
                    <td>
                        <span className='d-flex justify-content-center'>
                            <span className='cursor-pointer'  ><FaEdit style={{ color: "green", fontSize: "1.2rem" }} /></span>
                            <DeleteModal className='cursor-pointer ' onConfirmDelete={onConfirmDelete} id={item.tripId} ><MdDelete style={{ color: "red", fontSize: "1.2rem" }} /></DeleteModal>

                        </span>
                    </td>
                </tr>
            ))}
        </>
    )
}
// onClick={() => editDrawerOpen(item.id)}
export default ClassifyTripTable