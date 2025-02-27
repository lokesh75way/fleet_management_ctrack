import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getDrivers } from "../../../services/api/driverService";
import DropdownLoader from "../DropdownLoader";

const DriverDropdown = ({ onChange, value, customStyles, inputRef, isDisabled, name }) => {
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const response = await getDrivers();
        const driverOptions = response.data.map((item) => ({
          label: item?.firstName,
          value: item?._id,
        }));
        setDropDownOptions(driverOptions);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
      setLoading(false);
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    const selected = dropDownOptions.find((option) => option.value === value);
    setSelectedOption(selected);
  }, [value, dropDownOptions]);

  return (
    <Select
      options={loading ? [] : dropDownOptions} // Show empty list when loading
      value={selectedOption}
      onChange={(newValue) => onChange(newValue)}
      styles={customStyles}
      ref={inputRef}
      name={name}
      isDisabled={isDisabled}
      isClearable
      placeholder="Select Driver"
      noOptionsMessage={() =>
        loading ? <DropdownLoader /> : "No drivers available"
      }
    />
  );
};

export default DriverDropdown;
