import React from 'react'
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import DeleteModal from '../Modal/DeleteModal';
import { Link } from 'react-router-dom';

const CompanyTable = ({ tableData,onConfirmDelete,editDrawerOpen, getData }) => {
    // const localData = getData()
    // if(localData){
    //     tableData.push(localData)
    //     console.log(tableData)
    // }
    return (
        <>
            {tableData.map((item, index) => (
                <tr key={index}>
                    <td><span>{item.id || 1}</span></td>
                    <td>
                        <div className="products">
                            <img src={item.image} className="avatar avatar-md" alt="" />
                            <div>
                                <h6>{item.title || item.shortName}</h6>
                            </div>
                        </div>
                    </td>
                    <td><span className="text-primary">{item.email || item.userName}</span></td>
                    <td>
                        <span>{item.contact || item.mobileNumber}</span>
                    </td>
                    <td>
                        <span>{item.usergroup || item.shortName}</span>
                    </td>
                    <td>
                        <span>{item.location || item.city}</span>
                    </td>
                    
                    <td>
                        <span style={{width:"5rem"}} className={`badge light border-0 ${item.status === "Active" ? 'badge-success' : 'badge-danger'} `} >{item.status || "Inactive"}</span>
                    </td>
                    <td>
                        <Link to={`/branch/${item.id}`} className='text-primary badge light border-0 badge-count'>{item.CompanyGroups || "5"}</Link>
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