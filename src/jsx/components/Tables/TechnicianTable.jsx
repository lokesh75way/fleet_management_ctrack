import React, { useState } from "react";
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import DeleteModal from '../Modal/DeleteModal';
import { IMAGES,SVGICON} from '../../constant/theme'; 
import {useParams} from 'react-router-dom'


const TechnicianTable = ({tableData,currentPage, itemsPerPage, editDrawerOpen, onConfirmDelete}) => {

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  return (
    <>
      {tableData.map((item, index) => (
        <tr key={index}>
          <td>
            <span>{startIndex + index}</span>
          </td>
          <td>
            <div className="products">
              {/* <img
                src={item.image || IMAGES.contact1}
                className="avatar avatar-md"
                alt=""
              /> */}
              <div>
                <h6>{item.firstName}</h6>
                {/* <span>Web Designer</span> */}
              </div>
            </div>
          </td>

          <td>
            <span className="text-primary">{item.email}</span>
          </td>
          <td>
            <span>{item.mobileNumber}</span>
          </td>

          <td>
            <span>{item.address.country}</span>
          </td>
          <td>
            <span>{item.technicianNo}</span>
          </td>
          <td>
            <span className="d-flex justify-content-center">
              <span
                className="cursor-pointer"
                onClick={() => editDrawerOpen(item._id)}
              >
                <FaEdit style={{ color: "green", fontSize: "1.2rem" }} />
              </span>
              <DeleteModal
                className="cursor-pointer "
                onConfirmDelete={onConfirmDelete}
                id={item._id}
              >
                <MdDelete style={{ color: "red", fontSize: "1.2rem" }} />
              </DeleteModal>
            </span>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TechnicianTable;
