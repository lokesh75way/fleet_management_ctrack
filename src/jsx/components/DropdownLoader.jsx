import React from 'react';

const DropdownLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center p-2" style={{ backgroundColor: 'white', borderRadius: '5px' }}>
      <div className="spinner-border text-primary" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default DropdownLoader;
