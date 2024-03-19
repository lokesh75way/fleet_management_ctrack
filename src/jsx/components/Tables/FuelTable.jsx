import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from '../Modal/DeleteModal';

const FuelTable = ({tableData, onConfirmDelete, editDrawerOpen}) => {
    console.log(tableData)
    return (
        <>
            {tableData?.map((item, index) => (
                <tr key={item.id}>
                    <td><span>{item.id}</span></td>
                    <td>
                        <div className="products">
                            <div>
                                <h6>{item.vehicleName}</h6>
                            </div>
                        </div>
                    </td>
                    <td><span>{item.fuelConsumed} L</span></td>
                    <td>
                        <span>{item.mileage} kpl</span>
                    </td>
                    <td><span className="text-primary ">{item.drain ? 'True' : 'False'}</span></td>
                    <td>
                        <span>{item.createdDate}</span>
                    </td>
                    <td>
                        <span>{item.maxStoppage} min</span>
                    </td>
                    <td>
                        <span className='d-flex justify-content-center'>
                        {item.distance} km
                        </span>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default FuelTable