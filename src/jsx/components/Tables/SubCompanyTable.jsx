import React from 'react'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import DeleteModal from '../Modal/DeleteModal'
import { Link } from 'react-router-dom'
import { IMAGES,SVGICON} from '../../constant/theme'; 

const SubCompanyTable = ({onConfirmDelete,params, tempValue,tempValue2,tableData,editDrawerOpen}) => {
  var filterData = tableData;

  console.log("this is data",filterData,tempValue,tempValue2);
  if(tempValue!=='All'){
    filterData = tableData.filter((item)=> item.role === 'branch' && item.parentCompany === tempValue)
  }
  if(tempValue2!=='All'){
    filterData = tableData.filter((item)=> item.role === 'branch' && item.parentBranch === tempValue2)
  }

  


  console.log("In table company",tableData)
    return (
      <>
        {filterData.map((item, index) => (
          <tr key={index}>
            <td>
              <span>{item.id}</span>
            </td>

            {/* <td><span>{item.application}</span></td> */}
            <td>
              <span className="text-primary">{item.userName}</span>
            </td>
            <td>
              <span >{item.parentCompany}</span>
            </td>
            <td>
              <div className="products">
                <img
                  src={item.image || IMAGES.contact1}
                  className="avatar avatar-md"
                  alt=""
                />
                <div>
                  <h6>{item.parentBusinessGroup}</h6>
                </div>
              </div>
            </td>
            <td>
              <span>{item.mobileNumber}</span>
            </td>
            <td>
              <span>{item.city}</span>
            </td>

            <td>
              <span>{item.zipCode}</span>
            </td>
            <td>
              <span className="d-flex justify-content-center">
                <span
                  className="cursor-pointer"
                  onClick={() => editDrawerOpen(item.id)}
                >
                  <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
                </span>
                <DeleteModal
                  className="cursor-pointer "
                  onConfirmDelete={onConfirmDelete}
                  id={item.id}
                >
                  <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
                </DeleteModal>
              </span>
            </td>
          </tr>
        ))}
      </>
    );
}

export default SubCompanyTable