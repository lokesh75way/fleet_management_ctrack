import React from "react";
import { useFormContext } from "react-hook-form";
import Error from "../Error/Error";
const CustomInput = ({
  name,
  label,
  defaultValue,
  required,
  placeholder,
  register,
  type,
  value,
  style,
  isdisabled
}) => {
  const { errors } = useFormContext();
  return (
    <div>
      <input
        {...register(`${name}`, {
          required: required ? false : `${label} is required!`,
        })}
        name={name}
        type={type}
        label={label}
        style={style}
        value={value}
        placeholder={placeholder}
        className="form-control"
        disabled={isdisabled}
        defaultValue={defaultValue}

        // defaultValue={defaultValue}
      />
    </div>
  );
};
export default CustomInput;
