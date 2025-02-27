import React, { useEffect, useState } from "react";
import { getAllBranch } from "../../../services/api/BranchServices";
import Select from "react-select";
import usePagination from "../../../hooks/usePagination";
import DropdownLoader from "../DropdownLoader";

const BranchDropdown = ({
  onChange,
  value,
  customStyles,
  name,
  companyId,
  isDisabled,
  ref,
  isMulti = true,
}) => {
  const [dropDownOptions, setdropDownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(value);
  const [loading, setLoading] = useState(true); 
  const { page } = usePagination();

  useEffect(() => {
    const fetchBusinessGroups = async () => {
      setLoading(true); 
      try {
        const response = await getAllBranch(
          undefined,
          companyId ? companyId : undefined
        );
        const groupOptions = response.data.data.map((item) => ({
          value: item?._id,
          label: item?.branchName,
        }));
        setdropDownOptions(groupOptions);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
      setLoading(false); // Stop loading
    };

    fetchBusinessGroups();
  }, [page, companyId]);
  useEffect(() => {
    if (value && Array.isArray(value)) {
      const selected = dropDownOptions.filter((option) =>
        value.some((val) => val === option.value)
      );
      setSelectedOption(selected);
    } else {
      setSelectedOption(value);
    }
  }, [value, dropDownOptions]);
  return (
    <Select
      options={
        loading
          ? [{ value: "", label: <DropdownLoader /> }]
          : dropDownOptions
      }
      value={selectedOption}
      onChange={(newValue) => onChange(newValue)}
      styles={customStyles}
      name={name}
      ref={ref}
      isDisabled={isDisabled}
      isMulti={isMulti}
      closeMenuOnSelect={false}
    />
  );
};

export default BranchDropdown;
