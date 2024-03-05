import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from '../Modal/DeleteModal';

const DriverTable = ({tableData, onConfirmDelete, editDrawerOpen}) => {
    return (
        <>
            {tableData.map((item, index) => (
                <tr key={index}>
                    <td><span>{item.id}</span></td>
                    <td>
                        <div className="products">
                            <img src={item.image} className="avatar avatar-md" alt="" />
                            <div>
                                <h6>{item.title}</h6>
                                <span>Web Designer</span>
                            </div>
                        </div>
                    </td>
                    <td><span>{item.age}</span></td>
                    <td>
                        <span>{item.contact}</span>
                    </td>
                    <td>
                        <span>{item.gender}</span>
                    </td>
                    <td><span className="text-primary ">{item.drivingExperience}</span></td>
                    <td>
                        <span>{item.location}</span>
                    </td>
                    <td>
                    <span className={`badge light border-0 ${item.status === "Active" ? 'badge-success' : 'badge-danger'} d-inline-block text-center`} style={{ width: '5rem' }}>{item.status}</span>                    
                    </td>
                    <td>
                        <span className='d-flex justify-content-center'>
                            <span className='cursor-pointer' onClick={() => editDrawerOpen(item.id)} ><FaEdit style={{ color: "green", fontSize: "1.2rem" }} /></span>
                            <DeleteModal className='cursor-pointer ' onConfirmDelete={onConfirmDelete} id={item.id} ><MdDelete style={{ color: "red", fontSize: "1.2rem" }} /></DeleteModal>

                        </span>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default DriverTable