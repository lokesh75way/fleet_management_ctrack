import React from "react";

const Error = ({ errorName }) => {
  return (
    <>
      {errorName && (
        <span className="text-danger text-sm" style={{ marginBottom: "1rem" }}>
          {errorName.message}
        </span>
      )}
    </>
  );
};

export default Error;
