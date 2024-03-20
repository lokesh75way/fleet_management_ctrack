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
  onInput,
  min,
  disabled,
}) => {
  const { errors } = useFormContext();
  return (
    <div>
      <input
        {...register(`${name}`)}
        name={name}
        type={type}
        label={label}
        style={{...style, height : "46px"}}
        value={value}
        placeholder={placeholder}
        className="form-control"
        defaultValue={defaultValue}
        disabled={disabled}
        onInput={onInput}
        min={min}
        autoComplete="off"
      />
    </div>
  );
};
export default CustomInput;
