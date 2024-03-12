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
  disabled
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
        defaultValue={defaultValue}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  );
};
export default CustomInput;
