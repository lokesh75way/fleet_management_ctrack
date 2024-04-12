import React, { useEffect, useState } from "react";
import Select from "react-select";
import usePagination from "../../../hooks/usePagination";
import { getTechnicians } from "../../../services/api/TechnicianService";

const TechnicianDropdown = ({
  onChange,
  value,
  groupId,
  customStyles,
  name,
  ref,
  isDisabled,
}) => {
  const [dropdownOptions, setdropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const { page } = usePagination();
  useEffect(() => {
    const fetchTechnicians = async () => {
      const { technicians } = await getTechnicians(page);
      console.log({ technicians });
      const options = technicians.map((item) => ({
        value: item?._id,
        label: `${item?.firstName ?? ""} ${item?.lastName ?? ""}`,
      }));
      setdropdownOptions(options);
    };
    fetchTechnicians();
  }, []);
  useEffect(() => {
    const selected = dropdownOptions.find((option) => option.value === value);
    setSelectedOption(selected);
  }, [value, dropdownOptions, groupId]);

  return (
    <Select
      options={dropdownOptions}
      value={selectedOption}
      onChange={(newValue) => onChange(newValue)}
      styles={customStyles}
      name={name}
      ref={ref}
      isDisabled={isDisabled}
    />
  );
};
export default TechnicianDropdown;
