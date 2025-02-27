import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Button = ({ text, isLoading = false, variant = "primary", onClick, disabled = false }) => {
  return (
    <button
      className={`btn btn-${variant} d-flex align-items-center justify-content-center my-2`}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{
        width: "100%", // Always full width
        minHeight: "40px",
        position: "relative",
      }}
    >
      {isLoading ? (
        <div className="spinner-border spinner-border-sm" role="status"></div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
