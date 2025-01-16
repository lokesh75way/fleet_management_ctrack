import React from "react";

const Spinner = () => {
  return (
    <div class="spinner-border" style={{ width: 20, height: 20 }} role="status">
      <span class="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
