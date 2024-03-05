import React from 'react'
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import DeleteModal from '../Modal/DeleteModal';
import { Link } from 'react-router-dom';

const CompanyTable = ({ tableData,onConfirmDelete,editDrawerOpen }) => {
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
                            </div>
                        </div>
                    </td>
                    <td><span className="text-primary">{item.email}</span></td>
                    <td>
                        <span>{item.contact}</span>
                    </td>
                    <td>
                        <span>{item.usergroup}</span>
                    </td>
                    <td>
                        <span>{item.location}</span>
                    </td>
                    
                    <td>
                        <span className={`badge light border-0 ${item.status === "Active" ? 'badge-success' : 'badge-danger'} `} >{item.status}</span>
                    </td>
                    <td>
                        <Link to={`/user-groups/${item.id}`} className='text-primary badge light border-0 badge-count'>{item.CompanyGroups}</Link>
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

export default CompanyTable