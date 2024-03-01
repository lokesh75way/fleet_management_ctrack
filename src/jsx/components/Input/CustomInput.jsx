import React from 'react';
import { useFormContext } from 'react-hook-form';

const CustomInput = ({ name, label, defaultValue }) => {
  const { register, errors } = useFormContext();

  return (
    <div>
      <input
        {...register(`${name}`, {
            required: required ? false : `${label} is required!`,
          })}
        name={name}
        defaultValue={defaultValue}
      />
      {errors[name] && <span>{errors[name].message}</span>} {/* Display error messages if any */}
    </div>
  );
};

export default CustomInput;