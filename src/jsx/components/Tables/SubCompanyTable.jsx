import React from 'react'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'
import DeleteModal from '../Modal/DeleteModal'
import { Link } from 'react-router-dom'
import { IMAGES,SVGICON} from '../../constant/theme'; 
import useStorage from '../../../hooks/useStorage'
import { usePermissions } from '../../../context/PermissionContext'

const SubCompanyTable = ({onConfirmDelete,params, tempValue,tempValue2,tableData,editDrawerOpen, setDataLength}) => {
  var filterData = tableData;

  const {can} = usePermissions()
  const editPermission = can('branch','modify');
  const deletePermission = can('branch','delete');
  if(tempValue!=='All Companies'){
    filterData = tableData.filter((item)=> item.role === 'branch' && item.parentCompany === tempValue)
  }
  if(tempValue2!=='All Branches'){
    filterData = tableData.filter((item)=> item.role === 'branch' && item.parentBranch === tempValue2)
  }
  console.log("this is data after filter",filterData,tempValue,tempValue2);
  var branchCount = []
  for(var i=0;i<filterData.length;i++){
    const branchName = filterData[i].userName
    branchCount[i] = filterData.filter((item)=> item.parentBranch === branchName).length
  }
  setDataLength(filterData.length)
    return (
      <>
        {filterData.map((item, index) => (
          <tr key={index}>
            <td>
              <span>{item.id}</span>
            </td>
            <td>
              <span className="text-primary">{item.userName}</span>
            </td>
            <td>
              <span >{item.parentBranch !== 'none' ? item.parentBranch: <span className='ps-4'>-</span> }</span>
            </td>
            <td>
              <span >{item.parentCompany}</span>
            </td>
            <td>
              <span >{item.parentBusinessGroup}</span>
            </td>
            <td>
              <span>{item.mobileNumber}</span>
            </td>
            <td>
              <span>{item.city}</span>
            </td>

            <td>
            <Link
              to={`/branch/bid/${item.id}`}
              className="text-primary badge light border-0 badge-count"
            >
              {branchCount[index]}
            </Link>
          </td>
            {(editPermission || deletePermission) && <td>
              <span className="d-flex justify-content-center">
                {editPermission && <span
                  className="cursor-pointer"
                  onClick={() => editDrawerOpen(item.id)}
                >
                  <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
                </span>}
                {deletePermission && <DeleteModal
                  className="cursor-pointer "
                  onConfirmDelete={onConfirmDelete}
                  id={item.id}
                >
                  <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
                </DeleteModal>}
              </span>
            </td>}
          </tr>
        ))}
      </>
    );
}

export default SubCompanyTable