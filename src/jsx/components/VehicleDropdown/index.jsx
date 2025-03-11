import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getVehicles } from "../../../services/api/VehicleService";
import usePagination from "../../../hooks/usePagination";
import DropdownLoader from "../DropdownLoader";

const VehicleDropdown = ({
  onChange,
  value,
  customStyles,
  branchids,
  ref,
  isDisabled,
  name,
  isMulti = true,
  companyId,
}) => {
  const [dropDownOptions, setDropDownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const { page } = usePagination();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true); 
      try {
        const response = await getVehicles(
          page,
          branchids ? branchids : undefined,
          companyId ? companyId : undefined
        );
        const vehicleOptions = response.data.map((item) => ({
          label: item?.vehicleName,
          value: item?._id,
        }));
        setDropDownOptions(vehicleOptions);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
      setLoading(false);
    };

    fetchVehicles();
  }, [page, branchids]);

  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        const selected = dropDownOptions.filter((option) =>
          value.includes(option.value)
        );
        setSelectedOption(selected);
      } else {
        const selected = dropDownOptions.find((option) => option.value === value) || null;
        setSelectedOption(selected);
      }
    } else {
      setSelectedOption(isMulti ? [] : null);
    }
  }, [value, dropDownOptions, branchids]);
  
  return (
    <Select
      options={loading ? [] : dropDownOptions} 
      value={selectedOption}
      onChange={(newValue) => onChange(newValue)}
      styles={customStyles}
      ref={ref}
      name={name}
      isMulti={isMulti}
      noOptionsMessage={() =>
        loading ? <DropdownLoader /> : "No vehicles available"
      } 
      isDisabled={isDisabled}
      placeholder="Select Vehicle"
    />
  );
};

export default VehicleDropdown;
