import React from 'react';

const CustomCheckbox = ({ register, name, label }) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        {...register(name)}
        id={name}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;
