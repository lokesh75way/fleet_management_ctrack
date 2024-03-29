import React from 'react'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import DeleteModal from '../Modal/DeleteModal'
import { useNavigate } from 'react-router-dom'

const GroupTable = ({onConfirmDelete,tableData, setIsEditTrue, isEditTrue}) => {
    const navigate = useNavigate()
    const handleClick = (index)=>{
        setIsEditTrue(index)
        const props = {
            isEditTrue : isEditTrue,
            setIsEditTrue : setIsEditTrue,
        }
        console.log(props)
        navigate('permission', {state:JSON.stringify(props)})
    }





    return (
        <>
            {tableData.map((item, index) => (
                <tr key={index}>
                    <td><span>{item.id}</span></td>
                    <td>
                        <div className="products">         
                                <h6>{item.name}</h6>
                        </div>
                    </td>
                    {/* <td><span>{item.application}</span></td> */}
                    <td><span className="text-primary">{item.username}</span></td>
                    <td>
                        <span>{item.contact}</span>
                    </td>
                    <td>
                        <span>{item.location}</span>
                    </td>
                    <td>
                        <span>{item.usergroup}</span>
                    </td>
                    <td>
                        <span className={`badge light border-0 ${item.status === "Active" ? 'badge-success' : 'badge-danger'} `}>{item.status}</span>
                    </td>
                    <td>
                        <span className='d-flex justify-content-center'>
                            <span className='cursor-pointer' onClick={() => handleClick(index)} ><FaEdit style={{ color: "green", fontSize: "1.2rem" }} /></span>
                            <DeleteModal className='cursor-pointer ' onConfirmDelete={()=>onConfirmDelete(index)} id={item.id} ><MdDelete style={{ color: "red", fontSize: "1.2rem" }} /></DeleteModal>

                        </span>
                    </td>
                </tr>
            ))}
        </>
    )
}

export default GroupTable