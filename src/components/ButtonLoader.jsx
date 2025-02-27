import React from "react";
import { Spinner } from "react-bootstrap";

const ButtonLoader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      className="text-light"
      style={{ width: "20px", height: "20px" }}
    />
  );
};

export default ButtonLoader;
