import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import DeleteModal from '../Modal/DeleteModal';

const ExpenseTable = ({tableData, onConfirmDelete, editDrawerOpen}) => {
    return (
        <>
            {tableData.map((item, index) => (
                <tr key={index}>
                    <td><span>{item.id}</span></td>
                    <td>
                        <div className="products">
                            <img src={item.image} className="avatar avatar-md" alt="" />
                            <div>
                                <h6>{item.vehicle}</h6>
                                <span>Web Designer</span>
                            </div>
                        </div>
                    </td>
                    <td><span>{item.expenseDate}</span></td>
                    <td>
                        <span>{item.amount}</span>
                    </td>
                    <td>
                        <span>{item.description}</span>
                    </td>
                    <td>
                        <span className='d-flex justify-content-center'>
                            <span onClick={()=>editDrawerOpen(item.id)} className='cursor-pointer' ><FaEdit style={{ color: "green", fontSize: "1.2rem" }} /></span>
                            <DeleteModal className='cursor-pointer ' onConfirmDelete={onConfirmDelete} id={item.id} ><MdDelete style={{ color: "red", fontSize: "1.2rem" }} /></DeleteModal>

                        </span>
                    </td>
                </tr>
            ))}
        </>
    )
}
// onClick={() => editDrawerOpen(item.id)}
export default ExpenseTable