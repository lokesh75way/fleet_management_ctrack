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
  style,
  value
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
        placeholder={placeholder}
        className="form-control"
        value={value}
        // defaultValue={defaultValue}
      />
    </div>
  );
};
export default CustomInput;
