import React from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const DeleteModal = ({ onConfirmDelete, children, id }) => {
  const onDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085D6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirmDelete?.(id);
      }
    });
  };
  return (
    <span className="cursor-pointer " onClick={onDelete}>
      {children}
    </span>
  );
};
export default DeleteModal;
