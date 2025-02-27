import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const Spinner = () => {
  return (
    <div
      className="spinner-border"
      role="status"
      style={{ width: "1.2rem", height: "1.2rem", color: "white", borderColor: "white" }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
