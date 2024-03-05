import React from "react";

const Error = ({ errorName }) => {
  return (
    <>
      {errorName && (
        <span className="text-danger text-sm m-2">{errorName.message}</span>
      )}
    </>
  );
};

export default Error;