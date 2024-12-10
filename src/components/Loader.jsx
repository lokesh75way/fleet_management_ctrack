import React from "react";

const Loader = ({ height = "100vh" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
        marginTop: "-50px",
      }}
    >
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
