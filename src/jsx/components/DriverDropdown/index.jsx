import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getDrivers } from "../../../services/api/driverService";
const DriverDropdown = ({
  onChange,
  value,
  customStyles,
  ref,
  isDisabled,
  name,
}) => {
  const [dropDownOptions, setdropDownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await getDrivers();
      const driverOptions = response.data.map((item) => ({
        label: item?.firstName,
        value: item?._id,
      }));

      setdropDownOptions(driverOptions);
    };
    fetchDrivers();
  }, []);
  useEffect(() => {
    const selected = dropDownOptions.find((option) => option.value === value);
    setSelectedOption(selected);
  }, [value, dropDownOptions]);

  return (
    <Select
      options={dropDownOptions}
      value={selectedOption}
      onChange={(newValue) => onChange(newValue)}
      styles={customStyles}
      ref={ref}
      name={name}
    />
  );
};
export default DriverDropdown;
