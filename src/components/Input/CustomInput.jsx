import React from "react";
const CustomInput = ({
  name,
  label,
  defaultValue,
  required,
  onChange,
  placeholder,
  register,
  type,
  value,
  style,
  onInput,
  min,
  disabled,
}) => {
  const handleKeyDown = (e) => {
    if (e.currentTarget.type === "number") {
      if (e.key === "e" || e.key === "E") {
        e.preventDefault();
      }
    }
  };

  return (
    <div>
      <input
        {...register(`${name}`)}
        name={name}
        type={type}
        onKeyDown={handleKeyDown}
        label={label}
        style={{ ...style, height: "46px" }}
        value={value}
        placeholder={placeholder}
        className="form-control"
        defaultValue={defaultValue || register(`${name}`).value}
        disabled={disabled}
        min={min}
        autoComplete="new-password"
      />
    </div>
  );
};
export default CustomInput;
